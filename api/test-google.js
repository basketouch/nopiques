export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  try {
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY
    
    if (!apiKey) {
      return res.json({ error: 'API key not found' })
    }

    console.log('Testing Google Safe Browsing with key:', apiKey.substring(0, 10) + '...')

    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: 'nopiques', clientVersion: '1.0' },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url: 'https://google.com' }]
          }
        })
      }
    )

    const data = await response.json()

    return res.json({
      status: response.status,
      statusText: response.statusText,
      response: data
    })
  } catch (error) {
    return res.json({ 
      error: error.message,
      type: error.constructor.name
    })
  }
}
