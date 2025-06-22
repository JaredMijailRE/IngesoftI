import 'package:drift/drift.dart';
import '../app_database.dart';
import '../tables/events_table.dart';
import '../tables/sports_table.dart';
import '../tables/users_table.dart';

part 'events_dao.g.dart';

@DriftAccessor(tables: [EventsTable, SportsTable, UsersTable])
class EventsDao extends DatabaseAccessor<AppDatabase> with _$EventsDaoMixin {
  EventsDao(super.db);

  Future<List<EventsTableData>> getAllEvents() => select(eventsTable).get();

  Future<List<EventsTableData>> getActiveEvents() =>
      (select(eventsTable)..where((e) => e.isActive.equals(true))).get();

  Future<List<EventsTableData>> getEventsBySport(int sportId) =>
      (select(eventsTable)..where((e) => e.sportId.equals(sportId))).get();

  Future<List<EventsTableData>> getEventsByOrganizer(int organizerId) =>
      (select(
        eventsTable,
      )..where((e) => e.organizerId.equals(organizerId))).get();

  Future<List<EventsTableData>> getUpcomingEvents() =>
      (select(eventsTable)
            ..where((e) => e.startDate.isBiggerThanValue(DateTime.now()))
            ..orderBy([(e) => OrderingTerm.asc(e.startDate)]))
          .get();

  Future<EventsTableData?> getEventById(int id) =>
      (select(eventsTable)..where((e) => e.id.equals(id))).getSingleOrNull();

  Future<int> insertEvent(EventsTableCompanion event) =>
      into(eventsTable).insert(event);

  Future<bool> updateEvent(EventsTableCompanion event) =>
      update(eventsTable).replace(event);

  Future<int> deleteEvent(int id) =>
      (delete(eventsTable)..where((e) => e.id.equals(id))).go();

  Future<int> deactivateEvent(int id) =>
      (update(eventsTable)..where((e) => e.id.equals(id))).write(
        const EventsTableCompanion(isActive: Value(false)),
      );

  // Consultas con joins
  Future<List<EventWithSportAndOrganizer>> getEventsWithDetails() {
    final query = select(eventsTable).join([
      leftOuterJoin(sportsTable, eventsTable.sportId.equalsExp(sportsTable.id)),
      leftOuterJoin(
        usersTable,
        eventsTable.organizerId.equalsExp(usersTable.id),
      ),
    ]);

    return query.map((row) {
      return EventWithSportAndOrganizer(
        event: row.readTable(eventsTable),
        sport: row.readTableOrNull(sportsTable),
        organizer: row.readTableOrNull(usersTable),
      );
    }).get();
  }
}

class EventWithSportAndOrganizer {
  final EventsTableData event;
  final SportsTableData? sport;
  final UsersTableData? organizer;

  EventWithSportAndOrganizer({required this.event, this.sport, this.organizer});
}
