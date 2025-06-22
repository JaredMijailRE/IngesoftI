import 'package:flutter/material.dart';

class AppColorScheme {
  // Colores principales
  static const Color primaryColor = Color(0xFF2196F3);
  static const Color secondaryColor = Color(0xFF4CAF50);
  static const Color accentColor = Color(0xFFFF9800);

  // Colores de estado
  static const Color successColor = Color(0xFF4CAF50);
  static const Color errorColor = Color(0xFFF44336);
  static const Color warningColor = Color(0xFFFF9800);
  static const Color infoColor = Color(0xFF2196F3);

  // Colores de fondo
  static const Color backgroundColor = Color(0xFFF5F5F5);
  static const Color surfaceColor = Color(0xFFFFFFFF);
  static const Color cardColor = Color(0xFFFFFFFF);

  // Colores de texto
  static const Color textPrimaryColor = Color(0xFF212121);
  static const Color textSecondaryColor = Color(0xFF757575);
  static const Color textHintColor = Color(0xFFBDBDBD);

  // Esquema de colores claro
  static const ColorScheme lightColorScheme = ColorScheme(
    brightness: Brightness.light,
    primary: primaryColor,
    onPrimary: Colors.white,
    secondary: secondaryColor,
    onSecondary: Colors.white,
    tertiary: accentColor,
    onTertiary: Colors.white,
    error: errorColor,
    onError: Colors.white,
    surface: surfaceColor,
    onSurface: textPrimaryColor,
    surfaceContainerHighest: Color(0xFFE0E0E0),
    onSurfaceVariant: textSecondaryColor,
    outline: Color(0xFFBDBDBD),
    outlineVariant: Color(0xFFE0E0E0),
    shadow: Color(0xFF000000),
    scrim: Color(0xFF000000),
    inverseSurface: Color(0xFF212121),
    onInverseSurface: Colors.white,
    inversePrimary: Color(0xFF90CAF9),
    surfaceTint: primaryColor,
  );

  // Esquema de colores oscuro
  static const ColorScheme darkColorScheme = ColorScheme(
    brightness: Brightness.dark,
    primary: Color(0xFF90CAF9),
    onPrimary: Color(0xFF0D47A1),
    secondary: Color(0xFF81C784),
    onSecondary: Color(0xFF1B5E20),
    tertiary: Color(0xFFFFB74D),
    onTertiary: Color(0xFFE65100),
    error: Color(0xFFEF5350),
    onError: Color(0xFFB71C1C),
    surface: Color(0xFF1E1E1E),
    onSurface: Colors.white,
    surfaceContainerHighest: Color(0xFF424242),
    onSurfaceVariant: Color(0xFFBDBDBD),
    outline: Color(0xFF757575),
    outlineVariant: Color(0xFF424242),
    shadow: Color(0xFF000000),
    scrim: Color(0xFF000000),
    inverseSurface: Colors.white,
    onInverseSurface: Color(0xFF212121),
    inversePrimary: Color(0xFF1976D2),
    surfaceTint: Color(0xFF90CAF9),
  );
}
