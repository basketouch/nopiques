import { AnalyzerForm } from './components/AnalyzerForm'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6 text-6xl">🛡️</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            ¿Te están intentando engañar?
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-4">
            Detecta estafas, phishing y fraudes en segundos
          </p>
          <div className="flex gap-4 justify-center text-sm opacity-80">
            <span>✨ Análisis seguro</span>
            <span>•</span>
            <span>🚀 Instantáneo</span>
            <span>•</span>
            <span>🔒 Sin datos guardados</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-4xl mx-auto px-4 pb-12 w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-center text-gray-700 mb-8 text-lg">
            Pega aquí el enlace o mensaje y te ayudamos a comprobarlo
          </p>
          <AnalyzerForm />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h3 className="font-bold text-green-900 mb-2">✅ Seguro</h3>
            <p className="text-sm text-gray-700">
              URLs y mensajes legítimos son verificados contra bases de datos de seguridad.
            </p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-yellow-900 mb-2">⚠️ Sospechoso</h3>
            <p className="text-sm text-gray-700">
              Detectamos señales de posible fraude o phishing. Revisa antes de hacer clic.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
            <h3 className="font-bold text-red-900 mb-2">⛔ Peligroso</h3>
            <p className="text-sm text-gray-700">
              Alto riesgo de estafa detectado. No hagas clic ni compartas información.
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>🔒 Privacidad:</strong> No guardamos tu información. Todo se analiza de forma segura y se elimina inmediatamente después.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
