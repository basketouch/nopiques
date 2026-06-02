import { AnalyzerForm } from './components/AnalyzerForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ¿Te están intentando engañar?
          </h1>
          <p className="text-xl text-gray-600">
            Pega aquí el enlace o mensaje y te ayudamos a comprobarlo.
          </p>
        </div>

        <AnalyzerForm />

        <div className="mt-16 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>🔒 Privacidad:</strong> No guardamos tu información. Todo se analiza de forma segura.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
