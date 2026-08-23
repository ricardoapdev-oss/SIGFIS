@echo off
chcp 65001 >nul
title Gestao e Fiscalizacao de Contratos
color 0A

echo ============================================
echo   SISTEMA DE GESTAO DE CONTRATOS
echo ============================================
echo.

REM Verificar se Docker esta rodando (docker ps e mais confiavel que docker info)
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [AVISO] Docker nao esta rodando ou nao esta instalado.
    echo         O banco de dados pode nao funcionar.
    echo         Abra o Docker Desktop, aguarde ficar pronto e
    echo         execute este arquivo novamente.
    echo.
    pause
    goto :iniciar_servidores
)

echo [1/3] Iniciando banco de dados (Docker)...
cd /d "%~dp0"
docker compose up -d
echo       Banco de dados OK!
echo.

:iniciar_servidores
echo [2/3] Iniciando backend (porta 3001)...
start "Backend - NestJS (porta 3001)" cmd /k cd /d "%~dp0backend" ^&^& npm run start:dev

timeout /t 5 /nobreak >nul

echo [3/3] Iniciando frontend (porta 3000)...
start "Frontend - Next.js (porta 3000)" cmd /k cd /d "%~dp0frontend" ^&^& npm run dev

echo.
echo ============================================
echo   Aguardando servidores iniciarem...
echo ============================================
echo.
echo   Frontend : http://localhost:3000  ^<-- seu sistema
echo   Backend  : http://localhost:3001  ^<-- API
echo   pgAdmin  : http://localhost:5050  ^<-- banco de dados
echo.
echo   Nao feche as janelas que abriram!
echo   Para encerrar, feche as janelas Backend e Frontend.
echo.
timeout /t 20 /nobreak >nul

start "" http://localhost:3000
