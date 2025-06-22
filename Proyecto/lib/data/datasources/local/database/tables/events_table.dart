import 'package:drift/drift.dart';
import 'sports_table.dart';
import 'users_table.dart';

class EventsTable extends Table {
  @override
  String get tableName => 'events';

  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  TextColumn get description => text().nullable()();
  DateTimeColumn get startDate => dateTime()();
  DateTimeColumn get endDate => dateTime()();
  TextColumn get location => text()();
  IntColumn get maxParticipants => integer().nullable()();
  IntColumn get sportId => integer().references(SportsTable, #id)();
  IntColumn get organizerId => integer().references(UsersTable, #id)();
  BoolColumn get isActive => boolean().withDefault(const Constant(true))();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();
}
