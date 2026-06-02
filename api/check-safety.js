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
  if (!url) return res.status(400).json({ error: 'URL required' })

  try {
    const apiKey = process.env.VITE_GOOGLE_SAFE_BROWSING_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Google API key not configured' })
    }

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

    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json({ 
        error: `Google Safe Browsing error: ${response.status}`,
        details: errorData
      })
    }

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
      explanation: 'Este enlace parece legítimo según Google Safe Browsing.',
      advice: 'Parece seguro.'
    })
  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
      type: error.constructor.name
    })
  }
}
