import 'package:drift/drift.dart';

class UsersTable extends Table {
  @override
  String get tableName => 'users';

  IntColumn get id => integer().autoIncrement()();
  TextColumn get email => text().unique()();
  TextColumn get password => text()();
  TextColumn get firstName => text()();
  TextColumn get lastName => text()();
  TextColumn get phone => text().nullable()();
  TextColumn get avatar => text().nullable()();
  BoolColumn get isActive => boolean().withDefault(const Constant(true))();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();
}
