export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 mb-4">
            creado por <strong className="text-gray-900">jorge lorenzo</strong>
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-500 mb-4">
            <a
              href="https://insidelife.club"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition"
            >
              insidelife.club
            </a>
            <span>•</span>
            <a
              href="mailto:jorge@insidelife.club"
              className="hover:text-gray-900 transition"
            >
              soporte
            </a>
            <span>•</span>
            <a
              href="#privacidad"
              className="hover:text-gray-900 transition"
            >
              privacidad
            </a>
            <span>•</span>
            <a
              href="#terminos"
              className="hover:text-gray-900 transition"
            >
              términos
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
