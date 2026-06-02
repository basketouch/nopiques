import { useState } from 'react'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="border-b border-gray-200">
      {/* Navigation Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="font-semibold text-gray-900">NoPiques</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection('verificador')}
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Verificador
            </button>
            <button
              onClick={() => scrollToSection('consejos')}
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Consejos
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              FAQ
            </button>
            <a
              href="https://insidelife.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Autor
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-6 py-3 space-y-2">
              <button
                onClick={() => scrollToSection('verificador')}
                className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2 transition"
              >
                Verificador
              </button>
              <button
                onClick={() => scrollToSection('consejos')}
                className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2 transition"
              >
                Consejos
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2 transition"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2 transition"
              >
                FAQ
              </button>
              <a
                href="https://insidelife.club"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-600 hover:text-gray-900 py-2 transition"
              >
                Autor
              </a>
            </div>
          </nav>
        )}
      </div>

      {/* Header Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Detecta estafas en segundos
        </h1>
        <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed mb-6">
          Verifica enlaces y mensajes sospechosos al instante. Usa tecnología de Google y análisis inteligente. Funciona en cualquier dispositivo. Gratis y 100% privado.
        </p>
        <p className="text-xs text-gray-400">
          Creado por Jorge Lorenzo
        </p>
      </div>
    </header>
  );
}
