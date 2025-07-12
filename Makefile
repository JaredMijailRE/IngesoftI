.PHONY: setup

setup:
	@if [ "$$OS" = "Windows_NT" ]; then \
		echo "Instalando Bun en Windows..."; \
		powershell -Command "irm https://bun.sh/install.ps1 | iex"; \
		cd Proyecto; \
		bun run setup; \
	else \
		echo "Instalando Bun en Linux/macOS..."; \
		curl -fsSL https://bun.sh/install | bash; \
		export BUN_INSTALL="$$HOME/.bun"; \
		export PATH="$$BUN_INSTALL/bin:$$PATH"; \
		cd Proyecto && bun run setup; \
	fi
