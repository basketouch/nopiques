import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY,
});

function detectRedFlags(text) {
  const redFlags = {
    urgency: /urgente|ahora|inmediato|rápido|no esperes|pronto|hoy/gi,
    threats: /bloqueado|suspendido|cancelado|desactivado|cerrado|restringido/gi,
    clickBait: /hacer clic|pulsa aquí|verifica|confirma|actualiza|válida/gi,
    moneyRelated: /pago|dinero|tarjeta|banco|cuenta|transferencia|multa|deuda|pagar/gi,
    personalData: /contraseña|clave|usuario|email|teléfono|dni|datos personales/gi,
    fakeAuthority: /banco|policía|hacienda|seguridad social|google|apple|amazon|microsoft/gi,
  };

  const flags = {};
  for (const [key, regex] of Object.entries(redFlags)) {
    flags[key] = (text.match(regex) || []).length;
  }

  return flags;
}

async function analyzeWithClaude(text, detectedFlags) {
  const prompt = `
Eres un asistente amigable que ayuda a detectar estafas por SMS, email o mensajes.

MENSAJE A ANALIZAR:
"${text}"

SEÑALES DETECTADAS:
${JSON.stringify(detectedFlags, null, 2)}

IMPORTANTE:
- Responde SIEMPRE en español
- Usa lenguaje simple, sin tecnicismos
- Explica como lo harías a una persona mayor
- NO hagas afirmaciones absolutas
- Identifica las tácticas de manipulación (urgencia, miedo, presión)
- Sé tranquilizador pero honesto

ESTRUCTURA DE RESPUESTA:
1. Nivel de riesgo: "✅ Parece seguro" | "⚠️ Hay señales sospechosas" | "⛔ Probablemente es una estafa"
2. Explicación breve (2-3 frases máximo)
3. Qué hacer: un consejo práctico

Responde en JSON:
{
  "riskLevel": "safe" | "warning" | "danger",
  "emoji": "✅" | "⚠️" | "⛔",
  "title": "string",
  "explanation": "string",
  "advice": "string"
}
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 300,
    messages: [{ role: 'user', content: prompt }],
  });

  try {
    const content = message.content[0].text;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : content);
  } catch (error) {
    console.error('Parse error:', error);
    return {
      riskLevel: 'unknown',
      emoji: '❓',
      title: 'No se pudo analizar',
      explanation: 'Hubo un error al procesar el mensaje.',
      advice: 'Intenta de nuevo más tarde.',
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const detectedFlags = detectRedFlags(text);
    const analysis = await analyzeWithClaude(text, detectedFlags);

    return res.status(200).json({
      ...analysis,
      flags: detectedFlags,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      error: 'Error al analizar el texto',
      riskLevel: 'unknown',
    });
  }
}
