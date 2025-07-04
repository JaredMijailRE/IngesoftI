class AppConstants {
  // Nombres de rutas
  static const String homeRoute = '/';
  static const String loginRoute = '/login';
  static const String registerRoute = '/register';
  static const String profileRoute = '/profile';
  static const String settingsRoute = '/settings';

  // Tamaños y dimensiones
  static const double defaultPadding = 16.0;
  static const double smallPadding = 8.0;
  static const double largePadding = 24.0;
  static const double borderRadius = 12.0;
  static const double buttonHeight = 48.0;

  // Tiempos
  static const Duration shortAnimation = Duration(milliseconds: 200);
  static const Duration mediumAnimation = Duration(milliseconds: 300);
  static const Duration longAnimation = Duration(milliseconds: 500);

  // Textos
  static const String appTitle = 'SportU';
  static const String welcomeMessage = 'Bienvenido a SportU';
  static const String errorMessage = 'Ha ocurrido un error';
  static const String successMessage = 'Operación exitosa';

  // Validaciones
  static const int minPasswordLength = 6;
  static const int maxNameLength = 50;
  static const int maxDescriptionLength = 500;
}
