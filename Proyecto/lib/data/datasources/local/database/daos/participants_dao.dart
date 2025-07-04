import 'package:drift/drift.dart';
import '../app_database.dart';
import '../tables/participants_table.dart';
import '../tables/users_table.dart';
import '../tables/events_table.dart';

part 'participants_dao.g.dart';

@DriftAccessor(tables: [ParticipantsTable, UsersTable, EventsTable])
class ParticipantsDao extends DatabaseAccessor<AppDatabase>
    with _$ParticipantsDaoMixin {
  ParticipantsDao(super.db);

  Future<List<ParticipantsTableData>> getAllParticipants() =>
      select(participantsTable).get();

  Future<List<ParticipantsTableData>> getParticipantsByEvent(int eventId) =>
      (select(
        participantsTable,
      )..where((p) => p.eventId.equals(eventId))).get();

  Future<List<ParticipantsTableData>> getParticipantsByUser(int userId) =>
      (select(participantsTable)..where((p) => p.userId.equals(userId))).get();

  Future<List<ParticipantsTableData>> getParticipantsByStatus(String status) =>
      (select(participantsTable)..where((p) => p.status.equals(status))).get();

  Future<ParticipantsTableData?> getParticipantById(int id) => (select(
    participantsTable,
  )..where((p) => p.id.equals(id))).getSingleOrNull();

  Future<ParticipantsTableData?> getParticipantByUserAndEvent(
    int userId,
    int eventId,
  ) =>
      (select(participantsTable)
            ..where((p) => p.userId.equals(userId) & p.eventId.equals(eventId)))
          .getSingleOrNull();

  Future<bool> isUserParticipating(int userId, int eventId) async {
    final participant = await getParticipantByUserAndEvent(userId, eventId);
    return participant != null;
  }

  Future<int> insertParticipant(ParticipantsTableCompanion participant) =>
      into(participantsTable).insert(participant);

  Future<bool> updateParticipant(ParticipantsTableCompanion participant) =>
      update(participantsTable).replace(participant);

  Future<int> deleteParticipant(int id) =>
      (delete(participantsTable)..where((p) => p.id.equals(id))).go();

  Future<int> updateParticipantStatus(int id, String status) =>
      (update(participantsTable)..where((p) => p.id.equals(id))).write(
        ParticipantsTableCompanion(status: Value(status)),
      );

  // Consultas con joins
  Future<List<ParticipantWithUserAndEvent>> getParticipantsWithDetails() {
    final query = select(participantsTable).join([
      leftOuterJoin(
        usersTable,
        participantsTable.userId.equalsExp(usersTable.id),
      ),
      leftOuterJoin(
        eventsTable,
        participantsTable.eventId.equalsExp(eventsTable.id),
      ),
    ]);

    return query.map((row) {
      return ParticipantWithUserAndEvent(
        participant: row.readTable(participantsTable),
        user: row.readTableOrNull(usersTable),
        event: row.readTableOrNull(eventsTable),
      );
    }).get();
  }

  Future<List<ParticipantWithUserAndEvent>> getParticipantsByEventWithDetails(
    int eventId,
  ) {
    final query = select(participantsTable).join([
      leftOuterJoin(
        usersTable,
        participantsTable.userId.equalsExp(usersTable.id),
      ),
      leftOuterJoin(
        eventsTable,
        participantsTable.eventId.equalsExp(eventsTable.id),
      ),
    ])..where(participantsTable.eventId.equals(eventId));

    return query.map((row) {
      return ParticipantWithUserAndEvent(
        participant: row.readTable(participantsTable),
        user: row.readTableOrNull(usersTable),
        event: row.readTableOrNull(eventsTable),
      );
    }).get();
  }
}

class ParticipantWithUserAndEvent {
  final ParticipantsTableData participant;
  final UsersTableData? user;
  final EventsTableData? event;

  ParticipantWithUserAndEvent({
    required this.participant,
    this.user,
    this.event,
  });
}
