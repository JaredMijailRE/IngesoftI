import 'package:drift/drift.dart';
import '../app_database.dart';
import '../tables/users_table.dart';

part 'users_dao.g.dart';

@DriftAccessor(tables: [UsersTable])
class UsersDao extends DatabaseAccessor<AppDatabase> with _$UsersDaoMixin {
  UsersDao(super.db);

  Future<List<UsersTableData>> getAllUsers() => select(usersTable).get();

  Future<List<UsersTableData>> getActiveUsers() =>
      (select(usersTable)..where((u) => u.isActive.equals(true))).get();

  Future<UsersTableData?> getUserById(int id) =>
      (select(usersTable)..where((u) => u.id.equals(id))).getSingleOrNull();

  Future<UsersTableData?> getUserByEmail(String email) => (select(
    usersTable,
  )..where((u) => u.email.equals(email))).getSingleOrNull();

  Future<bool> userExists(String email) async {
    final user = await getUserByEmail(email);
    return user != null;
  }

  Future<int> insertUser(UsersTableCompanion user) =>
      into(usersTable).insert(user);

  Future<bool> updateUser(UsersTableCompanion user) =>
      update(usersTable).replace(user);

  Future<int> deleteUser(int id) =>
      (delete(usersTable)..where((u) => u.id.equals(id))).go();

  Future<int> deactivateUser(int id) =>
      (update(usersTable)..where((u) => u.id.equals(id))).write(
        const UsersTableCompanion(isActive: Value(false)),
      );
}
