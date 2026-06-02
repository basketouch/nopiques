export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">NoPiques.es</h3>
            <p className="text-gray-400">
              Herramienta gratuita para detectar estafas y fraudes online.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Autor</h3>
            <p className="text-gray-400 mb-2">
              Desarrollado por <strong>Jorge Lorenzo</strong>
            </p>
            <a
              href="https://insidelife.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              📌 Visita insidelife.club
            </a>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Tecnología</h3>
            <p className="text-gray-400 text-sm">
              • React + Vite<br/>
              • Claude IA<br/>
              • Google Safe Browsing<br/>
              • Vercel
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>© 2026 NoPiques.es - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}
