export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    
    if (!apiKey) {
      return res.json({ error: 'No ANTHROPIC_API_KEY found' })
    }

    console.log('API Key exists:', apiKey.substring(0, 10) + '...')
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1-20250805',
        max_tokens: 50,
        messages: [{
          role: 'user',
          content: 'Hola'
        }]
      })
    })

    const data = await response.json()
    
    return res.json({
      status: response.status,
      statusText: response.statusText,
      response: data
    })
  } catch (error) {
    return res.json({ 
      error: error.message,
      stack: error.stack
    })
  }
}
