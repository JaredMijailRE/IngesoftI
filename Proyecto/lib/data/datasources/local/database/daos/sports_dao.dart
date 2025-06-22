import 'package:drift/drift.dart';
import '../app_database.dart';
import '../tables/sports_table.dart';

part 'sports_dao.g.dart';

@DriftAccessor(tables: [SportsTable])
class SportsDao extends DatabaseAccessor<AppDatabase> with _$SportsDaoMixin {
  SportsDao(super.db);

  Future<List<SportsTableData>> getAllSports() => select(sportsTable).get();

  Future<List<SportsTableData>> getActiveSports() =>
      (select(sportsTable)..where((s) => s.isActive.equals(true))).get();

  Future<SportsTableData?> getSportById(int id) =>
      (select(sportsTable)..where((s) => s.id.equals(id))).getSingleOrNull();

  Future<SportsTableData?> getSportByName(String name) => (select(
    sportsTable,
  )..where((s) => s.name.equals(name))).getSingleOrNull();

  Future<int> insertSport(SportsTableCompanion sport) =>
      into(sportsTable).insert(sport);

  Future<bool> updateSport(SportsTableCompanion sport) =>
      update(sportsTable).replace(sport);

  Future<int> deleteSport(int id) =>
      (delete(sportsTable)..where((s) => s.id.equals(id))).go();

  Future<int> deactivateSport(int id) =>
      (update(sportsTable)..where((s) => s.id.equals(id))).write(
        const SportsTableCompanion(isActive: Value(false)),
      );
}
