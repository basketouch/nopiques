export function Header() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-gray-200">
      {/* Navigation Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="font-semibold text-gray-900">NoPiques</div>
          <nav className="flex gap-6">
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
            <a
              href="https://insidelife.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Autor
            </a>
          </nav>
        </div>
      </div>

      {/* Header Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Detecta estafas en segundos
        </h1>
        <div className="max-w-2xl">
          <p className="text-gray-600 text-base mb-3">
            Pega una URL o mensaje sospechoso y verifica si es legítimo o probablemente una estafa.
          </p>
          <p className="text-sm text-gray-500">
            Usado por personas que reciben mensajes en WhatsApp, email, SMS o redes sociales y quieren verificar antes de hacer clic o compartir datos.
          </p>
        </div>
      </div>
    </header>
  );
}
