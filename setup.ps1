# instalar-bun.ps1

Write-Host "Instalando Bun en Windows..."
powershell -Command "irm https://bun.sh/install.ps1 | iex"

Write-Host "Esperando que la instalación de Bun se complete..."
Start-Sleep -Seconds 5  # Esperar por si la instalación tarda

# Cambiar al directorio del proyecto (ajusta la ruta si es necesario)
Set-Location -Path "./Proyecto"

# Ejecutar el comando de setup con bun
bun run setup
