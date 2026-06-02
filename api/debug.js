export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  try {
    const googleKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY
    const claudeKey = process.env.ANTHROPIC_API_KEY
    
    return res.json({
      timestamp: new Date().toISOString(),
      googleKey: googleKey ? `${googleKey.substring(0, 10)}...${googleKey.substring(googleKey.length - 5)}` : 'NOT FOUND',
      claudeKey: claudeKey ? `${claudeKey.substring(0, 10)}...${claudeKey.substring(claudeKey.length - 5)}` : 'NOT FOUND',
      nodeVersion: process.version,
      platform: process.platform
    })
  } catch (error) {
    return res.json({ error: error.toString() })
  }
}
