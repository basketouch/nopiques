export default function handler(req, res) {
  const relevant = Object.keys(process.env)
    .filter(k => /API_KEY|CLAUDE|ANTHROPIC|GOOGLE|SAFE/i.test(k))
    .reduce((acc, k) => {
      acc[k] = (process.env[k] || '').length
      return acc
    }, {})
  return res.json({ relevantEnvKeys: relevant, vercelEnv: process.env.VERCEL_ENV })
}
