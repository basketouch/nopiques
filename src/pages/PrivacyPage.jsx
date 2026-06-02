import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="font-semibold text-gray-900 hover:text-gray-600 transition">
            ← Volver a NoPiques
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Privacidad</h1>
          <div className="w-32"></div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-12">
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Servicio</h3>
            <p>NoPiques.es proporciona un servicio gratuito de análisis de URLs y mensajes SMS para detectar posibles estafas y phishing usando Google Safe Browsing y análisis inteligente con IA.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Privacidad y Datos</h3>
            <p><strong>Tu información no se guarda.</strong> Las URLs, mensajes y datos que envíes se analizan una única vez y se eliminan inmediatamente después. No guardamos historiales, datos personales, cookies de rastreo ni compartimos datos con terceros.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Limitaciones</h3>
            <p>NoPiques es una herramienta de ayuda, no una garantía absoluta. Los resultados se basan en análisis heurísticos y pueden no ser 100% precisos. Un resultado "seguro" no garantiza que un enlace sea completamente seguro. Un resultado "peligroso" indica probable riesgo. Si tienes dudas, consulta directamente con la entidad (banco, gobierno, etc.) antes de compartir datos.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Responsabilidad del Usuario</h3>
            <p>Eres el único responsable de las decisiones que tomes basándote en nuestros resultados. NoPiques es una herramienta de apoyo, no protección total. Tu uso del servicio es bajo tu propio riesgo.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">5. Exención de Responsabilidad</h3>
            <p>Jorge Lorenzo no será responsable de pérdidas financieras, daños, errores de análisis, falsos positivos/negativos, interrupciones del servicio, o ciberataques no detectados. El servicio se proporciona "tal cual" sin garantías implícitas de precisión o disponibilidad.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">6. Propiedad Intelectual</h3>
            <p>NoPiques es propiedad intelectual de Jorge Lorenzo. Puedes usar el servicio libremente, pero no puedes copiar, modificar, distribuir el código, hacer scraping o usarlo como base para un servicio competidor.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">7. Legislación</h3>
            <p>Estos términos se rigen por la ley española. Cualquier disputa será resuelta en los tribunales españoles.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">8. Contacto</h3>
            <p>Si encuentras un error, tienes dudas sobre privacidad o sugerencias, contacta a <strong>jorge@insidelife.club</strong></p>
          </div>

          <div className="bg-gray-50 p-4 border border-gray-200 mt-8">
            <p className="text-xs text-gray-600">
              <strong>Resumen:</strong> NoPiques es gratis, no guarda datos, es una herramienta de ayuda (no garantía), usarla es bajo tu riesgo, y somos responsables solo bajo ley española. ¿Dudas? Escribe a jorge@insidelife.club
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition">
            ← Volver a NoPiques
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500">© 2026 NoPiques.es</p>
        </div>
      </footer>
    </div>
  )
}
