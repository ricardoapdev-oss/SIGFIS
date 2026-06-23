#!/bin/sh
set -e

echo "============================================"
echo "  SIGECONTRATOS — Backend"
echo "============================================"
echo "[1/2] Sincronizando schema com o banco de dados..."
node node_modules/.bin/prisma db push --accept-data-loss

echo "[2/2] Iniciando servidor NestJS na porta 3001..."
exec node dist/main
