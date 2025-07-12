# USport - Vue 3 + Electron + Tailwind CSS

Una plataforma moderna de gestión deportiva construida con Vue 3, Electron y Tailwind CSS, siguiendo las mejores prácticas de desarrollo.

## 🚀 Características

- **Vue 3** con Composition API
- **Electron** para aplicación de escritorio multiplataforma
- **Tailwind CSS** para estilos modernos
- **Pinia** para gestión de estado
- **Vue Router** para navegación
- **Bun** para gestión rápida de paquetes
- **Vite** para compilaciones ultrarrápidas
- **ESLint & Prettier** para calidad de código
- **Auto-imports** para mejor experiencia de desarrollo
- **Iconify** para iconos atractivos

## 📦 Stack Tecnológico

- **Frontend**: Vue 3, Tailwind CSS, Pinia, Vue Router
- **Escritorio**: Electron
- **Herramienta de compilación**: Vite
- **Gestor de paquetes**: Bun
- **Calidad de código**: ESLint, Prettier
- **Iconos**: Iconify
- **Cliente HTTP**: Axios

## 🛠️ Configuración de Desarrollo

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Bun](https://bun.sh/) (recomendado) o npm

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd usport
   ```

2. **Instala las dependencias**
   ```bash
   bun install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp env.example .env
   ```

### Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo (solo Vue)
bun run dev

# Iniciar Electron en modo desarrollo
bun run electron:dev

# Compilar para producción
bun run build

# Compilar app de Electron
bun run electron:build

# Lint de código
bun run lint

# Formatear código
bun run format

# Previsualizar build de producción
bun run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes Vue reutilizables
│   ├── BaseButton.vue
│   ├── BaseCard.vue
│   └── HelloWorld.vue
├── composables/         # Composables de Vue
│   ├── useApi.js
│   └── useLocalStorage.js
├── layouts/            # Componentes de layout
├── router/             # Configuración de Vue Router
│   └── index.js
├── stores/             # Stores de Pinia
│   └── app.js
├── utils/              # Funciones utilitarias
├── views/              # Componentes de página
│   ├── Home.vue
│   ├── About.vue
│   └── NotFound.vue
├── App.vue             # Componente raíz
├── main.js             # Punto de entrada de la app
└── style.css           # Estilos globales

electron/
├── main.js             # Proceso principal de Electron
└── preload.js          # Script de preload de Electron
```

## 🎨 Estilos

Este proyecto utiliza **Tailwind CSS** con configuración personalizada:

- Paleta de colores personalizada (primario, secundario)
- Animaciones y transiciones personalizadas
- Utilidades de diseño responsivo
- Plugins de formularios y tipografía

### Clases Personalizadas

- `.btn` - Estilos base de botón
- `.btn-primary` - Variante primaria de botón
- `.btn-secondary` - Variante secundaria de botón
- `.card` - Estilos de componente tarjeta
- `.input` - Estilos de campos de entrada

## 🔧 Archivos de Configuración

- `vite.config.js` - Configuración de Vite con plugins
- `tailwind.config.js` - Configuración de Tailwind CSS
- `.eslintrc.cjs` - Reglas de ESLint
- `.prettierrc` - Reglas de formateo de Prettier
- `package.json` - Dependencias y scripts del proyecto

## 📱 Características de Electron

- Aplicación de escritorio multiplataforma
- Aislamiento de contexto seguro
- Script de preload para comunicación IPC segura
- Compilaciones de desarrollo y producción
- Preparado para auto-actualizaciones

## 🚀 Buenas Prácticas

### Organización del Código
- **Componentes**: Reutilizables, responsabilidad única
- **Composables**: Lógica reutilizable y extraída
- **Stores**: Gestión centralizada del estado
- **Views**: Componentes de página

### Flujo de Desarrollo
- **ESLint**: Calidad y consistencia de código
- **Prettier**: Formateo de código
- **Auto-imports**: Menos código repetitivo
- **Chequeo de tipos**: Seguridad en tiempo de ejecución

### Rendimiento
- **Carga perezosa**: División de código por rutas
- **Tree shaking**: Eliminación de código no usado
- **Builds optimizadas**: Paquetes listos para producción

## 🤝 Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Ejecuta linting y formateo
5. Envía un pull request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🆘 Soporte

Para soporte y preguntas, por favor abre un issue en el repositorio.
