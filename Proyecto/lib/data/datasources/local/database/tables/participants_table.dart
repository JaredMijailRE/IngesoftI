import 'package:drift/drift.dart';
import 'users_table.dart';
import 'events_table.dart';

class ParticipantsTable extends Table {
  @override
  String get tableName => 'participants';

  IntColumn get id => integer().autoIncrement()();
  IntColumn get userId => integer().references(UsersTable, #id)();
  IntColumn get eventId => integer().references(EventsTable, #id)();
  TextColumn get status => text().withDefault(const Constant('pending'))();
  DateTimeColumn get registrationDate =>
      dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();
}
