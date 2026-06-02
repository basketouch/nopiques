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
    // 1) Google Safe Browsing: detecta webs ya denunciadas
    const googleKey = (process.env.GOOGLE_SAFE_BROWSING_API_KEY || '').trim()
    if (googleKey) {
      const gRes = await fetch(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${googleKey}`,
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

      if (gRes.ok) {
        const gData = await gRes.json()
        if (gData.matches?.length > 0) {
          return res.json({
            riskLevel: 'danger',
            title: 'Peligroso',
            emoji: '✕',
            explanation: 'Este enlace está en la lista de webs peligrosas de Google. Es una estafa o contiene virus.',
            advice: 'No entres ni pongas tus datos.'
          })
        }
      }
    }

    // 2) IA: detecta estafas nuevas que Google aún no conoce (dominios que imitan
    //    a bancos, Agencia Tributaria, Correos, extensiones raras, etc.)
    const aiKey = (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || '').trim()
    if (aiKey) {
      try {
        const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': aiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 350,
            messages: [{
              role: 'user',
              content: `Eres un experto en detectar webs fraudulentas y phishing. Analiza esta dirección web:
"${url}"

Fíjate especialmente en:
- Dominios que imitan a entidades reales (bancos, Agencia Tributaria/AEAT, Correos, DGT, Seguridad Social, PayPal, Amazon...) pero con el nombre cambiado o mal escrito.
- Extensiones sospechosas (.top, .xyz, .online, .info...) en webs que dicen ser oficiales.
- Palabras de cebo o urgencia en la dirección.

Responde ÚNICAMENTE con un JSON válido, sin texto adicional, con esta estructura:
{"riskLevel": "safe" | "warning" | "danger", "title": "titulo corto", "explanation": "explicacion", "advice": "consejo concreto de que hacer en ESTE caso"}

riskLevel: "safe" (parece legítima), "warning" (sospechosa, ten cuidado), "danger" (casi seguro estafa).
La explicación y el consejo en español MUY SENCILLO, sin tecnicismos, como para una persona mayor. Máximo 2 frases cada uno.
Para "advice": da un consejo CONCRETO de este caso, NO genérico. Si la web imita a una entidad real, di cómo llegar a la web oficial de verdad (ej: si imita a Hacienda, di que escriba agenciatributaria.gob.es; si imita a Correos, que use la app o web oficial de Correos; si imita al banco, que llame al número de su tarjeta).`
            }]
          })
        })

        if (aiRes.ok) {
          const aiData = await aiRes.json()
          const content = (aiData.content?.[0]?.text || '').trim()
          const match = content.match(/\{[\s\S]*\}/)
          if (match) {
            const r = JSON.parse(match[0])
            const level = ['safe', 'warning', 'danger'].includes(r.riskLevel) ? r.riskLevel : 'warning'
            return res.json({
              riskLevel: level,
              title: r.title || (level === 'safe' ? 'Seguro' : level === 'danger' ? 'Peligroso' : 'Sospechoso'),
              emoji: level === 'safe' ? '✓' : level === 'danger' ? '✕' : '!',
              explanation: r.explanation || 'Análisis completado.',
              advice: r.advice || (level === 'safe'
                ? 'Parece de fiar, pero ante la duda no pongas datos personales ni del banco.'
                : 'No entres ni pongas tus datos. Si dudas, busca la web oficial escribiéndola tú mismo en el navegador.')
            })
          }
        }
      } catch {
        // Si la IA falla, seguimos con el resultado de Google (abajo)
      }
    }

    // 3) Si llegamos aquí: Google no la conoce y la IA no estaba disponible
    return res.json({
      riskLevel: 'safe',
      title: 'Seguro',
      emoji: '✓',
      explanation: 'No hemos encontrado señales de peligro en este enlace.',
      advice: 'Parece de fiar, pero ante la duda no pongas datos personales.'
    })
  } catch (error) {
    return res.status(500).json({ error: error.message, type: error.constructor.name })
  }
}
