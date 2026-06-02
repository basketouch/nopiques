export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <div>
            <p className="text-sm text-gray-600">
              Herramienta simple para verificar URLs y mensajes sospechosos.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">
              Desarrollado por <strong>Jorge Lorenzo</strong>
            </p>
            <a
              href="https://insidelife.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              insidelife.club
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-xs text-gray-500">© 2026 NoPiques.es</p>
        </div>
      </div>
    </footer>
  )
}
