import {
  BiddingModality,
  ContractStatus,
  FiscalRole,
  PrismaClient,
  ProcessStatus,
  UserRole,
  UserStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CONTRACTS_VIGENTES_DATA } from './contracts-vigentes.data';
import { buildDefaultPhases, buildDefaultWorkflowItems } from '../src/processes/process-workflow';

const prisma = new PrismaClient();

const FISCAL_NAME_ALIASES: Record<string, string> = {
  'Pedro H. S. Martins': 'Pedro Henrique Martins',
  'Gabriel Morais Godinho': 'Gabriel Moraes Godinho',
  'Eunice Maria C Oliveira': 'Eunice Maria C. Oliveira',
};

function normalizeName(name: string) {
  return FISCAL_NAME_ALIASES[name] || name;
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/(^\.|\.$)/g, '');
}

function parseCurrency(raw: string | null | undefined) {
  if (!raw) return null;
  const match = raw.match(/[\d.]+,\d{2}/);
  if (!match) return null;
  return Number(match[0].replace(/\./g, '').replace(',', '.'));
}

function parseModality(legalBasis: string | null) {
  const basis = (legalBasis || '').toLowerCase();
  if (basis.includes('art. 29')) return BiddingModality.DISPENSA_13303;
  if (basis.includes('art. 30')) return BiddingModality.INEXIGIBILIDADE;
  return BiddingModality.LICITACAO_13303;
}

function getContractObservation(row: (typeof CONTRACTS_VIGENTES_DATA)[number]) {
  if (!row.observation) return null;
  return row.observation.replace(/^\*/, '').trim();
}

async function main() {
  console.log('Iniciando semeação do banco de dados...');

  await prisma.systemAlert.deleteMany();
  await prisma.communication.deleteMany();
  await prisma.document.deleteMany();
  await prisma.contractAlteration.deleteMany();
  await prisma.inspectionMeasurement.deleteMany();
  await prisma.occurrence.deleteMany();
  await prisma.processWorkflowItem.deleteMany();
  await prisma.processPhase.deleteMany();
  await prisma.fiscalAssignment.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.procurementProcess.deleteMany();
  await prisma.contractor.deleteMany();
  await prisma.user.deleteMany();

  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const gestorPasswordHash = await bcrypt.hash('gestor123', 10);
  const fiscalPasswordHash = await bcrypt.hash('fiscal123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Auditor Carlos Silva',
      email: 'admin@sigecontratos.com',
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      registrationNumber: 'IQG-ADM-001',
    },
  });

  const gestor = await prisma.user.create({
    data: {
      name: 'Gestora Ana Souza',
      email: 'gestor@sigecontratos.com',
      passwordHash: gestorPasswordHash,
      role: UserRole.GESTOR,
      status: UserStatus.ACTIVE,
      registrationNumber: 'IQG-GES-001',
    },
  });

  const fiscalNames = [...new Set(CONTRACTS_VIGENTES_DATA.map((row) => normalizeName(row.fiscal)))].sort();
  const fiscalMap = new Map<string, { id: string; name: string; email: string }>();

  for (const [index, name] of fiscalNames.entries()) {
    const user = await prisma.user.create({
      data: {
        name,
        email: `${slugify(name)}@sigecontratos.com`,
        passwordHash: fiscalPasswordHash,
        role: UserRole.FISCAL,
        status: UserStatus.ACTIVE,
        registrationNumber: `IQG-FIS-${String(index + 1).padStart(3, '0')}`,
      },
      select: { id: true, name: true, email: true },
    });

    fiscalMap.set(name, user);
  }

  console.log(`Fiscais credenciados: ${fiscalMap.size}`);

  const contractorMap = new Map<string, { id: string }>();

  for (const [index, row] of CONTRACTS_VIGENTES_DATA.entries()) {
    const key = row.company;
    if (contractorMap.has(key)) continue;

    const contractor = await prisma.contractor.create({
      data: {
        corporateName: row.company,
        tradeName: row.company,
        cnpjCpf: `00.000.000/0001-${String(index + 1).padStart(2, '0')}`,
        email: `${slugify(row.company).slice(0, 40)}@fornecedor.local`,
        addressCity: 'Goiânia',
        addressState: 'GO',
      },
      select: { id: true },
    });

    contractorMap.set(key, contractor);
  }

  for (const row of CONTRACTS_VIGENTES_DATA) {
    const fiscal = fiscalMap.get(normalizeName(row.fiscal));
    const contractor = contractorMap.get(row.company);
    const initialValue = parseCurrency(row.value) || 0;
    const monthlyValue = parseCurrency(row.monthlyValue);
    const outstandingBalance = parseCurrency(row.outstandingBalance);
    const signingDate = new Date(row.start);
    signingDate.setDate(signingDate.getDate() - 7);

    const process = await prisma.procurementProcess.create({
      data: {
        processNumber: row.processNumber,
        relatedProcessNumbers: row.relatedProcessNumbers,
        subject: row.object,
        description: `${row.company} — ${row.object}`,
        status: ProcessStatus.EXECUTION,
        modality: parseModality(row.legalBasis),
        estimatedValue: initialValue,
        requesterDepartment: row.unit,
        requesterId: fiscal?.id || gestor.id,
        responsibleFiscalId: fiscal?.id || null,
        legalBasis: row.legalBasis,
        contractReference: row.contractNumber,
        currentAddendum: row.addendum,
        fiscalOrdinance: row.ordinance,
        observation: getContractObservation(row),
      },
    });

    const contract = await prisma.contract.create({
      data: {
        contractNumber: row.contractNumber,
        processId: process.id,
        contractorId: contractor!.id,
        objectDescription: row.object,
        initialValue,
        currentValue: initialValue,
        worksheetOrder: row.ord,
        amendmentSummary: row.addendum,
        monthlyValue,
        outstandingBalance,
        observation: getContractObservation(row),
        signingDate,
        startDate: new Date(row.start),
        endDate: new Date(row.end),
        status: ContractStatus.ACTIVE,
        managerId: gestor.id,
      },
    });

    if (fiscal) {
      await prisma.fiscalAssignment.create({
        data: {
          contractId: contract.id,
          fiscalId: fiscal.id,
          role: FiscalRole.TITULAR,
          designationAct: row.ordinance,
          designationDate: new Date(row.start),
          startDate: new Date(row.start),
          isActive: true,
        },
      });
    }

    const phases = buildDefaultPhases(process.id, fiscal?.id, 'active-contract');
    const createdPhases: Array<{ id: string; phaseNumber: number }> = [];

    for (const phase of phases) {
      const createdPhase = await prisma.processPhase.create({ data: phase });
      createdPhases.push({ id: createdPhase.id, phaseNumber: createdPhase.phaseNumber });
    }

    const workflowItems = buildDefaultWorkflowItems(process.id, createdPhases, 'active-contract');
    await prisma.processWorkflowItem.createMany({ data: workflowItems });

    await prisma.document.create({
      data: {
        contractId: contract.id,
        processId: process.id,
        category: 'CONTRACT_SIGNED',
        title: `${row.contractNumber} - Contrato Assinado`,
        fileKey: `seed/contracts/${contract.id}/contrato-assinado.pdf`,
        fileSize: 0,
        mimeType: 'application/pdf',
        uploadedById: gestor.id,
      },
    });

    await prisma.document.create({
      data: {
        contractId: contract.id,
        processId: process.id,
        category: 'FISCAL_PORTARIA',
        title: `${row.ordinance} - Designação Fiscal`,
        fileKey: `seed/contracts/${contract.id}/portaria-fiscal.pdf`,
        fileSize: 0,
        mimeType: 'application/pdf',
        uploadedById: admin.id,
      },
    });

    if (row.observation) {
      await prisma.communication.create({
        data: {
          contractId: contract.id,
          senderId: gestor.id,
          recipientId: fiscal?.id || null,
          subject: 'Providência de vigência contratual',
          message: row.observation.replace(/^\*/, '').trim(),
        },
      });
    }
  }

  console.log(`Processos/contratos importados: ${CONTRACTS_VIGENTES_DATA.length}`);
  console.log('Semeação concluída com sucesso.');
}

main()
  .catch((error) => {
    console.error('Erro durante a semeação:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
