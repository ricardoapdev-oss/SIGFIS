#!/bin/bash
# ─────────────────────────────────────────────
#  SIGECONTRATOS — Inicialização rápida
# ─────────────────────────────────────────────

# Garante que o .env existe
if [ ! -f .env ]; then
  cp .env.example .env
  echo "[aviso] .env criado a partir de .env.example. Edite-o antes de ir para produção."
fi

echo ""
echo "Construindo e iniciando todos os serviços..."
echo "(primeira execução demora ~3 min por causa do build)"
echo ""

docker compose up --build -d

echo ""
echo "════════════════════════════════════════════"
echo "  SIGECONTRATOS está rodando!"
echo ""
echo "  Sistema:   http://$(hostname -I | awk '{print $1}'):3000"
echo "  pgAdmin:   http://$(hostname -I | awk '{print $1}'):5050"
echo ""
echo "  Para parar:  docker compose down"
echo "  Para logs:   docker compose logs -f"
echo "════════════════════════════════════════════"
