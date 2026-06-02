import { useState } from 'react';
import { ResultCard } from './ResultCard';

export function AnalyzerForm({ onVerification }) {
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
      if (onVerification) onVerification();
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  return (
    <div className="w-full">
      {!result ? (
        <form onSubmit={handleAnalyze}>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <label className={`px-4 py-3 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
              analysisType === 'url'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
              <input
                type="radio"
                value="url"
                checked={analysisType === 'url'}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="hidden"
              />
              URL
            </label>
            <label className={`px-4 py-3 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
              analysisType === 'text'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
              <input
                type="radio"
                value="text"
                checked={analysisType === 'text'}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="hidden"
              />
              Mensaje
            </label>
          </div>

          {/* Input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={analysisType === 'url' ? 'https://...' : 'Pega el mensaje aquí...'}
            className="w-full h-24 p-4 border border-gray-300 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
            disabled={loading}
          />

          {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-4 text-sm transition-colors"
          >
            {loading ? 'Analizando...' : 'Verificar'}
          </button>
        </form>
      ) : (
        <button
          onClick={handleNewAnalysis}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 text-sm transition-colors"
        >
          Verificar otra
        </button>
      )}

      <ResultCard result={result} loading={loading} />
    </div>
  );
}
