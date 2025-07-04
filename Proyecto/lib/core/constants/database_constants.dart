class DatabaseConstants {
  // Nombres de tablas
  static const String usersTable = 'users';
  static const String sportsTable = 'sports';
  static const String eventsTable = 'events';
  static const String participantsTable = 'participants';
  static const String categoriesTable = 'categories';
  
  // Campos comunes
  static const String idField = 'id';
  static const String createdAtField = 'created_at';
  static const String updatedAtField = 'updated_at';
  static const String nameField = 'name';
  static const String descriptionField = 'description';
  static const String isActiveField = 'is_active';
  
  // Campos específicos de usuarios
  static const String emailField = 'email';
  static const String passwordField = 'password';
  static const String firstNameField = 'first_name';
  static const String lastNameField = 'last_name';
  static const String phoneField = 'phone';
  static const String avatarField = 'avatar';
  
  // Campos específicos de eventos
  static const String startDateField = 'start_date';
  static const String endDateField = 'end_date';
  static const String locationField = 'location';
  static const String maxParticipantsField = 'max_participants';
  static const String sportIdField = 'sport_id';
  static const String organizerIdField = 'organizer_id';
  
  // Campos específicos de participantes
  static const String userIdField = 'user_id';
  static const String eventIdField = 'event_id';
  static const String statusField = 'status';
  static const String registrationDateField = 'registration_date';
  
  // Estados
  static const String statusActive = 'active';
  static const String statusInactive = 'inactive';
  static const String statusPending = 'pending';
  static const String statusCancelled = 'cancelled';
} 