import { useState } from 'react';
import { ResultCard } from './ResultCard';

export function AnalyzerForm() {
  const [input, setInput] = useState('');
  const [analysisType, setAnalysisType] = useState('url');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!input.trim()) {
      setError('Por favor pega una URL o un mensaje');
      return;
    }

    setLoading(true);

    try {
      const endpoint = analysisType === 'url' ? '/api/check-safety' : '/api/analyze-text';
      const body = analysisType === 'url' ? { url: input } : { text: input };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Error al conectar con el servidor');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleAnalyze} className="mt-8">
        <div className="flex gap-4 mb-6">
          <label className="flex items-center">
            <input
              type="radio"
              value="url"
              checked={analysisType === 'url'}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="mr-2"
            />
            <span>Analizar URL</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="text"
              checked={analysisType === 'text'}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="mr-2"
            />
            <span>Analizar mensaje</span>
          </label>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={analysisType === 'url' ? 'Pega la URL aquí...' : 'Pega el mensaje, email o SMS aquí...'}
          className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500"
        />

        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors"
        >
          {loading ? 'Analizando...' : '¿Es seguro?'}
        </button>
      </form>

      <ResultCard result={result} loading={loading} />
    </div>
  );
}
