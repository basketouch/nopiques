export async function checkUrlSafety(url) {
  try {
    const response = await fetch('/api/check-safety', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) throw new Error('Error checking URL safety');
    return await response.json();
  } catch (error) {
    console.error('Safe Browsing error:', error);
    return { error: 'Error al verificar la URL', unsafe: false };
  }
}

export async function analyzeText(text) {
  try {
    const response = await fetch('/api/analyze-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error('Error analyzing text');
    return await response.json();
  } catch (error) {
    console.error('Text analysis error:', error);
    return { error: 'Error al analizar el texto', riskLevel: 'unknown' };
  }
}
