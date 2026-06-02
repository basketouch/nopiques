import { Anthropic } from '@anthropic-ai/sdk';

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_SAFE_BROWSING_API_KEY || process.env.GOOGLE_SAFE_BROWSING_API_KEY;

async function checkGoogleSafeBrowsing(url) {
  try {
    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: 'nopiques', clientVersion: '1.0' },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }],
          },
        }),
      }
    );

    const data = await response.json();
    return {
      safe: !data.matches || data.matches.length === 0,
      threats: data.matches ? data.matches.map(m => m.threatType) : [],
    };
  } catch (error) {
    console.error('Google Safe Browsing error:', error);
    return { safe: null, threats: [] };
  }
}

async function getWhoisInfo(url) {
  try {
    const domain = new URL(url).hostname;
    const response = await fetch(`https://www.whoisfreaks.com/api/whois?apiKey=${process.env.WHOIS_API_KEY}&domain=${domain}`);

    if (!response.ok) return { error: 'Could not fetch WHOIS data' };

    const data = await response.json();
    return {
      domain,
      createdDate: data.domain?.createdDate,
      registrar: data.domain?.registrar,
    };
  } catch (error) {
    console.error('WHOIS error:', error);
    return { domain: new URL(url).hostname, error: 'Could not fetch WHOIS' };
  }
}

async function analyzeWithClaude(technicalData) {
  const apiKey = process.env.VITE_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const anthropic = new Anthropic({ apiKey });

  const prompt = `
Eres un asistente amigable que ayuda a personas a detectar estafas. Un usuario te envía datos técnicos sobre una URL o mensaje.

DATOS TÉCNICOS:
${JSON.stringify(technicalData, null, 2)}

IMPORTANTE:
- Responde SIEMPRE en español
- Usa lenguaje simple, sin tecnicismos
- Explica como lo harías a una persona mayor
- NO hagas afirmaciones absolutas ("100% seguro", "definitivamente es una estafa")
- Usa frases como "parece", "tiene señales de", "probablemente"
- Sé tranquilizador pero honesto

ESTRUCTURA DE RESPUESTA:
1. Nivel de riesgo: "✅ Parece legítimo" | "⚠️ Hay señales sospechosas" | "⛔ Riesgo alto de fraude"
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
    model: 'claude-haiku-4-5-20251001',
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
      explanation: 'Hubo un error al procesar la información.',
      advice: 'Intenta de nuevo más tarde.',
    };
  }
}

export default async function handler(req, res) {
  console.log('🔍 [check-safety] Request:', { method: req.method, body: req.body });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const [safeBrowsingResult, whoisResult] = await Promise.all([
      checkGoogleSafeBrowsing(url),
      getWhoisInfo(url),
    ]);

    const technicalData = {
      url,
      safeBrowsing: safeBrowsingResult,
      whois: whoisResult,
      timestamp: new Date().toISOString(),
    };

    const analysis = await analyzeWithClaude(technicalData);

    return res.status(200).json({
      ...analysis,
      technical: technicalData,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      error: 'Error al analizar la URL',
      riskLevel: 'unknown',
    });
  }
}
