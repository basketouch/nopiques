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
  if (!text) return res.status(400).json({ error: 'Text required' })

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
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: `Analiza este texto para detectar si es una estafa:
"${text}"

Responde SOLO con un JSON válido (sin markdown, sin comillas adicionales):
{"riskLevel":"safe","warning","danger","title":"...","explanation":"..."}`
        }]
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json({ 
        error: `Claude API error: ${response.status}`,
        details: errorData
      })
    }

    const data = await response.json()
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      return res.status(500).json({ 
        error: 'Unexpected response format from Claude',
        received: data
      })
    }

    const content = data.content[0].text.trim()
    
    // Intenta parsear como JSON
    let result
    try {
      result = JSON.parse(content)
    } catch {
      // Si falla, intenta extraer JSON del contenido
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        return res.status(500).json({ 
          error: 'Could not parse response as JSON',
          received: content
        })
      }
      result = JSON.parse(jsonMatch[0])
    }

    return res.json({
      riskLevel: result.riskLevel || 'warning',
      title: result.title || '?',
      emoji: result.riskLevel === 'safe' ? '✓' : result.riskLevel === 'danger' ? '✕' : '!',
      explanation: result.explanation || 'Análisis completado',
      advice: result.riskLevel === 'safe' ? 'Parece legítimo.' : 'No hagas clic.'
    })
  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
      type: error.constructor.name
    })
  }
}
