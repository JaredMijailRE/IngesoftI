import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/theme/app_theme.dart';
import '../routes/app_router.dart';
import '../data/datasources/local/database/app_database.dart';
import '../presentation/providers/app_provider.dart';

class SportUApp extends StatelessWidget {
  const SportUApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<AppDatabase>(create: (context) => AppDatabase()),
        ChangeNotifierProvider(create: (context) => AppProvider()),
      ],
      child: MaterialApp.router(
        title: 'SportU',
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        themeMode: ThemeMode.system,
        routerConfig: AppRouter.router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
