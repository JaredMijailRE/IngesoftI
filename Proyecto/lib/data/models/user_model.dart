import '../../core/utils/helpers.dart';

class UserModel {
  final int? id;
  final String email;
  final String password;
  final String firstName;
  final String lastName;
  final String? phone;
  final String? avatar;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  UserModel({
    this.id,
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
    this.phone,
    this.avatar,
    this.isActive = true,
    DateTime? createdAt,
    DateTime? updatedAt,
  })  : createdAt = createdAt ?? DateTime.now(),
        updatedAt = updatedAt ?? DateTime.now();

  // Constructor desde la base de datos
  factory UserModel.fromDatabase(Map<String, dynamic> data) {
    return UserModel(
      id: data['id'] as int?,
      email: data['email'] as String,
      password: data['password'] as String,
      firstName: data['first_name'] as String,
      lastName: data['last_name'] as String,
      phone: data['phone'] as String?,
      avatar: data['avatar'] as String?,
      isActive: data['is_active'] == 1,
      createdAt: DateTime.parse(data['created_at'] as String),
      updatedAt: DateTime.parse(data['updated_at'] as String),
    );
  }

  // Convertir a Map para la base de datos
  Map<String, dynamic> toDatabase() {
    return {
      'id': id,
      'email': email,
      'password': password,
      'first_name': firstName,
      'last_name': lastName,
      'phone': phone,
      'avatar': avatar,
      'is_active': isActive ? 1 : 0,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  // Getters útiles
  String get fullName => '$firstName $lastName';
  String get initials => Helpers.getInitials(fullName);
  String get displayName => fullName.isNotEmpty ? fullName : email;

  // Métodos de copia
  UserModel copyWith({
    int? id,
    String? email,
    String? password,
    String? firstName,
    String? lastName,
    String? phone,
    String? avatar,
    bool? isActive,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      password: password ?? this.password,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      phone: phone ?? this.phone,
      avatar: avatar ?? this.avatar,
      isActive: isActive ?? this.isActive,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is UserModel && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'UserModel(id: $id, email: $email, fullName: $fullName)';
  }
} 