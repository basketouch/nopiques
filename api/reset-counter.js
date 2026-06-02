// Endpoint TEMPORAL para resetear el contador. Se borra tras usarlo.
export default async function handler(req, res) {
  if (req.query.key !== 'np-reset-9b3x') {
    return res.status(403).json({ error: 'forbidden' })
  }
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return res.json({ ok: false, reason: 'no kv' })

  const r = await fetch(`${url}/set/nopiques_verifications/0`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await r.json()
  return res.json({ ok: true, result: data.result })
}
