export function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <div className="mt-8 p-6 text-center">
        <p className="text-sm text-gray-500">Analizando...</p>
      </div>
    );
  }

  if (!result) return null;

  const styles = {
    safe: {
      borderColor: '#10b981',
      textColor: '#047857',
      symbolColor: '#10b981',
    },
    warning: {
      borderColor: '#f59e0b',
      textColor: '#92400e',
      symbolColor: '#f59e0b',
    },
    danger: {
      borderColor: '#ef4444',
      textColor: '#b91c1c',
      symbolColor: '#ef4444',
    },
  };

  const style = styles[result.riskLevel] || styles.warning;

  return (
    <div className="mt-8 border-l-4 p-6" style={{ borderLeftColor: style.borderColor }}>
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0" style={{ color: style.symbolColor }}>
          {result.emoji}
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold mb-2" style={{ color: style.textColor }}>
            {result.title}
          </h2>
          <p className="text-gray-700 text-sm mb-4">{result.explanation}</p>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-xs font-semibold text-gray-900 uppercase mb-2">Recomendación</p>
            <p className="text-sm text-gray-700">{result.advice}</p>
          </div>
        </div>
      </div>
      {result.error && (
        <p className="text-xs text-red-600 mt-4 ml-14">Error: {result.error}</p>
      )}
    </div>
  );
}
