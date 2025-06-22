import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/app_constants.dart';
import '../../core/widgets/common_widgets.dart';
import '../../core/theme/color_scheme.dart';
import '../providers/app_provider.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(AppConstants.appTitle),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => context.go(AppConstants.profileRoute),
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => context.go(AppConstants.settingsRoute),
          ),
        ],
      ),
      body: Consumer<AppProvider>(
        builder: (context, appProvider, child) {
          if (appProvider.isLoading) {
            return CommonWidgets.loadingWidget(message: 'Cargando...');
          }

          return Padding(
            padding: const EdgeInsets.all(AppConstants.defaultPadding),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header con información del usuario
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(AppConstants.defaultPadding),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: AppColorScheme.primaryColor,
                          child: Text(
                            appProvider.currentUser?.initials ?? 'U',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        const SizedBox(width: AppConstants.defaultPadding),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Bienvenido,',
                                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                  color: AppColorScheme.textSecondaryColor,
                                ),
                              ),
                              Text(
                                appProvider.currentUser?.displayName ?? 'Usuario',
                                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: AppConstants.largePadding),
                
                // Sección de acciones rápidas
                Text(
                  'Acciones rápidas',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                
                const SizedBox(height: AppConstants.defaultPadding),
                
                Expanded(
                  child: GridView.count(
                    crossAxisCount: 2,
                    crossAxisSpacing: AppConstants.defaultPadding,
                    mainAxisSpacing: AppConstants.defaultPadding,
                    children: [
                      _buildActionCard(
                        context,
                        icon: Icons.sports_soccer,
                        title: 'Deportes',
                        subtitle: 'Ver deportes disponibles',
                        color: AppColorScheme.primaryColor,
                        onTap: () {
                          // TODO: Navegar a deportes
                        },
                      ),
                      _buildActionCard(
                        context,
                        icon: Icons.event,
                        title: 'Eventos',
                        subtitle: 'Ver eventos próximos',
                        color: AppColorScheme.secondaryColor,
                        onTap: () {
                          // TODO: Navegar a eventos
                        },
                      ),
                      _buildActionCard(
                        context,
                        icon: Icons.group,
                        title: 'Participantes',
                        subtitle: 'Gestionar participantes',
                        color: AppColorScheme.accentColor,
                        onTap: () {
                          // TODO: Navegar a participantes
                        },
                      ),
                      _buildActionCard(
                        context,
                        icon: Icons.analytics,
                        title: 'Estadísticas',
                        subtitle: 'Ver estadísticas',
                        color: AppColorScheme.infoColor,
                        onTap: () {
                          // TODO: Navegar a estadísticas
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Crear nuevo evento
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildActionCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppConstants.borderRadius),
        child: Padding(
          padding: const EdgeInsets.all(AppConstants.defaultPadding),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 48,
                color: color,
              ),
              const SizedBox(height: AppConstants.smallPadding),
              Text(
                title,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: AppColorScheme.textSecondaryColor,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
} 