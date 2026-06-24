@echo off
title SIGFIS - Instalacao Inicial
chcp 65001 > nul

echo.
echo ======================================================
echo    SIGFIS - INSTALACAO INICIAL DO BANCO DE DADOS
echo ======================================================
echo.
echo ATENCAO: Execute este script APENAS UMA VEZ na primeira
echo          instalacao do sistema.
echo.
echo Prerequisitos necessarios:
echo   1. PostgreSQL instalado e rodando em localhost:5432
echo   2. Banco de dados e usuario criados (ver README)
echo.

:: Verificar configuracao
if not exist "%~dp0backend\.env" (
    echo [ERRO] Arquivo backend\.env nao encontrado!
    echo.
    echo Crie o arquivo backend\.env com o seguinte conteudo:
    echo.
    echo   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/sigecontratos_db"
    echo   JWT_SECRET="sua_chave_secreta_aqui"
    echo   JWT_EXPIRATION="24h"
    echo   PORT=3001
    echo.
    pause
    exit /b 1
)

echo Configuracao encontrada. Iniciando instalacao...
echo.

:: Definir Node.js
if exist "%~dp0node.exe" (
    set NODE="%~dp0node.exe"
) else (
    set NODE=node
)

:: Mudar para diretorio do backend
cd /d "%~dp0backend"

echo [1/2] Criando tabelas no banco de dados...
%NODE% node_modules\.bin\prisma db push --accept-data-loss
if errorlevel 1 (
    echo.
    echo [ERRO] Falha ao criar tabelas!
    echo        Verifique se PostgreSQL esta rodando e as credenciais em backend\.env.
    echo.
    cd ..
    pause
    exit /b 1
)
echo        OK - Tabelas criadas com sucesso!

echo.
echo [2/2] Populando banco com dados iniciais (usuarios, contratos, etc.)...
%NODE% prisma\seed.js
if errorlevel 1 (
    echo.
    echo [AVISO] Seed falhou. Pode ser que os dados ja existam no banco.
    echo         Isso e normal em uma re-instalacao. Continuando...
    echo.
) else (
    echo        OK - Dados iniciais inseridos com sucesso!
)

cd ..

echo.
echo ======================================================
echo  INSTALACAO CONCLUIDA!
echo.
echo  Agora execute "INICIAR SIGFIS.bat" para usar o sistema.
echo.
echo  Login inicial:
echo    Admin: ricardo.peixoto@iquego.com.br / 160212
echo    Gestor: jairo.vicente@iquego.com.br / 123
echo    Fiscais: [email] / 123456
echo ======================================================
echo.
pause
