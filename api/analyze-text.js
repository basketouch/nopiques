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

  const { text } = req.body

  if (!text) {
    return res.status(400).json({ error: 'Text required' })
  }

  try {
    const apiKey = process.env.CLAUDE_API_KEY

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 150,
        messages: [{
          role: 'user',
          content: `Analiza: "${text}". ¿Estafa? Responde JSON: {"riskLevel":"safe|warning|danger","title":"...","explanation":"..."}`
        }]
      })
    })

    const data = await response.json()
    const content = data.content[0].text
    const result = JSON.parse(content)

    return res.json({
      riskLevel: result.riskLevel,
      title: result.title,
      emoji: result.riskLevel === 'safe' ? '✓' : result.riskLevel === 'warning' ? '!' : '✕',
      explanation: result.explanation,
      advice: result.riskLevel === 'safe' ? 'Parece legítimo.' : 'No hagas clic.'
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
