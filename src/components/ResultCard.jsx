export function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <div className="mt-8 p-8 bg-gray-50 border border-gray-200 text-center">
        <div className="inline-block">
          <div className="animate-spin text-2xl mb-3">⏳</div>
          <p className="text-sm font-medium text-gray-900">Analizando...</p>
          <p className="text-xs text-gray-500 mt-1">Espera un momento</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const styles = {
    safe: {
      borderColor: '#10b981',
      bgColor: '#f0fdf4',
      textColor: '#047857',
      symbolColor: '#10b981',
    },
    warning: {
      borderColor: '#f59e0b',
      bgColor: '#fffbeb',
      textColor: '#92400e',
      symbolColor: '#f59e0b',
    },
    danger: {
      borderColor: '#ef4444',
      bgColor: '#fef2f2',
      textColor: '#b91c1c',
      symbolColor: '#ef4444',
    },
  };

  const style = styles[result.riskLevel] || styles.warning;

  return (
    <div className="mt-8 border-l-4 p-6" style={{ borderLeftColor: style.borderColor, backgroundColor: style.bgColor }}>
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0" style={{ color: style.symbolColor }}>
          {result.emoji}
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-bold mb-2" style={{ color: style.textColor }}>
            {result.title}
          </h2>
          <p className="text-gray-700 text-sm mb-4">{result.explanation}</p>
          <div className="bg-white p-4 rounded border" style={{ borderColor: style.borderColor }}>
            <p className="text-xs font-semibold text-gray-900 uppercase mb-2">¿Qué hacer?</p>
            <p className="text-sm text-gray-700">{result.advice}</p>
          </div>
        </div>
      </div>
      {result.error && (
        <p className="text-xs text-red-600 mt-4 ml-16">Error: {result.error}</p>
      )}
    </div>
  );
}
