// Contador global de verificaciones.
// Usa Vercel KV (Upstash Redis) si está configurado (env KV_REST_API_URL / KV_REST_API_TOKEN).
// GET  -> devuelve el total actual sin sumar.
// POST -> suma 1 y devuelve el nuevo total.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Aceptamos los dos nombres que Vercel/Upstash pueden usar
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  // Si todavía no se ha creado la base de datos, devolvemos null:
  // el frontend hará un conteo local de respaldo y nada se rompe.
  if (!url || !token) {
    return res.json({ count: null })
  }

  try {
    const cmd = req.method === 'POST' ? 'incr' : 'get'
    const r = await fetch(`${url}/${cmd}/nopiques_verifications`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await r.json()
    const count = Number(data.result) || 0
    return res.json({ count })
  } catch {
    return res.json({ count: null })
  }
}
