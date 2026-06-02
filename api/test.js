export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  try {
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY
    const claudeKey = process.env.CLAUDE_API_KEY
    
    return res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      hasGoogleKey: !!apiKey,
      hasClaudeKey: !!claudeKey,
      googleKeyLength: apiKey ? apiKey.length : 0,
      claudeKeyLength: claudeKey ? claudeKey.length : 0
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    })
  }
}
