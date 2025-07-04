import 'package:flutter/material.dart';
import '../../data/models/user_model.dart';

class AppProvider extends ChangeNotifier {
  UserModel? _currentUser;
  bool _isLoading = false;
  String? _error;

  // Getters
  UserModel? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isLoggedIn => _currentUser != null;

  // Setters
  void setCurrentUser(UserModel? user) {
    _currentUser = user;
    notifyListeners();
  }

  void setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void setError(String? error) {
    _error = error;
    notifyListeners();
  }

  // Métodos de autenticación
  Future<bool> login(String email, String password) async {
    setLoading(true);
    setError(null);

    try {
      // Aquí se implementaría la lógica de login
      // Por ahora es un placeholder
      await Future.delayed(const Duration(seconds: 1));

      // Simular login exitoso
      _currentUser = UserModel(
        id: 1,
        email: email,
        password: password,
        firstName: 'Usuario',
        lastName: 'Demo',
      );

      setLoading(false);
      return true;
    } catch (e) {
      setError('Error al iniciar sesión: $e');
      setLoading(false);
      return false;
    }
  }

  Future<void> logout() async {
    setLoading(true);

    try {
      // Aquí se implementaría la lógica de logout
      await Future.delayed(const Duration(milliseconds: 500));

      _currentUser = null;
      setLoading(false);
    } catch (e) {
      setError('Error al cerrar sesión: $e');
      setLoading(false);
    }
  }

  Future<bool> register(UserModel user) async {
    setLoading(true);
    setError(null);

    try {
      // Aquí se implementaría la lógica de registro
      await Future.delayed(const Duration(seconds: 1));

      // Simular registro exitoso
      _currentUser = user.copyWith(id: 1);

      setLoading(false);
      return true;
    } catch (e) {
      setError('Error al registrar usuario: $e');
      setLoading(false);
      return false;
    }
  }

  // Métodos de utilidad
  void clearError() {
    setError(null);
  }

  void updateUserProfile(UserModel updatedUser) {
    _currentUser = updatedUser;
    notifyListeners();
  }
}
