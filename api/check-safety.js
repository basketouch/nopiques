export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
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
    if (!apiKey) {
      console.error('GOOGLE_SAFE_BROWSING_API_KEY not set')
      return res.status(500).json({ error: 'API key not configured' })
    }

    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: 'nopiques', clientVersion: '1.0' },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }]
          }
        })
      }
    )

    const data = await response.json()

    if (data.matches && data.matches.length > 0) {
      return res.json({
        riskLevel: 'danger',
        title: '⚠️ Peligroso',
        emoji: '✕',
        explanation: 'Google Safe Browsing detectó que este enlace podría ser peligroso.',
        advice: 'No hagas clic. Si recibiste este enlace por SMS o email, ignóralo y denuncia como spam.'
      })
    }

    return res.json({
      riskLevel: 'safe',
      title: '✓ Seguro',
      emoji: '✓',
      explanation: 'Este enlace parece ser legítimo según Google Safe Browsing.',
      advice: 'Parece seguro, pero siempre ten cuidado con los datos que compartas.'
    })
  } catch (error) {
    console.error('check-safety error:', error)
    return res.status(500).json({
      riskLevel: 'warning',
      title: '! Error en análisis',
      emoji: '!',
      explanation: 'No pudimos analizar este enlace. Intenta de nuevo.',
      advice: 'Si el problema persiste, contacta a jorge@insidelife.club',
      error: error.message
    })
  }
}
