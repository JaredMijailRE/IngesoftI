import 'dart:io';
import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
import '../../../../app/app_config.dart';
import 'tables/users_table.dart';
import 'tables/sports_table.dart';
import 'tables/events_table.dart';
import 'tables/participants_table.dart';
import 'daos/users_dao.dart';
import 'daos/sports_dao.dart';
import 'daos/events_dao.dart';
import 'daos/participants_dao.dart';

part 'app_database.g.dart';

@DriftDatabase(
  tables: [UsersTable, SportsTable, EventsTable, ParticipantsTable],
  daos: [UsersDao, SportsDao, EventsDao, ParticipantsDao],
)
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => AppConfig.databaseVersion;

  @override
  MigrationStrategy get migration {
    return MigrationStrategy(
      onCreate: (Migrator m) async {
        await m.createAll();
      },
      onUpgrade: (Migrator m, int from, int to) async {
        // Aquí se pueden agregar migraciones futuras
        if (from < 2) {
          // Ejemplo de migración para versión 2
          // await m.addColumn(usersTable, usersTable.newColumn);
        }
      },
    );
  }
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    // Usar la implementación apropiada según la plataforma
    if (Platform.isAndroid ||
        Platform.isIOS ||
        Platform.isWindows ||
        Platform.isMacOS ||
        Platform.isLinux) {
      // Para plataformas nativas
      final dbFolder = await getApplicationDocumentsDirectory();
      final file = File(p.join(dbFolder.path, AppConfig.databaseName));
      return NativeDatabase.createInBackground(file);
    } else {
      // Para web
      return NativeDatabase.memory();
    }
  });
}
