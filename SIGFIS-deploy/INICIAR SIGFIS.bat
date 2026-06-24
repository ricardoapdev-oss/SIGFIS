@echo off
title SIGFIS - Sistema de Gestao de Contratos IQUEGO
chcp 65001 > nul

echo.
echo ======================================================
echo    SIGFIS - SISTEMA DE GESTAO DE CONTRATOS IQUEGO
echo ======================================================
echo.

:: Detectar IP da maquina na rede local
set IP=127.0.0.1
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set IP=%%a
)
set IP=%IP:~1%

:: Definir diretorio base (onde esta este .bat)
set BASE=%~dp0

:: Definir executavel Node.js
if exist "%BASE%node.exe" (
    set NODE="%BASE%node.exe"
) else (
    set NODE=node
)

:: Verificar se .env do backend existe
if not exist "%BASE%backend\.env" (
    echo [AVISO] Arquivo backend\.env nao encontrado!
    echo         Execute INSTALAR.bat para configurar o banco de dados.
    echo.
    pause
    exit /b 1
)

echo Iniciando servidor backend ^(API^) na porta 3001...
:: Rodar com CWD = backend/ para que dotenv e Prisma encontrem .env e schema.prisma
start "SIGFIS Backend" /MIN cmd /c "cd /d "%BASE%backend" && %NODE% dist\src\main.js"

:: Aguardar backend inicializar
timeout /t 4 /nobreak > nul

echo.
echo ======================================================
echo  LINKS DE ACESSO PARA A EQUIPE:
echo.
echo  Neste computador: http://localhost:3000
echo  Outros computadores ^(Intranet^): http://%IP%:3000
echo ======================================================
echo.
echo ATENCAO: Nao feche esta janela enquanto usar o sistema.
echo          A janela "SIGFIS Backend" deve permanecer aberta.
echo.

start http://localhost:3000

cd /d "%BASE%"
%NODE% server.js
