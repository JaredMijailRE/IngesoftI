import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../core/constants/app_constants.dart';
import '../presentation/providers/app_provider.dart';
import '../presentation/pages/home_page.dart';
import '../presentation/pages/login_page.dart';
import '../presentation/pages/register_page.dart';
import '../presentation/pages/profile_page.dart';
import '../presentation/pages/settings_page.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: AppConstants.homeRoute,
    redirect: (context, state) {
      final appProvider = Provider.of<AppProvider>(context, listen: false);

      // Si no está logueado y no está en login o register, redirigir a login
      if (!appProvider.isLoggedIn &&
          state.uri.path != AppConstants.loginRoute &&
          state.uri.path != AppConstants.registerRoute) {
        return AppConstants.loginRoute;
      }

      // Si está logueado y está en login o register, redirigir a home
      if (appProvider.isLoggedIn &&
          (state.uri.path == AppConstants.loginRoute ||
              state.uri.path == AppConstants.registerRoute)) {
        return AppConstants.homeRoute;
      }

      return null;
    },
    routes: [
      GoRoute(
        path: AppConstants.homeRoute,
        name: 'home',
        builder: (context, state) => const HomePage(),
      ),
      GoRoute(
        path: AppConstants.loginRoute,
        name: 'login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: AppConstants.registerRoute,
        name: 'register',
        builder: (context, state) => const RegisterPage(),
      ),
      GoRoute(
        path: AppConstants.profileRoute,
        name: 'profile',
        builder: (context, state) => const ProfilePage(),
      ),
      GoRoute(
        path: AppConstants.settingsRoute,
        name: 'settings',
        builder: (context, state) => const SettingsPage(),
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      appBar: AppBar(title: const Text('Error')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text(
              'Página no encontrada: ${state.uri.path}',
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => context.go(AppConstants.homeRoute),
              child: const Text('Ir al inicio'),
            ),
          ],
        ),
      ),
    ),
  );
}
