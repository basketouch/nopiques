export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url } = req.body

  if (!url) {
    return res.status(400).json({ error: 'URL required' })
  }

  try {
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY

    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: 'nopiques', clientVersion: '1.0' },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }]
          }
        })
      }
    )

    const data = await response.json()

    if (data.matches?.length > 0) {
      return res.json({
        riskLevel: 'danger',
        title: '✕ Peligroso',
        emoji: '✕',
        explanation: 'Google Safe Browsing detectó que este enlace podría ser peligroso.',
        advice: 'No hagas clic.'
      })
    }

    return res.json({
      riskLevel: 'safe',
      title: '✓ Seguro',
      emoji: '✓',
      explanation: 'Este enlace parece legítimo.',
      advice: 'Parece seguro, pero ten cuidado.'
    })
  } catch (error) {
    return res.status(500).json({
      riskLevel: 'warning',
      title: '! Error',
      emoji: '!',
      explanation: 'Error al analizar.',
      advice: 'Intenta de nuevo'
    })
  }
}
