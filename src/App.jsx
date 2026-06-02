import { AnalyzerForm } from './components/AnalyzerForm'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header minimalista */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              NoPiques
            </h1>
            <p className="text-gray-600 text-base">
              Verifica si esa URL o mensaje es legítimo
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
        {/* Form Section */}
        <div className="mb-16">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-4">
              ¿Qué quieres verificar?
            </label>
          </div>
          <AnalyzerForm />
        </div>

        {/* How it works */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 pt-12">
          <div>
            <div className="text-2xl font-bold text-green-600 mb-3">✓</div>
            <h3 className="font-semibold text-gray-900 mb-2">Seguro</h3>
            <p className="text-sm text-gray-600">
              El sitio ha sido verificado. Parece ser legítimo.
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600 mb-3">!</div>
            <h3 className="font-semibold text-gray-900 mb-2">Sospechoso</h3>
            <p className="text-sm text-gray-600">
              Hemos detectado señales de alerta. Revisa con cuidado antes de continuar.
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600 mb-3">✕</div>
            <h3 className="font-semibold text-gray-900 mb-2">Peligroso</h3>
            <p className="text-sm text-gray-600">
              Alto riesgo. Probablemente sea una estafa. No continúes.
            </p>
          </div>
        </section>

        {/* Privacy */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacidad</h2>
          <p className="text-gray-600 text-sm max-w-2xl">
            Tu información no se guarda. El análisis se realiza de forma segura y todos los datos se eliminan inmediatamente después. Nada se registra ni se comparte.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
