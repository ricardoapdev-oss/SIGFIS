(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Tipos do Sistema
__turbopack_context__.s([
    "PHASE_NAMES",
    ()=>PHASE_NAMES,
    "api",
    ()=>api,
    "getStoredToken",
    ()=>getStoredToken,
    "getStoredUser",
    ()=>getStoredUser,
    "setStoredToken",
    ()=>setStoredToken,
    "setStoredUser",
    ()=>setStoredUser
]);
const PHASE_NAMES = [
    'Planejamento da Contratação',
    'Estudo Técnico Preliminar',
    'Termo de Referência',
    'Pesquisa de Preços',
    'Aprovação',
    'Licitação / Contratação Direta',
    'Formalização Contratual',
    'Execução Contratual',
    'Encerramento'
];
// ── Seed Data ──────────────────────────────────────────────────────────────────
const SEED_USERS = [
    {
        id: 'usr-admin',
        name: 'Ricardo Augusto',
        email: 'admin@sigecontratos.com',
        role: 'ADMIN',
        status: 'ACTIVE',
        registrationNumber: 'IQG-0001'
    },
    {
        id: 'usr-alta',
        name: 'Diretoria de Administração',
        email: 'alta@sigecontratos.com',
        role: 'ALTA_GESTAO',
        status: 'ACTIVE',
        registrationNumber: 'IQG-0003'
    },
    {
        id: 'usr-lais',
        name: 'Lais de Castro Viana',
        email: 'lais.viana@iquego.com.br',
        role: 'ALTA_GESTAO',
        status: 'ACTIVE',
        registrationNumber: 'IQG-0004'
    },
    {
        id: 'usr-gestor',
        name: 'Jairo Vicente de Melo',
        email: 'gestor@sigecontratos.com',
        role: 'GESTOR',
        status: 'ACTIVE',
        registrationNumber: 'IQG-0002'
    },
    {
        id: 'usr-f01',
        name: 'Rogério B. da Silva',
        email: 'f01@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1001'
    },
    {
        id: 'usr-f02',
        name: 'Maria do Carmo C. Silva',
        email: 'f02@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1002'
    },
    {
        id: 'usr-f03',
        name: 'Edilson Martins Garcia',
        email: 'f03@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1003'
    },
    {
        id: 'usr-f04',
        name: 'Eunice Maria C. Oliveira',
        email: 'f04@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1004'
    },
    {
        id: 'usr-f05',
        name: 'Eliety Rodrigues Pereira',
        email: 'f05@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1005'
    },
    {
        id: 'usr-f06',
        name: 'Weverson de Oliveira',
        email: 'f06@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1006'
    },
    {
        id: 'usr-f07',
        name: 'Cleiton de Sá Silva',
        email: 'f07@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1007'
    },
    {
        id: 'usr-f08',
        name: 'Robson Policeno de Rezende',
        email: 'f08@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1008'
    },
    {
        id: 'usr-f09',
        name: 'Pedro Henrique Martins',
        email: 'f09@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1009'
    },
    {
        id: 'usr-f10',
        name: 'Thalita Guaribaldine S. Guimaraes',
        email: 'f10@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1010'
    },
    {
        id: 'usr-f11',
        name: 'Fábio Gonçalves da Silva',
        email: 'f11@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1011'
    },
    {
        id: 'usr-f12',
        name: 'Gabriel Moraes Godinho',
        email: 'f12@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1012'
    },
    {
        id: 'usr-f13',
        name: 'Denize Morais',
        email: 'f13@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1013'
    },
    {
        id: 'usr-f14',
        name: 'Sabrina Maria Barbosa',
        email: 'f14@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1014'
    },
    {
        id: 'usr-f15',
        name: 'Wenderson de Souza',
        email: 'f15@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1015'
    },
    {
        id: 'usr-f16',
        name: 'Patrícia Sodré',
        email: 'f16@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1016'
    },
    {
        id: 'usr-f17',
        name: 'Vandeir Gonçalves da Silva',
        email: 'f17@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1017'
    },
    {
        id: 'usr-f18',
        name: 'Alessandro dos Santos',
        email: 'f18@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1018'
    },
    {
        id: 'usr-f19',
        name: 'Vera Lúcia Nunes',
        email: 'f19@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1019'
    },
    {
        id: 'usr-f20',
        name: 'Laurindo Damas da Silva Júnior',
        email: 'f20@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1020'
    },
    {
        id: 'usr-f21',
        name: 'Emerson Ferreira dos Anjos',
        email: 'f21@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1021'
    },
    {
        id: 'usr-f22',
        name: 'Dalmo Francisco da Costa',
        email: 'f22@sigecontratos.com',
        role: 'FISCAL',
        status: 'ACTIVE',
        registrationNumber: 'IQG-1022'
    }
];
const SEED_CONTRACTORS = [
    {
        id: 'ctr-c01',
        corporateName: 'SERVIÇO SOCIAL DA INDÚSTRIA — SESI',
        cnpjCpf: '03.775.235/0001-10',
        email: 'contato@sesigo.org.br',
        phone: '(62) 3200-1100',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c02',
        corporateName: 'HEALTH SAÚDE E SEGURANÇA DO TRABALHO LTDA',
        cnpjCpf: '11.222.333/0001-44',
        email: 'contato@healthsst.com.br',
        phone: '(62) 3300-2200',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c03',
        corporateName: 'REDEMOB CONSÓRCIO',
        cnpjCpf: '22.333.444/0001-55',
        email: 'contato@redemob.com.br',
        phone: '(62) 3400-3300',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c04',
        corporateName: 'PLUXEE BENEFÍCIOS BRASIL S.A.',
        cnpjCpf: '08.722.911/0001-49',
        email: 'corporativo@pluxee.com.br',
        phone: '(11) 3000-4000',
        addressCity: 'São Paulo',
        addressState: 'SP'
    },
    {
        id: 'ctr-c05',
        corporateName: 'LE CARD ADMINISTRADORA DE CARTÕES LTDA',
        cnpjCpf: '33.444.555/0001-66',
        email: 'contato@lecard.com.br',
        phone: '(62) 3500-5500',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c06',
        corporateName: 'GENESIS PRESTADORA DE SERVIÇOS LTDA',
        cnpjCpf: '44.555.666/0001-77',
        email: 'contato@genesis-servicos.com.br',
        phone: '(62) 3600-6600',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c07',
        corporateName: 'PADA PÃES E SABORES LTDA',
        cnpjCpf: '55.666.777/0001-88',
        email: 'contato@pada.com.br',
        phone: '(62) 3700-7700',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c08',
        corporateName: 'FONSECA E MARTINS COMÉRCIO DE GÁS EIRELI',
        cnpjCpf: '66.777.888/0001-99',
        email: 'contato@fonsecagas.com.br',
        phone: '(62) 3800-8800',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c09',
        corporateName: 'JVS PARTICIPAÇÕES EIRELI',
        cnpjCpf: '77.888.999/0001-00',
        email: 'contato@jvspart.com.br',
        phone: '(62) 3900-9900',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c10',
        corporateName: 'LS PRODUTOS E SERVIÇOS LTDA',
        cnpjCpf: '88.999.000/0001-11',
        email: 'contato@lsprodutos.com.br',
        phone: '(62) 3100-1010',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c11',
        corporateName: 'ALTERDATA TECNOLOGIA EM INFORMÁTICA LTDA',
        cnpjCpf: '00.111.222/0001-33',
        email: 'comercial@alterdata.com.br',
        phone: '(21) 2109-0000',
        addressCity: 'Rio de Janeiro',
        addressState: 'RJ'
    },
    {
        id: 'ctr-c12',
        corporateName: 'INTEGRA AUTOMAÇÃO E CONTROLE LTDA',
        cnpjCpf: '11.222.333/0002-25',
        email: 'contato@integraac.com.br',
        phone: '(62) 3200-2020',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c13',
        corporateName: 'MPS BRASIL OUTSOURCING DE IMPRESSÃO LTDA',
        cnpjCpf: '22.333.444/0002-06',
        email: 'contato@mpsbrasil.com.br',
        phone: '(11) 4000-3030',
        addressCity: 'São Paulo',
        addressState: 'SP'
    },
    {
        id: 'ctr-c14',
        corporateName: 'GOIAS TELECOMUNICAÇÕES S/A — GOIASTELECOM',
        cnpjCpf: '02.421.421/0001-11',
        email: 'corporativo@goiastelecom.com.br',
        phone: '(62) 3600-4040',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c16',
        corporateName: 'SANEAGO — SANEAMENTO DE GOIÁS S.A.',
        cnpjCpf: '02.879.655/0001-19',
        email: 'atendimento@saneago.com.br',
        phone: '(62) 3265-0600',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c17',
        corporateName: 'EQUATORIAL GOIÁS DISTRIBUIDORA DE ENERGIA S.A.',
        cnpjCpf: '02.322.462/0001-00',
        email: 'atendimento@equatorialgo.com.br',
        phone: '(62) 3243-2000',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c18',
        corporateName: 'GENESIS COMÉRCIO E MANUTENÇÕES LTDA',
        cnpjCpf: '44.555.777/0001-88',
        email: 'contato@genesis-manutencoes.com.br',
        phone: '(62) 3600-5050',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c19',
        corporateName: 'PRIME CONSULTORIA E ASSESSORIA EMPRESARIAL LTDA',
        cnpjCpf: '33.444.666/0001-99',
        email: 'contato@primeconsultoria.com.br',
        phone: '(62) 3200-6060',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c20',
        corporateName: 'GIBBOR BRASIL PUBLICIDADE E PROPAGANDA LTDA',
        cnpjCpf: '55.666.888/0001-00',
        email: 'contato@gibbor.com.br',
        phone: '(62) 3300-7070',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c21',
        corporateName: 'WEGH ASSESSORIA E LOGÍSTICA INTERNACIONAL',
        cnpjCpf: '66.777.999/0001-11',
        email: 'contato@wegh.com.br',
        phone: '(62) 3400-8080',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c22',
        corporateName: 'AVISO URGENTE TECNOLOGIA E INFORMAÇÃO LTDA',
        cnpjCpf: '77.888.000/0001-22',
        email: 'contato@avisourgente.com.br',
        phone: '(62) 3500-9090',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c23',
        corporateName: 'DELTA ENGENHARIA E ARQUITETURA LTDA',
        cnpjCpf: '88.999.111/0001-33',
        email: 'contato@deltaeng.com.br',
        phone: '(62) 3600-0101',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c24',
        corporateName: 'SHIELD SEGURANÇA DA INFORMAÇÃO E CONSULTORIA EMPRESARIAL LTDA',
        cnpjCpf: '99.000.222/0001-44',
        email: 'contato@shield.com.br',
        phone: '(62) 3700-1212',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c25',
        corporateName: 'ZENITE INFORMAÇÃO E CONSULTORIA S/A',
        cnpjCpf: '00.111.333/0001-55',
        email: 'contato@zenite.com.br',
        phone: '(41) 3250-7070',
        addressCity: 'Curitiba',
        addressState: 'PR'
    },
    {
        id: 'ctr-c26',
        corporateName: 'L.A VIAGENS E TURISMO LTDA',
        cnpjCpf: '11.222.444/0001-66',
        email: 'contato@laviagens.com.br',
        phone: '(62) 3800-2323',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c27',
        corporateName: 'GÁS E MAIS COMÉRCIO EIRELI',
        cnpjCpf: '22.333.555/0001-77',
        email: 'contato@gasemais.com.br',
        phone: '(62) 3900-3434',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c28',
        corporateName: 'BRASILSEG CIA DE SEGUROS',
        cnpjCpf: '10.520.977/0001-10',
        email: 'corporativo@brasilseg.com.br',
        phone: '(11) 3116-9000',
        addressCity: 'São Paulo',
        addressState: 'SP'
    },
    {
        id: 'ctr-c29',
        corporateName: 'ÔMEGA LOCADORA DE VEÍCULOS LTDA',
        cnpjCpf: '33.444.666/0002-70',
        email: 'contato@omegalocadora.com.br',
        phone: '(62) 3100-4545',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c30',
        corporateName: 'MISTER PRAGAS DEDETIZAÇÃO E DESENTUPIDORA LTDA',
        cnpjCpf: '44.555.777/0002-69',
        email: 'contato@misterpragas.com.br',
        phone: '(62) 3200-5656',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c31',
        corporateName: 'NP TECNOLOGIA E GESTÃO DE DADOS LTDA',
        cnpjCpf: '55.666.888/0002-40',
        email: 'contato@nptecnologia.com.br',
        phone: '(62) 3300-6767',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c32',
        corporateName: 'DMS CALIBRAÇÕES E INSPEÇÕES INDUSTRIAL LTDA',
        cnpjCpf: '66.777.999/0002-01',
        email: 'contato@dmscalibra.com.br',
        phone: '(62) 3400-7878',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c33',
        corporateName: 'WORK7 AUDITORES INDEPENDENTES LTDA',
        cnpjCpf: '77.888.000/0002-82',
        email: 'contato@work7auditores.com.br',
        phone: '(62) 3500-8989',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c34',
        corporateName: 'AUDIGESPUB SERVIÇOS DE AUDITORIA, ASSESSORIA E CONSULTORIA LTDA',
        cnpjCpf: '88.999.111/0002-13',
        email: 'contato@audigespub.com.br',
        phone: '(62) 3600-9090',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c35',
        corporateName: 'INSTITUTO DE PROMOÇÃO HUMANA, APRENDIZAGEM E CULTURA',
        cnpjCpf: '99.000.222/0002-94',
        email: 'contato@institutophac.org.br',
        phone: '(62) 3700-0909',
        addressCity: 'Goiânia',
        addressState: 'GO'
    },
    {
        id: 'ctr-c36',
        corporateName: 'BIOCIENTIFIC LABORATORIOS LTDA',
        cnpjCpf: '00.111.333/0002-36',
        email: 'contato@biocientific.com.br',
        phone: '(62) 3800-1010',
        addressCity: 'Goiânia',
        addressState: 'GO'
    }
];
const SEED_PROCESSES = [
    {
        id: 'prc-c01',
        processNumber: '202300055000054',
        subject: 'Exames de saúde ocupacional e medicina do trabalho',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 387450.00,
        requesterDepartment: 'Segurança do Trabalho',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c02',
        processNumber: '202400055000297',
        subject: 'Serviços em saúde e segurança do trabalho',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 298320.00,
        requesterDepartment: 'Segurança do Trabalho',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c03',
        processNumber: '202300055000136',
        subject: 'Serviços de remoção hospitalar e translado de pacientes',
        status: 'CONCLUDED',
        modality: 'INEXIGIBILIDADE',
        estimatedValue: 196800.00,
        requesterDepartment: 'Gerência de Gestão de Pessoas',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c04',
        processNumber: '202300055000104',
        subject: 'Fornecimento de cartão de benefícios (vale alimentação/refeição)',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 1485000.00,
        requesterDepartment: 'Gerência de Gestão de Pessoas',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c05',
        processNumber: '202300055000401',
        subject: 'Fornecimento de cartão de benefícios (vale alimentação)',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 798500.00,
        requesterDepartment: 'Gerência de Gestão de Pessoas',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c06',
        processNumber: '202300055000119',
        subject: 'Serviços de portaria, vigilância e limpeza',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 612000.00,
        requesterDepartment: 'Coordenação de Serviços Gerais',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c07',
        processNumber: '202200055000417',
        subject: 'Fornecimento de refeições e lanches para servidores',
        status: 'CONCLUDED',
        modality: 'DISPENSA_13303',
        estimatedValue: 117600.00,
        requesterDepartment: 'Coordenação de Serviços Gerais',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c08',
        processNumber: '202200055000273',
        subject: 'Fornecimento de gás liquefeito de petróleo (GLP) em botijões',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 173400.00,
        requesterDepartment: 'Coordenação de Serviços Gerais',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c09',
        processNumber: '202300055000247',
        subject: 'Serviços logísticos de transporte e distribuição',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 924000.00,
        requesterDepartment: 'Gerência de Logística',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c10',
        processNumber: '202400055000006',
        subject: 'Fornecimento de materiais e produtos de uso geral',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 342000.00,
        requesterDepartment: 'Gerência de Logística',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c11',
        processNumber: '202400055000728',
        subject: 'Licença de uso de sistema de gestão integrada (ERP)',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 486000.00,
        requesterDepartment: 'Tecnologia da Informação e Comunicação',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c12',
        processNumber: '202000055000104',
        subject: 'Sistema de automação e controle predial',
        status: 'CONCLUDED',
        modality: 'DISPENSA_13303',
        estimatedValue: 93500.00,
        requesterDepartment: 'Tecnologia da Informação e Comunicação',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c13',
        processNumber: '202100055000133',
        subject: 'Outsourcing de impressão e gestão de documentos',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 432000.00,
        requesterDepartment: 'Tecnologia da Informação e Comunicação',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c14',
        processNumber: '202200055000327',
        subject: 'Serviços de telecomunicações e telefonia corporativa',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 960000.00,
        requesterDepartment: 'Tecnologia da Informação e Comunicação',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c15',
        processNumber: '202400055000042',
        subject: 'Manutenção preventiva e corretiva do sistema PABX',
        status: 'CONCLUDED',
        modality: 'DISPENSA_13303',
        estimatedValue: 82800.00,
        requesterDepartment: 'Tecnologia da Informação e Comunicação',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c16',
        processNumber: '202100055000217',
        subject: 'Fornecimento de água e coleta de esgoto',
        status: 'CONCLUDED',
        modality: 'INEXIGIBILIDADE',
        estimatedValue: 237600.00,
        requesterDepartment: 'Gerência de Engenharia',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c17',
        processNumber: '202300055000551',
        subject: 'Fornecimento de energia elétrica',
        status: 'CONCLUDED',
        modality: 'DISPENSA_13303',
        estimatedValue: 264688.38,
        requesterDepartment: 'Gerência de Engenharia',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c18',
        processNumber: '202300055000690',
        subject: 'Manutenção predial e instalações',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 540000.00,
        requesterDepartment: 'Gerência de Engenharia',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c19',
        processNumber: '202300055000144',
        subject: 'Consultoria e assessoria empresarial',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 372000.00,
        requesterDepartment: 'Gerência de Logística',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c20',
        processNumber: '202100055000360',
        subject: 'Serviços de publicidade, propaganda e marketing institucional',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 720000.00,
        requesterDepartment: 'Assessoria de Compras Governamentais',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c21',
        processNumber: '202300055000052',
        subject: 'Logística internacional e despacho aduaneiro',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 450000.00,
        requesterDepartment: 'Assessoria Especial da Presidência',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c22',
        processNumber: '202200055000192',
        subject: 'Sistema de notificações e comunicação digital',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 283200.00,
        requesterDepartment: 'Gerência Jurídica',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c23',
        processNumber: '202400055000064',
        subject: 'Serviços de engenharia civil e obras na planta industrial',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 1176000.00,
        requesterDepartment: 'Gerência de Engenharia',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c24',
        processNumber: '202400055000330',
        subject: 'Segurança da informação e consultoria em LGPD',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 156000.00,
        requesterDepartment: 'Assessoria Especial da Presidência',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c25',
        processNumber: '202500055000275',
        subject: 'Informação e consultoria em licitações e contratos',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 138600.00,
        requesterDepartment: 'Assessoria de Compras Governamentais',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c26',
        processNumber: '202400055000827',
        subject: 'Agenciamento de viagens corporativas',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 684000.00,
        requesterDepartment: 'Diretoria Comercial',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c27',
        processNumber: '202500055000308',
        subject: 'Fornecimento de gás liquefeito de petróleo (GLP) a granel',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 94560.00,
        requesterDepartment: 'Coordenação Administrativa',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c28',
        processNumber: '202400055000709',
        subject: 'Seguro de vida em grupo para servidores',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 42000.00,
        requesterDepartment: 'Gerência de Recursos Humanos',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c29',
        processNumber: '202500055000329',
        subject: 'Locação de veículos com motorista para uso institucional',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 386400.00,
        requesterDepartment: 'Gerência de Logística',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c30',
        processNumber: '202500055000026',
        subject: 'Dedetização, desratização e controle de pragas',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 71400.00,
        requesterDepartment: 'Gestão de Contratos',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c31',
        processNumber: '202300055000041',
        subject: 'Gestão e proteção de dados empresariais',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 516000.00,
        requesterDepartment: 'Assessoria de Compras Governamentais',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c32',
        processNumber: '202500055000519',
        subject: 'Calibração e inspeção de equipamentos de medição',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 38400.00,
        requesterDepartment: 'Gerência de Controle da Qualidade',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c33',
        processNumber: '202500055000168',
        subject: 'Auditoria independente das demonstrações contábeis',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 204000.00,
        requesterDepartment: 'Gerência de Contabilidade',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c34',
        processNumber: '202500055000383',
        subject: 'Auditoria, assessoria e consultoria em gestão pública',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 185400.00,
        requesterDepartment: 'Gerência de Contabilidade',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c35',
        processNumber: '202500055000779',
        subject: 'Capacitação, treinamento e desenvolvimento organizacional',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 336000.00,
        requesterDepartment: 'Gerência de Contabilidade',
        requesterId: 'usr-gestor'
    },
    {
        id: 'prc-c36',
        processNumber: '202600055000186',
        subject: 'Serviços laboratoriais de análises clínicas e microbiológicas',
        status: 'CONCLUDED',
        modality: 'LICITACAO_13303',
        estimatedValue: 124800.00,
        requesterDepartment: 'Gerência de Contabilidade',
        requesterId: 'usr-gestor'
    }
];
const SEED_CONTRACTS = [
    {
        id: 'cnt-c01',
        contractNumber: '032/2023',
        processId: 'prc-c01',
        contractorId: 'ctr-c01',
        objectDescription: 'Realização de exames de saúde ocupacional e medicina do trabalho',
        initialValue: 387450.00,
        currentValue: 387450.00,
        signingDate: '2024-01-02',
        startDate: '2024-01-02',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Segurança do Trabalho'
    },
    {
        id: 'cnt-c02',
        contractNumber: '021/2024',
        processId: 'prc-c02',
        contractorId: 'ctr-c02',
        objectDescription: 'Prestação de serviços em saúde e segurança do trabalho, incluindo laudos e PPP',
        initialValue: 298320.00,
        currentValue: 347160.00,
        signingDate: '2025-06-16',
        startDate: '2025-06-16',
        endDate: '2027-06-15',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Segurança do Trabalho'
    },
    {
        id: 'cnt-c03',
        contractNumber: '055/2023',
        processId: 'prc-c03',
        contractorId: 'ctr-c03',
        objectDescription: 'Prestação de serviços de remoção hospitalar e translado de pacientes',
        initialValue: 196800.00,
        currentValue: 196800.00,
        signingDate: '2023-11-01',
        startDate: '2023-11-01',
        endDate: '2026-10-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Gestão de Pessoas'
    },
    {
        id: 'cnt-c04',
        contractNumber: '041/2023',
        processId: 'prc-c04',
        contractorId: 'ctr-c04',
        objectDescription: 'Fornecimento de cartão de benefícios — vale alimentação e vale refeição',
        initialValue: 1485000.00,
        currentValue: 1620000.00,
        signingDate: '2024-03-01',
        startDate: '2024-03-01',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Gestão de Pessoas'
    },
    {
        id: 'cnt-c05',
        contractNumber: '063/2023',
        processId: 'prc-c05',
        contractorId: 'ctr-c05',
        objectDescription: 'Fornecimento de cartão de benefícios — vale alimentação',
        initialValue: 798500.00,
        currentValue: 798500.00,
        signingDate: '2024-04-01',
        startDate: '2024-04-01',
        endDate: '2027-03-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Gestão de Pessoas'
    },
    {
        id: 'cnt-c06',
        contractNumber: '048/2023',
        processId: 'prc-c06',
        contractorId: 'ctr-c06',
        objectDescription: 'Prestação de serviços de portaria, vigilância e limpeza',
        initialValue: 612000.00,
        currentValue: 648000.00,
        signingDate: '2024-01-15',
        startDate: '2024-01-15',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Coordenação de Serviços Gerais'
    },
    {
        id: 'cnt-c07',
        contractNumber: '018/2022',
        processId: 'prc-c07',
        contractorId: 'ctr-c07',
        objectDescription: 'Fornecimento de refeições e lanches para servidores',
        initialValue: 117600.00,
        currentValue: 117600.00,
        signingDate: '2023-02-01',
        startDate: '2023-02-01',
        endDate: '2026-09-30',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Coordenação de Serviços Gerais'
    },
    {
        id: 'cnt-c08',
        contractNumber: '022/2022',
        processId: 'prc-c08',
        contractorId: 'ctr-c08',
        objectDescription: 'Fornecimento de gás liquefeito de petróleo (GLP) em botijões',
        initialValue: 173400.00,
        currentValue: 173400.00,
        signingDate: '2023-01-10',
        startDate: '2023-01-10',
        endDate: '2027-01-09',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Coordenação de Serviços Gerais'
    },
    {
        id: 'cnt-c09',
        contractNumber: '067/2023',
        processId: 'prc-c09',
        contractorId: 'ctr-c09',
        objectDescription: 'Prestação de serviços logísticos de transporte e distribuição',
        initialValue: 924000.00,
        currentValue: 978000.00,
        signingDate: '2024-06-01',
        startDate: '2024-06-01',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Logística'
    },
    {
        id: 'cnt-c10',
        contractNumber: '003/2024',
        processId: 'prc-c10',
        contractorId: 'ctr-c10',
        objectDescription: 'Fornecimento de materiais e produtos de uso geral',
        initialValue: 342000.00,
        currentValue: 342000.00,
        signingDate: '2025-01-20',
        startDate: '2025-01-20',
        endDate: '2027-01-19',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Logística'
    },
    {
        id: 'cnt-c11',
        contractNumber: '042/2024',
        processId: 'prc-c11',
        contractorId: 'ctr-c11',
        objectDescription: 'Licença de uso de sistema de gestão integrada (ERP)',
        initialValue: 486000.00,
        currentValue: 486000.00,
        signingDate: '2025-05-01',
        startDate: '2025-05-01',
        endDate: '2027-04-30',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Tecnologia da Informação e Comunicação'
    },
    {
        id: 'cnt-c12',
        contractNumber: '010/2020',
        processId: 'prc-c12',
        contractorId: 'ctr-c12',
        objectDescription: 'Fornecimento e instalação de sistema de automação e controle predial',
        initialValue: 93500.00,
        currentValue: 93500.00,
        signingDate: '2021-06-01',
        startDate: '2021-06-01',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Tecnologia da Informação e Comunicação'
    },
    {
        id: 'cnt-c13',
        contractNumber: '019/2021',
        processId: 'prc-c13',
        contractorId: 'ctr-c13',
        objectDescription: 'Prestação de serviços de outsourcing de impressão e gestão de documentos',
        initialValue: 432000.00,
        currentValue: 462000.00,
        signingDate: '2022-03-01',
        startDate: '2022-03-01',
        endDate: '2027-02-28',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Tecnologia da Informação e Comunicação',
        observations: 'NOVA CONTRATAÇÃO EM ANDAMENTO'
    },
    {
        id: 'cnt-c14',
        contractNumber: '038/2022',
        processId: 'prc-c14',
        contractorId: 'ctr-c14',
        objectDescription: 'Prestação de serviços de telecomunicações e telefonia corporativa',
        initialValue: 960000.00,
        currentValue: 1056000.00,
        signingDate: '2023-09-01',
        startDate: '2023-09-01',
        endDate: '2028-05-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Tecnologia da Informação e Comunicação'
    },
    {
        id: 'cnt-c15',
        contractNumber: '011/2024',
        processId: 'prc-c15',
        contractorId: 'ctr-c14',
        objectDescription: 'Manutenção preventiva e corretiva do sistema PABX',
        initialValue: 82800.00,
        currentValue: 82800.00,
        signingDate: '2024-10-05',
        startDate: '2024-10-05',
        endDate: '2026-09-04',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Tecnologia da Informação e Comunicação'
    },
    {
        id: 'cnt-c16',
        contractNumber: '027/2021',
        processId: 'prc-c16',
        contractorId: 'ctr-c16',
        objectDescription: 'Fornecimento de água e coleta de esgoto (contrato de serviço público)',
        initialValue: 237600.00,
        currentValue: 241200.00,
        signingDate: '2025-01-09',
        startDate: '2025-01-09',
        endDate: '2026-09-12',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Engenharia'
    },
    {
        id: 'cnt-c17',
        contractNumber: '068/2023',
        processId: 'prc-c17',
        contractorId: 'ctr-c17',
        objectDescription: 'Fornecimento de energia elétrica (contrato com concessionária)',
        initialValue: 264688.38,
        currentValue: 284435.71,
        signingDate: '2024-01-15',
        startDate: '2024-01-15',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Engenharia'
    },
    {
        id: 'cnt-c18',
        contractNumber: '085/2023',
        processId: 'prc-c18',
        contractorId: 'ctr-c18',
        objectDescription: 'Prestação de serviços de manutenção predial e instalações',
        initialValue: 540000.00,
        currentValue: 576000.00,
        signingDate: '2024-02-01',
        startDate: '2024-02-01',
        endDate: '2027-01-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Engenharia'
    },
    {
        id: 'cnt-c19',
        contractNumber: '052/2023',
        processId: 'prc-c19',
        contractorId: 'ctr-c19',
        objectDescription: 'Prestação de serviços de consultoria e assessoria empresarial',
        initialValue: 372000.00,
        currentValue: 390600.00,
        signingDate: '2024-03-15',
        startDate: '2024-03-15',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Logística'
    },
    {
        id: 'cnt-c20',
        contractNumber: '046/2021',
        processId: 'prc-c20',
        contractorId: 'ctr-c20',
        objectDescription: 'Prestação de serviços de publicidade, propaganda e marketing institucional',
        initialValue: 720000.00,
        currentValue: 720000.00,
        signingDate: '2022-06-01',
        startDate: '2022-06-01',
        endDate: '2026-11-30',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Assessoria de Compras Governamentais',
        observations: 'EM ANDAMENTO NOVA CONTRATAÇÃO'
    },
    {
        id: 'cnt-c21',
        contractNumber: '030/2023',
        processId: 'prc-c21',
        contractorId: 'ctr-c21',
        objectDescription: 'Prestação de serviços de logística internacional e despacho aduaneiro',
        initialValue: 450000.00,
        currentValue: 450000.00,
        signingDate: '2024-02-01',
        startDate: '2024-02-01',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Assessoria Especial da Presidência'
    },
    {
        id: 'cnt-c22',
        contractNumber: '024/2022',
        processId: 'prc-c22',
        contractorId: 'ctr-c22',
        objectDescription: 'Fornecimento e manutenção de sistema de notificações e comunicação digital',
        initialValue: 283200.00,
        currentValue: 283200.00,
        signingDate: '2023-06-01',
        startDate: '2023-06-01',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência Jurídica',
        observations: 'NOVA CONTRATAÇÃO EM ANDAMENTO'
    },
    {
        id: 'cnt-c23',
        contractNumber: '007/2024',
        processId: 'prc-c23',
        contractorId: 'ctr-c23',
        objectDescription: 'Prestação de serviços de engenharia civil e obras na planta industrial',
        initialValue: 1176000.00,
        currentValue: 1260000.00,
        signingDate: '2024-10-01',
        startDate: '2024-10-01',
        endDate: '2026-10-02',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Engenharia',
        observations: 'SOLICITADA A PRORROGAÇÃO'
    },
    {
        id: 'cnt-c24',
        contractNumber: '028/2024',
        processId: 'prc-c24',
        contractorId: 'ctr-c24',
        objectDescription: 'Prestação de serviços de segurança da informação e consultoria em LGPD',
        initialValue: 156000.00,
        currentValue: 180000.00,
        signingDate: '2025-02-19',
        startDate: '2025-02-19',
        endDate: '2026-08-22',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Assessoria Especial da Presidência',
        observations: 'PRORROGADO POR MAIS 90 DIAS'
    },
    {
        id: 'cnt-c25',
        contractNumber: '019/2025',
        processId: 'prc-c25',
        contractorId: 'ctr-c25',
        objectDescription: 'Prestação de serviços de informação e consultoria em licitações e contratos',
        initialValue: 138600.00,
        currentValue: 138600.00,
        signingDate: '2025-07-01',
        startDate: '2025-07-01',
        endDate: '2027-06-30',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Assessoria de Compras Governamentais'
    },
    {
        id: 'cnt-c26',
        contractNumber: '059/2024',
        processId: 'prc-c26',
        contractorId: 'ctr-c26',
        objectDescription: 'Prestação de serviços de agenciamento de viagens corporativas',
        initialValue: 684000.00,
        currentValue: 684000.00,
        signingDate: '2025-03-01',
        startDate: '2025-03-01',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Diretoria Comercial',
        observations: 'EM ANDAMENTO NOVA CONTRATAÇÃO'
    },
    {
        id: 'cnt-c27',
        contractNumber: '023/2025',
        processId: 'prc-c27',
        contractorId: 'ctr-c27',
        objectDescription: 'Fornecimento de gás liquefeito de petróleo (GLP) a granel',
        initialValue: 94560.00,
        currentValue: 94560.00,
        signingDate: '2025-07-15',
        startDate: '2025-07-15',
        endDate: '2027-07-14',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Coordenação Administrativa'
    },
    {
        id: 'cnt-c28',
        contractNumber: '051/2024',
        processId: 'prc-c28',
        contractorId: 'ctr-c28',
        objectDescription: 'Seguro de vida em grupo para servidores',
        initialValue: 42000.00,
        currentValue: 42000.00,
        signingDate: '2025-04-01',
        startDate: '2025-04-01',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Recursos Humanos'
    },
    {
        id: 'cnt-c29',
        contractNumber: '026/2025',
        processId: 'prc-c29',
        contractorId: 'ctr-c29',
        objectDescription: 'Locação de veículos com motorista para uso institucional',
        initialValue: 386400.00,
        currentValue: 386400.00,
        signingDate: '2025-06-01',
        startDate: '2025-06-01',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Logística'
    },
    {
        id: 'cnt-c30',
        contractNumber: '002/2025',
        processId: 'prc-c30',
        contractorId: 'ctr-c30',
        objectDescription: 'Prestação de serviços de dedetização, desratização e controle de pragas',
        initialValue: 71400.00,
        currentValue: 71400.00,
        signingDate: '2025-03-01',
        startDate: '2025-03-01',
        endDate: '2027-02-28',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gestão de Contratos'
    },
    {
        id: 'cnt-c31',
        contractNumber: '005/2023',
        processId: 'prc-c31',
        contractorId: 'ctr-c31',
        objectDescription: 'Prestação de serviços de gestão e proteção de dados empresariais',
        initialValue: 516000.00,
        currentValue: 528000.00,
        signingDate: '2024-01-02',
        startDate: '2024-01-02',
        endDate: '2026-12-31',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Assessoria de Compras Governamentais'
    },
    {
        id: 'cnt-c32',
        contractNumber: '040/2025',
        processId: 'prc-c32',
        contractorId: 'ctr-c32',
        objectDescription: 'Prestação de serviços de calibração e inspeção de equipamentos de medição',
        initialValue: 38400.00,
        currentValue: 38400.00,
        signingDate: '2025-09-10',
        startDate: '2025-09-10',
        endDate: '2026-08-09',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Controle da Qualidade'
    },
    {
        id: 'cnt-c33',
        contractNumber: '014/2025',
        processId: 'prc-c33',
        contractorId: 'ctr-c33',
        objectDescription: 'Prestação de serviços de auditoria independente das demonstrações contábeis',
        initialValue: 204000.00,
        currentValue: 204000.00,
        signingDate: '2025-10-01',
        startDate: '2025-10-01',
        endDate: '2026-09-30',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Contabilidade',
        observations: 'EM ANDAMENTO NOVA CONTRATAÇÃO'
    },
    {
        id: 'cnt-c34',
        contractNumber: '028/2025',
        processId: 'prc-c34',
        contractorId: 'ctr-c34',
        objectDescription: 'Prestação de serviços de auditoria, assessoria e consultoria em gestão pública',
        initialValue: 185400.00,
        currentValue: 185400.00,
        signingDate: '2025-10-15',
        startDate: '2025-10-15',
        endDate: '2026-09-30',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Contabilidade'
    },
    {
        id: 'cnt-c35',
        contractNumber: '060/2025',
        processId: 'prc-c35',
        contractorId: 'ctr-c35',
        objectDescription: 'Prestação de serviços de capacitação, treinamento e desenvolvimento organizacional',
        initialValue: 336000.00,
        currentValue: 336000.00,
        signingDate: '2025-11-08',
        startDate: '2025-11-08',
        endDate: '2028-04-07',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Contabilidade'
    },
    {
        id: 'cnt-c36',
        contractNumber: '014/2026',
        processId: 'prc-c36',
        contractorId: 'ctr-c36',
        objectDescription: 'Prestação de serviços laboratoriais de análises clínicas e microbiológicas',
        initialValue: 124800.00,
        currentValue: 124800.00,
        signingDate: '2026-05-01',
        startDate: '2026-05-01',
        endDate: '2027-04-27',
        status: 'ACTIVE',
        managerId: 'usr-gestor',
        department: 'Gerência de Contabilidade'
    }
];
const SEED_ASSIGNMENTS = [
    {
        id: 'asg-c01',
        contractId: 'cnt-c01',
        fiscalId: 'usr-f01',
        role: 'TITULAR',
        designationAct: 'Portaria nº 079/2024-DG',
        designationDate: '2024-01-02',
        startDate: '2024-01-02',
        isActive: true
    },
    {
        id: 'asg-c02',
        contractId: 'cnt-c02',
        fiscalId: 'usr-f01',
        role: 'TITULAR',
        designationAct: 'Portaria nº 080/2025-DG',
        designationDate: '2025-06-16',
        startDate: '2025-06-16',
        isActive: true
    },
    {
        id: 'asg-c03',
        contractId: 'cnt-c03',
        fiscalId: 'usr-f03',
        role: 'TITULAR',
        designationAct: 'Portaria nº 045/2023-DG',
        designationDate: '2023-11-01',
        startDate: '2023-11-01',
        isActive: true
    },
    {
        id: 'asg-c04',
        contractId: 'cnt-c04',
        fiscalId: 'usr-f04',
        role: 'TITULAR',
        designationAct: 'Portaria nº 023/2024-DG',
        designationDate: '2024-03-01',
        startDate: '2024-03-01',
        isActive: true
    },
    {
        id: 'asg-c05',
        contractId: 'cnt-c05',
        fiscalId: 'usr-f05',
        role: 'TITULAR',
        designationAct: 'Portaria nº 031/2024-DG',
        designationDate: '2024-04-01',
        startDate: '2024-04-01',
        isActive: true
    },
    {
        id: 'asg-c06',
        contractId: 'cnt-c06',
        fiscalId: 'usr-f06',
        role: 'TITULAR',
        designationAct: 'Portaria nº 112/2024-DG',
        designationDate: '2024-01-15',
        startDate: '2024-01-15',
        isActive: true
    },
    {
        id: 'asg-c07',
        contractId: 'cnt-c07',
        fiscalId: 'usr-f07',
        role: 'TITULAR',
        designationAct: 'Portaria nº 058/2023-DG',
        designationDate: '2023-02-01',
        startDate: '2023-02-01',
        isActive: true
    },
    {
        id: 'asg-c08',
        contractId: 'cnt-c08',
        fiscalId: 'usr-f08',
        role: 'TITULAR',
        designationAct: 'Portaria nº 092/2023-DG',
        designationDate: '2023-01-10',
        startDate: '2023-01-10',
        isActive: true
    },
    {
        id: 'asg-c09',
        contractId: 'cnt-c09',
        fiscalId: 'usr-f09',
        role: 'TITULAR',
        designationAct: 'Portaria nº 076/2024-DG',
        designationDate: '2024-06-01',
        startDate: '2024-06-01',
        isActive: true
    },
    {
        id: 'asg-c10',
        contractId: 'cnt-c10',
        fiscalId: 'usr-f10',
        role: 'TITULAR',
        designationAct: 'Portaria nº 018/2025-DG',
        designationDate: '2025-01-20',
        startDate: '2025-01-20',
        isActive: true
    },
    {
        id: 'asg-c11',
        contractId: 'cnt-c11',
        fiscalId: 'usr-f11',
        role: 'TITULAR',
        designationAct: 'Portaria nº 035/2025-DG',
        designationDate: '2025-05-01',
        startDate: '2025-05-01',
        isActive: true
    },
    {
        id: 'asg-c12',
        contractId: 'cnt-c12',
        fiscalId: 'usr-f12',
        role: 'TITULAR',
        designationAct: 'Portaria nº 007/2025-DG',
        designationDate: '2021-06-01',
        startDate: '2021-06-01',
        isActive: true
    },
    {
        id: 'asg-c13',
        contractId: 'cnt-c13',
        fiscalId: 'usr-f11',
        role: 'TITULAR',
        designationAct: 'Portaria nº 097/2022-DG',
        designationDate: '2022-03-01',
        startDate: '2022-03-01',
        isActive: true
    },
    {
        id: 'asg-c14',
        contractId: 'cnt-c14',
        fiscalId: 'usr-f13',
        role: 'TITULAR',
        designationAct: 'Portaria nº 084/2025-DG',
        designationDate: '2023-09-01',
        startDate: '2023-09-01',
        isActive: true
    },
    {
        id: 'asg-c15',
        contractId: 'cnt-c15',
        fiscalId: 'usr-f13',
        role: 'TITULAR',
        designationAct: 'Portaria nº 084/2025-DG',
        designationDate: '2024-10-05',
        startDate: '2024-10-05',
        isActive: true
    },
    {
        id: 'asg-c16',
        contractId: 'cnt-c16',
        fiscalId: 'usr-f14',
        role: 'TITULAR',
        designationAct: 'Portaria nº 053/2026-DG',
        designationDate: '2025-01-09',
        startDate: '2025-01-09',
        isActive: true
    },
    {
        id: 'asg-c17',
        contractId: 'cnt-c17',
        fiscalId: 'usr-f15',
        role: 'TITULAR',
        designationAct: 'Portaria nº 150/2024-DG',
        designationDate: '2024-01-15',
        startDate: '2024-01-15',
        isActive: true
    },
    {
        id: 'asg-c18',
        contractId: 'cnt-c18',
        fiscalId: 'usr-f16',
        role: 'TITULAR',
        designationAct: 'Portaria nº 069/2022-DG',
        designationDate: '2024-02-01',
        startDate: '2024-02-01',
        isActive: true
    },
    {
        id: 'asg-c19',
        contractId: 'cnt-c19',
        fiscalId: 'usr-f09',
        role: 'TITULAR',
        designationAct: 'Portaria nº 076/2024-DG',
        designationDate: '2024-03-15',
        startDate: '2024-03-15',
        isActive: true
    },
    {
        id: 'asg-c20',
        contractId: 'cnt-c20',
        fiscalId: 'usr-f17',
        role: 'TITULAR',
        designationAct: 'Portaria nº 078/2026-DG',
        designationDate: '2022-06-01',
        startDate: '2022-06-01',
        isActive: true
    },
    {
        id: 'asg-c21',
        contractId: 'cnt-c21',
        fiscalId: 'usr-f19',
        role: 'TITULAR',
        designationAct: 'Portaria nº 092/2025-DG',
        designationDate: '2024-02-01',
        startDate: '2024-02-01',
        isActive: true
    },
    {
        id: 'asg-c22',
        contractId: 'cnt-c22',
        fiscalId: 'usr-f20',
        role: 'TITULAR',
        designationAct: 'Portaria nº 021/2026-DG',
        designationDate: '2023-06-01',
        startDate: '2023-06-01',
        isActive: true
    },
    {
        id: 'asg-c23',
        contractId: 'cnt-c23',
        fiscalId: 'usr-f16',
        role: 'TITULAR',
        designationAct: 'Portaria nº 069/2022-DG',
        designationDate: '2024-10-01',
        startDate: '2024-10-01',
        isActive: true
    },
    {
        id: 'asg-c24',
        contractId: 'cnt-c24',
        fiscalId: 'usr-f19',
        role: 'TITULAR',
        designationAct: 'Portaria nº 092/2025-DG',
        designationDate: '2025-02-19',
        startDate: '2025-02-19',
        isActive: true
    },
    {
        id: 'asg-c25',
        contractId: 'cnt-c25',
        fiscalId: 'usr-f18',
        role: 'TITULAR',
        designationAct: 'Portaria nº 056/2026-DG',
        designationDate: '2025-07-01',
        startDate: '2025-07-01',
        isActive: true
    },
    {
        id: 'asg-c26',
        contractId: 'cnt-c26',
        fiscalId: 'usr-f21',
        role: 'TITULAR',
        designationAct: 'Portaria nº 146/2025-DG',
        designationDate: '2025-03-01',
        startDate: '2025-03-01',
        isActive: true
    },
    {
        id: 'asg-c27',
        contractId: 'cnt-c27',
        fiscalId: 'usr-f22',
        role: 'TITULAR',
        designationAct: 'Portaria nº 066/2025-DG',
        designationDate: '2025-07-15',
        startDate: '2025-07-15',
        isActive: true
    },
    {
        id: 'asg-c28',
        contractId: 'cnt-c28',
        fiscalId: 'usr-f04',
        role: 'TITULAR',
        designationAct: 'Portaria nº 023/2024-DG',
        designationDate: '2025-04-01',
        startDate: '2025-04-01',
        isActive: true
    },
    {
        id: 'asg-c29',
        contractId: 'cnt-c29',
        fiscalId: 'usr-f10',
        role: 'TITULAR',
        designationAct: 'Portaria nº 018/2025-DG',
        designationDate: '2025-06-01',
        startDate: '2025-06-01',
        isActive: true
    },
    {
        id: 'asg-c30',
        contractId: 'cnt-c30',
        fiscalId: 'usr-f08',
        role: 'TITULAR',
        designationAct: 'Portaria nº 092/2023-DG',
        designationDate: '2025-03-01',
        startDate: '2025-03-01',
        isActive: true
    },
    {
        id: 'asg-c31',
        contractId: 'cnt-c31',
        fiscalId: 'usr-f17',
        role: 'TITULAR',
        designationAct: 'Portaria nº 078/2026-DG',
        designationDate: '2024-01-02',
        startDate: '2024-01-02',
        isActive: true
    },
    {
        id: 'asg-c32',
        contractId: 'cnt-c32',
        fiscalId: 'usr-f02',
        role: 'TITULAR',
        designationAct: 'Portaria nº 054/2026-DG',
        designationDate: '2025-09-10',
        startDate: '2025-09-10',
        isActive: true
    },
    {
        id: 'asg-c33',
        contractId: 'cnt-c33',
        fiscalId: 'usr-f21',
        role: 'TITULAR',
        designationAct: 'Portaria nº 146/2025-DG',
        designationDate: '2025-10-01',
        startDate: '2025-10-01',
        isActive: true
    },
    {
        id: 'asg-c34',
        contractId: 'cnt-c34',
        fiscalId: 'usr-f22',
        role: 'TITULAR',
        designationAct: 'Portaria nº 066/2025-DG',
        designationDate: '2025-10-15',
        startDate: '2025-10-15',
        isActive: true
    },
    {
        id: 'asg-c35',
        contractId: 'cnt-c35',
        fiscalId: 'usr-f20',
        role: 'TITULAR',
        designationAct: 'Portaria nº 088/2026-DG',
        designationDate: '2025-11-08',
        startDate: '2025-11-08',
        isActive: true
    },
    {
        id: 'asg-c36',
        contractId: 'cnt-c36',
        fiscalId: 'usr-f02',
        role: 'TITULAR',
        designationAct: 'Portaria nº 054/2026-DG',
        designationDate: '2026-05-01',
        startDate: '2026-05-01',
        isActive: true
    }
];
const SEED_OCCURRENCES = [
    {
        id: 'occ-1',
        contractId: 'cnt-c01',
        fiscalId: 'usr-f01',
        title: 'Atraso na entrega do Lote 02 de exames',
        description: 'O prestador não enviou os laudos do lote 02 dentro do prazo contratual de 5 dias úteis.',
        severity: 'MEDIUM',
        status: 'RESOLVED',
        resolutionDescription: 'A empresa justificou sobrecarga operacional e entregou os laudos com 3 dias de atraso. Aceito.',
        resolvedById: 'usr-gestor',
        resolvedAt: '2026-03-15T14:30:00Z',
        createdAt: '2026-03-10T09:00:00Z'
    },
    {
        id: 'occ-2',
        contractId: 'cnt-c01',
        fiscalId: 'usr-f01',
        title: 'Inconformidade nos exames audiométricos',
        description: 'Os exames audiométricos de março não foram realizados por profissional habilitado conforme exige a NR-7.',
        severity: 'HIGH',
        status: 'OPEN',
        createdAt: '2026-05-28T10:15:00Z'
    }
];
const SEED_MEASUREMENTS = [
    {
        id: 'msr-1',
        contractId: 'cnt-c01',
        fiscalId: 'usr-f01',
        periodStart: '2026-01-02',
        periodEnd: '2026-02-28',
        measurementValue: 64575.00,
        reportDescription: 'Realização de exames periódicos — 1º bimestre 2026. Todos os laudos recebidos e conferidos.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-03-10T16:00:00Z',
        createdAt: '2026-03-05T11:00:00Z'
    },
    {
        id: 'msr-2',
        contractId: 'cnt-c01',
        fiscalId: 'usr-f01',
        periodStart: '2026-03-01',
        periodEnd: '2026-04-30',
        measurementValue: 64575.00,
        reportDescription: 'Realização de exames periódicos — 2º bimestre 2026. Pendente análise das inconformidades.',
        status: 'PENDING_GESTOR',
        createdAt: '2026-05-20T17:30:00Z'
    },
    {
        id: 'msr-3',
        contractId: 'cnt-c04',
        fiscalId: 'usr-f04',
        periodStart: '2025-12-01',
        periodEnd: '2026-01-31',
        measurementValue: 123750.00,
        reportDescription: 'Fornecimento de benefícios — Jan/2026. Créditos carregados nos cartões conforme relação nominal.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-02-08T10:00:00Z',
        createdAt: '2026-02-05T09:00:00Z'
    },
    {
        id: 'msr-4',
        contractId: 'cnt-c14',
        fiscalId: 'usr-f14',
        periodStart: '2026-02-01',
        periodEnd: '2026-03-31',
        measurementValue: 80000.00,
        reportDescription: 'Serviços de telecomunicações — 1º bimestre 2026. Notas fiscais conferidas e serviços prestados regularmente.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-04-12T14:00:00Z',
        createdAt: '2026-04-08T11:00:00Z'
    },
    {
        id: 'msr-5',
        contractId: 'cnt-c06',
        fiscalId: 'usr-f05',
        periodStart: '2026-03-01',
        periodEnd: '2026-04-30',
        measurementValue: 51000.00,
        reportDescription: 'Serviços de portaria e vigilância — bimestre Mar-Abr/2026. Frequência e relatórios de ronda conferidos.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-05-15T16:00:00Z',
        createdAt: '2026-05-10T13:00:00Z'
    },
    {
        id: 'msr-6',
        contractId: 'cnt-c17',
        fiscalId: 'usr-f17',
        periodStart: '2026-04-01',
        periodEnd: '2026-05-31',
        measurementValue: 44114.73,
        reportDescription: 'Fornecimento de energia elétrica — bimestre Abr-Mai/2026. Faturas conferidas e consumo dentro da variação contratual.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-06-10T09:00:00Z',
        createdAt: '2026-06-05T10:00:00Z'
    },
    {
        id: 'msr-7',
        contractId: 'cnt-c03',
        fiscalId: 'usr-f03',
        periodStart: '2026-05-01',
        periodEnd: '2026-06-30',
        measurementValue: 86400.00,
        reportDescription: 'Serviços de remoção hospitalar — bimestre Mai-Jun/2026. Registro de atendimentos conferido com boletins de ocorrência.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-07-08T11:00:00Z',
        createdAt: '2026-07-03T10:00:00Z'
    },
    {
        id: 'msr-8',
        contractId: 'cnt-c09',
        fiscalId: 'usr-f09',
        periodStart: '2026-01-01',
        periodEnd: '2026-01-31',
        measurementValue: 77000.00,
        reportDescription: 'Serviços logísticos de transporte — Jan/2026. Manifesto de cargas e comprovantes de entrega conferidos.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-02-18T15:00:00Z',
        createdAt: '2026-02-14T10:00:00Z'
    },
    {
        id: 'msr-9',
        contractId: 'cnt-c11',
        fiscalId: 'usr-f11',
        periodStart: '2026-03-01',
        periodEnd: '2026-03-31',
        measurementValue: 40500.00,
        reportDescription: 'Licença de uso do sistema ERP — Mar/2026. Disponibilidade do sistema verificada: 99,2%.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-04-20T11:00:00Z',
        createdAt: '2026-04-16T09:00:00Z'
    },
    {
        id: 'msr-10',
        contractId: 'cnt-c05',
        fiscalId: 'usr-f05',
        periodStart: '2026-04-01',
        periodEnd: '2026-04-30',
        measurementValue: 66542.00,
        reportDescription: 'Fornecimento de benefícios alimentação — Abr/2026. Créditos efetuados em D+1 conforme contrato.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-05-22T14:00:00Z',
        createdAt: '2026-05-18T10:00:00Z'
    },
    {
        id: 'msr-11',
        contractId: 'cnt-c14',
        fiscalId: 'usr-f14',
        periodStart: '2026-04-01',
        periodEnd: '2026-05-31',
        measurementValue: 80000.00,
        reportDescription: 'Serviços de telecomunicações — 2º bimestre 2026. SLA de disponibilidade: 99,7%. Conferido.',
        status: 'APPROVED',
        approvedById: 'usr-gestor',
        approvalDate: '2026-06-18T10:00:00Z',
        createdAt: '2026-06-14T09:00:00Z'
    },
    {
        id: 'msr-12',
        contractId: 'cnt-c06',
        fiscalId: 'usr-f05',
        periodStart: '2026-05-01',
        periodEnd: '2026-06-30',
        measurementValue: 51000.00,
        reportDescription: 'Serviços de portaria e limpeza — Mai-Jun/2026. Escala de plantão e relatório de supervisão conferidos.',
        status: 'PENDING_GESTOR',
        createdAt: '2026-07-10T10:00:00Z'
    }
];
const SEED_ALTERATIONS = [
    {
        id: 'alt-1',
        contractId: 'cnt-c04',
        type: 'ADDENDUM_VALUE_INCREASE',
        alterationNumber: '1º Termo Aditivo',
        valueChange: 135000.00,
        justification: 'Acréscimo de beneficiários por incorporação de novos servidores e dependentes no exercício 2025.',
        status: 'APPROVED',
        requestedById: 'usr-f04',
        reviewedById: 'usr-gestor',
        reviewDate: '2025-06-10T10:00:00Z',
        reviewNotes: 'Aprovado conforme Parecer Jurídico nº 22/2025.',
        createdAt: '2025-06-01T14:00:00Z'
    }
];
const SEED_ALERTS = [
    {
        id: 'al-1',
        contractId: 'cnt-c01',
        type: 'OCCURRENCE_CRITICAL',
        message: 'Ocorrência de alta gravidade: Inconformidade em exames audiométricos no Contrato 032/2023 (SESI).',
        targetRole: 'GESTOR',
        isRead: false,
        createdAt: '2026-05-28T10:15:00Z'
    },
    {
        id: 'al-2',
        contractId: 'cnt-c01',
        type: 'MEASUREMENT_PENDING',
        message: 'Medição pendente de homologação no valor de R$ 64.575,00 para o Contrato 032/2023 (SESI).',
        targetRole: 'GESTOR',
        isRead: false,
        createdAt: '2026-05-20T17:30:00Z'
    }
];
const SEED_PROCESS_PHASES = [
    // prc-c01 (CONCLUDED) — todas as fases concluídas
    ...[
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ].map((n)=>({
            id: `phase-c01-${n}`,
            processId: 'prc-c01',
            phaseNumber: n,
            name: PHASE_NAMES[n - 1],
            status: 'COMPLETED',
            plannedStart: `2023-0${Math.min(9, 5 + Math.floor((n - 1) / 2))}-01`,
            plannedEnd: `2023-0${Math.min(9, 5 + Math.floor((n - 1) / 2))}-28`,
            actualStart: `2023-0${Math.min(9, 5 + Math.floor((n - 1) / 2))}-01`,
            actualEnd: `2023-0${Math.min(9, 5 + Math.floor((n - 1) / 2))}-25`,
            responsibleId: 'usr-f01',
            isActive: true,
            createdAt: '2023-06-01T00:00:00Z',
            updatedAt: '2023-12-01T00:00:00Z'
        })),
    // prc-c13 (nova contratação em andamento) — fase 1 concluída, fase 2 em andamento
    {
        id: 'phase-c13-1',
        processId: 'prc-c13',
        phaseNumber: 1,
        name: PHASE_NAMES[0],
        status: 'COMPLETED',
        plannedStart: '2026-04-01',
        plannedEnd: '2026-04-30',
        actualStart: '2026-04-01',
        actualEnd: '2026-04-28',
        responsibleId: 'usr-f11',
        isActive: true,
        createdAt: '2026-04-01T00:00:00Z',
        updatedAt: '2026-04-28T00:00:00Z'
    },
    {
        id: 'phase-c13-2',
        processId: 'prc-c13',
        phaseNumber: 2,
        name: PHASE_NAMES[1],
        status: 'IN_PROGRESS',
        plannedStart: '2026-05-01',
        plannedEnd: '2026-06-15',
        actualStart: '2026-05-05',
        responsibleId: 'usr-f11',
        observations: 'ETP em elaboração. Aguardando cotações de mercado.',
        isActive: true,
        createdAt: '2026-04-01T00:00:00Z',
        updatedAt: '2026-05-05T00:00:00Z'
    },
    ...[
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ].map((n)=>({
            id: `phase-c13-${n}`,
            processId: 'prc-c13',
            phaseNumber: n,
            name: PHASE_NAMES[n - 1],
            status: 'PENDING',
            responsibleId: 'usr-f11',
            isActive: true,
            createdAt: '2026-04-01T00:00:00Z',
            updatedAt: '2026-04-01T00:00:00Z'
        }))
];
const SEED_COMMUNICATIONS = [
    {
        id: 'comm-1',
        contractId: 'cnt-c01',
        senderId: 'usr-gestor',
        recipientId: 'usr-f01',
        subject: 'Início da fiscalização — Contrato 032/2023 SESI',
        message: 'Prezado(a) Rogério B. da Silva, favor iniciar os registros mensais de fiscalização e atentar-se ao cumprimento dos prazos de entrega dos laudos.',
        isMandatory: false,
        readBy: [
            'usr-gestor',
            'usr-f01'
        ],
        createdAt: '2024-01-03T09:00:00Z'
    },
    {
        id: 'comm-2',
        contractId: 'cnt-c01',
        senderId: 'usr-gestor',
        subject: 'URGENTE — Relatório de Fiscalização Semestral 2026',
        message: 'Todos os fiscais devem submeter o relatório de fiscalização semestral até o dia 30/06/2026. O não cumprimento será registrado no processo administrativo.',
        isMandatory: true,
        readBy: [
            'usr-gestor'
        ],
        createdAt: '2026-06-01T08:00:00Z'
    }
];
const SEED_AUDIT_LOGS = [
    {
        id: 'aud-1',
        userId: 'usr-gestor',
        userName: 'Jairo',
        userRole: 'GESTOR',
        action: 'CREATE',
        entity: 'Contract',
        entityId: 'cnt-c01',
        entityLabel: 'Contrato 032/2023 — SESI',
        createdAt: '2024-01-02T10:00:00Z'
    },
    {
        id: 'aud-2',
        userId: 'usr-f01',
        userName: 'Rogério B. da Silva',
        userRole: 'FISCAL',
        action: 'CREATE',
        entity: 'Occurrence',
        entityId: 'occ-2',
        entityLabel: 'Inconformidade em exames audiométricos',
        createdAt: '2026-05-28T10:15:00Z'
    },
    {
        id: 'aud-3',
        userId: 'usr-gestor',
        userName: 'Jairo',
        userRole: 'GESTOR',
        action: 'APPROVE',
        entity: 'Measurement',
        entityId: 'msr-1',
        entityLabel: 'Medição Jan-Fev/2026 — R$ 64.575',
        createdAt: '2026-03-10T16:00:00Z',
        changes: {
            status: {
                from: 'PENDING_GESTOR',
                to: 'APPROVED'
            }
        }
    },
    {
        id: 'aud-4',
        userId: 'usr-gestor',
        userName: 'Jairo',
        userRole: 'GESTOR',
        action: 'APPROVE',
        entity: 'Alteration',
        entityId: 'alt-1',
        entityLabel: '1º Termo Aditivo — R$ 135.000 (PLUXEE)',
        createdAt: '2025-06-10T10:00:00Z',
        changes: {
            status: {
                from: 'PENDING_APPROVAL',
                to: 'APPROVED'
            }
        }
    },
    {
        id: 'aud-5',
        userId: 'usr-f01',
        userName: 'Rogério B. da Silva',
        userRole: 'FISCAL',
        action: 'CREATE',
        entity: 'Measurement',
        entityId: 'msr-2',
        entityLabel: 'Medição Mar-Abr/2026 — R$ 64.575',
        createdAt: '2026-05-20T17:30:00Z'
    },
    {
        id: 'aud-6',
        userId: 'usr-admin',
        userName: 'Ricardo Augusto',
        userRole: 'ADMIN',
        action: 'LOGIN',
        entity: 'Session',
        entityId: 'sess-1',
        entityLabel: 'Login realizado',
        createdAt: '2026-06-10T08:00:00Z'
    }
];
const SEED_AI_INSIGHTS = [
    {
        id: 'ai-1',
        type: 'RISK',
        severity: 'WARNING',
        title: 'Contrato próximo do vencimento',
        description: 'O contrato IQUEGO-CTR-2025/00052 vence em aproximadamente 150 dias. Recomenda-se iniciar processo de prorrogação ou nova contratação.',
        contractId: 'cnt-52',
        confidence: 0.94,
        suggestedAction: 'Abrir processo de renovação com 180 dias de antecedência.',
        createdAt: '2026-06-10T06:00:00Z'
    },
    {
        id: 'ai-2',
        type: 'ALERT',
        severity: 'CRITICAL',
        title: 'Ocorrência de alta gravidade sem resposta',
        description: 'A ocorrência "Divergência em laudo de pureza química" está aberta há 13 dias sem resolução. Contratos com ocorrências críticas abertas aumentam risco de autuação.',
        contractId: 'cnt-45',
        confidence: 0.89,
        suggestedAction: 'Acionar fiscalização imediata e solicitar laudo contraditório.',
        createdAt: '2026-06-10T06:00:00Z'
    },
    {
        id: 'ai-3',
        type: 'PREDICTION',
        severity: 'WARNING',
        title: 'Processo pode ter atraso na fase 1',
        description: 'O processo IQUEGO-PRC-2026/00140 está 10 dias após o prazo planejado para a Fase 1. Com base em processos similares, há 72% de chance de impactar o cronograma geral.',
        processId: 'prc-140',
        confidence: 0.72,
        suggestedAction: 'Priorizar conclusão do Estudo Técnico Preliminar esta semana.',
        createdAt: '2026-06-10T06:00:00Z'
    },
    {
        id: 'ai-4',
        type: 'SUGGESTION',
        severity: 'INFO',
        title: 'Medição aguardando aprovação há 9 dias',
        description: 'A medição de junho do contrato IQUEGO-CTR-2026/00045 está aguardando homologação. O prazo médio de aprovação neste contrato é de 5 dias.',
        contractId: 'cnt-45',
        confidence: 0.85,
        suggestedAction: 'Revisar e homologar a medição de R$ 125.000.',
        createdAt: '2026-06-10T06:00:00Z'
    }
];
// ── LocalDB ────────────────────────────────────────────────────────────────────
const SEED_DOCUMENTS = [
    {
        id: 'doc-c01-1',
        contractId: 'ctr-c01',
        title: 'Contrato Assinado.pdf',
        category: 'CONTRACT_SIGNED',
        fileSize: 3415020,
        mimeType: 'application/pdf',
        uploadedById: 'usr-gestor',
        createdAt: '2023-03-01T00:00:00Z'
    },
    {
        id: 'doc-c02-1',
        contractId: 'ctr-c02',
        title: 'Contrato Assinado.pdf',
        category: 'CONTRACT_SIGNED',
        fileSize: 2980000,
        mimeType: 'application/pdf',
        uploadedById: 'usr-gestor',
        createdAt: '2023-03-01T00:00:00Z'
    },
    {
        id: 'doc-c03-1',
        contractId: 'ctr-c03',
        title: 'Contrato Assinado.pdf',
        category: 'CONTRACT_SIGNED',
        fileSize: 1540000,
        mimeType: 'application/pdf',
        uploadedById: 'usr-gestor',
        createdAt: '2022-01-12T00:00:00Z'
    }
];
const DB_VERSION = '3.4';
function getLocalDB() {
    const blank = {
        users: SEED_USERS,
        contractors: SEED_CONTRACTORS,
        processes: SEED_PROCESSES,
        contracts: SEED_CONTRACTS,
        assignments: SEED_ASSIGNMENTS,
        occurrences: SEED_OCCURRENCES,
        measurements: SEED_MEASUREMENTS,
        alterations: SEED_ALTERATIONS,
        alerts: SEED_ALERTS,
        contractAlerts: [],
        processPhases: SEED_PROCESS_PHASES,
        communications: SEED_COMMUNICATIONS,
        auditLogs: SEED_AUDIT_LOGS,
        aiInsights: SEED_AI_INSIGHTS,
        documents: SEED_DOCUMENTS
    };
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Reset localStorage when seed data changes (version bump)
    if (localStorage.getItem('sigecontratos_db_version') !== DB_VERSION) {
        localStorage.setItem('sigecontratos_db', JSON.stringify(blank));
        localStorage.setItem('sigecontratos_db_version', DB_VERSION);
        return blank;
    }
    const raw = localStorage.getItem('sigecontratos_db');
    if (!raw) {
        localStorage.setItem('sigecontratos_db', JSON.stringify(blank));
        return blank;
    }
    const db = JSON.parse(raw);
    if (!db.contractAlerts) db.contractAlerts = [];
    if (!db.processPhases) db.processPhases = [
        ...SEED_PROCESS_PHASES
    ];
    if (!db.communications) db.communications = [
        ...SEED_COMMUNICATIONS
    ];
    if (!db.auditLogs) db.auditLogs = [
        ...SEED_AUDIT_LOGS
    ];
    if (!db.aiInsights) db.aiInsights = [
        ...SEED_AI_INSIGHTS
    ];
    return db;
}
function saveLocalDB(data) {
    if ("TURBOPACK compile-time truthy", 1) localStorage.setItem('sigecontratos_db', JSON.stringify(data));
}
function getStoredToken() {
    return ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('sigecontratos_token') : "TURBOPACK unreachable";
}
function setStoredToken(t) {
    if ("TURBOPACK compile-time truthy", 1) t ? localStorage.setItem('sigecontratos_token', t) : localStorage.removeItem('sigecontratos_token');
}
function getStoredUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const u = localStorage.getItem('sigecontratos_user');
    return u ? JSON.parse(u) : null;
}
function setStoredUser(user) {
    if ("TURBOPACK compile-time truthy", 1) user ? localStorage.setItem('sigecontratos_user', JSON.stringify(user)) : localStorage.removeItem('sigecontratos_user');
}
// ── Helpers ────────────────────────────────────────────────────────────────────
function daysUntil(d) {
    return Math.ceil((new Date(d.length === 10 ? d + 'T12:00:00Z' : d).getTime() - Date.now()) / 86400000);
}
function daysSince(d) {
    return Math.ceil((Date.now() - new Date(d).getTime()) / 86400000);
}
function fmtDate(d) {
    try {
        return new Date(d.length === 10 ? d + 'T12:00:00Z' : d).toLocaleDateString('pt-BR');
    } catch  {
        return d;
    }
}
function fmtCur(v) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(v);
}
function createDefaultPhases(processId) {
    return PHASE_NAMES.map((name, i)=>({
            id: `ph-${processId}-${i + 1}`,
            processId,
            phaseNumber: i + 1,
            name,
            status: 'PENDING',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));
}
function logAudit(db, user, action, entity, entityId, entityLabel, now, changes) {
    if (!db.auditLogs) db.auditLogs = [];
    db.auditLogs.push({
        id: `audit-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action,
        entity,
        entityId,
        entityLabel,
        changes: changes || {},
        createdAt: now
    });
}
function notifyActiveFiscais(db, contractId, title, message) {
    if (!db.contractAlerts) db.contractAlerts = [];
    const now = new Date().toISOString();
    const activeFiscais = (db.assignments || []).filter((a)=>a.contractId === contractId && a.isActive);
    for (const asg of activeFiscais){
        db.contractAlerts.push({
            id: `notif-${Date.now()}-${asg.fiscalId}-${Math.random().toString(36).slice(2)}`,
            contractId,
            targetUserId: asg.fiscalId,
            type: 'GESTOR_CONTRACT_UPDATE',
            status: 'PENDING',
            title,
            message,
            createdAt: now,
            updatedAt: now
        });
    }
}
// ── Motor de Alertas ───────────────────────────────────────────────────────────
function runAlertEngine(db) {
    const newAlerts = [];
    const existing = db.contractAlerts || [];
    const dup = (check)=>existing.some(check) || newAlerts.some(check);
    const pushIf = (cond, alert)=>{
        if (cond) newAlerts.push(alert);
    };
    for (const c of db.contracts.filter((c)=>c.status === 'ACTIVE')){
        const dtEnd = daysUntil(c.endDate);
        const asgmts = db.assignments.filter((a)=>a.contractId === c.id && a.isActive);
        const gestores = db.users.filter((u)=>u.role === 'GESTOR');
        // Alerta 1: 180 dias → Fiscal
        if (dtEnd > 0 && dtEnd <= 180) {
            for (const a of asgmts){
                pushIf(!dup((x)=>x.contractId === c.id && x.type === 'CONTRACT_EXPIRING_180' && x.targetUserId === a.fiscalId), {
                    id: `cal-180-${c.id}-${a.fiscalId}`,
                    contractId: c.id,
                    targetUserId: a.fiscalId,
                    type: 'CONTRACT_EXPIRING_180',
                    status: 'PENDING',
                    title: 'ATENÇÃO — Contrato se encerra em breve',
                    message: `O contrato ${c.contractNumber} encerra em ${dtEnd} dia${dtEnd !== 1 ? 's' : ''} (${fmtDate(c.endDate)}). Informe a providência desejada.`,
                    metadata: {
                        contractNumber: c.contractNumber,
                        daysUntilEnd: dtEnd,
                        contractId: c.id
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
        }
        // Alerta 2: 90 dias → Fiscal + Gestor (somente se prorrogação aprovada)
        if (dtEnd > 0 && dtEnd <= 90 && existing.some((x)=>x.contractId === c.id && x.type === 'RENEWAL_REQUESTED' && x.response === 'APPROVE')) {
            for (const a of asgmts){
                pushIf(!dup((x)=>x.contractId === c.id && x.type === 'CONTRACT_EXPIRING_90' && x.targetUserId === a.fiscalId), {
                    id: `cal-90f-${c.id}-${a.fiscalId}`,
                    contractId: c.id,
                    targetUserId: a.fiscalId,
                    type: 'CONTRACT_EXPIRING_90',
                    status: 'PENDING',
                    title: 'URGENTE — Providenciar Termo Aditivo',
                    message: `O contrato ${c.contractNumber} encerra em ${dtEnd} dias. Providencie o Termo Aditivo de prorrogação.`,
                    metadata: {
                        contractId: c.id,
                        contractNumber: c.contractNumber,
                        daysUntilEnd: dtEnd
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
            for (const g of gestores){
                pushIf(!dup((x)=>x.contractId === c.id && x.type === 'CONTRACT_EXPIRING_90' && x.targetUserId === g.id), {
                    id: `cal-90g-${c.id}-${g.id}`,
                    contractId: c.id,
                    targetUserId: g.id,
                    type: 'CONTRACT_EXPIRING_90',
                    status: 'PENDING',
                    title: 'URGENTE — Termo Aditivo Pendente',
                    message: `O contrato ${c.contractNumber} encerra em ${dtEnd} dias e o Termo Aditivo de prorrogação não foi formalizado.`,
                    metadata: {
                        contractId: c.id,
                        contractNumber: c.contractNumber,
                        daysUntilEnd: dtEnd
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
        }
        // Alerta 3: Medição pendente > 5 dias → Gestor
        for (const m of db.measurements.filter((m)=>m.contractId === c.id && m.status === 'PENDING_GESTOR')){
            if (daysSince(m.createdAt) >= 5) {
                for (const g of gestores){
                    pushIf(!dup((x)=>x.type === 'MEASUREMENT_OVERDUE' && x.metadata?.measurementId === m.id), {
                        id: `cal-msr-${m.id}-${g.id}`,
                        contractId: c.id,
                        targetUserId: g.id,
                        type: 'MEASUREMENT_OVERDUE',
                        status: 'PENDING',
                        title: 'Medição com Homologação Pendente',
                        message: `A medição de ${fmtCur(Number(m.measurementValue))} do contrato ${c.contractNumber} aguarda homologação há ${daysSince(m.createdAt)} dias.`,
                        metadata: {
                            measurementId: m.id,
                            contractId: c.id,
                            contractNumber: c.contractNumber
                        },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                }
            }
        }
        // Alerta 4: Ocorrência crítica/grave aberta > 7 dias → Gestor
        for (const o of db.occurrences.filter((o)=>o.contractId === c.id && o.status !== 'RESOLVED' && (o.severity === 'CRITICAL' || o.severity === 'HIGH'))){
            if (daysSince(o.createdAt) >= 7) {
                for (const g of gestores){
                    pushIf(!dup((x)=>x.type === 'OCCURRENCE_CRITICAL_OPEN' && x.metadata?.occurrenceId === o.id), {
                        id: `cal-occ-${o.id}-${g.id}`,
                        contractId: c.id,
                        targetUserId: g.id,
                        type: 'OCCURRENCE_CRITICAL_OPEN',
                        status: 'PENDING',
                        title: `Ocorrência ${o.severity === 'CRITICAL' ? 'Crítica' : 'Grave'} sem Resolução`,
                        message: `"${o.title}" está aberta há ${daysSince(o.createdAt)} dias no contrato ${c.contractNumber}.`,
                        metadata: {
                            occurrenceId: o.id,
                            contractId: c.id,
                            contractNumber: c.contractNumber
                        },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                }
            }
        }
        // Alerta 5: Aditivo pendente > 7 dias → Gestor
        for (const alt of db.alterations.filter((a)=>a.contractId === c.id && a.status === 'PENDING_APPROVAL')){
            if (daysSince(alt.createdAt) >= 7) {
                for (const g of gestores){
                    pushIf(!dup((x)=>x.type === 'ALTERATION_OVERDUE' && x.metadata?.alterationId === alt.id), {
                        id: `cal-alt-${alt.id}-${g.id}`,
                        contractId: c.id,
                        targetUserId: g.id,
                        type: 'ALTERATION_OVERDUE',
                        status: 'PENDING',
                        title: 'Termo Aditivo Pendente de Aprovação',
                        message: `"${alt.alterationNumber || alt.type}" do contrato ${c.contractNumber} aguarda aprovação há ${daysSince(alt.createdAt)} dias.`,
                        metadata: {
                            alterationId: alt.id,
                            contractId: c.id,
                            contractNumber: c.contractNumber
                        },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                }
            }
        }
    }
    // Alerta 6: Fase do processo em atraso → Gestor
    for (const ph of db.processPhases || []){
        if (ph.plannedEnd && ph.status !== 'COMPLETED' && ph.status !== 'BLOCKED' && daysUntil(ph.plannedEnd) < 0) {
            const proc = db.processes.find((p)=>p.id === ph.processId);
            if (proc && proc.status !== 'CONCLUDED' && proc.status !== 'CANCELED') {
                for (const g of db.users.filter((u)=>u.role === 'GESTOR')){
                    pushIf(!dup((x)=>x.type === 'PROCESS_PHASE_OVERDUE' && x.metadata?.phaseId === ph.id), {
                        id: `cal-phase-${ph.id}-${g.id}`,
                        processId: ph.processId,
                        targetUserId: g.id,
                        type: 'PROCESS_PHASE_OVERDUE',
                        status: 'PENDING',
                        title: 'Fase do Processo em Atraso',
                        message: `A fase "${ph.name}" do processo ${proc.processNumber} ultrapassou o prazo em ${Math.abs(daysUntil(ph.plannedEnd))} dias.`,
                        metadata: {
                            phaseId: ph.id,
                            processId: ph.processId,
                            phaseName: ph.name,
                            processNumber: proc.processNumber
                        },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                }
            }
        }
    }
    // Alerta 7: Comunicado obrigatório não lido → Fiscal
    for (const comm of (db.communications || []).filter((c)=>c.isMandatory)){
        const asgmts = db.assignments.filter((a)=>a.contractId === comm.contractId && a.isActive);
        const targets = comm.recipientId ? [
            comm.recipientId
        ] : asgmts.map((a)=>a.fiscalId);
        for (const fiscalId of targets){
            if (!(comm.readBy || []).includes(fiscalId)) {
                pushIf(!dup((x)=>x.type === 'COMMUNICATION_MANDATORY' && x.metadata?.communicationId === comm.id && x.targetUserId === fiscalId), {
                    id: `cal-comm-${comm.id}-${fiscalId}`,
                    contractId: comm.contractId,
                    targetUserId: fiscalId,
                    type: 'COMMUNICATION_MANDATORY',
                    status: 'PENDING',
                    title: 'Comunicado Obrigatório — Leitura Pendente',
                    message: comm.subject,
                    metadata: {
                        communicationId: comm.id,
                        subject: comm.subject,
                        fullMessage: comm.message,
                        senderName: db.users.find((u)=>u.id === comm.senderId)?.name || 'Gestor'
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
        }
    }
    return newAlerts;
}
// ── Resposta a Alerta ──────────────────────────────────────────────────────────
function processAlertResponse(alertId, response, db, user) {
    const alert = db.contractAlerts.find((a)=>a.id === alertId);
    if (!alert) throw new Error('Alerta não encontrado (Simulado)');
    alert.status = 'RESPONDED';
    alert.response = response;
    alert.respondedAt = new Date().toISOString();
    alert.respondedById = user.id;
    alert.updatedAt = new Date().toISOString();
    const contract = alert.contractId ? db.contracts.find((c)=>c.id === alert.contractId) : null;
    const now = new Date().toISOString();
    if (alert.type === 'CONTRACT_EXPIRING_180' && response === 'EXTEND_CONTRACT') {
        for (const g of db.users.filter((u)=>u.role === 'GESTOR')){
            db.contractAlerts.push({
                id: `cal-renew-${Date.now()}-${g.id}`,
                contractId: alert.contractId,
                targetUserId: g.id,
                type: 'RENEWAL_REQUESTED',
                status: 'PENDING',
                title: 'Solicitação de Prorrogação Pendente',
                message: `O Fiscal ${user.name} solicitou prorrogação do contrato ${contract?.contractNumber}. Informe a providência.`,
                metadata: {
                    contractId: alert.contractId,
                    contractNumber: contract?.contractNumber,
                    fiscalId: user.id,
                    fiscalName: user.name
                },
                createdAt: now,
                updatedAt: now
            });
        }
    }
    if (alert.type === 'CONTRACT_EXPIRING_180' && response === 'NEW_PROCESS') {
        const newProcId = `prc-auto-${Date.now()}`;
        const np = {
            id: newProcId,
            processNumber: `IQUEGO-PRC-${new Date().getFullYear()}/${String(Date.now()).slice(-5)}`,
            subject: `Nova contratação — substituição do contrato ${contract?.contractNumber}`,
            description: `Processo iniciado automaticamente por ${user.name} em virtude do encerramento do contrato ${contract?.contractNumber}.`,
            status: 'PLANNING',
            modality: 'LICITACAO_13303',
            estimatedValue: contract?.currentValue ?? 0,
            requesterDepartment: 'Iniciativa Automática — SIGECONTRATOS',
            requesterId: user.id
        };
        db.processes.push(np);
        db.processPhases = [
            ...db.processPhases || [],
            ...createDefaultPhases(newProcId)
        ];
        for (const g of db.users.filter((u)=>u.role === 'GESTOR')){
            db.contractAlerts.push({
                id: `cal-newp-${Date.now()}-${g.id}`,
                processId: newProcId,
                contractId: alert.contractId,
                targetUserId: g.id,
                type: 'NEW_PROCESS_AUTO_CREATED',
                status: 'PENDING',
                title: 'Novo Processo Criado Automaticamente',
                message: `O Fiscal ${user.name} optou por nova contratação. Processo ${np.processNumber} criado em Planejamento.`,
                metadata: {
                    processId: newProcId,
                    processNumber: np.processNumber,
                    contractNumber: contract?.contractNumber
                },
                createdAt: now,
                updatedAt: now
            });
        }
    }
    if (alert.type === 'RENEWAL_REQUESTED' && response === 'APPROVE') {
        for (const a of db.assignments.filter((a)=>a.contractId === alert.contractId && a.isActive)){
            db.contractAlerts.push({
                id: `cal-rok-${Date.now()}-${a.fiscalId}`,
                contractId: alert.contractId,
                targetUserId: a.fiscalId,
                type: 'RENEWAL_APPROVED',
                status: 'PENDING',
                title: 'Prorrogação Aprovada — Providenciar Termo Aditivo',
                message: `O Gestor aprovou a prorrogação do contrato ${contract?.contractNumber}. Providencie o Termo Aditivo de extensão de prazo.`,
                metadata: {
                    contractId: alert.contractId,
                    contractNumber: contract?.contractNumber
                },
                createdAt: now,
                updatedAt: now
            });
        }
    }
    if (alert.type === 'RENEWAL_REQUESTED' && response === 'REJECT') {
        const newProcId = `prc-auto-${Date.now()}`;
        const np = {
            id: newProcId,
            processNumber: `IQUEGO-PRC-${new Date().getFullYear()}/${String(Date.now()).slice(-5)}`,
            subject: `Nova contratação — substituição do contrato ${contract?.contractNumber}`,
            description: `Processo criado após rejeição de prorrogação para o contrato ${contract?.contractNumber}.`,
            status: 'PLANNING',
            modality: 'LICITACAO_13303',
            estimatedValue: contract?.currentValue ?? 0,
            requesterDepartment: 'Iniciativa Automática — SIGECONTRATOS',
            requesterId: user.id
        };
        db.processes.push(np);
        db.processPhases = [
            ...db.processPhases || [],
            ...createDefaultPhases(newProcId)
        ];
        for (const a of db.assignments.filter((a)=>a.contractId === alert.contractId && a.isActive)){
            db.contractAlerts.push({
                id: `cal-rno-${Date.now()}-${a.fiscalId}`,
                contractId: alert.contractId,
                processId: newProcId,
                targetUserId: a.fiscalId,
                type: 'NEW_PROCESS_AUTO_CREATED',
                status: 'PENDING',
                title: 'Prorrogação Rejeitada — Novo Processo Iniciado',
                message: `O Gestor rejeitou a prorrogação do contrato ${contract?.contractNumber}. Processo ${np.processNumber} criado automaticamente.`,
                metadata: {
                    processId: newProcId,
                    processNumber: np.processNumber,
                    contractNumber: contract?.contractNumber
                },
                createdAt: now,
                updatedAt: now
            });
        }
    }
    if (alert.type === 'COMMUNICATION_MANDATORY' && response === 'ACKNOWLEDGED') {
        const comm = db.communications.find((c)=>c.id === alert.metadata?.communicationId);
        if (comm) {
            if (!comm.readBy) comm.readBy = [];
            if (!comm.readBy.includes(user.id)) comm.readBy.push(user.id);
        }
    }
    saveLocalDB(db);
    return alert;
}
// ── Requisição HTTP ────────────────────────────────────────────────────────────
// O frontend usa /api/* — o Next.js proxy (next.config.ts rewrites) encaminha
// esses requests para o backend NestJS em localhost:3001 no servidor.
// Isso funciona para todos os usuários da intranet sem hardcodar IPs.
const BACKEND_URL = '/api';
// Endpoints de CRUD real que devem ir direto ao backend (sem fallback localStorage)
const REAL_CRUD_PREFIXES = [
    '/auth/',
    '/users',
    '/contractors',
    '/contracts',
    '/processes',
    '/occurrences',
    '/measurements',
    '/alterations',
    '/communications',
    '/payments'
];
async function request(endpoint, options = {}) {
    const token = getStoredToken();
    const headers = {
        'Content-Type': 'application/json',
        ...token ? {
            Authorization: `Bearer ${token}`
        } : {},
        ...options.headers
    };
    try {
        const res = await fetch(`${BACKEND_URL}${endpoint}`, {
            ...options,
            headers
        });
        if (res.status === 401) {
            setStoredToken(null);
            setStoredUser(null);
            throw new Error('Não autorizado');
        }
        if (!res.ok) {
            const e = await res.json().catch(()=>({}));
            throw new Error(e.message || 'Erro na requisição');
        }
        return await res.json();
    } catch (error) {
        if (error.message === 'Não autorizado') throw error;
        // Endpoints de CRUD real: propagam o erro sem fallback
        const isRealEndpoint = REAL_CRUD_PREFIXES.some((p)=>endpoint.startsWith(p));
        if (isRealEndpoint) throw new Error(error.message || 'Backend indisponível');
        // Endpoints computados (dashboard, painel de risco, alertas, IA): fallback local
        return await handleLocalFallback(endpoint, options, error.message);
    }
}
// ── Fallback para Endpoints Computados ────────────────────────────────────────
// Endpoints como /dashboard/gestor, /risk-panel e /alerts não existem no backend —
// são calculados no cliente. Este fallback busca dados reais do backend e computa.
// Cache de módulo: evita múltiplas chamadas simultâneas ao backend (TTL = 5 min)
let _liveDBCache = null;
let _liveDBInFlight = null;
const LIVE_DB_TTL = 300_000;
async function fetchLiveDB() {
    const now = Date.now();
    if (_liveDBCache && now - _liveDBCache.ts < LIVE_DB_TTL) return _liveDBCache.data;
    if (_liveDBInFlight) return _liveDBInFlight;
    _liveDBInFlight = (async ()=>{
        try {
            const token = getStoredToken();
            const h = {
                'Content-Type': 'application/json',
                ...token ? {
                    Authorization: `Bearer ${token}`
                } : {}
            };
            const get = async (path)=>{
                try {
                    const r = await fetch(`${BACKEND_URL}${path}`, {
                        headers: h
                    });
                    return r.ok ? r.json() : null;
                } catch  {
                    return null;
                }
            };
            const [users, contractors, contracts, processes] = await Promise.all([
                get('/users'),
                get('/contractors'),
                get('/contracts'),
                get('/processes')
            ]);
            const local = getLocalDB();
            let result;
            if (users && contracts) {
                const normContracts = contracts.map((c)=>({
                        ...c,
                        initialValue: Number(c.initialValue) || 0,
                        currentValue: Number(c.currentValue) || 0
                    }));
                const normProcesses = (processes || []).map((p)=>({
                        ...p,
                        estimatedValue: Number(p.estimatedValue) || 0
                    }));
                const assignments = normContracts.flatMap((c)=>c.fiscalAssignments || []);
                const occurrences = normContracts.flatMap((c)=>c.occurrences || []);
                const measurements = normContracts.flatMap((c)=>(c.measurements || []).map((m)=>({
                            ...m,
                            measurementValue: Number(m.measurementValue) || 0
                        })));
                const alterations = normContracts.flatMap((c)=>c.alterations || []);
                const processPhases = normProcesses.flatMap((p)=>p.phases || []);
                result = {
                    users: users || [],
                    contractors: contractors || [],
                    contracts: normContracts,
                    processes: normProcesses,
                    assignments,
                    occurrences,
                    measurements,
                    alterations,
                    processPhases,
                    contractAlerts: local.contractAlerts || [],
                    communications: normContracts.flatMap((c)=>c.communications || []),
                    auditLogs: local.auditLogs || [],
                    aiInsights: local.aiInsights || [],
                    alerts: local.alerts || [],
                    documents: local.documents || []
                };
            } else {
                result = local;
            }
            _liveDBCache = {
                data: result,
                ts: Date.now()
            };
            return result;
        } finally{
            _liveDBInFlight = null;
        }
    })();
    return _liveDBInFlight;
}
async function handleLocalFallback(endpoint, options = {}, originalError) {
    // Para endpoints computados, tenta buscar dados reais do backend
    const isComputed = [
        '/dashboard',
        '/risk-panel',
        '/pending-dashboard',
        '/alerts'
    ].some((p)=>endpoint.startsWith(p));
    const db = isComputed ? await fetchLiveDB() : getLocalDB();
    const user = getStoredUser();
    const method = options.method || 'GET';
    // Login
    if (endpoint === '/auth/login' && method === 'POST') {
        const body = JSON.parse(options.body);
        const found = db.users.find((u)=>u.email === body.email);
        if (!found) throw new Error('E-mail ou senha incorretos');
        const pass = body.password ?? body.passwordHash ?? '';
        const ok = pass === '123' || found._passwordOverride && pass === found._passwordOverride || found.role === 'ADMIN' && pass === 'admin123' || found.role === 'GESTOR' && pass === 'gestor123' || found.role === 'FISCAL' && pass === 'fiscal123' || found.role === 'ALTA_GESTAO' && pass === 'alta123';
        if (!ok) throw new Error('E-mail ou senha incorretos');
        return {
            access_token: 'local-jwt-simulated',
            user: found
        };
    }
    if (!user) throw new Error('Não autorizado');
    const storedToken = getStoredToken();
    const isRealBackendToken = storedToken && storedToken !== 'local-jwt-simulated';
    if (!isRealBackendToken) {
        // Modo offline: valida sessão contra seed local
        const dbUser = db.users.find((u)=>u.id === user.id);
        if (!dbUser || dbUser.role !== user.role) {
            setStoredToken(null);
            setStoredUser(null);
            throw new Error('Sessão inválida. Faça login novamente.');
        }
        if (dbUser.status !== 'ACTIVE') {
            setStoredToken(null);
            setStoredUser(null);
            throw new Error('Usuário inativo. Contate o administrador.');
        }
    }
    // ── Alertas ──────────────────────────────────────────────────────────────────
    if (endpoint === '/alerts' && method === 'GET') {
        return (db.contractAlerts || []).filter((a)=>a.targetUserId === user.id && a.status === 'PENDING');
    }
    if (endpoint === '/alerts/run-engine' && method === 'POST') {
        const newAlerts = runAlertEngine(db);
        if (newAlerts.length > 0) {
            db.contractAlerts = [
                ...db.contractAlerts || [],
                ...newAlerts
            ];
            saveLocalDB(db);
        }
        return {
            created: newAlerts.length,
            alerts: (db.contractAlerts || []).filter((a)=>a.targetUserId === user.id && a.status === 'PENDING')
        };
    }
    if (endpoint.match(/^\/alerts\/[^/]+\/respond$/) && method === 'POST') {
        const id = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const targetAlert = db.contractAlerts.find((a)=>a.id === id);
        if (targetAlert && targetAlert.targetUserId !== user.id && user.role !== 'ADMIN') throw new Error('Acesso negado');
        return processAlertResponse(id, body.response, db, user);
    }
    if (endpoint.match(/^\/alerts\/[^/]+\/dismiss$/) && method === 'POST') {
        const id = endpoint.split('/')[2];
        const alert = db.contractAlerts.find((a)=>a.id === id);
        if (alert) {
            alert.status = 'DISMISSED';
            alert.updatedAt = new Date().toISOString();
            saveLocalDB(db);
        }
        return alert;
    }
    if (endpoint === '/alerts/all' && method === 'GET') {
        if (user.role === 'GESTOR' || user.role === 'ADMIN') return db.contractAlerts || [];
        return (db.contractAlerts || []).filter((a)=>a.targetUserId === user.id);
    }
    // Alertas enviados pelo gestor (para monitorar respostas dos fiscais)
    if (endpoint === '/alerts/sent-by-gestor' && method === 'GET') {
        if (user.role !== 'GESTOR') return [];
        return (db.contractAlerts || []).filter((a)=>a.metadata?.senderRole === 'GESTOR' || a.metadata?.senderName).map((a)=>({
                ...a,
                targetUser: db.users.find((u)=>u.id === a.targetUserId),
                contract: a.contractId ? db.contracts.find((c)=>c.id === a.contractId) : null
            }));
    }
    // Confirmar recebimento / fechar como não enviado (para o gestor)
    if (endpoint.match(/^\/alerts\/[^/]+\/confirm-receipt$/) && method === 'POST') {
        const id = endpoint.split('/')[2];
        const alert = db.contractAlerts.find((a)=>a.id === id);
        if (alert) {
            alert.status = 'CONFIRMED';
            alert.updatedAt = new Date().toISOString();
            saveLocalDB(db);
        }
        return alert;
    }
    if (endpoint.match(/^\/alerts\/[^/]+\/close-not-sent$/) && method === 'POST') {
        const id = endpoint.split('/')[2];
        const alert = db.contractAlerts.find((a)=>a.id === id);
        if (alert) {
            alert.status = 'CLOSED_NOT_SENT';
            alert.updatedAt = new Date().toISOString();
            saveLocalDB(db);
        }
        return alert;
    }
    if (endpoint === '/alerts/send-to-fiscal' && method === 'POST') {
        if (user.role !== 'GESTOR' && user.role !== 'ADMIN') throw new Error('Acesso negado');
        const body = JSON.parse(options.body);
        const isAssigned = db.assignments.some((a)=>a.contractId === body.contractId && a.fiscalId === body.fiscalId && a.isActive);
        if (!isAssigned) throw new Error('Fiscal não está designado a este contrato');
        const now = new Date().toISOString();
        const alertTypeLabels = {
            DATA_CHANGE_REQUEST: 'Solicitação de Alteração de Dados',
            REPORT_REQUEST: 'Solicitação de Relatório',
            DEADLINE_NOTICE: 'Notificação de Prazo',
            COMPLIANCE_NOTICE: 'Notificação de Inconformidade',
            GENERAL_NOTICE: 'Comunicado Geral'
        };
        const title = `${alertTypeLabels[body.alertType] || 'Comunicado'} — Gestor`;
        const newAlert = {
            id: `cal-gsnd-${Date.now()}`,
            contractId: body.contractId,
            targetUserId: body.fiscalId,
            type: 'COMMUNICATION_MANDATORY',
            status: 'PENDING',
            title,
            message: body.message,
            metadata: {
                alertType: body.alertType,
                senderName: user.name,
                senderRole: 'GESTOR',
                contractId: body.contractId
            },
            createdAt: now,
            updatedAt: now
        };
        db.contractAlerts.push(newAlert);
        const newComm = {
            id: `comm-gsnd-${Date.now()}`,
            contractId: body.contractId,
            senderId: user.id,
            recipientId: body.fiscalId,
            subject: title,
            message: body.message,
            isMandatory: true,
            readBy: [
                user.id
            ],
            createdAt: now
        };
        db.communications.push(newComm);
        saveLocalDB(db);
        return newAlert;
    }
    // ── Stats ─────────────────────────────────────────────────────────────────────
    if (endpoint === '/contracts/stats' && method === 'GET') {
        let contracts = db.contracts;
        if (user.role === 'FISCAL') {
            const ids = db.assignments.filter((a)=>a.fiscalId === user.id && a.isActive).map((a)=>a.contractId);
            contracts = contracts.filter((c)=>ids.includes(c.id));
        }
        let totalValue = 0, totalMeasured = 0, openOccurrences = 0;
        contracts.forEach((c)=>{
            totalValue += Number(c.currentValue);
            db.measurements.filter((m)=>m.contractId === c.id && m.status === 'APPROVED').forEach((m)=>totalMeasured += Number(m.measurementValue));
            openOccurrences += db.occurrences.filter((o)=>o.contractId === c.id && o.status === 'OPEN').length;
        });
        const alerts = db.alerts.filter((a)=>a.targetRole === user.role && !a.isRead).slice(0, 5);
        const pendingAlerts = (db.contractAlerts || []).filter((a)=>a.targetUserId === user.id && a.status === 'PENDING').length;
        return {
            totalContracts: contracts.length,
            activeContracts: contracts.filter((c)=>c.status === 'ACTIVE').length,
            totalValue,
            totalMeasured,
            openOccurrences,
            alerts,
            pendingAlerts
        };
    }
    // ── Contratos ─────────────────────────────────────────────────────────────────
    // ── Relatório completo (GESTOR/ADMIN) ────────────────────────────────────────
    if (endpoint === '/contracts/report' && method === 'GET') {
        if (user.role !== 'GESTOR' && user.role !== 'ADMIN' && user.role !== 'ALTA_GESTAO') throw new Error('Acesso negado');
        return db.contracts.filter((c)=>c.status !== 'DRAFT').sort((a, b)=>a.contractNumber.localeCompare(b.contractNumber)).map((c)=>{
            const totalMeasured = db.measurements.filter((m)=>m.contractId === c.id && m.status === 'APPROVED').reduce((s, m)=>s + Number(m.measurementValue), 0);
            const approvedAlts = db.alterations.filter((a)=>a.contractId === c.id && a.status === 'APPROVED');
            const titularAsg = db.assignments.find((a)=>a.contractId === c.id && a.isActive && a.role === 'TITULAR');
            const substitutoAsg = db.assignments.find((a)=>a.contractId === c.id && a.isActive && a.role === 'SUBSTITUTO');
            const titularUser = titularAsg ? db.users.find((u)=>u.id === titularAsg.fiscalId) : null;
            const substitutoUser = substitutoAsg ? db.users.find((u)=>u.id === substitutoAsg.fiscalId) : null;
            const process = db.processes.find((p)=>p.id === c.processId);
            const contractor = db.contractors.find((ct)=>ct.id === c.contractorId);
            const startDate = c.startDate || c.signingDate;
            const durationMs = startDate && c.endDate ? new Date(c.endDate + 'T12:00:00Z').getTime() - new Date(startDate + 'T12:00:00Z').getTime() : 365 * 86400000;
            const durationMonths = Math.max(1, Math.round(durationMs / (30.44 * 86400000)));
            return {
                ...c,
                contractor,
                process,
                titular: titularUser ? {
                    ...titularUser,
                    designationAct: titularAsg?.designationAct,
                    designationDate: titularAsg?.designationDate
                } : null,
                substituto: substitutoUser ? {
                    ...substitutoUser,
                    designationAct: substitutoAsg?.designationAct
                } : null,
                totalMeasured,
                balance: Math.max(0, Number(c.currentValue) - totalMeasured),
                monthlyValue: Number(c.currentValue) / durationMonths,
                aditivoCount: approvedAlts.length,
                lastAditivo: approvedAlts.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null,
                durationMonths
            };
        });
    }
    if (endpoint === '/contracts' && method === 'GET') {
        let contracts = db.contracts;
        if (user.role === 'FISCAL') {
            const ids = db.assignments.filter((a)=>a.fiscalId === user.id && a.isActive).map((a)=>a.contractId);
            contracts = contracts.filter((c)=>ids.includes(c.id));
        }
        const now = new Date();
        const overdueProcessIds = new Set((db.processPhases || []).filter((ph)=>ph.status !== 'COMPLETED' && ph.plannedEnd && new Date(ph.plannedEnd) < now).map((ph)=>ph.processId));
        return contracts.map((c)=>({
                ...c,
                contractor: db.contractors.find((ct)=>ct.id === c.contractorId),
                fiscalAssignments: db.assignments.filter((a)=>a.contractId === c.id && a.isActive).map((a)=>({
                        ...a,
                        fiscal: db.users.find((u)=>u.id === a.fiscalId)
                    })),
                hasPendingMeasurements: db.measurements.some((m)=>m.contractId === c.id && m.status === 'PENDING_GESTOR'),
                hasDelayedProcesses: c.processId ? overdueProcessIds.has(c.processId) : false,
                hasOpenOccurrences: (db.occurrences || []).some((o)=>o.contractId === c.id && o.status === 'OPEN')
            }));
    }
    if (endpoint.match(/^\/contracts\/[^/]+$/) && method === 'GET') {
        const id = endpoint.split('/')[2];
        const c = db.contracts.find((c)=>c.id === id);
        if (!c) throw new Error('Contrato não encontrado');
        if (user.role === 'FISCAL' && !db.assignments.some((a)=>a.contractId === id && a.fiscalId === user.id && a.isActive)) throw new Error('Acesso negado');
        return {
            ...c,
            contractor: db.contractors.find((ct)=>ct.id === c.contractorId),
            process: db.processes.find((p)=>p.id === c.processId),
            fiscalAssignments: db.assignments.filter((a)=>a.contractId === id).map((a)=>({
                    ...a,
                    fiscal: db.users.find((u)=>u.id === a.fiscalId)
                })),
            occurrences: db.occurrences.filter((o)=>o.contractId === id).map((o)=>({
                    ...o,
                    fiscal: db.users.find((u)=>u.id === o.fiscalId),
                    resolver: o.resolvedById ? db.users.find((u)=>u.id === o.resolvedById) : null
                })),
            measurements: db.measurements.filter((m)=>m.contractId === id).map((m)=>({
                    ...m,
                    fiscal: db.users.find((u)=>u.id === m.fiscalId),
                    approver: m.approvedById ? db.users.find((u)=>u.id === m.approvedById) : null
                })),
            alterations: db.alterations.filter((alt)=>alt.contractId === id).map((alt)=>({
                    ...alt,
                    requester: db.users.find((u)=>u.id === alt.requestedById),
                    reviewer: alt.reviewedById ? db.users.find((u)=>u.id === alt.reviewedById) : null
                })),
            documents: (db.documents || []).filter((d)=>d.contractId === id),
            communications: db.communications.filter((cm)=>cm.contractId === id).map((cm)=>({
                    ...cm,
                    sender: db.users.find((u)=>u.id === cm.senderId),
                    recipient: cm.recipientId ? db.users.find((u)=>u.id === cm.recipientId) : null
                }))
        };
    }
    if (endpoint === '/contracts' && method === 'POST') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const body = JSON.parse(options.body);
        const nc = {
            id: `cnt-${Date.now()}`,
            contractNumber: body.contractNumber,
            processId: body.processId || undefined,
            contractorId: body.contractorId,
            objectDescription: body.objectDescription,
            initialValue: Number(body.initialValue),
            currentValue: Number(body.initialValue),
            signingDate: body.signingDate,
            startDate: body.startDate,
            endDate: body.endDate,
            status: 'ACTIVE',
            managerId: user.id
        };
        db.contracts.push(nc);
        saveLocalDB(db);
        return nc;
    }
    if (endpoint.endsWith('/assign-fiscal') && method === 'POST') {
        if (user.role !== 'GESTOR' && user.role !== 'ADMIN') throw new Error('Acesso negado');
        const contractId = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const targetFiscal = db.users.find((u)=>u.id === body.fiscalId);
        if (!targetFiscal || targetFiscal.role !== 'FISCAL') throw new Error('O usuário informado não é um fiscal válido');
        if (body.role === 'TITULAR' || body.role === 'SUBSTITUTO') db.assignments.forEach((a)=>{
            if (a.contractId === contractId && a.role === body.role) a.isActive = false;
        });
        const na = {
            id: `asg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            contractId,
            fiscalId: body.fiscalId,
            role: body.role,
            designationAct: body.designationAct,
            designationDate: body.designationDate,
            startDate: body.startDate,
            endDate: body.endDate || undefined,
            isActive: true
        };
        db.assignments.push(na);
        saveLocalDB(db);
        return na;
    }
    // ── Medições ──────────────────────────────────────────────────────────────────
    if (endpoint === '/measurements' && method === 'POST') {
        if (user.role !== 'FISCAL') throw new Error('Apenas fiscais podem registrar medições');
        const body = JSON.parse(options.body);
        const hasAssignment = db.assignments.some((a)=>a.contractId === body.contractId && a.fiscalId === user.id && a.isActive);
        if (!hasAssignment) throw new Error('Você não possui atribuição ativa neste contrato');
        const nm = {
            id: `msr-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            contractId: body.contractId,
            fiscalId: user.id,
            periodStart: body.periodStart,
            periodEnd: body.periodEnd,
            measurementValue: Number(body.measurementValue),
            reportDescription: body.reportDescription,
            status: 'PENDING_GESTOR',
            createdAt: new Date().toISOString()
        };
        db.measurements.push(nm);
        const c = db.contracts.find((c)=>c.id === body.contractId);
        db.alerts.push({
            id: `al-${Date.now()}`,
            contractId: body.contractId,
            type: 'MEASUREMENT_PENDING',
            message: `Medição pendente de ${fmtCur(Number(body.measurementValue))} para o contrato ${c?.contractNumber}.`,
            targetRole: 'GESTOR',
            isRead: false,
            createdAt: new Date().toISOString()
        });
        saveLocalDB(db);
        return nm;
    }
    if (endpoint.endsWith('/approve') && endpoint.includes('/measurements/') && method === 'POST') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const m = db.measurements.find((m)=>m.id === id);
        if (!m) throw new Error('Medição não encontrada');
        m.status = 'APPROVED';
        m.approvedById = user.id;
        m.approvalDate = new Date().toISOString();
        // Dismiss related overdue alert
        db.contractAlerts.filter((a)=>a.type === 'MEASUREMENT_OVERDUE' && a.metadata?.measurementId === id).forEach((a)=>{
            a.status = 'DISMISSED';
            a.updatedAt = new Date().toISOString();
        });
        saveLocalDB(db);
        return m;
    }
    if (endpoint.endsWith('/reject') && endpoint.includes('/measurements/') && method === 'POST') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const m = db.measurements.find((m)=>m.id === id);
        if (!m) throw new Error('Medição não encontrada');
        m.status = 'REJECTED';
        m.rejectionReason = body.reason;
        saveLocalDB(db);
        return m;
    }
    // ── Ocorrências ───────────────────────────────────────────────────────────────
    if (endpoint === '/occurrences' && method === 'POST') {
        if (user.role !== 'FISCAL') throw new Error('Apenas fiscais podem registrar ocorrências');
        const body = JSON.parse(options.body);
        const hasAssignment = db.assignments.some((a)=>a.contractId === body.contractId && a.fiscalId === user.id && a.isActive);
        if (!hasAssignment) throw new Error('Você não possui atribuição ativa neste contrato');
        const no = {
            id: `occ-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            contractId: body.contractId,
            fiscalId: user.id,
            title: body.title,
            description: body.description,
            severity: body.severity || 'MEDIUM',
            status: 'OPEN',
            createdAt: new Date().toISOString()
        };
        db.occurrences.push(no);
        if (body.severity === 'HIGH' || body.severity === 'CRITICAL') {
            const c = db.contracts.find((c)=>c.id === body.contractId);
            db.alerts.push({
                id: `al-${Date.now()}`,
                contractId: body.contractId,
                type: 'OCCURRENCE_CRITICAL',
                message: `Ocorrência ${body.severity} registrada: "${body.title}" — ${c?.contractNumber}.`,
                targetRole: 'GESTOR',
                isRead: false,
                createdAt: new Date().toISOString()
            });
        }
        saveLocalDB(db);
        return no;
    }
    if (endpoint.endsWith('/resolve') && endpoint.includes('/occurrences/') && method === 'POST') {
        if (user.role !== 'GESTOR' && user.role !== 'ADMIN') throw new Error('Apenas o gestor pode resolver ocorrências');
        const id = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const o = db.occurrences.find((o)=>o.id === id);
        if (!o) throw new Error('Ocorrência não encontrada');
        o.status = 'RESOLVED';
        o.resolutionDescription = body.resolutionDescription;
        o.resolvedById = user.id;
        o.resolvedAt = new Date().toISOString();
        db.contractAlerts.filter((a)=>a.type === 'OCCURRENCE_CRITICAL_OPEN' && a.metadata?.occurrenceId === id).forEach((a)=>{
            a.status = 'DISMISSED';
            a.updatedAt = new Date().toISOString();
        });
        saveLocalDB(db);
        return o;
    }
    // ── Alterações ────────────────────────────────────────────────────────────────
    if (endpoint === '/alterations' && method === 'POST') {
        const body = JSON.parse(options.body);
        const contract = db.contracts.find((c)=>c.id === body.contractId);
        if (!contract) throw new Error('Contrato não encontrado');
        const valueChange = Number(body.valueChange || 0);
        if (body.type === 'ADDENDUM_VALUE_INCREASE') {
            const isReform = contract.objectDescription.toLowerCase().includes('reforma');
            const limit = contract.initialValue * (isReform ? 0.50 : 0.25);
            const current = db.alterations.filter((a)=>a.contractId === contract.id && a.type === 'ADDENDUM_VALUE_INCREASE' && a.status === 'APPROVED').reduce((s, a)=>s + a.valueChange, 0);
            if (current + valueChange > limit) throw new Error(`Limite de aditivo excedido. Permitido: ${fmtCur(limit)} (${isReform ? '50%' : '25%'})`);
        }
        const na = {
            id: `alt-${Date.now()}`,
            contractId: body.contractId,
            type: body.type,
            alterationNumber: body.alterationNumber,
            valueChange,
            newEndDate: body.newEndDate,
            justification: body.justification,
            status: 'PENDING_APPROVAL',
            requestedById: user.id,
            createdAt: new Date().toISOString()
        };
        db.alterations.push(na);
        saveLocalDB(db);
        return na;
    }
    if (endpoint.endsWith('/approve') && endpoint.includes('/alterations/') && method === 'POST') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const alt = db.alterations.find((a)=>a.id === id);
        if (!alt) throw new Error('Alteração não encontrada');
        const c = db.contracts.find((c)=>c.id === alt.contractId);
        if (!c) throw new Error('Contrato não encontrado');
        alt.status = 'APPROVED';
        alt.reviewedById = user.id;
        alt.reviewDate = new Date().toISOString();
        c.currentValue = Number(c.currentValue) + Number(alt.valueChange);
        if (alt.newEndDate) {
            c.endDate = alt.newEndDate;
            db.contractAlerts.filter((a)=>a.contractId === c.id && (a.type === 'CONTRACT_EXPIRING_90' || a.type === 'CONTRACT_EXPIRING_180') && a.status === 'PENDING').forEach((a)=>{
                a.status = 'DISMISSED';
            });
        }
        db.contractAlerts.filter((a)=>a.type === 'ALTERATION_OVERDUE' && a.metadata?.alterationId === id).forEach((a)=>{
            a.status = 'DISMISSED';
        });
        saveLocalDB(db);
        return alt;
    }
    if (endpoint.endsWith('/reject') && endpoint.includes('/alterations/') && method === 'POST') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const alt = db.alterations.find((a)=>a.id === id);
        if (!alt) throw new Error('Alteração não encontrada');
        alt.status = 'REJECTED';
        alt.reviewedById = user.id;
        alt.reviewDate = new Date().toISOString();
        alt.reviewNotes = body.reason;
        saveLocalDB(db);
        return alt;
    }
    // ── Processos ─────────────────────────────────────────────────────────────────
    if (endpoint === '/processes' && method === 'GET') {
        let procs = db.processes;
        if (user.role === 'FISCAL') procs = procs.filter((p)=>p.requesterId === user.id);
        return procs.map((p)=>({
                ...p,
                requester: db.users.find((u)=>u.id === p.requesterId),
                contracts: db.contracts.filter((c)=>c.processId === p.id).map((c)=>({
                        id: c.id,
                        contractNumber: c.contractNumber,
                        status: c.status
                    })),
                phases: (db.processPhases || []).filter((ph)=>ph.processId === p.id)
            }));
    }
    if (endpoint.match(/^\/processes\/[^/]+$/) && method === 'GET') {
        const id = endpoint.split('/')[2];
        const p = db.processes.find((p)=>p.id === id);
        if (!p) throw new Error('Processo não encontrado');
        if (user.role === 'FISCAL' && p.requesterId !== user.id) throw new Error('Acesso negado');
        return {
            ...p,
            requester: db.users.find((u)=>u.id === p.requesterId),
            contracts: db.contracts.filter((c)=>c.processId === id),
            phases: (db.processPhases || []).filter((ph)=>ph.processId === id).map((ph)=>({
                    ...ph,
                    responsible: ph.responsibleId ? db.users.find((u)=>u.id === ph.responsibleId) : null
                }))
        };
    }
    if (endpoint === '/processes' && method === 'POST') {
        const body = JSON.parse(options.body);
        const newProcId = `prc-${Date.now()}`;
        const np = {
            id: newProcId,
            processNumber: body.processNumber,
            subject: body.subject,
            description: body.description,
            status: 'PLANNING',
            modality: body.modality,
            estimatedValue: Number(body.estimatedValue),
            requesterDepartment: body.requesterDepartment,
            requesterId: user.id
        };
        db.processes.push(np);
        db.processPhases = [
            ...db.processPhases || [],
            ...createDefaultPhases(newProcId)
        ];
        saveLocalDB(db);
        return np;
    }
    if (endpoint.match(/^\/processes\/[^/]+\/status$/) && method === 'PATCH') {
        const id = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const p = db.processes.find((p)=>p.id === id);
        if (!p) throw new Error('Processo não encontrado');
        p.status = body.status;
        saveLocalDB(db);
        return p;
    }
    // ── Fases do Processo ─────────────────────────────────────────────────────────
    if (endpoint.match(/^\/processes\/[^/]+\/phases$/) && method === 'GET') {
        const id = endpoint.split('/')[2];
        return (db.processPhases || []).filter((ph)=>ph.processId === id).map((ph)=>({
                ...ph,
                responsible: ph.responsibleId ? db.users.find((u)=>u.id === ph.responsibleId) : null
            }));
    }
    if (endpoint.match(/^\/processes\/[^/]+\/phases\/[^/]+$/) && method === 'PATCH') {
        const parts = endpoint.split('/');
        const phaseId = parts[4];
        const body = JSON.parse(options.body);
        const ph = (db.processPhases || []).find((p)=>p.id === phaseId);
        if (!ph) throw new Error('Fase não encontrada');
        const phaseAllowedFields = [
            'status',
            'actualStart',
            'actualEnd',
            'plannedStart',
            'plannedEnd',
            'observations',
            'responsibleId'
        ];
        const safeBody = Object.fromEntries(Object.entries(body).filter(([k])=>phaseAllowedFields.includes(k)));
        Object.assign(ph, safeBody, {
            updatedAt: new Date().toISOString()
        });
        // Auto-dismiss overdue alert if phase is marked completed
        if (body.status === 'COMPLETED') {
            db.contractAlerts.filter((a)=>a.type === 'PROCESS_PHASE_OVERDUE' && a.metadata?.phaseId === phaseId && a.status === 'PENDING').forEach((a)=>{
                a.status = 'DISMISSED';
            });
        }
        saveLocalDB(db);
        return ph;
    }
    // ── Comunicados ───────────────────────────────────────────────────────────────
    if (endpoint.match(/^\/contracts\/[^/]+\/communications$/) && method === 'GET') {
        const contractId = endpoint.split('/')[2];
        return db.communications.filter((c)=>c.contractId === contractId).map((c)=>({
                ...c,
                sender: db.users.find((u)=>u.id === c.senderId),
                recipient: c.recipientId ? db.users.find((u)=>u.id === c.recipientId) : null,
                replies: db.communications.filter((r)=>r.parentId === c.id).map((r)=>({
                        ...r,
                        sender: db.users.find((u)=>u.id === r.senderId)
                    }))
            }));
    }
    if (endpoint === '/communications/all' && method === 'GET') {
        let comms = db.communications;
        if (user.role === 'FISCAL') {
            const myContractIds = db.assignments.filter((a)=>a.fiscalId === user.id && a.isActive).map((a)=>a.contractId);
            comms = comms.filter((c)=>myContractIds.includes(c.contractId) && !c.parentId && (!c.recipientId || c.recipientId === user.id || c.senderId === user.id));
        } else if (user.role === 'GESTOR' || user.role === 'ALTA_GESTAO') {
            comms = comms.filter((c)=>!c.parentId);
        }
        return comms.map((c)=>({
                ...c,
                sender: db.users.find((u)=>u.id === c.senderId),
                recipient: c.recipientId ? db.users.find((u)=>u.id === c.recipientId) : null,
                contract: db.contracts.find((ct)=>ct.id === c.contractId),
                replies: db.communications.filter((r)=>r.parentId === c.id).map((r)=>({
                        ...r,
                        sender: db.users.find((u)=>u.id === r.senderId)
                    }))
            }));
    }
    if (endpoint === '/communications' && method === 'POST') {
        if (user.role === 'ADMIN') throw new Error('Perfil administrativo não pode enviar comunicados');
        const body = JSON.parse(options.body);
        if (user.role === 'FISCAL') {
            const hasAssignment = db.assignments.some((a)=>a.contractId === body.contractId && a.fiscalId === user.id && a.isActive);
            if (!hasAssignment) throw new Error('Você não possui atribuição ativa neste contrato');
        }
        if (user.role === 'ALTA_GESTAO' && !body.parentId) {
            if (!body.recipientId) throw new Error('Alta Gestão deve indicar um Gestor como destinatário');
            const recipient = db.users.find((u)=>u.id === body.recipientId);
            if (!recipient || recipient.role !== 'GESTOR') throw new Error('Alta Gestão só pode enviar comunicados para Gestores');
        }
        const now = new Date().toISOString();
        const newComm = {
            id: `comm-${Date.now()}`,
            contractId: body.contractId,
            senderId: user.id,
            recipientId: body.recipientId || undefined,
            subject: body.subject,
            message: body.message,
            parentId: body.parentId || undefined,
            isMandatory: body.isMandatory || false,
            readBy: [
                user.id
            ],
            createdAt: now
        };
        db.communications.push(newComm);
        // Se obrigatório, criar alertas para destinatários
        if (body.isMandatory && !body.parentId) {
            const asgmts = db.assignments.filter((a)=>a.contractId === body.contractId && a.isActive);
            const targets = body.recipientId ? [
                body.recipientId
            ] : asgmts.map((a)=>a.fiscalId);
            for (const fiscalId of targets){
                db.contractAlerts.push({
                    id: `cal-comm-${newComm.id}-${fiscalId}`,
                    contractId: body.contractId,
                    targetUserId: fiscalId,
                    type: 'COMMUNICATION_MANDATORY',
                    status: 'PENDING',
                    title: 'Comunicado Obrigatório — Leitura Pendente',
                    message: body.subject,
                    metadata: {
                        communicationId: newComm.id,
                        subject: body.subject,
                        fullMessage: body.message,
                        senderName: user.name
                    },
                    createdAt: now,
                    updatedAt: now
                });
            }
        }
        saveLocalDB(db);
        return newComm;
    }
    // Concluir/arquivar comunicado
    if (endpoint.match(/^\/communications\/[^/]+\/complete$/) && method === 'POST') {
        if (user.role !== 'GESTOR') throw new Error('Apenas o gestor pode concluir comunicados');
        const id = endpoint.split('/')[2];
        const comm = db.communications.find((c)=>c.id === id);
        if (!comm) throw new Error('Comunicado não encontrado');
        comm.completedAt = new Date().toISOString();
        comm.completedById = user.id;
        comm.isCompleted = true;
        saveLocalDB(db);
        const now = new Date().toISOString();
        logAudit(db, user, 'UPDATE', 'Communication', id, `Comunicado concluído/arquivado: ${comm.subject}`, now);
        return comm;
    }
    // Atualizar dados do contrato (fiscal pode editar com registro em auditoria)
    if (endpoint.match(/^\/contracts\/[^/]+\/update-data$/) && method === 'PATCH') {
        const contractId = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const c = db.contracts.find((c)=>c.id === contractId);
        if (!c) throw new Error('Contrato não encontrado');
        if (user.role === 'FISCAL') {
            const hasAccess = db.assignments.some((a)=>a.contractId === contractId && a.fiscalId === user.id && a.isActive);
            if (!hasAccess) throw new Error('Acesso negado');
        }
        const now = new Date().toISOString();
        const changes = {};
        const allowedFields = [
            'objectDescription',
            'department',
            'observations',
            'status',
            'endDate',
            'startDate',
            'signingDate',
            'initialValue',
            'currentValue',
            'successionInfo'
        ];
        for (const field of allowedFields){
            if (body[field] !== undefined && c[field] !== body[field]) {
                changes[field] = {
                    from: c[field],
                    to: body[field]
                };
                c[field] = body[field];
            }
        }
        if (Object.keys(changes).length > 0) {
            logAudit(db, user, 'UPDATE', 'Contract', contractId, `Dados do contrato atualizados: ${c.contractNumber}`, now, changes);
            notifyActiveFiscais(db, contractId, 'Contrato atualizado pelo Gestor', `O gestor atualizou dados do contrato: ${Object.keys(changes).join(', ')}.`);
        }
        saveLocalDB(db);
        return c;
    }
    // ── Contratada ───────────────────────────────────────────────────────────────
    if (endpoint.match(/^\/contractors\/[^/]+$/) && method === 'PATCH') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const ct = db.contractors.find((c)=>c.id === id);
        if (!ct) throw new Error('Contratada não encontrada');
        const body = JSON.parse(options.body);
        const allowedFields = [
            'corporateName',
            'tradeName',
            'cnpjCpf',
            'email',
            'phone',
            'postalCode',
            'addressStreet',
            'addressNumber',
            'addressNeighborhood',
            'addressCity',
            'addressState',
            'stateInscription',
            'municipalInscription'
        ];
        for (const field of allowedFields){
            if (body[field] !== undefined) ct[field] = body[field];
        }
        saveLocalDB(db);
        const affectedContract = db.contracts.find((c)=>c.contractorId === id);
        if (affectedContract) notifyActiveFiscais(db, affectedContract.id, 'Dados da empresa atualizados', `O gestor atualizou os dados cadastrais da contratada ${ct.corporateName}.`);
        saveLocalDB(db);
        return ct;
    }
    // ── Designações ──────────────────────────────────────────────────────────────
    if (endpoint.match(/^\/assignments\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const asg = db.assignments.find((a)=>a.id === id);
        if (!asg) throw new Error('Designação não encontrada');
        const activeCount = db.assignments.filter((a)=>a.contractId === asg.contractId && a.isActive).length;
        if (activeCount <= 1) throw new Error('Não é possível remover o último fiscal ativo do contrato.');
        db.assignments = db.assignments.filter((a)=>a.id !== id);
        const fiscal = db.users.find((u)=>u.id === asg.fiscalId);
        notifyActiveFiscais(db, asg.contractId, 'Fiscal removido pelo Gestor', `O fiscal ${fiscal?.name || asg.fiscalId} foi removido da comissão de fiscalização.`);
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    // ── Edição de Aditivo ────────────────────────────────────────────────────────
    if (endpoint.match(/^\/alterations\/[^/]+$/) && method === 'PATCH') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const alt = db.alterations.find((a)=>a.id === id);
        if (!alt) throw new Error('Aditivo não encontrado');
        const body = JSON.parse(options.body);
        const allowedFields = [
            'alterationNumber',
            'type',
            'justification',
            'valueChange',
            'newEndDate'
        ];
        for (const field of allowedFields){
            if (body[field] !== undefined) alt[field] = body[field];
        }
        notifyActiveFiscais(db, alt.contractId, 'Aditivo alterado pelo Gestor', `O gestor editou o aditivo ${alt.alterationNumber || alt.type}.`);
        saveLocalDB(db);
        return alt;
    }
    // ── Documentos ───────────────────────────────────────────────────────────────
    if (endpoint.match(/^\/contracts\/[^/]+\/documents$/) && method === 'POST') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const contractId = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const nd = {
            id: `doc-${Date.now()}`,
            contractId,
            title: body.title || 'Documento',
            category: body.category || 'OTHER',
            fileSize: body.fileSize || 0,
            mimeType: body.mimeType || 'application/pdf',
            uploadedById: user.id,
            createdAt: new Date().toISOString()
        };
        if (!db.documents) db.documents = [];
        db.documents.push(nd);
        notifyActiveFiscais(db, contractId, 'Documento anexado pelo Gestor', `O gestor anexou o documento "${nd.title}" ao contrato.`);
        saveLocalDB(db);
        return nd;
    }
    if (endpoint.match(/^\/documents\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const doc = (db.documents || []).find((d)=>d.id === id);
        if (doc?.contractId) notifyActiveFiscais(db, doc.contractId, 'Documento removido pelo Gestor', `O gestor removeu o documento "${doc.title}".`);
        db.documents = (db.documents || []).filter((d)=>d.id !== id);
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    // Concluir contrato (GESTOR)
    if (endpoint.match(/^\/contracts\/[^/]+\/conclude$/) && method === 'PATCH') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const contractId = endpoint.split('/')[2];
        const c = db.contracts.find((c)=>c.id === contractId);
        if (!c) throw new Error('Contrato não encontrado');
        const prevStatus = c.status;
        c.status = 'CONCLUDED';
        const now = new Date().toISOString();
        logAudit(db, user, 'UPDATE', 'Contract', contractId, `Contrato ${c.contractNumber} concluído pelo gestor`, now, {
            status: {
                from: prevStatus,
                to: 'CONCLUDED'
            }
        });
        notifyActiveFiscais(db, contractId, 'Contrato Concluído', `O gestor encerrou o contrato ${c.contractNumber}. Ele foi movido para contratos encerrados.`);
        saveLocalDB(db);
        return c;
    }
    // Excluir contrato (ADMIN)
    if (endpoint.match(/^\/contracts\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'ADMIN') throw new Error('Acesso negado');
        const contractId = endpoint.split('/')[2];
        const c = db.contracts.find((c)=>c.id === contractId);
        if (!c) throw new Error('Contrato não encontrado');
        db.contracts = db.contracts.filter((ct)=>ct.id !== contractId);
        db.assignments = db.assignments.filter((a)=>a.contractId !== contractId);
        db.measurements = db.measurements.filter((m)=>m.contractId !== contractId);
        db.occurrences = db.occurrences.filter((o)=>o.contractId !== contractId);
        db.alterations = db.alterations.filter((a)=>a.contractId !== contractId);
        db.documents = (db.documents || []).filter((d)=>d.contractId !== contractId);
        db.communications = db.communications.filter((cm)=>cm.contractId !== contractId);
        db.contractAlerts = (db.contractAlerts || []).filter((a)=>a.contractId !== contractId);
        db.auditLogs = (db.auditLogs || []).filter((l)=>l.entityId !== contractId);
        logAudit(db, user, 'DELETE', 'Contract', contractId, `Contrato ${c.contractNumber} excluído pelo administrador`, new Date().toISOString(), {});
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    // Excluir processo (ADMIN)
    if (endpoint.match(/^\/processes\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'ADMIN') throw new Error('Acesso negado');
        const processId = endpoint.split('/')[2];
        const p = db.processes.find((p)=>p.id === processId);
        if (!p) throw new Error('Processo não encontrado');
        db.processes = db.processes.filter((pr)=>pr.id !== processId);
        db.processPhases = (db.processPhases || []).filter((ph)=>ph.processId !== processId);
        logAudit(db, user, 'DELETE', 'Process', processId, `Processo ${p.processNumber} excluído pelo administrador`, new Date().toISOString(), {});
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    // Atualizar dados do processo (fiscal pode editar com registro em auditoria)
    if (endpoint.match(/^\/processes\/[^/]+\/update-data$/) && method === 'PATCH') {
        const processId = endpoint.split('/')[2];
        const body = JSON.parse(options.body);
        const p = db.processes.find((p)=>p.id === processId);
        if (!p) throw new Error('Processo não encontrado');
        const now = new Date().toISOString();
        const changes = {};
        const allowedFields = [
            'processNumber',
            'subject',
            'description',
            'status',
            'modality',
            'estimatedValue',
            'requesterDepartment'
        ];
        for (const field of allowedFields){
            if (body[field] !== undefined && p[field] !== body[field]) {
                changes[field] = {
                    from: p[field],
                    to: body[field]
                };
                p[field] = body[field];
            }
        }
        if (Object.keys(changes).length > 0) {
            logAudit(db, user, 'UPDATE', 'Process', processId, `Dados do processo atualizados: ${p.processNumber}`, now, changes);
        }
        saveLocalDB(db);
        return p;
    }
    // ── Usuários ──────────────────────────────────────────────────────────────────
    if (endpoint === '/users/fiscais' && method === 'GET') return db.users.filter((u)=>u.role === 'FISCAL');
    if (endpoint === '/users/gestores' && method === 'GET') return db.users.filter((u)=>u.role === 'GESTOR' && u.status === 'ACTIVE');
    if (endpoint === '/users' && method === 'GET') return db.users;
    if (endpoint === '/users' && method === 'POST') {
        const body = JSON.parse(options.body);
        if (user.role === 'ALTA_GESTAO') {
            if (body.role !== 'GESTOR' && body.role !== 'FISCAL' && body.role !== 'ALTA_GESTAO') throw new Error('Alta Gestão pode cadastrar apenas Gestores, Fiscais e usuários de Alta Gestão');
        }
        const nu = {
            id: `usr-${Date.now()}`,
            name: body.name,
            email: body.email,
            role: body.role,
            status: 'ACTIVE',
            registrationNumber: body.registrationNumber
        };
        db.users.push(nu);
        saveLocalDB(db);
        return nu;
    }
    if (endpoint.match(/^\/users\/[^/]+$/) && method === 'PATCH') {
        const id = endpoint.split('/')[2];
        if (user.role !== 'ADMIN' && user.id !== id) throw new Error('Acesso negado');
        const body = JSON.parse(options.body);
        const u = db.users.find((u)=>u.id === id);
        if (!u) throw new Error('Usuário não encontrado');
        if (body.name) u.name = body.name;
        if (body.email) u.email = body.email;
        if (body.registrationNumber !== undefined) u.registrationNumber = body.registrationNumber;
        if (body.phone !== undefined) u.phone = body.phone;
        if (body.password) u._passwordOverride = body.password;
        saveLocalDB(db);
        const stored = getStoredUser();
        if (stored && stored.id === id) {
            Object.assign(stored, {
                name: u.name,
                email: u.email,
                registrationNumber: u.registrationNumber
            });
            setStoredUser(stored);
        }
        return u;
    }
    if (endpoint.match(/^\/users\/[^/]+\/status$/) && method === 'PATCH') {
        if (user.role !== 'ADMIN' && user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const target = db.users.find((u)=>u.id === id);
        if (!target) throw new Error('Usuário não encontrado');
        if (target.role === 'ADMIN' && user.role !== 'ADMIN') throw new Error('Apenas o ADMIN pode alterar o status de outro ADMIN');
        const body = JSON.parse(options.body);
        target.status = body.status;
        saveLocalDB(db);
        return target;
    }
    if (endpoint.match(/^\/users\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'ADMIN' && user.role !== 'ALTA_GESTAO') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        const target = db.users.find((u)=>u.id === id);
        if (!target) throw new Error('Usuário não encontrado');
        if (target.role === 'ADMIN' && user.role !== 'ADMIN') throw new Error('Apenas o ADMIN pode excluir outro ADMIN');
        db.users = db.users.filter((u)=>u.id !== id);
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    if (endpoint === '/contractors' && method === 'GET') return db.contractors;
    // ── Central de Pendências ─────────────────────────────────────────────────────
    if (endpoint === '/pending-dashboard' && method === 'GET') {
        const pendingAlerts = (db.contractAlerts || []).filter((a)=>a.targetUserId === user.id && a.status === 'PENDING');
        const result = {
            alerts: pendingAlerts,
            items: []
        };
        if (user.role === 'FISCAL') {
            const myContractIds = db.assignments.filter((a)=>a.fiscalId === user.id && a.isActive).map((a)=>a.contractId);
            const openOccs = db.occurrences.filter((o)=>myContractIds.includes(o.contractId) && o.status !== 'RESOLVED');
            openOccs.forEach((o)=>{
                const c = db.contracts.find((c)=>c.id === o.contractId);
                result.items.push({
                    type: 'OCCURRENCE',
                    priority: o.severity === 'CRITICAL' ? 'HIGH' : o.severity === 'HIGH' ? 'HIGH' : 'MEDIUM',
                    title: o.title,
                    detail: c?.contractNumber,
                    daysOpen: daysSince(o.createdAt),
                    id: o.id,
                    contractId: o.contractId
                });
            });
            const myPhases = (db.processPhases || []).filter((ph)=>ph.responsibleId === user.id && ph.status !== 'COMPLETED' && ph.plannedEnd && daysUntil(ph.plannedEnd) < 0);
            myPhases.forEach((ph)=>{
                const p = db.processes.find((p)=>p.id === ph.processId);
                result.items.push({
                    type: 'PHASE',
                    priority: 'HIGH',
                    title: ph.name,
                    detail: p?.processNumber,
                    daysLate: Math.abs(daysUntil(ph.plannedEnd)),
                    id: ph.id,
                    processId: ph.processId
                });
            });
            myContractIds.forEach((cId)=>{
                const c = db.contracts.find((c)=>c.id === cId);
                if (c) {
                    const d = daysUntil(c.endDate);
                    if (d <= 180 && d > 0) result.items.push({
                        type: 'CONTRACT_EXPIRY',
                        priority: d <= 30 ? 'CRITICAL' : d <= 90 ? 'HIGH' : 'MEDIUM',
                        title: `Contrato ${c.contractNumber} encerra em ${d} dias`,
                        detail: fmtDate(c.endDate),
                        daysUntil: d,
                        id: c.id,
                        contractId: c.id
                    });
                }
            });
        }
        if (user.role === 'GESTOR') {
            const pendMsrs = db.measurements.filter((m)=>m.status === 'PENDING_GESTOR');
            pendMsrs.forEach((m)=>{
                const c = db.contracts.find((c)=>c.id === m.contractId);
                result.items.push({
                    type: 'MEASUREMENT',
                    priority: daysSince(m.createdAt) > 10 ? 'HIGH' : 'MEDIUM',
                    title: `Medição pendente: ${fmtCur(Number(m.measurementValue))}`,
                    detail: c?.contractNumber,
                    daysPending: daysSince(m.createdAt),
                    id: m.id,
                    contractId: m.contractId
                });
            });
            const pendAlts = db.alterations.filter((a)=>a.status === 'PENDING_APPROVAL');
            pendAlts.forEach((alt)=>{
                const c = db.contracts.find((c)=>c.id === alt.contractId);
                result.items.push({
                    type: 'ALTERATION',
                    priority: 'MEDIUM',
                    title: `Aditivo pendente: ${alt.alterationNumber || alt.type}`,
                    detail: c?.contractNumber,
                    daysPending: daysSince(alt.createdAt),
                    id: alt.id,
                    contractId: alt.contractId
                });
            });
            const critOccs = db.occurrences.filter((o)=>o.status !== 'RESOLVED' && (o.severity === 'CRITICAL' || o.severity === 'HIGH'));
            critOccs.forEach((o)=>{
                const c = db.contracts.find((c)=>c.id === o.contractId);
                result.items.push({
                    type: 'OCCURRENCE',
                    priority: o.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
                    title: o.title,
                    detail: c?.contractNumber,
                    daysOpen: daysSince(o.createdAt),
                    id: o.id,
                    contractId: o.contractId
                });
            });
            db.contracts.filter((c)=>c.status === 'ACTIVE').forEach((c)=>{
                const d = daysUntil(c.endDate);
                if (d <= 90 && d > 0) result.items.push({
                    type: 'CONTRACT_EXPIRY',
                    priority: d <= 30 ? 'CRITICAL' : 'HIGH',
                    title: `Contrato ${c.contractNumber} encerra em ${d} dias`,
                    detail: fmtDate(c.endDate),
                    daysUntil: d,
                    id: c.id,
                    contractId: c.id
                });
            });
        }
        result.items.sort((a, b)=>{
            const p = {
                CRITICAL: 0,
                HIGH: 1,
                MEDIUM: 2,
                LOW: 3
            };
            return (p[a.priority] ?? 3) - (p[b.priority] ?? 3);
        });
        return result;
    }
    // ── Dashboard Gestor ─────────────────────────────────────────────────────────
    if (endpoint === '/dashboard/gestor' && method === 'GET') {
        const contracts = db.contracts;
        const active = contracts.filter((c)=>c.status === 'ACTIVE');
        const exp180 = active.filter((c)=>{
            const d = daysUntil(c.endDate);
            return d <= 180 && d > 0;
        });
        const exp90 = active.filter((c)=>{
            const d = daysUntil(c.endDate);
            return d <= 90 && d > 0;
        });
        const expired = contracts.filter((c)=>daysUntil(c.endDate) <= 0 && c.status === 'ACTIVE');
        const processes = db.processes;
        const inProgress = processes.filter((p)=>p.status !== 'CONCLUDED' && p.status !== 'CANCELED');
        const delayed = (db.processPhases || []).filter((ph)=>ph.plannedEnd && ph.status !== 'COMPLETED' && daysUntil(ph.plannedEnd) < 0).map((ph)=>ph.processId);
        const uniqueDelayed = [
            ...new Set(delayed)
        ];
        const pendFisc = db.measurements.filter((m)=>m.status === 'PENDING_GESTOR').length;
        const pendRenewals = (db.contractAlerts || []).filter((a)=>a.type === 'RENEWAL_REQUESTED' && a.status === 'PENDING').length;
        const pendComms = (db.communications || []).filter((c)=>c.isMandatory && !(c.readBy || []).includes('usr-gestor')).length;
        const modalityMap = {
            LICITACAO_13303: 'Licitação',
            DISPENSA_13303: 'Dispensa',
            INEXIGIBILIDADE: 'Inexigibilidade',
            PREGAO_ELETRONICO: 'Pregão',
            OUTROS: 'Outros'
        };
        const byModality = Object.entries(processes.reduce((acc, p)=>{
            const k = modalityMap[p.modality] || p.modality;
            acc[k] = (acc[k] || 0) + 1;
            return acc;
        }, {})).map(([name, value])=>({
                name,
                value
            }));
        const statusMap = {
            DRAFT: 'Rascunho',
            ACTIVE: 'Ativo',
            SUSPENDED: 'Suspenso',
            CONCLUDED: 'Concluído',
            RESCINDED: 'Rescindido'
        };
        const byStatus = Object.entries(contracts.reduce((acc, c)=>{
            const k = statusMap[c.status] || c.status;
            acc[k] = (acc[k] || 0) + 1;
            return acc;
        }, {})).map(([name, value])=>({
                name,
                value
            }));
        const fiscalContracts = {};
        db.assignments.filter((a)=>a.isActive && a.role === 'TITULAR').forEach((a)=>{
            const u = db.users.find((u)=>u.id === a.fiscalId);
            if (u) {
                if (!fiscalContracts[u.id]) fiscalContracts[u.id] = {
                    count: 0,
                    fiscalId: u.id,
                    fullName: u.name
                };
                fiscalContracts[u.id].count++;
            }
        });
        const byFiscal = Object.values(fiscalContracts).sort((a, b)=>b.count - a.count).map(({ count, fiscalId, fullName })=>{
            const parts = fullName.split(' ');
            const short = parts.length > 2 ? `${parts[0]} ${parts[parts.length - 1]}` : fullName;
            return {
                name: short,
                value: count,
                fiscalId,
                fullName
            };
        });
        const deptAbbrev = {
            'Segurança do Trabalho': 'Seg. Trabalho',
            'Gerência de Gestão de Pessoas': 'Gest. Pessoas',
            'Coordenação de Serviços Gerais': 'Serv. Gerais',
            'Gerência de Logística': 'Logística',
            'Tecnologia da Informação e Comunicação': 'TIC',
            'Gerência de Engenharia': 'Engenharia',
            'Assessoria de Compras Governamentais': 'Compras Gov.',
            'Assessoria Especial da Presidência': 'Assessoria Pres.',
            'Gerência Jurídica': 'Jurídica',
            'Diretoria Comercial': 'Comercial',
            'Coordenação Administrativa': 'Coord. Admin.',
            'Gerência de Recursos Humanos': 'RH',
            'Gestão de Contratos': 'Gest. Contr.',
            'Gerência de Controle da Qualidade': 'Contr. Qual.',
            'Gerência de Contabilidade': 'Contabilidade'
        };
        const byUnit = Object.entries(active.reduce((acc, c)=>{
            const k = deptAbbrev[c.department || ''] || c.department || 'Outros';
            acc[k] = (acc[k] || 0) + 1;
            return acc;
        }, {})).sort((a, b)=>b[1] - a[1]).map(([name, value])=>({
                name,
                value
            }));
        const phaseStatusMap = {
            PENDING: 'Pendente',
            IN_PROGRESS: 'Em Andamento',
            COMPLETED: 'Concluída',
            OVERDUE: 'Atrasada',
            BLOCKED: 'Bloqueada'
        };
        const byPhaseStatus = Object.entries((db.processPhases || []).reduce((acc, ph)=>{
            const k = phaseStatusMap[ph.status] || ph.status;
            acc[k] = (acc[k] || 0) + 1;
            return acc;
        }, {})).map(([name, value])=>({
                name,
                value
            }));
        const _monthLabels = [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez'
        ];
        const _now6 = new Date();
        const _dynMonths = Array.from({
            length: 6
        }, (_, i)=>{
            const d = new Date(_now6.getFullYear(), _now6.getMonth() - 5 + i, 1);
            return {
                label: _monthLabels[d.getMonth()],
                year: d.getFullYear(),
                month: d.getMonth()
            };
        });
        const monthlyEvolution = _dynMonths.map(({ label, year, month })=>{
            const mStart = new Date(year, month, 1);
            const mEnd = new Date(year, month + 1, 0, 23, 59, 59);
            const activeInMonth = contracts.filter((c)=>{
                if (c.status === 'DRAFT' || c.status === 'RESCINDED') return false;
                const cStart = new Date(c.startDate || c.signingDate || '2020-01-01');
                const cEnd = new Date(c.endDate);
                return cStart <= mEnd && cEnd >= mStart;
            });
            const measured = db.measurements.filter((m)=>{
                if (m.status !== 'APPROVED') return false;
                const d = new Date(m.periodEnd);
                return d.getFullYear() === year && d.getMonth() === month;
            }).reduce((s, m)=>s + Number(m.measurementValue), 0);
            return {
                name: label,
                contracts: activeInMonth.length,
                value: activeInMonth.reduce((s, c)=>s + c.currentValue, 0),
                measured
            };
        });
        // ── Financial ──
        const totalContracted = active.reduce((s, c)=>s + c.currentValue, 0);
        const totalExecuted = db.measurements.filter((m)=>m.status === 'APPROVED').reduce((s, m)=>s + Number(m.measurementValue), 0);
        const balance = totalContracted - totalExecuted;
        const executionPercent = totalContracted > 0 ? Math.round(totalExecuted / totalContracted * 100) : 0;
        const savingsEstimate = db.processes.reduce((s, p)=>{
            const rel = db.contracts.find((c)=>c.processId === p.id);
            if (rel && p.estimatedValue) return s + Math.max(0, p.estimatedValue - rel.initialValue);
            return s;
        }, 0);
        const avgContractValue = active.length > 0 ? Math.round(totalContracted / active.length) : 0;
        // ── Extended Alerts ──
        const expiring30 = active.filter((c)=>{
            const d = daysUntil(c.endDate);
            return d <= 30 && d > 0;
        }).length;
        const expiring60 = active.filter((c)=>{
            const d = daysUntil(c.endDate);
            return d <= 60 && d > 0;
        }).length;
        const contractsWithoutFiscal = active.filter((c)=>!db.assignments.some((a)=>a.contractId === c.id && a.isActive && a.role === 'TITULAR')).length;
        const openCriticalOccurrences = db.occurrences.filter((o)=>o.status !== 'RESOLVED' && o.severity === 'CRITICAL').length;
        const pendingAlterations = db.alterations.filter((a)=>a.status === 'PENDING_APPROVAL').length;
        // ── Health Score ──
        let healthScore = 100;
        const healthFactors = [];
        const addFactor = (label, pts)=>{
            healthScore -= pts;
            healthFactors.push({
                label,
                deduction: pts
            });
        };
        if (expired.length > 0) addFactor(`${expired.length} contrato(s) vencido(s)`, Math.min(expired.length * 15, 30));
        if (openCriticalOccurrences > 0) addFactor(`${openCriticalOccurrences} ocorrência(s) crítica(s)`, Math.min(openCriticalOccurrences * 10, 20));
        if (pendFisc > 0) addFactor(`${pendFisc} medição(ões) pendente(s)`, Math.min(pendFisc * 4, 15));
        if (uniqueDelayed.length > 0) addFactor(`${uniqueDelayed.length} processo(s) atrasado(s)`, Math.min(uniqueDelayed.length * 6, 15));
        if (contractsWithoutFiscal > 0) addFactor(`${contractsWithoutFiscal} contrato(s) sem fiscal`, Math.min(contractsWithoutFiscal * 4, 12));
        if (exp90.length > 0) addFactor(`${exp90.length} contrato(s) vencendo em 90d`, Math.min(exp90.length * 2, 8));
        healthScore = Math.max(0, Math.min(100, healthScore));
        const healthLevel = healthScore >= 80 ? 'EXCELLENT' : healthScore >= 60 ? 'GOOD' : healthScore >= 40 ? 'ATTENTION' : 'CRITICAL';
        // ── Fiscal Workload ──
        const fiscalWorkload = db.users.filter((u)=>u.role === 'FISCAL').map((u)=>{
            const cIds = db.assignments.filter((a)=>a.fiscalId === u.id && a.isActive).map((a)=>a.contractId);
            const myActive = active.filter((c)=>cIds.includes(c.id));
            if (myActive.length === 0) return null;
            const parts = u.name.split(' ');
            const shortName = parts.length > 2 ? `${parts[0]} ${parts[parts.length - 1]}` : u.name;
            return {
                id: u.id,
                name: u.name,
                shortName,
                contracts: myActive.length,
                totalValue: myActive.reduce((s, c)=>s + c.currentValue, 0),
                pendingMeasurements: db.measurements.filter((m)=>cIds.includes(m.contractId) && m.status === 'PENDING_FISCAL').length,
                pendingOccurrences: db.occurrences.filter((o)=>cIds.includes(o.contractId) && o.status === 'OPEN').length
            };
        }).filter(Boolean).sort((a, b)=>b.contracts - a.contracts);
        // ── Upcoming Events ──
        const upcomingEvents = [
            ...active.filter((c)=>{
                const d = daysUntil(c.endDate);
                return d >= 0 && d <= 90;
            }).sort((a, b)=>daysUntil(a.endDate) - daysUntil(b.endDate)).slice(0, 8).map((c)=>{
                const d = daysUntil(c.endDate);
                return {
                    type: 'EXPIRATION',
                    contractId: c.id,
                    contractNumber: c.contractNumber,
                    description: 'Vencimento contratual',
                    daysUntil: d,
                    severity: d <= 30 ? 'red' : d <= 60 ? 'amber' : 'green'
                };
            }),
            ...(db.processPhases || []).filter((ph)=>ph.plannedEnd && ph.status !== 'COMPLETED' && daysUntil(ph.plannedEnd) >= 0 && daysUntil(ph.plannedEnd) <= 30).slice(0, 4).map((ph)=>{
                const p = db.processes.find((p)=>p.id === ph.processId);
                const d = daysUntil(ph.plannedEnd);
                return {
                    type: 'PROCESS',
                    contractId: '',
                    contractNumber: p?.processNumber || '',
                    description: ph.name,
                    daysUntil: d,
                    severity: d <= 7 ? 'red' : 'amber'
                };
            })
        ].sort((a, b)=>a.daysUntil - b.daysUntil).slice(0, 12);
        // ── Risk Summary ──
        const riskSummary = active.reduce((acc, c)=>{
            let score = 0;
            const d = daysUntil(c.endDate);
            if (d <= 0) score += 40;
            else if (d <= 30) score += 35;
            else if (d <= 90) score += 20;
            else if (d <= 180) score += 10;
            db.occurrences.filter((o)=>o.contractId === c.id && o.status !== 'RESOLVED').forEach((o)=>{
                score += o.severity === 'CRITICAL' ? 30 : o.severity === 'HIGH' ? 15 : 5;
            });
            score += db.measurements.filter((m)=>m.contractId === c.id && (m.status === 'PENDING_FISCAL' || m.status === 'PENDING_GESTOR')).length * 10;
            score += (db.contractAlerts || []).filter((a)=>a.contractId === c.id && a.status === 'PENDING').length * 8;
            const clampedScore = Math.min(100, score);
            if (clampedScore >= 60) acc.critical++;
            else if (clampedScore >= 40) acc.high++;
            else if (clampedScore >= 20) acc.medium++;
            else acc.low++;
            return acc;
        }, {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0
        });
        const result = {
            kpis: {
                activeContracts: active.length,
                expiringIn180: exp180.length,
                expiringIn90: exp90.length,
                expiredContracts: expired.length,
                processesInProgress: inProgress.length,
                delayedProcesses: uniqueDelayed.length,
                pendingFiscalizacoes: pendFisc,
                pendingRenewals: pendRenewals,
                communicationsPendingReply: pendComms
            },
            financial: {
                totalContracted,
                totalExecuted,
                balance,
                savingsEstimate,
                executionPercent,
                avgContractValue
            },
            health: {
                score: healthScore,
                level: healthLevel,
                factors: healthFactors
            },
            extendedAlerts: {
                expiring30,
                expiring60,
                contractsWithoutFiscal,
                openCriticalOccurrences,
                pendingAlterations
            },
            fiscalWorkload,
            upcomingEvents,
            riskSummary,
            charts: {
                byModality,
                byStatus,
                byFiscal,
                byUnit,
                processesByPhase: byPhaseStatus,
                monthlyEvolution
            }
        };
        return result;
    }
    // ── Dashboard Fiscal ─────────────────────────────────────────────────────────
    if (endpoint === '/dashboard/fiscal' && method === 'GET') {
        const myContractIds = db.assignments.filter((a)=>a.fiscalId === user.id && a.isActive).map((a)=>a.contractId);
        const myContracts = db.contracts.filter((c)=>myContractIds.includes(c.id)).map((c)=>({
                ...c,
                contractor: db.contractors.find((ct)=>ct.id === c.contractorId),
                fiscalAssignments: db.assignments.filter((a)=>a.contractId === c.id).map((a)=>({
                        ...a,
                        fiscal: db.users.find((u)=>u.id === a.fiscalId)
                    }))
            }));
        const myProcessIds = [
            ...new Set(myContracts.filter((c)=>c.processId).map((c)=>c.processId))
        ];
        const myProcesses = db.processes.filter((p)=>myProcessIds.includes(p.id) || db.processPhases?.some((ph)=>ph.processId === p.id && ph.responsibleId === user.id));
        const measurements = db.measurements.filter((m)=>myContractIds.includes(m.contractId) && m.status === 'PENDING_FISCAL').length;
        const occurrences = db.occurrences.filter((o)=>myContractIds.includes(o.contractId) && o.status === 'OPEN').length;
        const alterations = db.alterations.filter((a)=>myContractIds.includes(a.contractId) && a.status === 'DRAFT').length;
        const pendingAlerts = (db.contractAlerts || []).filter((a)=>a.targetUserId === user.id && a.status === 'PENDING');
        const upcoming = myContracts.filter((c)=>{
            const d = daysUntil(c.endDate);
            return d > 0 && d <= 180;
        }).map((c)=>({
                contractId: c.id,
                contractNumber: c.contractNumber,
                daysUntil: daysUntil(c.endDate)
            })).sort((a, b)=>a.daysUntil - b.daysUntil);
        const gestorComms = (db.communications || []).filter((c)=>myContractIds.includes(c.contractId) && c.senderId !== user.id).slice(0, 5).map((c)=>({
                ...c,
                sender: db.users.find((u)=>u.id === c.senderId)
            }));
        return {
            myContracts,
            myProcesses,
            pendingItems: {
                measurements,
                occurrences,
                alterations
            },
            pendingAlerts,
            upcomingExpirations: upcoming,
            gestorCommunications: gestorComms
        };
    }
    // ── Painel de Risco ──────────────────────────────────────────────────────────
    if (endpoint === '/risk-panel' && method === 'GET') {
        const items = db.contracts.filter((c)=>c.status === 'ACTIVE' || c.status === 'SUSPENDED').map((c)=>{
            const factors = [];
            let score = 0;
            const d = daysUntil(c.endDate);
            if (d <= 0) {
                factors.push('Contrato vencido');
                score += 40;
            } else if (d <= 30) {
                factors.push(`Vence em ${d} dias`);
                score += 35;
            } else if (d <= 90) {
                factors.push(`Vence em ${d} dias`);
                score += 20;
            } else if (d <= 180) {
                factors.push(`Vence em ${d} dias`);
                score += 10;
            }
            const openOccs = db.occurrences.filter((o)=>o.contractId === c.id && o.status !== 'RESOLVED');
            openOccs.forEach((o)=>{
                if (o.severity === 'CRITICAL') {
                    factors.push('Ocorrência crítica aberta');
                    score += 30;
                } else if (o.severity === 'HIGH') {
                    factors.push('Ocorrência alta aberta');
                    score += 15;
                } else {
                    factors.push('Ocorrência em aberto');
                    score += 5;
                }
            });
            const pendMsr = db.measurements.filter((m)=>m.contractId === c.id && (m.status === 'PENDING_FISCAL' || m.status === 'PENDING_GESTOR'));
            if (pendMsr.length > 0) {
                factors.push(`${pendMsr.length} medição(ões) pendente(s)`);
                score += 10 * pendMsr.length;
            }
            const pendAlt = db.alterations.filter((a)=>a.contractId === c.id && a.status === 'PENDING_APPROVAL');
            if (pendAlt.length > 0) {
                factors.push(`${pendAlt.length} aditivo(s) pendente(s)`);
                score += 5 * pendAlt.length;
            }
            const alerts = (db.contractAlerts || []).filter((a)=>a.contractId === c.id && a.status === 'PENDING');
            if (alerts.length > 0) {
                factors.push(`${alerts.length} alerta(s) ativo(s)`);
                score += 8 * alerts.length;
            }
            const riskLevel = score >= 40 ? 'RED' : score >= 20 ? 'YELLOW' : 'GREEN';
            const lastActivity = [
                ...db.occurrences.filter((o)=>o.contractId === c.id).map((o)=>o.createdAt),
                ...db.measurements.filter((m)=>m.contractId === c.id).map((m)=>m.createdAt),
                c.signingDate
            ].sort().reverse()[0] || c.signingDate;
            return {
                id: c.id,
                contractId: c.id,
                contractNumber: c.contractNumber,
                riskLevel,
                riskScore: Math.min(100, score),
                factors,
                daysUntilExpiry: d > 0 ? d : 0,
                pendingItems: openOccs.length + pendMsr.length + pendAlt.length,
                lastActivity
            };
        });
        items.sort((a, b)=>b.riskScore - a.riskScore);
        return {
            items,
            summary: {
                red: items.filter((i)=>i.riskLevel === 'RED').length,
                yellow: items.filter((i)=>i.riskLevel === 'YELLOW').length,
                green: items.filter((i)=>i.riskLevel === 'GREEN').length
            }
        };
    }
    if (endpoint.match(/^\/measurements\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        db.measurements = (db.measurements || []).filter((m)=>m.id !== id);
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    if (endpoint.match(/^\/occurrences\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        db.occurrences = (db.occurrences || []).filter((o)=>o.id !== id);
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    if (endpoint.match(/^\/alterations\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'GESTOR') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        db.alterations = (db.alterations || []).filter((a)=>a.id !== id);
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    // ── Auditoria ────────────────────────────────────────────────────────────────
    if (endpoint === '/audit-logs' && method === 'GET') {
        return {
            logs: [
                ...db.auditLogs || []
            ].sort((a, b)=>b.createdAt.localeCompare(a.createdAt)),
            total: (db.auditLogs || []).length
        };
    }
    if (endpoint.match(/^\/audit-logs\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'ADMIN') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        db.auditLogs = (db.auditLogs || []).filter((l)=>l.id !== id);
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    if (endpoint.match(/^\/alerts\/[^/]+$/) && method === 'DELETE') {
        if (user.role !== 'ADMIN') throw new Error('Acesso negado');
        const id = endpoint.split('/')[2];
        db.contractAlerts = (db.contractAlerts || []).filter((a)=>a.id !== id);
        saveLocalDB(db);
        return {
            ok: true
        };
    }
    // ── IA ───────────────────────────────────────────────────────────────────────
    if (endpoint === '/ai/insights' && method === 'GET') {
        return {
            insights: db.aiInsights || [],
            status: 'MOCK',
            provider: 'LocalEngine',
            message: 'Motor de IA local ativo. Para IA avançada, configure OPENAI_API_KEY no backend.'
        };
    }
    if (endpoint === '/ai/analyze-contract' && method === 'POST') {
        const body = JSON.parse(options?.body || '{}');
        const contract = db.contracts.find((c)=>c.id === body.contractId);
        if (!contract) throw new Error('Contrato não encontrado');
        return {
            contractId: body.contractId,
            analysis: `Análise simulada do contrato ${contract.contractNumber}. Risco: MÉDIO. Recomendação: monitorar vencimento e ocorrências abertas.`,
            risks: [
                'Ocorrência em aberto',
                'Medição pendente'
            ],
            suggestions: [
                'Resolver ocorrências',
                'Homologar medições em atraso'
            ],
            status: 'MOCK'
        };
    }
    throw new Error(`Endpoint não implementado: ${endpoint} [${method}] — ${originalError}`);
}
const api = {
    auth: {
        login: (creds)=>request('/auth/login', {
                method: 'POST',
                body: JSON.stringify(creds)
            }),
        me: ()=>request('/auth/me')
    },
    alerts: {
        list: ()=>request('/alerts'),
        all: ()=>request('/alerts/all'),
        sentByGestor: ()=>request('/alerts/sent-by-gestor'),
        runEngine: ()=>request('/alerts/run-engine', {
                method: 'POST'
            }),
        respond: (id, response)=>request(`/alerts/${id}/respond`, {
                method: 'POST',
                body: JSON.stringify({
                    response
                })
            }),
        dismiss: (id)=>request(`/alerts/${id}/dismiss`, {
                method: 'POST'
            }),
        delete: (id)=>request(`/alerts/${id}`, {
                method: 'DELETE'
            }),
        sendToFiscal: (data)=>request('/alerts/send-to-fiscal', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        confirmReceipt: (id)=>request(`/alerts/${id}/confirm-receipt`, {
                method: 'POST'
            }),
        closeNotSent: (id)=>request(`/alerts/${id}/close-not-sent`, {
                method: 'POST'
            })
    },
    communications: {
        listByContract: (cId)=>request(`/contracts/${cId}/communications`),
        listAll: ()=>request('/communications/all'),
        create: (data)=>request('/communications', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        reply: (data)=>request('/communications', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        complete: (id)=>request(`/communications/${id}/complete`, {
                method: 'POST'
            })
    },
    measurements: {
        create: (data)=>request('/measurements', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        approve: (id)=>request(`/measurements/${id}/approve`, {
                method: 'POST'
            }),
        reject: (id, reason)=>request(`/measurements/${id}/reject`, {
                method: 'POST',
                body: JSON.stringify({
                    reason
                })
            }),
        listByContract: (cId)=>request(`/measurements/contract/${cId}`),
        delete: (id)=>request(`/measurements/${id}`, {
                method: 'DELETE'
            })
    },
    occurrences: {
        create: (data)=>request('/occurrences', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        resolve: (id, resolutionDescription)=>request(`/occurrences/${id}/resolve`, {
                method: 'POST',
                body: JSON.stringify({
                    resolutionDescription
                })
            }),
        listByContract: (cId)=>request(`/occurrences/contract/${cId}`),
        delete: (id)=>request(`/occurrences/${id}`, {
                method: 'DELETE'
            })
    },
    alterations: {
        create: (data)=>request('/alterations', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        approve: (id)=>request(`/alterations/${id}/approve`, {
                method: 'POST'
            }),
        reject: (id, reason)=>request(`/alterations/${id}/reject`, {
                method: 'POST',
                body: JSON.stringify({
                    reason
                })
            }),
        update: (id, data)=>request(`/alterations/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
        listByContract: (cId)=>request(`/alterations/contract/${cId}`),
        delete: (id)=>request(`/alterations/${id}`, {
                method: 'DELETE'
            })
    },
    contractors: {
        list: ()=>request('/contractors'),
        update: (id, data)=>request(`/contractors/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            })
    },
    assignments: {
        remove: (id)=>request(`/assignments/${id}`, {
                method: 'DELETE'
            })
    },
    documents: {
        attach: (contractId, data)=>request(`/contracts/${contractId}/documents`, {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        delete: (id)=>request(`/documents/${id}`, {
                method: 'DELETE'
            })
    },
    payments: {
        create: (data)=>request('/payments', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        listByContract: (contractId)=>request(`/payments/contract/${contractId}`),
        delete: (id)=>request(`/payments/${id}`, {
                method: 'DELETE'
            })
    },
    contracts: {
        list: ()=>request('/contracts'),
        get: (id)=>request(`/contracts/${id}`),
        report: ()=>request('/contracts/report'),
        create: (data)=>request('/contracts', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        assignFiscal: (id, data)=>request(`/contracts/${id}/assign-fiscal`, {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        stats: ()=>request('/contracts/stats'),
        updateData: (id, data)=>request(`/contracts/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
        conclude: (id)=>request(`/contracts/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: 'CONCLUDED'
                })
            }),
        delete: (id)=>request(`/contracts/${id}`, {
                method: 'DELETE'
            }),
        deactivateAssignment: (contractId, assignmentId)=>request(`/contracts/${contractId}/assignments/${assignmentId}/deactivate`, {
                method: 'PATCH'
            })
    },
    processes: {
        list: ()=>request('/processes'),
        get: (id)=>request(`/processes/${id}`),
        create: (data)=>request('/processes', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        updateStatus: (id, status)=>request(`/processes/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status
                })
            }),
        update: (id, data)=>request(`/processes/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
        getPhases: (id)=>request(`/processes/${id}/phases`),
        addPhase: (id, data)=>request(`/processes/${id}/phases`, {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        updatePhase: (processId, phaseId, data)=>request(`/processes/${processId}/phases/${phaseId}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
        updateData: (id, data)=>request(`/processes/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
        delete: (id)=>request(`/processes/${id}`, {
                method: 'DELETE'
            })
    },
    users: {
        listAll: ()=>request('/users'),
        create: (data)=>request('/users', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        update: (id, data)=>request(`/users/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
        toggleStatus: (id, status)=>request(`/users/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status
                })
            }),
        delete: (id)=>request(`/users/${id}`, {
                method: 'DELETE'
            })
    },
    pendingDashboard: {
        get: ()=>request('/pending-dashboard')
    },
    dashboard: {
        gestor: ()=>request('/dashboard/gestor'),
        fiscal: ()=>request('/dashboard/fiscal')
    },
    risk: {
        panel: ()=>request('/risk-panel')
    },
    audit: {
        list: ()=>request('/audit-logs'),
        delete: (id)=>request(`/audit-logs/${id}`, {
                method: 'DELETE'
            })
    },
    ai: {
        insights: ()=>request('/ai/insights'),
        analyzeContract: (contractId)=>request('/ai/analyze-contract', {
                method: 'POST',
                body: JSON.stringify({
                    contractId
                })
            })
    },
    utils: {
        getContractors: ()=>request('/contractors'),
        getProcesses: ()=>request('/processes'),
        getFiscais: ()=>request('/users/fiscais'),
        getGestores: ()=>request('/users/gestores')
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/labels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alterationStatusColor",
    ()=>alterationStatusColor,
    "alterationStatusLabel",
    ()=>alterationStatusLabel,
    "alterationTypeLabel",
    ()=>alterationTypeLabel,
    "contractStatusColor",
    ()=>contractStatusColor,
    "contractStatusLabel",
    ()=>contractStatusLabel,
    "fiscalRoleLabel",
    ()=>fiscalRoleLabel,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "measurementStatusColor",
    ()=>measurementStatusColor,
    "measurementStatusLabel",
    ()=>measurementStatusLabel,
    "modalityLabel",
    ()=>modalityLabel,
    "occurrenceSeverityColor",
    ()=>occurrenceSeverityColor,
    "occurrenceSeverityLabel",
    ()=>occurrenceSeverityLabel,
    "occurrenceStatusColor",
    ()=>occurrenceStatusColor,
    "occurrenceStatusLabel",
    ()=>occurrenceStatusLabel,
    "processStatusColor",
    ()=>processStatusColor,
    "processStatusLabel",
    ()=>processStatusLabel,
    "userRoleLabel",
    ()=>userRoleLabel
]);
const contractStatusLabel = {
    DRAFT: 'Minuta',
    ACTIVE: 'Ativo',
    SUSPENDED: 'Suspenso',
    CONCLUDED: 'Encerrado',
    RESCINDED: 'Rescindido'
};
const contractStatusColor = {
    DRAFT: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    SUSPENDED: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    CONCLUDED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    RESCINDED: 'bg-red-500/10 text-red-400 border-red-500/20'
};
const processStatusLabel = {
    PLANNING: 'Planejamento',
    LEGAL_REVIEW: 'Análise Jurídica',
    BIDDING: 'Licitação',
    CONTRACT_PREP: 'Elaboração Contratual',
    CONCLUDED: 'Concluído',
    CANCELED: 'Cancelado'
};
const processStatusColor = {
    PLANNING: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    LEGAL_REVIEW: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    BIDDING: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    CONTRACT_PREP: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    CONCLUDED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    CANCELED: 'bg-red-500/10 text-red-400 border-red-500/20'
};
const modalityLabel = {
    LICITACAO_13303: 'Licitação 13.303/2016',
    DISPENSA_13303: 'Dispensa 13.303/2016',
    INEXIGIBILIDADE: 'Inexigibilidade',
    PREGAO_ELETRONICO: 'Pregão Eletrônico',
    OUTROS: 'Outros'
};
const measurementStatusLabel = {
    PENDING_FISCAL: 'Pendente Fiscal',
    PENDING_GESTOR: 'Aguard. Homologação',
    APPROVED: 'Aprovado',
    REJECTED: 'Devolvido'
};
const measurementStatusColor = {
    PENDING_FISCAL: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    PENDING_GESTOR: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20'
};
const occurrenceSeverityLabel = {
    LOW: 'Baixa',
    MEDIUM: 'Média',
    HIGH: 'Alta',
    CRITICAL: 'Crítica'
};
const occurrenceSeverityColor = {
    LOW: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    MEDIUM: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    HIGH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    CRITICAL: 'bg-red-500/10 text-red-400 border-red-500/20'
};
const occurrenceStatusLabel = {
    OPEN: 'Em Aberto',
    UNDER_REVIEW: 'Em Análise',
    RESOLVED: 'Resolvida',
    REJECTED: 'Rejeitada'
};
const occurrenceStatusColor = {
    OPEN: 'bg-red-500/10 text-red-400 border-red-500/20',
    UNDER_REVIEW: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    RESOLVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    REJECTED: 'bg-zinc-800 text-zinc-400 border-zinc-700'
};
const alterationTypeLabel = {
    ADDENDUM_VALUE_INCREASE: 'Acréscimo de Valor',
    ADDENDUM_VALUE_DECREASE: 'Supressão de Valor',
    ADDENDUM_TIME_EXTENSION: 'Prorrogação de Prazo',
    PRICE_REAJUSTE: 'Reajuste de Preço',
    PRICE_REPACTUACAO: 'Repactuação',
    PRICE_REEQUILIBRIO: 'Reequilíbrio Econômico'
};
const alterationStatusLabel = {
    DRAFT: 'Rascunho',
    PENDING_APPROVAL: 'Aguard. Aprovação',
    APPROVED: 'Aprovado',
    REJECTED: 'Recusado'
};
const alterationStatusColor = {
    DRAFT: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    PENDING_APPROVAL: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20'
};
const fiscalRoleLabel = {
    TITULAR: 'Titular',
    SUBSTITUTO: 'Substituto',
    TECNICO: 'Técnico',
    ADMINISTRATIVO: 'Administrativo'
};
const userRoleLabel = {
    ADMIN: 'Auditor/Admin',
    GESTOR: 'Gestor de Contratos',
    FISCAL: 'Fiscal de Contrato',
    ALTA_GESTAO: 'Alta Gestão'
};
function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('pt-BR');
}
function formatDateTime(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('pt-BR');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_lib_0gac78y._.js.map