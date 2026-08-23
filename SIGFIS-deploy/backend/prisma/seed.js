"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed do banco de dados SIGFIS com dados reais...');
    await prisma.auditLog.deleteMany();
    await prisma.systemAlert.deleteMany();
    await prisma.communication.deleteMany();
    await prisma.document.deleteMany();
    await prisma.contractAlteration.deleteMany();
    await prisma.inspectionMeasurement.deleteMany();
    await prisma.occurrence.deleteMany();
    await prisma.fiscalAssignment.deleteMany();
    await prisma.contract.deleteMany();
    await prisma.procurementPhase.deleteMany();
    await prisma.procurementProcess.deleteMany();
    await prisma.contractor.deleteMany();
    await prisma.user.deleteMany();
    console.log('✓ Banco limpo');
    const h = (p) => bcrypt.hash(p, 10);
    // ── USUÁRIOS ─────────────────────────────────────────────────────────────────
    const U = {};
    const usersData = [
        { key: 'admin', name: 'Ricardo Augusto', email: 'ricardo.peixoto@iquego.com.br', pw: '160212', role: client_1.UserRole.ADMIN, reg: '30072' },
        { key: 'alta1', name: 'Diretoria de Administração', email: 'alta@sigecontratos.com', pw: '123456', role: client_1.UserRole.ALTA_GESTAO, reg: 'IQG-0003' },
        { key: 'alta2', name: 'Lais de Castro Viana', email: 'lais.viana@iquego.com.br', pw: '123456', role: client_1.UserRole.ALTA_GESTAO, reg: 'IQG-0001' },
        { key: 'gestor', name: 'Jairo Vicente de Melo', email: 'jairo.vicente@iquego.com.br', pw: '123', role: client_1.UserRole.GESTOR, reg: 'IQG-0002' },
        { key: 'f01', name: 'Rogério B. da Silva', email: 'f01@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1001' },
        { key: 'f02', name: 'Maria do Carmo C. Silva', email: 'f02@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1002' },
        { key: 'f03', name: 'Edilson Martins Garcia', email: 'f03@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1003' },
        { key: 'f04', name: 'Eunice Maria C. Oliveira', email: 'f04@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1004' },
        { key: 'f05', name: 'Eliety Rodrigues Pereira', email: 'f05@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1005' },
        { key: 'f06', name: 'Weverson de Oliveira', email: 'f06@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1006' },
        { key: 'f07', name: 'Cleiton de Sá Silva', email: 'f07@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1007' },
        { key: 'f08', name: 'Robson Policeno de Rezende', email: 'f08@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1008' },
        { key: 'f09', name: 'Pedro Henrique Martins', email: 'f09@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1009' },
        { key: 'f10', name: 'Thalita Guaribaldine S. Guimaraes', email: 'f10@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1010' },
        { key: 'f11', name: 'Fábio Gonçalves da Silva', email: 'f11@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1011' },
        { key: 'f12', name: 'Gabriel Moraes Godinho', email: 'f12@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1012' },
        { key: 'f13', name: 'Denize Morais', email: 'f13@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1013' },
        { key: 'f14', name: 'Sabrina Maria Barbosa', email: 'f14@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1014' },
        { key: 'f15', name: 'Wenderson de Souza', email: 'f15@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1015' },
        { key: 'f16', name: 'Patrícia Sodré', email: 'f16@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1016' },
        { key: 'f17', name: 'Vandeir Gonçalves da Silva', email: 'f17@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1017' },
        { key: 'f18', name: 'Alessandro dos Santos', email: 'f18@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1018' },
        { key: 'f19', name: 'Vera Lúcia Nunes', email: 'f19@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1019' },
        { key: 'f20', name: 'Laurindo Damas da Silva Júnior', email: 'f20@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1020' },
        { key: 'f21', name: 'Emerson Ferreira dos Anjos', email: 'f21@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1021' },
        { key: 'f22', name: 'Dalmo Francisco da Costa', email: 'f22@sigecontratos.com', pw: '123456', role: client_1.UserRole.FISCAL, reg: 'IQG-1022' },
    ];
    for (const u of usersData) {
        const created = await prisma.user.create({
            data: {
                name: u.name,
                email: u.email,
                passwordHash: await h(u.pw),
                role: u.role,
                status: client_1.UserStatus.ACTIVE,
                registrationNumber: u.reg,
            },
        });
        U[u.key] = created.id;
    }
    console.log(`✓ ${usersData.length} usuários criados`);
    // ── CONTRATADAS ───────────────────────────────────────────────────────────────
    const C = {};
    const contractorsData = [
        { key: 'c01', corporateName: 'SERVIÇO SOCIAL DA INDÚSTRIA — SESI', cnpjCpf: '03.775.235/0001-10', email: 'contato@sesigo.org.br', phone: '(62) 3200-1100', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c02', corporateName: 'HEALTH SAÚDE E SEGURANÇA DO TRABALHO LTDA', cnpjCpf: '11.222.333/0001-44', email: 'contato@healthsst.com.br', phone: '(62) 3300-2200', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c03', corporateName: 'REDEMOB CONSÓRCIO', cnpjCpf: '22.333.444/0001-55', email: 'contato@redemob.com.br', phone: '(62) 3400-3300', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c04', corporateName: 'PLUXEE BENEFÍCIOS BRASIL S.A.', cnpjCpf: '08.722.911/0001-49', email: 'corporativo@pluxee.com.br', phone: '(11) 3000-4000', addressCity: 'São Paulo', addressState: 'SP' },
        { key: 'c05', corporateName: 'LE CARD ADMINISTRADORA DE CARTÕES LTDA', cnpjCpf: '33.444.555/0001-66', email: 'contato@lecard.com.br', phone: '(62) 3500-5500', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c06', corporateName: 'GENESIS PRESTADORA DE SERVIÇOS LTDA', cnpjCpf: '44.555.666/0001-77', email: 'contato@genesis-servicos.com.br', phone: '(62) 3600-6600', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c07', corporateName: 'PADA PÃES E SABORES LTDA', cnpjCpf: '55.666.777/0001-88', email: 'contato@pada.com.br', phone: '(62) 3700-7700', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c08', corporateName: 'FONSECA E MARTINS COMÉRCIO DE GÁS EIRELI', cnpjCpf: '66.777.888/0001-99', email: 'contato@fonsecagas.com.br', phone: '(62) 3800-8800', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c09', corporateName: 'JVS PARTICIPAÇÕES EIRELI', cnpjCpf: '77.888.999/0001-00', email: 'contato@jvspart.com.br', phone: '(62) 3900-9900', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c10', corporateName: 'LS PRODUTOS E SERVIÇOS LTDA', cnpjCpf: '88.999.000/0001-11', email: 'contato@lsprodutos.com.br', phone: '(62) 3100-1010', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c11', corporateName: 'ALTERDATA TECNOLOGIA EM INFORMÁTICA LTDA', cnpjCpf: '00.111.222/0001-33', email: 'comercial@alterdata.com.br', phone: '(21) 2109-0000', addressCity: 'Rio de Janeiro', addressState: 'RJ' },
        { key: 'c12', corporateName: 'INTEGRA AUTOMAÇÃO E CONTROLE LTDA', cnpjCpf: '11.222.333/0002-25', email: 'contato@integraac.com.br', phone: '(62) 3200-2020', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c13', corporateName: 'MPS BRASIL OUTSOURCING DE IMPRESSÃO LTDA', cnpjCpf: '22.333.444/0002-06', email: 'contato@mpsbrasil.com.br', phone: '(11) 4000-3030', addressCity: 'São Paulo', addressState: 'SP' },
        { key: 'c14', corporateName: 'GOIAS TELECOMUNICAÇÕES S/A — GOIASTELECOM', cnpjCpf: '02.421.421/0001-11', email: 'corporativo@goiastelecom.com.br', phone: '(62) 3600-4040', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c16', corporateName: 'SANEAGO — SANEAMENTO DE GOIÁS S.A.', cnpjCpf: '02.879.655/0001-19', email: 'atendimento@saneago.com.br', phone: '(62) 3265-0600', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c17', corporateName: 'EQUATORIAL GOIÁS DISTRIBUIDORA DE ENERGIA S.A.', cnpjCpf: '02.322.462/0001-00', email: 'atendimento@equatorialgo.com.br', phone: '(62) 3243-2000', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c18', corporateName: 'GENESIS COMÉRCIO E MANUTENÇÕES LTDA', cnpjCpf: '44.555.777/0001-88', email: 'contato@genesis-manutencoes.com.br', phone: '(62) 3600-5050', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c19', corporateName: 'PRIME CONSULTORIA E ASSESSORIA EMPRESARIAL LTDA', cnpjCpf: '33.444.666/0001-99', email: 'contato@primeconsultoria.com.br', phone: '(62) 3200-6060', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c20', corporateName: 'GIBBOR BRASIL PUBLICIDADE E PROPAGANDA LTDA', cnpjCpf: '55.666.888/0001-00', email: 'contato@gibbor.com.br', phone: '(62) 3300-7070', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c21', corporateName: 'WEGH ASSESSORIA E LOGÍSTICA INTERNACIONAL', cnpjCpf: '66.777.999/0001-11', email: 'contato@wegh.com.br', phone: '(62) 3400-8080', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c22', corporateName: 'AVISO URGENTE TECNOLOGIA E INFORMAÇÃO LTDA', cnpjCpf: '77.888.000/0001-22', email: 'contato@avisourgente.com.br', phone: '(62) 3500-9090', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c23', corporateName: 'DELTA ENGENHARIA E ARQUITETURA LTDA', cnpjCpf: '88.999.111/0001-33', email: 'contato@deltaeng.com.br', phone: '(62) 3600-0101', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c24', corporateName: 'SHIELD SEGURANÇA DA INFORMAÇÃO E CONSULTORIA EMPRESARIAL LTDA', cnpjCpf: '99.000.222/0001-44', email: 'contato@shield.com.br', phone: '(62) 3700-1212', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c25', corporateName: 'ZENITE INFORMAÇÃO E CONSULTORIA S/A', cnpjCpf: '00.111.333/0001-55', email: 'contato@zenite.com.br', phone: '(41) 3250-7070', addressCity: 'Curitiba', addressState: 'PR' },
        { key: 'c26', corporateName: 'L.A VIAGENS E TURISMO LTDA', cnpjCpf: '11.222.444/0001-66', email: 'contato@laviagens.com.br', phone: '(62) 3800-2323', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c27', corporateName: 'GÁS E MAIS COMÉRCIO EIRELI', cnpjCpf: '22.333.555/0001-77', email: 'contato@gasemais.com.br', phone: '(62) 3900-3434', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c28', corporateName: 'BRASILSEG CIA DE SEGUROS', cnpjCpf: '10.520.977/0001-10', email: 'corporativo@brasilseg.com.br', phone: '(11) 3116-9000', addressCity: 'São Paulo', addressState: 'SP' },
        { key: 'c29', corporateName: 'ÔMEGA LOCADORA DE VEÍCULOS LTDA', cnpjCpf: '33.444.666/0002-70', email: 'contato@omegalocadora.com.br', phone: '(62) 3100-4545', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c30', corporateName: 'MISTER PRAGAS DEDETIZAÇÃO E DESENTUPIDORA LTDA', cnpjCpf: '44.555.777/0002-69', email: 'contato@misterpragas.com.br', phone: '(62) 3200-5656', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c31', corporateName: 'NP TECNOLOGIA E GESTÃO DE DADOS LTDA', cnpjCpf: '55.666.888/0002-40', email: 'contato@nptecnologia.com.br', phone: '(62) 3300-6767', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c32', corporateName: 'DMS CALIBRAÇÕES E INSPEÇÕES INDUSTRIAL LTDA', cnpjCpf: '66.777.999/0002-01', email: 'contato@dmscalibra.com.br', phone: '(62) 3400-7878', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c33', corporateName: 'WORK7 AUDITORES INDEPENDENTES LTDA', cnpjCpf: '77.888.000/0002-82', email: 'contato@work7auditores.com.br', phone: '(62) 3500-8989', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c34', corporateName: 'AUDIGESPUB SERVIÇOS DE AUDITORIA, ASSESSORIA E CONSULTORIA LTDA', cnpjCpf: '88.999.111/0002-13', email: 'contato@audigespub.com.br', phone: '(62) 3600-9090', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c35', corporateName: 'INSTITUTO DE PROMOÇÃO HUMANA, APRENDIZAGEM E CULTURA', cnpjCpf: '99.000.222/0002-94', email: 'contato@institutophac.org.br', phone: '(62) 3700-0909', addressCity: 'Goiânia', addressState: 'GO' },
        { key: 'c36', corporateName: 'BIOCIENTIFIC LABORATORIOS LTDA', cnpjCpf: '00.111.333/0002-36', email: 'contato@biocientific.com.br', phone: '(62) 3800-1010', addressCity: 'Goiânia', addressState: 'GO' },
    ];
    for (const c of contractorsData) {
        const { key, ...data } = c;
        const created = await prisma.contractor.create({ data });
        C[key] = created.id;
    }
    console.log(`✓ ${contractorsData.length} contratadas criadas`);
    // ── PROCESSOS ─────────────────────────────────────────────────────────────────
    const P = {};
    const processesData = [
        { key: 'p01', num: '202300055000054', subject: 'Exames de saúde ocupacional e medicina do trabalho', mod: 'LICITACAO_13303', val: 387450, dep: 'Segurança do Trabalho' },
        { key: 'p02', num: '202400055000297', subject: 'Serviços em saúde e segurança do trabalho', mod: 'LICITACAO_13303', val: 298320, dep: 'Segurança do Trabalho' },
        { key: 'p03', num: '202300055000136', subject: 'Serviços de remoção hospitalar e translado de pacientes', mod: 'INEXIGIBILIDADE', val: 196800, dep: 'Gerência de Gestão de Pessoas' },
        { key: 'p04', num: '202300055000104', subject: 'Fornecimento de cartão de benefícios (vale alimentação/refeição)', mod: 'LICITACAO_13303', val: 1485000, dep: 'Gerência de Gestão de Pessoas' },
        { key: 'p05', num: '202300055000401', subject: 'Fornecimento de cartão de benefícios (vale alimentação)', mod: 'LICITACAO_13303', val: 798500, dep: 'Gerência de Gestão de Pessoas' },
        { key: 'p06', num: '202300055000119', subject: 'Serviços de portaria, vigilância e limpeza', mod: 'LICITACAO_13303', val: 612000, dep: 'Coordenação de Serviços Gerais' },
        { key: 'p07', num: '202200055000417', subject: 'Fornecimento de refeições e lanches para servidores', mod: 'DISPENSA_13303', val: 117600, dep: 'Coordenação de Serviços Gerais' },
        { key: 'p08', num: '202200055000273', subject: 'Fornecimento de gás liquefeito de petróleo (GLP) em botijões', mod: 'LICITACAO_13303', val: 173400, dep: 'Coordenação de Serviços Gerais' },
        { key: 'p09', num: '202300055000247', subject: 'Serviços logísticos de transporte e distribuição', mod: 'LICITACAO_13303', val: 924000, dep: 'Gerência de Logística' },
        { key: 'p10', num: '202400055000006', subject: 'Fornecimento de materiais e produtos de uso geral', mod: 'LICITACAO_13303', val: 342000, dep: 'Gerência de Logística' },
        { key: 'p11', num: '202400055000728', subject: 'Licença de uso de sistema de gestão integrada (ERP)', mod: 'LICITACAO_13303', val: 486000, dep: 'Tecnologia da Informação e Comunicação' },
        { key: 'p12', num: '202000055000104', subject: 'Sistema de automação e controle predial', mod: 'DISPENSA_13303', val: 93500, dep: 'Tecnologia da Informação e Comunicação' },
        { key: 'p13', num: '202100055000133', subject: 'Outsourcing de impressão e gestão de documentos', mod: 'LICITACAO_13303', val: 432000, dep: 'Tecnologia da Informação e Comunicação' },
        { key: 'p14', num: '202200055000327', subject: 'Serviços de telecomunicações e telefonia corporativa', mod: 'LICITACAO_13303', val: 960000, dep: 'Tecnologia da Informação e Comunicação' },
        { key: 'p15', num: '202400055000042', subject: 'Manutenção preventiva e corretiva do sistema PABX', mod: 'DISPENSA_13303', val: 82800, dep: 'Tecnologia da Informação e Comunicação' },
        { key: 'p16', num: '202100055000217', subject: 'Fornecimento de água e coleta de esgoto', mod: 'INEXIGIBILIDADE', val: 237600, dep: 'Gerência de Engenharia' },
        { key: 'p17', num: '202300055000551', subject: 'Fornecimento de energia elétrica', mod: 'DISPENSA_13303', val: 264688.38, dep: 'Gerência de Engenharia' },
        { key: 'p18', num: '202300055000690', subject: 'Manutenção predial e instalações', mod: 'LICITACAO_13303', val: 540000, dep: 'Gerência de Engenharia' },
        { key: 'p19', num: '202300055000144', subject: 'Consultoria e assessoria empresarial', mod: 'LICITACAO_13303', val: 372000, dep: 'Gerência de Logística' },
        { key: 'p20', num: '202100055000360', subject: 'Serviços de publicidade, propaganda e marketing institucional', mod: 'LICITACAO_13303', val: 720000, dep: 'Assessoria de Compras Governamentais' },
        { key: 'p21', num: '202300055000052', subject: 'Logística internacional e despacho aduaneiro', mod: 'LICITACAO_13303', val: 450000, dep: 'Assessoria Especial da Presidência' },
        { key: 'p22', num: '202200055000192', subject: 'Sistema de notificações e comunicação digital', mod: 'LICITACAO_13303', val: 283200, dep: 'Gerência Jurídica' },
        { key: 'p23', num: '202400055000064', subject: 'Serviços de engenharia civil e obras na planta industrial', mod: 'LICITACAO_13303', val: 1176000, dep: 'Gerência de Engenharia' },
        { key: 'p24', num: '202400055000330', subject: 'Segurança da informação e consultoria em LGPD', mod: 'LICITACAO_13303', val: 156000, dep: 'Assessoria Especial da Presidência' },
        { key: 'p25', num: '202500055000275', subject: 'Informação e consultoria em licitações e contratos', mod: 'LICITACAO_13303', val: 138600, dep: 'Assessoria de Compras Governamentais' },
        { key: 'p26', num: '202400055000827', subject: 'Agenciamento de viagens corporativas', mod: 'LICITACAO_13303', val: 684000, dep: 'Diretoria Comercial' },
        { key: 'p27', num: '202500055000308', subject: 'Fornecimento de gás liquefeito de petróleo (GLP) a granel', mod: 'LICITACAO_13303', val: 94560, dep: 'Coordenação Administrativa' },
        { key: 'p28', num: '202400055000709', subject: 'Seguro de vida em grupo para servidores', mod: 'LICITACAO_13303', val: 42000, dep: 'Gerência de Recursos Humanos' },
        { key: 'p29', num: '202500055000329', subject: 'Locação de veículos com motorista para uso institucional', mod: 'LICITACAO_13303', val: 386400, dep: 'Gerência de Logística' },
        { key: 'p30', num: '202500055000026', subject: 'Dedetização, desratização e controle de pragas', mod: 'LICITACAO_13303', val: 71400, dep: 'Gestão de Contratos' },
        { key: 'p31', num: '202300055000041', subject: 'Gestão e proteção de dados empresariais', mod: 'LICITACAO_13303', val: 516000, dep: 'Assessoria de Compras Governamentais' },
        { key: 'p32', num: '202500055000519', subject: 'Calibração e inspeção de equipamentos de medição', mod: 'LICITACAO_13303', val: 38400, dep: 'Gerência de Controle da Qualidade' },
        { key: 'p33', num: '202500055000168', subject: 'Auditoria independente das demonstrações contábeis', mod: 'LICITACAO_13303', val: 204000, dep: 'Gerência de Contabilidade' },
        { key: 'p34', num: '202500055000383', subject: 'Auditoria, assessoria e consultoria em gestão pública', mod: 'LICITACAO_13303', val: 185400, dep: 'Gerência de Contabilidade' },
        { key: 'p35', num: '202500055000779', subject: 'Capacitação, treinamento e desenvolvimento organizacional', mod: 'LICITACAO_13303', val: 336000, dep: 'Gerência de Contabilidade' },
        { key: 'p36', num: '202600055000186', subject: 'Serviços laboratoriais de análises clínicas e microbiológicas', mod: 'LICITACAO_13303', val: 124800, dep: 'Gerência de Contabilidade' },
    ];
    for (const p of processesData) {
        const created = await prisma.procurementProcess.create({
            data: {
                processNumber: p.num,
                subject: p.subject,
                status: client_1.ProcessStatus.CONCLUDED,
                modality: p.mod,
                estimatedValue: p.val,
                requesterDepartment: p.dep,
                requesterId: U.gestor,
            },
        });
        P[p.key] = created.id;
    }
    console.log(`✓ ${processesData.length} processos criados`);
    // ── CONTRATOS ─────────────────────────────────────────────────────────────────
    const CT = {};
    const contractsData = [
        { key: 'c01', num: '032/2023', pk: 'p01', ck: 'c01', obj: 'Realização de exames de saúde ocupacional e medicina do trabalho', iv: 387450, cv: 387450, sd: '2024-01-02', st: '2024-01-02', ed: '2026-12-31', dep: 'Segurança do Trabalho', obs: null },
        { key: 'c02', num: '021/2024', pk: 'p02', ck: 'c02', obj: 'Prestação de serviços em saúde e segurança do trabalho, incluindo laudos e PPP', iv: 298320, cv: 347160, sd: '2025-06-16', st: '2025-06-16', ed: '2027-06-15', dep: 'Segurança do Trabalho', obs: null },
        { key: 'c03', num: '055/2023', pk: 'p03', ck: 'c03', obj: 'Prestação de serviços de remoção hospitalar e translado de pacientes', iv: 196800, cv: 196800, sd: '2023-11-01', st: '2023-11-01', ed: '2026-10-31', dep: 'Gerência de Gestão de Pessoas', obs: null },
        { key: 'c04', num: '041/2023', pk: 'p04', ck: 'c04', obj: 'Fornecimento de cartão de benefícios — vale alimentação e vale refeição', iv: 1485000, cv: 1620000, sd: '2024-03-01', st: '2024-03-01', ed: '2026-12-31', dep: 'Gerência de Gestão de Pessoas', obs: null },
        { key: 'c05', num: '063/2023', pk: 'p05', ck: 'c05', obj: 'Fornecimento de cartão de benefícios — vale alimentação', iv: 798500, cv: 798500, sd: '2024-04-01', st: '2024-04-01', ed: '2027-03-31', dep: 'Gerência de Gestão de Pessoas', obs: null },
        { key: 'c06', num: '048/2023', pk: 'p06', ck: 'c06', obj: 'Prestação de serviços de portaria, vigilância e limpeza', iv: 612000, cv: 648000, sd: '2024-01-15', st: '2024-01-15', ed: '2026-12-31', dep: 'Coordenação de Serviços Gerais', obs: null },
        { key: 'c07', num: '018/2022', pk: 'p07', ck: 'c07', obj: 'Fornecimento de refeições e lanches para servidores', iv: 117600, cv: 117600, sd: '2023-02-01', st: '2023-02-01', ed: '2026-09-30', dep: 'Coordenação de Serviços Gerais', obs: null },
        { key: 'c08', num: '022/2022', pk: 'p08', ck: 'c08', obj: 'Fornecimento de gás liquefeito de petróleo (GLP) em botijões', iv: 173400, cv: 173400, sd: '2023-01-10', st: '2023-01-10', ed: '2027-01-09', dep: 'Coordenação de Serviços Gerais', obs: null },
        { key: 'c09', num: '067/2023', pk: 'p09', ck: 'c09', obj: 'Prestação de serviços logísticos de transporte e distribuição', iv: 924000, cv: 978000, sd: '2024-06-01', st: '2024-06-01', ed: '2026-12-31', dep: 'Gerência de Logística', obs: null },
        { key: 'c10', num: '003/2024', pk: 'p10', ck: 'c10', obj: 'Fornecimento de materiais e produtos de uso geral', iv: 342000, cv: 342000, sd: '2025-01-20', st: '2025-01-20', ed: '2027-01-19', dep: 'Gerência de Logística', obs: null },
        { key: 'c11', num: '042/2024', pk: 'p11', ck: 'c11', obj: 'Licença de uso de sistema de gestão integrada (ERP)', iv: 486000, cv: 486000, sd: '2025-05-01', st: '2025-05-01', ed: '2027-04-30', dep: 'Tecnologia da Informação e Comunicação', obs: null },
        { key: 'c12', num: '010/2020', pk: 'p12', ck: 'c12', obj: 'Fornecimento e instalação de sistema de automação e controle predial', iv: 93500, cv: 93500, sd: '2021-06-01', st: '2021-06-01', ed: '2026-12-31', dep: 'Tecnologia da Informação e Comunicação', obs: null },
        { key: 'c13', num: '019/2021', pk: 'p13', ck: 'c13', obj: 'Prestação de serviços de outsourcing de impressão e gestão de documentos', iv: 432000, cv: 462000, sd: '2022-03-01', st: '2022-03-01', ed: '2027-02-28', dep: 'Tecnologia da Informação e Comunicação', obs: 'NOVA CONTRATAÇÃO EM ANDAMENTO' },
        { key: 'c14', num: '038/2022', pk: 'p14', ck: 'c14', obj: 'Prestação de serviços de telecomunicações e telefonia corporativa', iv: 960000, cv: 1056000, sd: '2023-09-01', st: '2023-09-01', ed: '2028-05-31', dep: 'Tecnologia da Informação e Comunicação', obs: null },
        { key: 'c15', num: '011/2024', pk: 'p15', ck: 'c14', obj: 'Manutenção preventiva e corretiva do sistema PABX', iv: 82800, cv: 82800, sd: '2024-10-05', st: '2024-10-05', ed: '2026-09-04', dep: 'Tecnologia da Informação e Comunicação', obs: null },
        { key: 'c16', num: '027/2021', pk: 'p16', ck: 'c16', obj: 'Fornecimento de água e coleta de esgoto (contrato de serviço público)', iv: 237600, cv: 241200, sd: '2025-01-09', st: '2025-01-09', ed: '2026-09-12', dep: 'Gerência de Engenharia', obs: null },
        { key: 'c17', num: '068/2023', pk: 'p17', ck: 'c17', obj: 'Fornecimento de energia elétrica (contrato com concessionária)', iv: 264688.38, cv: 284435.71, sd: '2024-01-15', st: '2024-01-15', ed: '2026-12-31', dep: 'Gerência de Engenharia', obs: null },
        { key: 'c18', num: '085/2023', pk: 'p18', ck: 'c18', obj: 'Prestação de serviços de manutenção predial e instalações', iv: 540000, cv: 576000, sd: '2024-02-01', st: '2024-02-01', ed: '2027-01-31', dep: 'Gerência de Engenharia', obs: null },
        { key: 'c19', num: '052/2023', pk: 'p19', ck: 'c19', obj: 'Prestação de serviços de consultoria e assessoria empresarial', iv: 372000, cv: 390600, sd: '2024-03-15', st: '2024-03-15', ed: '2026-12-31', dep: 'Gerência de Logística', obs: null },
        { key: 'c20', num: '046/2021', pk: 'p20', ck: 'c20', obj: 'Prestação de serviços de publicidade, propaganda e marketing institucional', iv: 720000, cv: 720000, sd: '2022-06-01', st: '2022-06-01', ed: '2026-11-30', dep: 'Assessoria de Compras Governamentais', obs: 'EM ANDAMENTO NOVA CONTRATAÇÃO' },
        { key: 'c21', num: '030/2023', pk: 'p21', ck: 'c21', obj: 'Prestação de serviços de logística internacional e despacho aduaneiro', iv: 450000, cv: 450000, sd: '2024-02-01', st: '2024-02-01', ed: '2026-12-31', dep: 'Assessoria Especial da Presidência', obs: null },
        { key: 'c22', num: '024/2022', pk: 'p22', ck: 'c22', obj: 'Fornecimento e manutenção de sistema de notificações e comunicação digital', iv: 283200, cv: 283200, sd: '2023-06-01', st: '2023-06-01', ed: '2026-12-31', dep: 'Gerência Jurídica', obs: 'NOVA CONTRATAÇÃO EM ANDAMENTO' },
        { key: 'c23', num: '007/2024', pk: 'p23', ck: 'c23', obj: 'Prestação de serviços de engenharia civil e obras na planta industrial', iv: 1176000, cv: 1260000, sd: '2024-10-01', st: '2024-10-01', ed: '2026-10-02', dep: 'Gerência de Engenharia', obs: 'SOLICITADA A PRORROGAÇÃO' },
        { key: 'c24', num: '028/2024', pk: 'p24', ck: 'c24', obj: 'Prestação de serviços de segurança da informação e consultoria em LGPD', iv: 156000, cv: 180000, sd: '2025-02-19', st: '2025-02-19', ed: '2026-08-22', dep: 'Assessoria Especial da Presidência', obs: 'PRORROGADO POR MAIS 90 DIAS' },
        { key: 'c25', num: '019/2025', pk: 'p25', ck: 'c25', obj: 'Prestação de serviços de informação e consultoria em licitações e contratos', iv: 138600, cv: 138600, sd: '2025-07-01', st: '2025-07-01', ed: '2027-06-30', dep: 'Assessoria de Compras Governamentais', obs: null },
        { key: 'c26', num: '059/2024', pk: 'p26', ck: 'c26', obj: 'Prestação de serviços de agenciamento de viagens corporativas', iv: 684000, cv: 684000, sd: '2025-03-01', st: '2025-03-01', ed: '2026-12-31', dep: 'Diretoria Comercial', obs: 'EM ANDAMENTO NOVA CONTRATAÇÃO' },
        { key: 'c27', num: '023/2025', pk: 'p27', ck: 'c27', obj: 'Fornecimento de gás liquefeito de petróleo (GLP) a granel', iv: 94560, cv: 94560, sd: '2025-07-15', st: '2025-07-15', ed: '2027-07-14', dep: 'Coordenação Administrativa', obs: null },
        { key: 'c28', num: '051/2024', pk: 'p28', ck: 'c28', obj: 'Seguro de vida em grupo para servidores', iv: 42000, cv: 42000, sd: '2025-04-01', st: '2025-04-01', ed: '2026-12-31', dep: 'Gerência de Recursos Humanos', obs: null },
        { key: 'c29', num: '026/2025', pk: 'p29', ck: 'c29', obj: 'Locação de veículos com motorista para uso institucional', iv: 386400, cv: 386400, sd: '2025-06-01', st: '2025-06-01', ed: '2026-12-31', dep: 'Gerência de Logística', obs: null },
        { key: 'c30', num: '002/2025', pk: 'p30', ck: 'c30', obj: 'Prestação de serviços de dedetização, desratização e controle de pragas', iv: 71400, cv: 71400, sd: '2025-03-01', st: '2025-03-01', ed: '2027-02-28', dep: 'Gestão de Contratos', obs: null },
        { key: 'c31', num: '005/2023', pk: 'p31', ck: 'c31', obj: 'Prestação de serviços de gestão e proteção de dados empresariais', iv: 516000, cv: 528000, sd: '2024-01-02', st: '2024-01-02', ed: '2026-12-31', dep: 'Assessoria de Compras Governamentais', obs: null },
        { key: 'c32', num: '040/2025', pk: 'p32', ck: 'c32', obj: 'Prestação de serviços de calibração e inspeção de equipamentos de medição', iv: 38400, cv: 38400, sd: '2025-09-10', st: '2025-09-10', ed: '2026-08-09', dep: 'Gerência de Controle da Qualidade', obs: null },
        { key: 'c33', num: '014/2025', pk: 'p33', ck: 'c33', obj: 'Prestação de serviços de auditoria independente das demonstrações contábeis', iv: 204000, cv: 204000, sd: '2025-10-01', st: '2025-10-01', ed: '2026-09-30', dep: 'Gerência de Contabilidade', obs: 'EM ANDAMENTO NOVA CONTRATAÇÃO' },
        { key: 'c34', num: '028/2025', pk: 'p34', ck: 'c34', obj: 'Prestação de serviços de auditoria, assessoria e consultoria em gestão pública', iv: 185400, cv: 185400, sd: '2025-10-15', st: '2025-10-15', ed: '2026-09-30', dep: 'Gerência de Contabilidade', obs: null },
        { key: 'c35', num: '060/2025', pk: 'p35', ck: 'c35', obj: 'Prestação de serviços de capacitação, treinamento e desenvolvimento organizacional', iv: 336000, cv: 336000, sd: '2025-11-08', st: '2025-11-08', ed: '2028-04-07', dep: 'Gerência de Contabilidade', obs: null },
        { key: 'c36', num: '014/2026', pk: 'p36', ck: 'c36', obj: 'Prestação de serviços laboratoriais de análises clínicas e microbiológicas', iv: 124800, cv: 124800, sd: '2026-05-01', st: '2026-05-01', ed: '2027-04-27', dep: 'Gerência de Contabilidade', obs: null },
    ];
    for (const c of contractsData) {
        const created = await prisma.contract.create({
            data: {
                contractNumber: c.num,
                processId: P[c.pk],
                contractorId: C[c.ck],
                objectDescription: c.obj,
                initialValue: c.iv,
                currentValue: c.cv,
                signingDate: new Date(c.sd),
                startDate: new Date(c.st),
                endDate: new Date(c.ed),
                status: client_1.ContractStatus.ACTIVE,
                managerId: U.gestor,
                department: c.dep,
                observations: c.obs,
            },
        });
        CT[c.key] = created.id;
    }
    console.log(`✓ ${contractsData.length} contratos criados`);
    // ── DESIGNAÇÕES DE FISCAL ────────────────────────────────────────────────────
    const assignments = [
        { ck: 'c01', fk: 'f01', act: 'Portaria nº 079/2024-DG', date: '2024-01-02' },
        { ck: 'c02', fk: 'f01', act: 'Portaria nº 080/2025-DG', date: '2025-06-16' },
        { ck: 'c03', fk: 'f03', act: 'Portaria nº 045/2023-DG', date: '2023-11-01' },
        { ck: 'c04', fk: 'f04', act: 'Portaria nº 023/2024-DG', date: '2024-03-01' },
        { ck: 'c05', fk: 'f05', act: 'Portaria nº 031/2024-DG', date: '2024-04-01' },
        { ck: 'c06', fk: 'f06', act: 'Portaria nº 112/2024-DG', date: '2024-01-15' },
        { ck: 'c07', fk: 'f07', act: 'Portaria nº 058/2023-DG', date: '2023-02-01' },
        { ck: 'c08', fk: 'f08', act: 'Portaria nº 092/2023-DG', date: '2023-01-10' },
        { ck: 'c09', fk: 'f09', act: 'Portaria nº 076/2024-DG', date: '2024-06-01' },
        { ck: 'c10', fk: 'f10', act: 'Portaria nº 018/2025-DG', date: '2025-01-20' },
        { ck: 'c11', fk: 'f11', act: 'Portaria nº 035/2025-DG', date: '2025-05-01' },
        { ck: 'c12', fk: 'f12', act: 'Portaria nº 007/2025-DG', date: '2021-06-01' },
        { ck: 'c13', fk: 'f11', act: 'Portaria nº 097/2022-DG', date: '2022-03-01' },
        { ck: 'c14', fk: 'f13', act: 'Portaria nº 084/2025-DG', date: '2023-09-01' },
        { ck: 'c15', fk: 'f13', act: 'Portaria nº 084/2025-DG', date: '2024-10-05' },
        { ck: 'c16', fk: 'f14', act: 'Portaria nº 053/2026-DG', date: '2025-01-09' },
        { ck: 'c17', fk: 'f15', act: 'Portaria nº 150/2024-DG', date: '2024-01-15' },
        { ck: 'c18', fk: 'f16', act: 'Portaria nº 069/2022-DG', date: '2024-02-01' },
        { ck: 'c19', fk: 'f09', act: 'Portaria nº 076/2024-DG', date: '2024-03-15' },
        { ck: 'c20', fk: 'f17', act: 'Portaria nº 078/2026-DG', date: '2022-06-01' },
        { ck: 'c21', fk: 'f19', act: 'Portaria nº 092/2025-DG', date: '2024-02-01' },
        { ck: 'c22', fk: 'f20', act: 'Portaria nº 021/2026-DG', date: '2023-06-01' },
        { ck: 'c23', fk: 'f16', act: 'Portaria nº 069/2022-DG', date: '2024-10-01' },
        { ck: 'c24', fk: 'f19', act: 'Portaria nº 092/2025-DG', date: '2025-02-19' },
        { ck: 'c25', fk: 'f18', act: 'Portaria nº 056/2026-DG', date: '2025-07-01' },
        { ck: 'c26', fk: 'f21', act: 'Portaria nº 146/2025-DG', date: '2025-03-01' },
        { ck: 'c27', fk: 'f22', act: 'Portaria nº 066/2025-DG', date: '2025-07-15' },
        { ck: 'c28', fk: 'f04', act: 'Portaria nº 023/2024-DG', date: '2025-04-01' },
        { ck: 'c29', fk: 'f10', act: 'Portaria nº 018/2025-DG', date: '2025-06-01' },
        { ck: 'c30', fk: 'f08', act: 'Portaria nº 092/2023-DG', date: '2025-03-01' },
        { ck: 'c31', fk: 'f17', act: 'Portaria nº 078/2026-DG', date: '2024-01-02' },
        { ck: 'c32', fk: 'f02', act: 'Portaria nº 054/2026-DG', date: '2025-09-10' },
        { ck: 'c33', fk: 'f21', act: 'Portaria nº 146/2025-DG', date: '2025-10-01' },
        { ck: 'c34', fk: 'f22', act: 'Portaria nº 066/2025-DG', date: '2025-10-15' },
        { ck: 'c35', fk: 'f20', act: 'Portaria nº 088/2026-DG', date: '2025-11-08' },
        { ck: 'c36', fk: 'f02', act: 'Portaria nº 054/2026-DG', date: '2026-05-01' },
    ];
    for (const a of assignments) {
        await prisma.fiscalAssignment.create({
            data: {
                contractId: CT[a.ck],
                fiscalId: U[a.fk],
                role: client_1.FiscalRole.TITULAR,
                designationAct: a.act,
                designationDate: new Date(a.date),
                startDate: new Date(a.date),
                isActive: true,
            },
        });
    }
    console.log(`✓ ${assignments.length} designações criadas`);
    // ── OCORRÊNCIAS ───────────────────────────────────────────────────────────────
    await prisma.occurrence.createMany({
        data: [
            {
                contractId: CT['c01'], fiscalId: U.f01,
                title: 'Atraso na entrega do Lote 02 de exames',
                description: 'O prestador não enviou os laudos do lote 02 dentro do prazo contratual de 5 dias úteis.',
                severity: client_1.OccurrenceSeverity.MEDIUM, status: client_1.OccurrenceStatus.RESOLVED,
                resolutionDescription: 'A empresa justificou sobrecarga operacional e entregou os laudos com 3 dias de atraso. Aceito.',
                resolvedById: U.gestor, resolvedAt: new Date('2026-03-15T14:30:00Z'),
                createdAt: new Date('2026-03-10T09:00:00Z'),
            },
            {
                contractId: CT['c01'], fiscalId: U.f01,
                title: 'Inconformidade nos exames audiométricos',
                description: 'Os exames audiométricos de março não foram realizados por profissional habilitado conforme exige a NR-7.',
                severity: client_1.OccurrenceSeverity.HIGH, status: client_1.OccurrenceStatus.OPEN,
                createdAt: new Date('2026-05-28T10:15:00Z'),
            },
        ],
    });
    console.log('✓ Ocorrências criadas');
    // ── MEDIÇÕES ──────────────────────────────────────────────────────────────────
    await prisma.inspectionMeasurement.createMany({
        data: [
            { contractId: CT['c01'], fiscalId: U.f01, periodStart: new Date('2026-01-02'), periodEnd: new Date('2026-02-28'), measurementValue: 64575, reportDescription: 'Exames periódicos — 1º bimestre 2026. Todos os laudos recebidos e conferidos.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-03-10T16:00:00Z'), createdAt: new Date('2026-03-05T11:00:00Z') },
            { contractId: CT['c01'], fiscalId: U.f01, periodStart: new Date('2026-03-01'), periodEnd: new Date('2026-04-30'), measurementValue: 64575, reportDescription: 'Exames periódicos — 2º bimestre 2026. Pendente análise das inconformidades.', status: client_1.MeasurementStatus.PENDING_GESTOR, createdAt: new Date('2026-05-20T17:30:00Z') },
            { contractId: CT['c04'], fiscalId: U.f04, periodStart: new Date('2025-12-01'), periodEnd: new Date('2026-01-31'), measurementValue: 123750, reportDescription: 'Benefícios Jan/2026. Créditos carregados conforme relação nominal.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-02-08T10:00:00Z'), createdAt: new Date('2026-02-05T09:00:00Z') },
            { contractId: CT['c14'], fiscalId: U.f13, periodStart: new Date('2026-02-01'), periodEnd: new Date('2026-03-31'), measurementValue: 80000, reportDescription: 'Telecomunicações — 1º bimestre 2026. NFs conferidas e serviços prestados regularmente.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-04-12T14:00:00Z'), createdAt: new Date('2026-04-08T11:00:00Z') },
            { contractId: CT['c06'], fiscalId: U.f06, periodStart: new Date('2026-03-01'), periodEnd: new Date('2026-04-30'), measurementValue: 51000, reportDescription: 'Portaria e vigilância — Mar-Abr/2026. Frequência e relatórios de ronda conferidos.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-05-15T16:00:00Z'), createdAt: new Date('2026-05-10T13:00:00Z') },
            { contractId: CT['c17'], fiscalId: U.f15, periodStart: new Date('2026-04-01'), periodEnd: new Date('2026-05-31'), measurementValue: 44114.73, reportDescription: 'Energia elétrica — Abr-Mai/2026. Faturas conferidas, consumo dentro da variação contratual.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-06-10T09:00:00Z'), createdAt: new Date('2026-06-05T10:00:00Z') },
            { contractId: CT['c03'], fiscalId: U.f03, periodStart: new Date('2026-05-01'), periodEnd: new Date('2026-06-30'), measurementValue: 86400, reportDescription: 'Remoção hospitalar — Mai-Jun/2026. Registros de atendimentos conferidos.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-07-08T11:00:00Z'), createdAt: new Date('2026-07-03T10:00:00Z') },
            { contractId: CT['c09'], fiscalId: U.f09, periodStart: new Date('2026-01-01'), periodEnd: new Date('2026-01-31'), measurementValue: 77000, reportDescription: 'Transporte Jan/2026. Manifesto de cargas e comprovantes de entrega conferidos.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-02-18T15:00:00Z'), createdAt: new Date('2026-02-14T10:00:00Z') },
            { contractId: CT['c11'], fiscalId: U.f11, periodStart: new Date('2026-03-01'), periodEnd: new Date('2026-03-31'), measurementValue: 40500, reportDescription: 'ERP Mar/2026. Disponibilidade do sistema verificada: 99,2%.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-04-20T11:00:00Z'), createdAt: new Date('2026-04-16T09:00:00Z') },
            { contractId: CT['c05'], fiscalId: U.f05, periodStart: new Date('2026-04-01'), periodEnd: new Date('2026-04-30'), measurementValue: 66542, reportDescription: 'Vale alimentação Abr/2026. Créditos efetuados em D+1 conforme contrato.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-05-22T14:00:00Z'), createdAt: new Date('2026-05-18T10:00:00Z') },
            { contractId: CT['c14'], fiscalId: U.f13, periodStart: new Date('2026-04-01'), periodEnd: new Date('2026-05-31'), measurementValue: 80000, reportDescription: 'Telecomunicações — 2º bimestre 2026. SLA: 99,7%. Conferido.', status: client_1.MeasurementStatus.APPROVED, approvedById: U.gestor, approvalDate: new Date('2026-06-18T10:00:00Z'), createdAt: new Date('2026-06-14T09:00:00Z') },
            { contractId: CT['c06'], fiscalId: U.f06, periodStart: new Date('2026-05-01'), periodEnd: new Date('2026-06-30'), measurementValue: 51000, reportDescription: 'Portaria e limpeza — Mai-Jun/2026. Escala e relatório de supervisão conferidos.', status: client_1.MeasurementStatus.PENDING_GESTOR, createdAt: new Date('2026-07-10T10:00:00Z') },
        ],
    });
    console.log('✓ Medições criadas');
    // ── ADITIVO ───────────────────────────────────────────────────────────────────
    await prisma.contractAlteration.create({
        data: {
            contractId: CT['c04'], type: client_1.AlterationType.ADDENDUM_VALUE_INCREASE,
            alterationNumber: '1º Termo Aditivo', valueChange: 135000,
            justification: 'Acréscimo de beneficiários por incorporação de novos servidores e dependentes no exercício 2025.',
            status: client_1.AlterationStatus.APPROVED, requestedById: U.f04, reviewedById: U.gestor,
            reviewDate: new Date('2025-06-10T10:00:00Z'),
            reviewNotes: 'Aprovado conforme Parecer Jurídico nº 22/2025.',
            createdAt: new Date('2025-06-01T14:00:00Z'),
        },
    });
    console.log('✓ Aditivos criados');
    // ── ALERTAS ───────────────────────────────────────────────────────────────────
    await prisma.systemAlert.createMany({
        data: [
            { contractId: CT['c01'], type: client_1.AlertType.OCCURRENCE_CRITICAL, message: 'Ocorrência de alta gravidade: Inconformidade em exames audiométricos no Contrato 032/2023 (SESI).', targetRole: client_1.UserRole.GESTOR, isRead: false, createdAt: new Date('2026-05-28T10:15:00Z') },
            { contractId: CT['c01'], type: client_1.AlertType.MEASUREMENT_PENDING, message: 'Medição pendente de homologação no valor de R$ 64.575,00 para o Contrato 032/2023 (SESI).', targetRole: client_1.UserRole.GESTOR, isRead: false, createdAt: new Date('2026-05-20T17:30:00Z') },
        ],
    });
    console.log('✓ Alertas criados');
    console.log('\n✅ Seed concluído com sucesso!');
    console.log('\n📋 Credenciais de acesso:');
    console.log('  ADMIN       ricardo.peixoto@iquego.com.br  →  160212');
    console.log('  GESTOR      jairo.vicente@iquego.com.br    →  123');
    console.log('  Demais usuários                            →  123456');
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
