# USport - Vue 3 + Electron + Tailwind CSS

A modern sports management platform built with Vue 3, Electron, and Tailwind CSS, following the best development practices.

## 🚀 Features

- **Vue 3** with Composition API
- **Electron** for cross-platform desktop app
- **Tailwind CSS** for modern styling
- **Pinia** for state management
- **Vue Router** for navigation
- **Bun** for fast package management
- **Vite** for lightning-fast builds
- **ESLint & Prettier** for code quality
- **Auto-imports** for better DX
- **Iconify** for beautiful icons

## 📦 Tech Stack

- **Frontend**: Vue 3, Tailwind CSS, Pinia, Vue Router
- **Desktop**: Electron
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Code Quality**: ESLint, Prettier
- **Icons**: Iconify
- **HTTP Client**: Axios

## 🛠️ Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd usport
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```

### Development Commands

```bash
# Start development server (Vue only)
bun run dev

# Start Electron in development mode
bun run electron:dev

# Build for production
bun run build

# Build Electron app
bun run electron:build

# Lint code
bun run lint

# Format code
bun run format

# Preview production build
bun run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── BaseButton.vue
│   ├── BaseCard.vue
│   └── HelloWorld.vue
├── composables/         # Vue composables
│   ├── useApi.js
│   └── useLocalStorage.js
├── layouts/            # Layout components
├── router/             # Vue Router configuration
│   └── index.js
├── stores/             # Pinia stores
│   └── app.js
├── utils/              # Utility functions
├── views/              # Page components
│   ├── Home.vue
│   ├── About.vue
│   └── NotFound.vue
├── App.vue             # Root component
├── main.js             # App entry point
└── style.css           # Global styles

electron/
├── main.js             # Electron main process
└── preload.js          # Electron preload script
```

## 🎨 Styling

This project uses **Tailwind CSS** with custom configuration:

- Custom color palette (primary, secondary)
- Custom animations and transitions
- Responsive design utilities
- Form and typography plugins

### Custom Classes

- `.btn` - Base button styles
- `.btn-primary` - Primary button variant
- `.btn-secondary` - Secondary button variant
- `.card` - Card component styles
- `.input` - Input field styles

## 🔧 Configuration Files

- `vite.config.js` - Vite configuration with plugins
- `tailwind.config.js` - Tailwind CSS configuration
- `.eslintrc.cjs` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `package.json` - Project dependencies and scripts

## 📱 Electron Features

- Cross-platform desktop application
- Secure context isolation
- Preload script for safe IPC communication
- Development and production builds
- Auto-updater ready

## 🚀 Best Practices

### Code Organization
- **Components**: Reusable, single-responsibility
- **Composables**: Logic extraction and reusability
- **Stores**: Centralized state management
- **Views**: Page-level components

### Development Workflow
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Auto-imports**: Reduced boilerplate
- **Type checking**: Runtime safety

### Performance
- **Lazy loading**: Route-based code splitting
- **Tree shaking**: Unused code elimination
- **Optimized builds**: Production-ready bundles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
