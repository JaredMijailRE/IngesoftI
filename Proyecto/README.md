# SportU - Aplicación Monolítica

Una aplicación Flutter monolítica para la gestión de eventos deportivos, desarrollada con Drift para el manejo de base de datos local.

## 🏗️ Estructura del Proyecto

```
lib/
├── main.dart                 # Punto de entrada de la aplicación
├── app/                      # Configuración principal de la app
│   ├── app.dart             # Widget principal de la aplicación
│   └── app_config.dart      # Configuraciones globales
├── core/                     # Funcionalidades core
│   ├── constants/           # Constantes de la aplicación
│   ├── theme/               # Temas y estilos
│   ├── utils/               # Utilidades y helpers
│   └── widgets/             # Widgets comunes reutilizables
├── data/                     # Capa de datos
│   ├── models/              # Modelos de datos
│   ├── repositories/        # Repositorios (interfaces)
│   └── datasources/         # Fuentes de datos
│       └── local/           # Datos locales
│           ├── database/    # Base de datos Drift
│           │   ├── tables/  # Definición de tablas
│           │   ├── daos/    # Data Access Objects
│           │   └── app_database.dart
│           └── preferences/ # Preferencias locales
├── domain/                   # Lógica de negocio
│   ├── entities/            # Entidades del dominio
│   ├── repositories/        # Interfaces de repositorios
│   └── usecases/            # Casos de uso
├── presentation/             # Capa de presentación
│   ├── pages/               # Páginas de la aplicación
│   ├── widgets/             # Widgets específicos
│   └── providers/           # Providers/State Management
└── routes/                   # Configuración de rutas
    └── app_router.dart
```

## 🚀 Características

- **Arquitectura Monolítica**: Aplicación autocontenida sin APIs externas
- **Base de Datos Local**: Drift (SQLite) para persistencia de datos
- **State Management**: Provider para gestión de estado
- **Navegación**: Go Router para navegación declarativa
- **Tema Adaptativo**: Soporte para modo claro y oscuro
- **Validaciones**: Sistema robusto de validación de formularios
- **Widgets Reutilizables**: Componentes comunes para consistencia UI

## 📱 Funcionalidades Principales

- **Gestión de Usuarios**: Registro, login y perfiles
- **Gestión de Deportes**: CRUD de deportes disponibles
- **Gestión de Eventos**: Creación y gestión de eventos deportivos
- **Gestión de Participantes**: Inscripción y seguimiento de participantes
- **Estadísticas**: Reportes y métricas de eventos

## 🛠️ Tecnologías Utilizadas

- **Flutter**: Framework de desarrollo
- **Drift**: ORM para SQLite
- **Provider**: State management
- **Go Router**: Navegación
- **Intl**: Internacionalización
- **Path Provider**: Gestión de rutas de archivos

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd Proyecto
   ```

2. **Instalar dependencias**
   ```bash
   flutter pub get
   ```

3. **Generar código de Drift**
   ```bash
   flutter packages pub run build_runner build
   ```

4. **Ejecutar la aplicación**
   ```bash
   flutter run
   ```

## 🗄️ Base de Datos

La aplicación utiliza Drift (anteriormente Moor) como ORM para SQLite. Las tablas principales incluyen:

- **Users**: Información de usuarios
- **Sports**: Deportes disponibles
- **Events**: Eventos deportivos
- **Participants**: Participantes en eventos

### Generación de Código

Después de modificar las tablas o DAOs, ejecuta:
```bash
flutter packages pub run build_runner build --delete-conflicting-outputs
```

## 🎨 Temas y Estilos

La aplicación incluye:
- **Tema Claro**: Colores vibrantes y legibles
- **Tema Oscuro**: Colores suaves para uso nocturno
- **Adaptación Automática**: Cambio automático según configuración del sistema

## 📁 Organización de Código

### Convenciones de Nomenclatura

- **Archivos**: `snake_case.dart`
- **Clases**: `PascalCase`
- **Variables**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`

### Patrones de Diseño

- **Repository Pattern**: Para acceso a datos
- **Provider Pattern**: Para gestión de estado
- **Factory Pattern**: Para creación de objetos
- **Builder Pattern**: Para construcción de widgets complejos

## 🔧 Configuración

### Variables de Entorno

Las configuraciones principales se encuentran en `lib/app/app_config.dart`:

- Nombre de la aplicación
- Versión de la base de datos
- Rutas de assets
- Configuraciones de animación

### Constantes

Las constantes de la aplicación están organizadas en:
- `lib/core/constants/app_constants.dart`: Constantes generales
- `lib/core/constants/database_constants.dart`: Constantes de base de datos

## 🧪 Testing

Para ejecutar las pruebas:
```bash
flutter test
```

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🤝 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para la gestión deportiva**
