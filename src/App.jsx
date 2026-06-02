import { AnalyzerForm } from './components/AnalyzerForm'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            NoPiques
          </h1>
          <p className="text-gray-600 text-base mb-4 max-w-2xl">
            Detecta si un enlace o mensaje es legítimo o probablemente una estafa. Pega la URL o el texto y te diremos si es seguro hacer clic.
          </p>
          <p className="text-sm text-gray-500">
            Usado por personas que reciben mensajes sospechosos de WhatsApp, email, SMS o redes sociales. Ideal para verificar antes de compartir datos o hacer clic.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
        {/* Form Section */}
        <div className="mb-12">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-4">
              ¿Qué quieres verificar?
            </label>
          </div>
          <AnalyzerForm />
        </div>

        {/* Privacy Banner - Prominent */}
        <div className="mb-16 p-6 bg-gray-50 border border-gray-200 rounded">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Análisis privado y seguro</h3>
          <p className="text-sm text-gray-600">
            Tu información no se guarda. El análisis se realiza de forma segura y todos los datos se eliminan inmediatamente después. Nada se registra ni se comparte.
          </p>
        </div>

        {/* How it works */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 pt-12 mb-16">
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

        {/* Tips Section */}
        <section className="border-t border-gray-200 pt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">Consejos para evitar estafas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">URLs sospechosas</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Observa bien la URL antes de hacer clic</li>
                <li>• Los estafadores usan dominios parecidos (ej: "paypa1.com" en lugar de "paypal.com")</li>
                <li>• Si dice "¡Verifica tu cuenta!" probablemente sea falso</li>
                <li>• Los bancos nunca piden datos por enlace</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Mensajes sospechosos</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Los mensajes de urgencia ("Haz clic YA") son señal de alerta</li>
                <li>• Desconfía de premios que nunca pediste</li>
                <li>• No compartas contraseñas, pins o códigos</li>
                <li>• Llama directamente a tu banco si tienes dudas</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Señales de alerta</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Faltas de ortografía o emails mal escritos</li>
                <li>• Te piden dinero o datos antes de usar el servicio</li>
                <li>• El remitente es desconocido</li>
                <li>• Presión para actuar rápido sin pensar</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Si crees que es estafa</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• No hagas clic ni descargues nada</li>
                <li>• Denuncia el correo/SMS como spam</li>
                <li>• Si ya hiciste clic, cambia tus contraseñas</li>
                <li>• Contacta a tu banco si compartiste datos</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
