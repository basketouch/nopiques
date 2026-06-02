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
    const apiKey = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || '').trim()
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
        max_tokens: 350,
        messages: [{
          role: 'user',
          content: `Eres un experto en detectar estafas, phishing y fraudes. Analiza el siguiente texto y determina si es una estafa.

Texto a analizar:
"""
${text}
"""

Responde ÚNICAMENTE con un objeto JSON válido, sin markdown ni texto adicional, con esta estructura exacta:
{"riskLevel": "safe" | "warning" | "danger", "title": "titulo corto en español", "explanation": "explicacion breve en español de por que es seguro o peligroso", "advice": "consejo concreto de que hacer en ESTE caso"}

Donde riskLevel es uno de: "safe" (legítimo), "warning" (sospechoso), "danger" (estafa clara).

Para "advice": da un consejo CONCRETO y ESPECÍFICO de este caso, NO genérico. Menciona la entidad real concreta si aplica (ej: si imita a Correos, di que mire su envío en la web oficial de Correos; si imita al banco, di que llame al número de su tarjeta; si imita a Hacienda, di que entre escribiendo agenciatributaria.gob.es). En español MUY sencillo, sin tecnicismos, como para una persona mayor. Máximo 2 frases.`
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
      advice: result.advice || (result.riskLevel === 'safe'
        ? 'Parece de fiar, pero nunca compartas contraseñas ni datos del banco si te los piden con prisa.'
        : 'No respondas, no pinches ningún enlace y no des ningún dato. Ante la duda, contacta tú mismo con la entidad por su web o teléfono oficial.')
    })
  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
      type: error.constructor.name
    })
  }
}
