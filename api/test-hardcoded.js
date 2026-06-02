export default async function handler(req, res) {
  const apiKey = "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"
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 50,
        messages: [{ role: 'user', content: 'test' }]
      })
    })

    const data = await response.json()
    return res.json({
      status: response.status,
      success: response.ok,
      response: data
    })
  } catch (error) {
    return res.json({ error: error.message })
  }
}
