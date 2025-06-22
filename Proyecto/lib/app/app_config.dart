class AppConfig {
  static const String appName = 'SportU';
  static const String appVersion = '1.0.0';
  static const String appDescription = 'Aplicación monolítica para gestión deportiva';
  
  // Configuración de la base de datos
  static const String databaseName = 'sportu_database.db';
  static const int databaseVersion = 1;
  
  // Configuración de la aplicación
  static const bool enableDebugMode = true;
  static const Duration animationDuration = Duration(milliseconds: 300);
  
  // Rutas de assets
  static const String imagesPath = 'assets/images/';
  static const String iconsPath = 'assets/icons/';
} 