@echo off
title SIGFIS - Sistema de Gestao de Contratos IQUEGO
chcp 65001 > nul

echo.
echo ======================================================
echo    SIGFIS - SISTEMA DE GESTAO DE CONTRATOS IQUEGO
echo ======================================================
echo.

set BASE=%~dp0

:: Verificar se .env do backend existe
if not exist "%BASE%backend\.env" (
    echo [AVISO] Execute INSTALAR.bat primeiro.
    pause
    exit /b 1
)

:: Detectar IP da maquina na rede local
set IP=127.0.0.1
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do set IP=%%a
set IP=%IP:~1%

:: Aguardar PostgreSQL estar pronto (verifica porta 5432)
echo Aguardando banco de dados...
:CHECAR_DB
if exist "%BASE%node.exe" (
    "%BASE%node.exe" -e "const n=require('net'),c=n.connect(5432,'127.0.0.1',()=>{c.end();process.exit(0)});c.on('error',()=>process.exit(1));" > nul 2>&1
) else (
    node -e "const n=require('net'),c=n.connect(5432,'127.0.0.1',()=>{c.end();process.exit(0)});c.on('error',()=>process.exit(1));" > nul 2>&1
)
if errorlevel 1 (
    timeout /t 2 /nobreak > nul
    goto CHECAR_DB
)
echo Banco de dados pronto!

:: Iniciar backend
echo.
echo Iniciando backend...
if exist "%BASE%node.exe" (
    start "SIGFIS Backend" /MIN /D "%BASE%backend" "%BASE%node.exe" dist\src\main.js
) else (
    start "SIGFIS Backend" /MIN /D "%BASE%backend" node dist\src\main.js
)

timeout /t 5 /nobreak > nul

echo.
echo ======================================================
echo  Neste computador:    http://localhost:3000
echo  Outros (Intranet):   http://%IP%:3000
echo ======================================================
echo.
echo  Nao feche esta janela enquanto usar o sistema.
echo.

start http://localhost:3000

cd /d "%BASE%"
if exist "%BASE%node.exe" (
    "%BASE%node.exe" server.js
) else (
    node server.js
)
