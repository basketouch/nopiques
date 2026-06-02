export function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
        <p className="text-lg">Analizando...</p>
      </div>
    );
  }

  if (!result) return null;

  const riskColors = {
    safe: 'bg-safe',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  const textColors = {
    safe: 'text-safe',
    warning: 'text-warning',
    danger: 'text-danger',
  };

  const bgColors = {
    safe: 'bg-green-50',
    warning: 'bg-yellow-50',
    danger: 'bg-red-50',
  };

  return (
    <div className={`mt-8 p-6 rounded-lg ${bgColors[result.riskLevel] || 'bg-gray-50'}`}>
      <div className="text-5xl mb-4">{result.emoji || '❓'}</div>
      <h2 className={`text-2xl font-bold mb-2 ${textColors[result.riskLevel] || 'text-gray-700'}`}>
        {result.title}
      </h2>
      <p className="text-lg mb-4 text-gray-700">{result.explanation}</p>
      <div className="bg-white p-4 rounded border-l-4" style={{ borderLeftColor: result.riskLevel === 'safe' ? '#10b981' : result.riskLevel === 'warning' ? '#f59e0b' : '#ef4444' }}>
        <p className="font-semibold text-gray-900">¿Qué hacer?</p>
        <p className="text-gray-700 mt-2">{result.advice}</p>
      </div>
      {result.error && (
        <p className="text-sm text-red-600 mt-4">⚠️ {result.error}</p>
      )}
    </div>
  );
}
