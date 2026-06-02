import { AnalyzerForm } from './components/AnalyzerForm'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            NoPiques
          </h1>
          <div className="max-w-2xl">
            <p className="text-gray-600 text-base mb-4">
              Detecta si un enlace o mensaje es legítimo o probablemente una estafa. Pega la URL o el texto y te diremos si es seguro hacer clic.
            </p>
            <p className="text-sm text-gray-500">
              Usado por personas que reciben mensajes sospechosos de WhatsApp, email, SMS o redes sociales. Ideal para verificar antes de compartir datos o hacer clic.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-3 gap-12">
          {/* Left column - Form */}
          <div className="col-span-2">
            {/* Form Section */}
            <div className="mb-12">
              <label className="block text-sm font-semibold text-gray-900 mb-6">
                ¿Qué quieres verificar?
              </label>
              <AnalyzerForm />
            </div>

            {/* Privacy Banner */}
            <div className="p-6 bg-gray-50 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Análisis privado y seguro</h3>
              <p className="text-sm text-gray-600">
                Tu información no se guarda. El análisis se realiza de forma segura y todos los datos se eliminan inmediatamente después. Nada se registra ni se comparte.
              </p>
            </div>
          </div>

          {/* Right column - Guide */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resultados</h3>

            <div className="space-y-6">
              <div>
                <div className="text-xl font-bold text-green-600 mb-2">✓</div>
                <h4 className="font-semibold text-gray-900 mb-1">Seguro</h4>
                <p className="text-xs text-gray-600">
                  El sitio ha sido verificado. Parece legítimo.
                </p>
              </div>

              <div>
                <div className="text-xl font-bold text-yellow-600 mb-2">!</div>
                <h4 className="font-semibold text-gray-900 mb-1">Sospechoso</h4>
                <p className="text-xs text-gray-600">
                  Señales de alerta detectadas. Revisa con cuidado.
                </p>
              </div>

              <div>
                <div className="text-xl font-bold text-red-600 mb-2">✕</div>
                <h4 className="font-semibold text-gray-900 mb-1">Peligroso</h4>
                <p className="text-xs text-gray-600">
                  Alto riesgo. Probablemente sea una estafa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">Consejos para evitar estafas</h2>

          <div className="max-w-4xl">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">URLs sospechosas</h3>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• Observa bien la URL antes de hacer clic</li>
                  <li>• Los estafadores usan dominios parecidos (paypa1.com en lugar de paypal.com)</li>
                  <li>• Si dice "¡Verifica tu cuenta!" probablemente sea falso</li>
                  <li>• Los bancos nunca piden datos por enlace</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Mensajes sospechosos</h3>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• Urgencia ("Haz clic YA") = señal de alerta</li>
                  <li>• Desconfía de premios no solicitados</li>
                  <li>• No compartas contraseñas, pins o códigos</li>
                  <li>• Llama a tu banco si tienes dudas</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Señales de alerta</h3>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• Faltas de ortografía o emails mal escritos</li>
                  <li>• Piden dinero antes de usar el servicio</li>
                  <li>• Remitente es desconocido</li>
                  <li>• Presión para actuar rápido</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Si crees que es estafa</h3>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• No hagas clic ni descargues nada</li>
                  <li>• Denuncia como spam</li>
                  <li>• Si ya hiciste clic, cambia contraseñas</li>
                  <li>• Contacta tu banco si compartiste datos</li>
                </ul>
              </div>
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
