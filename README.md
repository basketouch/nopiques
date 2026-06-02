# NoPiques.es - Detector de Estafas

Plataforma simple y accesible para verificar si una URL o mensaje es potencialmente una estafa.

## Configuración Rápida

### 1. Variables de Entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Necesitas:

- **Google Safe Browsing API Key** (gratis)
  - Ve a [Google Cloud Console](https://console.cloud.google.com/)
  - Habilita "Safe Browsing API"
  - Crea una API key

- **Anthropic API Key**
  - Ve a [platform.anthropic.com](https://platform.anthropic.com)
  - Obtén tu API key

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

### 4. Build para Producción

```bash
npm run build
npm run preview
```

## Despliegue en Vercel

1. Conecta tu repo a Vercel
2. Añade las variables de entorno en Vercel
3. Deploy automático

## Estructura del Proyecto

```
.
├── api/                    # Endpoints de Vercel
│   ├── check-safety.js    # Analizar URLs
│   └── analyze-text.js    # Analizar mensajes
├── src/
│   ├── components/        # Componentes React
│   ├── services/          # Servicios de API
│   ├── App.jsx
│   └── index.css
├── public/               # Assets estáticos
└── vercel.json          # Configuración Vercel
```

## APIs Utilizadas

- **Google Safe Browsing** - Detectar phishing y malware
- **Claude Haiku** - Análisis contextual y explicaciones
- **WHOIS** - Info del dominio (futuro)

## Coste Estimado

- Hosting: $0 (Vercel gratuito)
- APIs: $5-10/mes (Claude Haiku)

## Próximas Funcionalidades

- [ ] Subir capturas
- [ ] OCR automático
- [ ] Análisis de PDFs
- [ ] Extensión Chrome
- [ ] App móvil
