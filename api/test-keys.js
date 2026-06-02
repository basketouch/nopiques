export default function handler(req, res) {
  const googleKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY || ''
  const claudeKey = process.env.CLAUDE_API_KEY || ''
  
  return res.json({
    googleKey: {
      length: googleKey.length,
      first10: googleKey.substring(0, 10),
      last5: googleKey.substring(googleKey.length - 5),
      startsWithAIza: googleKey.startsWith('AIza')
    },
    claudeKey: {
      length: claudeKey.length,
      first15: claudeKey.substring(0, 15),
      last5: claudeKey.substring(claudeKey.length - 5),
      startsWithSkAnt: claudeKey.startsWith('sk-ant'),
      hasSpaces: claudeKey.includes(' '),
      fullKey: claudeKey // para debug
    }
  })
}
