import { PrismaClient, UserRole, UserStatus, ProcessStatus, BiddingModality, ContractStatus, FiscalRole, OccurrenceSeverity, OccurrenceStatus, MeasurementStatus, AlterationType, AlterationStatus, AlertType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando semeação do banco de dados...');

  // Limpar tabelas existentes em ordem reversa de chaves estrangeiras
  await prisma.systemAlert.deleteMany();
  await prisma.communication.deleteMany();
  await prisma.document.deleteMany();
  await prisma.contractAlteration.deleteMany();
  await prisma.inspectionMeasurement.deleteMany();
  await prisma.occurrence.deleteMany();
  await prisma.fiscalAssignment.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.procurementProcess.deleteMany();
  await prisma.contractor.deleteMany();
  await prisma.user.deleteMany();

  // Criar hashes de senhas
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const gestorPasswordHash = await bcrypt.hash('gestor123', 10);
  const fiscalPasswordHash = await bcrypt.hash('fiscal123', 10);

  // 1. Criar Usuários
  const admin = await prisma.user.create({
    data: {
      name: 'Auditor Carlos Silva',
      email: 'admin@sigecontratos.com',
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      registrationNumber: 'IQG-8890',
    },
  });

  const gestor = await prisma.user.create({
    data: {
      name: 'Gestora Ana Souza',
      email: 'gestor@sigecontratos.com',
      passwordHash: gestorPasswordHash,
      role: UserRole.GESTOR,
      status: UserStatus.ACTIVE,
      registrationNumber: 'IQG-5421',
    },
  });

  const fiscal1 = await prisma.user.create({
    data: {
      name: 'Fiscal João Oliveira',
      email: 'fiscal1@sigecontratos.com',
      passwordHash: fiscalPasswordHash,
      role: UserRole.FISCAL,
      status: UserStatus.ACTIVE,
      registrationNumber: 'IQG-3312',
    },
  });

  const fiscal2 = await prisma.user.create({
    data: {
      name: 'Fiscal Maria Santos',
      email: 'fiscal2@sigecontratos.com',
      passwordHash: fiscalPasswordHash,
      role: UserRole.FISCAL,
      status: UserStatus.ACTIVE,
      registrationNumber: 'IQG-4123',
    },
  });

  console.log('Usuários criados.');

  // 2. Criar Fornecedores
  const contractor1 = await prisma.contractor.create({
    data: {
      corporateName: 'Indústria Química Alfa S.A.',
      tradeName: 'Alfa Química',
      cnpjCpf: '12.345.678/0001-90',
      email: 'contato@alfaquimica.com.br',
      phone: '(62) 3200-1122',
      postalCode: '74000-000',
      addressStreet: 'Avenida das Indústrias',
      addressNumber: '1000',
      addressNeighborhood: 'Distrito Industrial',
      addressCity: 'Goiânia',
      addressState: 'GO',
    },
  });

  const contractor2 = await prisma.contractor.create({
    data: {
      corporateName: 'Dharma Distribuidora de Reagentes Eireli',
      tradeName: 'Dharma Reagentes',
      cnpjCpf: '98.765.432/0001-10',
      email: 'vendas@dharmareagentes.com.br',
      phone: '(62) 3541-9988',
      postalCode: '74110-020',
      addressStreet: 'Rua T-55',
      addressNumber: '450',
      addressNeighborhood: 'Setor Bueno',
      addressCity: 'Goiânia',
      addressState: 'GO',
    },
  });

  console.log('Fornecedores criados.');

  // 3. Criar Processos de Contratação
  const process1 = await prisma.procurementProcess.create({
    data: {
      processNumber: 'IQUEGO-PRC-2026/00123',
      subject: 'Aquisição de insumos químicos para produção de medicamentos essenciais',
      description: 'Processo destinado à compra de matéria-prima para atendimento de contratos com o Ministério da Saúde (SUS).',
      status: ProcessStatus.CONCLUDED,
      modality: BiddingModality.LICITACAO_13303,
      estimatedValue: 1200000.00,
      requesterDepartment: 'Gerência de Produção',
      requesterId: fiscal1.id,
    },
  });

  const process2 = await prisma.procurementProcess.create({
    data: {
      processNumber: 'IQUEGO-PRC-2026/00140',
      subject: 'Contratação de serviços de calibração de equipamentos laboratoriais',
      description: 'Manutenção preventiva e corretiva de centrífugas, autoclaves e HPLC do laboratório de controle de qualidade.',
      status: ProcessStatus.PLANNING,
      modality: BiddingModality.DISPENSA_13303,
      estimatedValue: 48000.00,
      requesterDepartment: 'Controle de Qualidade',
      requesterId: fiscal2.id,
    },
  });

  console.log('Processos de contratação criados.');

  // 4. Criar Contratos
  const contract1 = await prisma.contract.create({
    data: {
      contractNumber: 'IQUEGO-CTR-2026/00045',
      processId: process1.id,
      contractorId: contractor1.id,
      objectDescription: 'Fornecimento parcelado de sais minerais e princípios ativos farmacêuticos para formulações sólidas.',
      initialValue: 1200000.00,
      currentValue: 1250000.00, // Com R$50.000,00 de aditivo
      signingDate: new Date('2026-01-05'),
      startDate: new Date('2026-01-10'),
      endDate: new Date('2027-01-09'),
      status: ContractStatus.ACTIVE,
      managerId: gestor.id,
    },
  });

  console.log('Contratos criados.');

  // 5. Designações de Fiscais
  await prisma.fiscalAssignment.create({
    data: {
      contractId: contract1.id,
      fiscalId: fiscal1.id,
      role: FiscalRole.TITULAR,
      designationAct: 'Portaria nº 012/2026-DG',
      designationDate: new Date('2026-01-06'),
      startDate: new Date('2026-01-10'),
      isActive: true,
    },
  });

  await prisma.fiscalAssignment.create({
    data: {
      contractId: contract1.id,
      fiscalId: fiscal2.id,
      role: FiscalRole.SUBSTITUTO,
      designationAct: 'Portaria nº 012/2026-DG',
      designationDate: new Date('2026-01-06'),
      startDate: new Date('2026-01-10'),
      isActive: true,
    },
  });

  console.log('Designações de fiscais associadas.');

  // 6. Criar Ocorrências
  await prisma.occurrence.create({
    data: {
      contractId: contract1.id,
      fiscalId: fiscal1.id,
      title: 'Atraso de 48h na entrega do Lote 02',
      description: 'O fornecedor Alfa Química entregou a matéria-prima com 2 dias de atraso em relação ao cronograma físico-financeiro original. Isso gerou reprogramação de lote na linha de produção.',
      severity: OccurrenceSeverity.MEDIUM,
      status: OccurrenceStatus.RESOLVED,
      resolutionDescription: 'A empresa justificou que houve atraso na liberação alfandegária e comprometeu-se a compensar na próxima remessa. Ocorrência resolvida.',
      resolvedById: gestor.id,
      resolvedAt: new Date('2026-03-15T14:30:00Z'),
      createdAt: new Date('2026-03-10T09:00:00Z'),
    },
  });

  await prisma.occurrence.create({
    data: {
      contractId: contract1.id,
      fiscalId: fiscal1.id,
      title: 'Divergência em laudo de pureza química',
      description: 'O reagente X entregue no Lote 04 apresentou teor de pureza de 97.5% no laudo interno da IQUEGO, enquanto o laudo do fabricante alegava 99.0%. Aguardando contraprova.',
      severity: OccurrenceSeverity.HIGH,
      status: OccurrenceStatus.OPEN,
      createdAt: new Date('2026-06-02T10:15:00Z'),
    },
  });

  console.log('Ocorrências criadas.');

  // 7. Criar Medições e Fiscalizações
  await prisma.inspectionMeasurement.create({
    data: {
      contractId: contract1.id,
      fiscalId: fiscal1.id,
      periodStart: new Date('2026-01-10'),
      periodEnd: new Date('2026-02-09'),
      measurementValue: 100000.00,
      reportDescription: 'Primeira entrega realizada com sucesso, atendendo a todos os requisitos de pureza e embalagem. Emissão de parecer favorável para liquidação da nota fiscal.',
      status: MeasurementStatus.APPROVED,
      approvedById: gestor.id,
      approvalDate: new Date('2026-02-15T16:00:00Z'),
      createdAt: new Date('2026-02-12T11:00:00Z'),
    },
  });

  await prisma.inspectionMeasurement.create({
    data: {
      contractId: contract1.id,
      fiscalId: fiscal1.id,
      periodStart: new Date('2026-05-10'),
      periodEnd: new Date('2026-06-09'),
      measurementValue: 125000.00,
      reportDescription: 'Medição referente à quinta parcela de insumos. Toda a documentação e certidões negativas da contratada foram anexadas.',
      status: MeasurementStatus.PENDING_GESTOR,
      createdAt: new Date('2026-06-09T17:30:00Z'),
    },
  });

  console.log('Medições de fiscalização criadas.');

  // 8. Criar Alterações Contratuais (Termos Aditivos)
  await prisma.contractAlteration.create({
    data: {
      contractId: contract1.id,
      type: AlterationType.ADDENDUM_VALUE_INCREASE,
      alterationNumber: '1º Termo Aditivo',
      valueChange: 50000.00,
      justification: 'Acréscimo qualitativo para aquisição complementar de embalagens especiais resistentes a humidade, necessárias para manter a integridade dos insumos.',
      status: AlterationStatus.APPROVED,
      requestedById: fiscal1.id,
      reviewedById: gestor.id,
      reviewDate: new Date('2026-04-20T10:00:00Z'),
      reviewNotes: 'Parecer jurídico nº 45/2026 favorável. Acréscimo está dentro do limite de 25% estabelecido no RILC e na Lei 13.303.',
      createdAt: new Date('2026-04-12T14:00:00Z'),
    },
  });

  console.log('Termos aditivos inseridos.');

  // 9. Criar Alertas
  await prisma.systemAlert.create({
    data: {
      contractId: contract1.id,
      type: AlertType.OCCURRENCE_CRITICAL,
      message: 'Ocorrência de alta gravidade registrada para o Contrato IQUEGO-CTR-2026/00045: Divergência em laudo de pureza química.',
      targetRole: UserRole.GESTOR,
      isRead: false,
      createdAt: new Date('2026-06-02T10:15:00Z'),
    },
  });

  await prisma.systemAlert.create({
    data: {
      contractId: contract1.id,
      type: AlertType.MEASUREMENT_PENDING,
      message: 'Medição pendente de homologação no valor de R$ 125.000,00 para o Contrato IQUEGO-CTR-2026/00045.',
      targetRole: UserRole.GESTOR,
      isRead: false,
      createdAt: new Date('2026-06-09T17:30:00Z'),
    },
  });

  console.log('Alertas gerados.');

  console.log('Semeação concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
