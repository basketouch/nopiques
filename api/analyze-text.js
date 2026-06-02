export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { text } = req.body

  if (!text) {
    return res.status(400).json({ error: 'Text required' })
  }

  try {
    const apiKey = process.env.CLAUDE_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: `Analiza este mensaje SMS para detectar si es una estafa o phishing. 
Responde SOLO en formato JSON (sin markdown, sin explicaciones):
{"riskLevel": "safe|warning|danger", "title": "...", "explanation": "..."}

Mensaje: "${text}"`
          }
        ]
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'API error')
    }

    const content = data.content[0].text
    const result = JSON.parse(content)

    return res.status(200).json({
      riskLevel: result.riskLevel,
      title: result.title,
      emoji: result.riskLevel === 'safe' ? '✓' : result.riskLevel === 'warning' ? '!' : '✕',
      explanation: result.explanation,
      advice: result.riskLevel === 'safe' 
        ? 'Parece un mensaje legítimo, pero verifica siempre antes de compartir datos.'
        : 'No hagas clic en enlaces ni compartas datos. Denuncia como spam.'
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      riskLevel: 'warning',
      title: '! Error en análisis',
      emoji: '!',
      explanation: 'No pudimos analizar este mensaje. Intenta de nuevo.',
      advice: 'Si el problema persiste, contacta a jorge@insidelife.club',
      error: error.message
    })
  }
}
