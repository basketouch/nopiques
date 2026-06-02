import { useState } from 'react'
import { AnalyzerForm } from './components/AnalyzerForm'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  const [verifications, setVerifications] = useState(0)
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqItems = [
    {
      question: '¿Es gratis?',
      answer: 'Sí, completamente gratis. NoPiques es una herramienta pública para ayudar a detectar estafas sin coste alguno.'
    },
    {
      question: '¿Guarda mi información?',
      answer: 'No. Tu información se elimina inmediatamente después del análisis. No guardamos historiales, datos personales ni enlaces que verificas.'
    },
    {
      question: '¿Por qué debería confiar en NoPiques?',
      answer: 'Usamos Google Safe Browsing (la misma tecnología que usa Google Chrome) más análisis inteligente. Está creado por una persona real (Jorge Lorenzo) que quiere ayudar, no una empresa que vende datos.'
    },
    {
      question: '¿Qué pasa si me equivoco?',
      answer: 'Si ves un error, puedes contactar a jorge@insidelife.club. Aunque en la mayoría de casos, si NoPiques dice que es peligroso, es mejor no hacer clic.'
    },
    {
      question: '¿Funciona en todos los dispositivos?',
      answer: 'Sí. NoPiques funciona en cualquier dispositivo con navegador: teléfono, tablet, computadora. No necesita instalar nada.'
    }
  ]

  const handleVerification = () => {
    setVerifications(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
        {/* Form Section */}
        <div id="verificador" className="mb-12 scroll-mt-20">
          <label className="block text-sm font-medium text-gray-900 mb-4">
            ¿Qué quieres verificar?
          </label>
          <AnalyzerForm onVerification={handleVerification} />
        </div>

        {/* Privacy Notice - Minimal */}
        <div className="text-xs text-gray-500 mb-16 p-3 bg-gray-50 border border-gray-100">
          <strong>Privacidad:</strong> Tu información no se guarda. Se elimina inmediatamente después del análisis.
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 bg-gray-50 p-6 border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900">{verifications}</p>
            <p className="text-xs text-gray-500 mt-1">verificaciones realizadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900">&lt; 2s</p>
            <p className="text-xs text-gray-500 mt-1">tiempo promedio de análisis</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900">100%</p>
            <p className="text-xs text-gray-500 mt-1">privacidad garantizada</p>
          </div>
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
        <section id="consejos" className="border-t border-gray-200 pt-12 scroll-mt-20 -mx-6 px-6 py-12 bg-gray-50">
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

        {/* About Section */}
        <section id="sobre" className="border-t border-gray-200 pt-12 scroll-mt-20 mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sobre NoPiques</h2>

          {/* Jorge's Profile - New Layout */}
          <div className="flex gap-6 mb-8 items-start">
            {/* Photo & Caption - 20% width */}
            <div className="w-1/5 flex-shrink-0">
              <img src="/jorge.jpg" alt="Jorge Lorenzo" className="w-full rounded-lg object-cover shadow-md border border-gray-200 mb-3" />
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Jorge Lorenzo</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">Creador de NoPiques</p>
                <p className="text-xs text-gray-500 leading-tight">
                  7 años entrenador asistente<br/>
                  Selección de Baloncesto<br/>
                  <span className="font-medium text-gray-600">🏆 2 Medallas de Oro</span>
                </p>
              </div>
            </div>

            {/* Text - 80% width */}
            <div className="w-4/5 space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              Me llamo <strong>Jorge Lorenzo</strong>. Creé NoPiques porque un día recibí un mensaje sospechoso que parecía ser de la AEAT (Agencia Tributaria). El enlace era idéntico al real, el mensaje era convincente, y francamente, me asustó. No sabía si era verdad o una estafa. Fue entonces cuando me di cuenta de un problema: <strong>la mayoría de las personas no técnicas no tienen forma rápida y fácil de verificar si un mensaje es real o falso</strong>.
            </p>

            <p>
              Decidí crear NoPiques para resolver esto. No quería una herramienta complicada o llena de tecnicismos. Quería algo simple, directo y que funcionara en menos de 10 segundos. <strong>Algo que tu abuela pudiera usar sin problemas</strong>.
            </p>

            <p>
              Técnicamente, NoPiques usa <strong>Google Safe Browsing</strong> (la misma tecnología que usa Google Chrome para detectar phishing) más <strong>análisis inteligente con IA</strong> que lee el contexto del mensaje y busca señales de alerta típicas de estafas. Si dos sistemas dicen que algo es peligroso, probablemente lo sea.
            </p>

            <p>
              Tu privacidad es sagrada. NoPiques <strong>no guarda nada</strong>. Tu URL, tu mensaje, tu información personal: todo se analiza y se borra inmediatamente. Puedes usar esto sin miedo a que tu información se venda o se use contra ti.
            </p>

            <p className="text-xs text-gray-500 pt-2">
              Si recibiste un mensaje sospechoso, cópialo aquí y verifícalo. Si dice que es peligroso, probablemente lo sea. Si dice que es seguro, probablemente puedas confiar. No es ciencia exacta, pero es mucho mejor que no verificar nada.
            </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="border-t border-gray-200 pt-12 scroll-mt-20 mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Preguntas frecuentes</h2>

          <div className="space-y-2 border border-gray-200">
            {faqItems.map((item, index) => (
              <div key={index} className={index > 0 ? 'border-t border-gray-200' : ''}>
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between transition-colors"
                >
                  <span>{item.question}</span>
                  <span className={`text-lg font-bold transition-transform ${openFAQ === index ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFAQ === index && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
