import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PhaseStatus, ProcessStatus, UserRole } from '@prisma/client';

interface ChecklistItem { id: string; texto: string; concluido: boolean; }

const DEFAULT_PHASES = [
  {
    phaseNumber: 1,
    name: 'Solicitação da Área Demandante',
    descricao: 'Recebimento e análise do documento de solicitação da contratação pela área requisitante.',
    responsavelSetor: 'Área Demandante',
    documentoObrigatorio: 'Ofício/Memorando de Solicitação',
    prazoDias: 5,
    bloqueiaAvancoSemConclusao: false,
    checklistItems: [
      { id: 'c1_1', texto: 'Ofício/Memorando de solicitação recebido', concluido: false },
      { id: 'c1_2', texto: 'Solicitante com autorização para demandar', concluido: false },
      { id: 'c1_3', texto: 'Objeto e justificativa descritos adequadamente', concluido: false },
      { id: 'c1_4', texto: 'Prazo desejado informado', concluido: false },
    ],
  },
  {
    phaseNumber: 2,
    name: 'Termo de Referência / Projeto Básico',
    descricao: 'Elaboração e aprovação do Termo de Referência ou Projeto Básico, com especificações técnicas detalhadas.',
    responsavelSetor: 'Área Técnica / Demandante',
    documentoObrigatorio: 'Termo de Referência aprovado',
    prazoDias: 15,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c2_1', texto: 'TR/PB aprovado pela área técnica', concluido: false },
      { id: 'c2_2', texto: 'Objeto descrito detalhadamente', concluido: false },
      { id: 'c2_3', texto: 'Especificações técnicas mínimas definidas', concluido: false },
      { id: 'c2_4', texto: 'Critérios de avaliação e aceitação estabelecidos', concluido: false },
      { id: 'c2_5', texto: 'Estimativa de quantidade e prazo definidos', concluido: false },
      { id: 'c2_6', texto: 'Responsabilidades das partes descritas', concluido: false },
      { id: 'c2_7', texto: 'Critérios de medição e pagamento definidos', concluido: false },
    ],
  },
  {
    phaseNumber: 3,
    name: 'Pesquisa de Preços / Cotações',
    descricao: 'Levantamento de preços de mercado com no mínimo 3 fontes de pesquisa para formação do valor estimado.',
    responsavelSetor: 'Setor de Compras / Área Técnica',
    documentoObrigatorio: 'Mapa/Planilha de Pesquisa de Preços',
    prazoDias: 10,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c3_1', texto: 'Mínimo de 3 cotações/fontes pesquisadas', concluido: false },
      { id: 'c3_2', texto: 'Preços de mercado atualizados', concluido: false },
      { id: 'c3_3', texto: 'Metodologia de formação do preço documentada', concluido: false },
      { id: 'c3_4', texto: 'Planilha de composição de custos elaborada', concluido: false },
      { id: 'c3_5', texto: 'Valor estimado calculado e justificado', concluido: false },
    ],
  },
  {
    phaseNumber: 4,
    name: 'Justificativa / Enquadramento Legal',
    descricao: 'Análise e documentação do enquadramento legal da contratação, incluindo fundamento para dispensa ou inexigibilidade.',
    responsavelSetor: 'Setor Jurídico / Área Técnica',
    documentoObrigatorio: 'Nota de Enquadramento Legal',
    prazoDias: 7,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c4_1', texto: 'Enquadramento legal identificado (Lei 13.303/2016)', concluido: false },
      { id: 'c4_2', texto: 'Justificativa de escolha da modalidade documentada', concluido: false },
      { id: 'c4_3', texto: 'Verificação de vedações e restrições legais realizada', concluido: false },
      { id: 'c4_4', texto: 'Análise de riscos preliminar elaborada', concluido: false },
    ],
  },
  {
    phaseNumber: 5,
    name: 'Reserva / Saldo Orçamentário',
    descricao: 'Verificação da disponibilidade de crédito orçamentário e emissão da nota de reserva/pré-empenho.',
    responsavelSetor: 'Setor Financeiro / Contabilidade',
    documentoObrigatorio: 'Nota de Reserva Orçamentária',
    prazoDias: 5,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c5_1', texto: 'Dotação orçamentária indicada', concluido: false },
      { id: 'c5_2', texto: 'Disponibilidade de saldo verificada', concluido: false },
      { id: 'c5_3', texto: 'Nota de reserva/pré-empenho emitida', concluido: false },
      { id: 'c5_4', texto: 'Compatibilidade com PCA/PAC verificada', concluido: false },
    ],
  },
  {
    phaseNumber: 6,
    name: 'Parecer Jurídico',
    descricao: 'Análise jurídica do processo, incluindo revisão da minuta de contrato e emissão de parecer pela assessoria jurídica.',
    responsavelSetor: 'Assessoria Jurídica',
    documentoObrigatorio: 'Parecer Jurídico favorável',
    prazoDias: 10,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c6_1', texto: 'Processo encaminhado à assessoria jurídica', concluido: false },
      { id: 'c6_2', texto: 'Minuta do contrato/instrumento analisada', concluido: false },
      { id: 'c6_3', texto: 'Parecer jurídico favorável emitido', concluido: false },
      { id: 'c6_4', texto: 'Ressalvas e condicionantes do parecer atendidas', concluido: false },
    ],
  },
  {
    phaseNumber: 7,
    name: 'Ratificação / Autorização da Autoridade',
    descricao: 'Submissão do processo à autoridade competente para ratificação ou autorização da contratação.',
    responsavelSetor: 'Diretoria / Autoridade Competente',
    documentoObrigatorio: 'Ato de Ratificação/Autorização assinado',
    prazoDias: 5,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c7_1', texto: 'Processo submetido à autoridade competente', concluido: false },
      { id: 'c7_2', texto: 'Ratificação/autorização assinada pela autoridade', concluido: false },
      { id: 'c7_3', texto: 'Publicação da ratificação realizada (quando exigido)', concluido: false },
    ],
  },
  {
    phaseNumber: 8,
    name: 'Empenho',
    descricao: 'Emissão da nota de empenho para reserva definitiva dos recursos orçamentários.',
    responsavelSetor: 'Setor Financeiro / Contabilidade',
    documentoObrigatorio: 'Nota de Empenho emitida',
    prazoDias: 3,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c8_1', texto: 'Nota de Empenho emitida', concluido: false },
      { id: 'c8_2', texto: 'Valor compatível com estimativa aprovada', concluido: false },
      { id: 'c8_3', texto: 'Classificação orçamentária correta', concluido: false },
      { id: 'c8_4', texto: 'Número da NE comunicado ao contratado', concluido: false },
    ],
  },
  {
    phaseNumber: 9,
    name: 'Contrato / Instrumento Equivalente',
    descricao: 'Elaboração final e revisão do instrumento contratual ou documento equivalente.',
    responsavelSetor: 'Setor Jurídico / Área Técnica',
    documentoObrigatorio: 'Minuta final do Contrato/Instrumento',
    prazoDias: 7,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c9_1', texto: 'Minuta finalizada e aprovada pela jurídica', concluido: false },
      { id: 'c9_2', texto: 'Documentação do contratado verificada (CNPJ, certidões)', concluido: false },
      { id: 'c9_3', texto: 'Regularidade fiscal e trabalhista confirmada', concluido: false },
      { id: 'c9_4', texto: 'Cláusulas obrigatórias incluídas (Lei 13.303/2016)', concluido: false },
    ],
  },
  {
    phaseNumber: 10,
    name: 'Assinatura das Partes',
    descricao: 'Assinatura do contrato pelas partes envolvidas, com testemunhas e formalidades legais.',
    responsavelSetor: 'Diretoria / Departamento Contratual',
    documentoObrigatorio: 'Contrato assinado por todas as partes',
    prazoDias: 5,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c10_1', texto: 'Contrato assinado pelo representante legal do contratado', concluido: false },
      { id: 'c10_2', texto: 'Contrato assinado pela autoridade competente da estatal', concluido: false },
      { id: 'c10_3', texto: 'Testemunhas identificadas e assinadas', concluido: false },
      { id: 'c10_4', texto: 'Data e local de assinatura registrados', concluido: false },
      { id: 'c10_5', texto: 'Via original arquivada e cópia entregue ao contratado', concluido: false },
    ],
  },
  {
    phaseNumber: 11,
    name: 'Designação do Fiscal / Gestor',
    descricao: 'Designação formal do fiscal e gestor do contrato por ato normativo específico.',
    responsavelSetor: 'Diretoria / RH',
    documentoObrigatorio: 'Portaria de Designação do Fiscal/Gestor',
    prazoDias: 5,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c11_1', texto: 'Fiscal titular designado por portaria/ato normativo', concluido: false },
      { id: 'c11_2', texto: 'Fiscal substituto/suplente designado', concluido: false },
      { id: 'c11_3', texto: 'Fiscais notificados e cientes das responsabilidades', concluido: false },
      { id: 'c11_4', texto: 'Cópia do contrato repassada ao fiscal designado', concluido: false },
      { id: 'c11_5', texto: 'Registro no sistema de gestão de contratos realizado', concluido: false },
    ],
  },
  {
    phaseNumber: 12,
    name: 'Publicação / Divulgação',
    descricao: 'Publicação do extrato do contrato nos meios exigidos por lei e registro no portal de transparência.',
    responsavelSetor: 'Assessoria de Comunicação / Jurídico',
    documentoObrigatorio: 'Comprovante de Publicação',
    prazoDias: 20,
    bloqueiaAvancoSemConclusao: false,
    checklistItems: [
      { id: 'c12_1', texto: 'Publicado no Diário Oficial (quando exigido)', concluido: false },
      { id: 'c12_2', texto: 'Extrato cadastrado no portal de transparência', concluido: false },
      { id: 'c12_3', texto: 'Registrado no sistema de controle interno', concluido: false },
    ],
  },
  {
    phaseNumber: 13,
    name: 'Início da Execução',
    descricao: 'Emissão da ordem de início e início formal da execução do objeto contratual.',
    responsavelSetor: 'Fiscal do Contrato / Área Técnica',
    documentoObrigatorio: 'Ordem de Início de Serviço/Fornecimento',
    prazoDias: 5,
    bloqueiaAvancoSemConclusao: true,
    checklistItems: [
      { id: 'c13_1', texto: 'Ordem de serviço/fornecimento emitida', concluido: false },
      { id: 'c13_2', texto: 'Contratado notificado formalmente para início', concluido: false },
      { id: 'c13_3', texto: 'Fiscal acompanhando a execução do objeto', concluido: false },
      { id: 'c13_4', texto: 'Data de início registrada conforme contrato', concluido: false },
    ],
  },
  {
    phaseNumber: 14,
    name: 'Entrega / Ateste / Encerramento',
    descricao: 'Recebimento provisório e definitivo do objeto, ateste do fiscal e encerramento formal do processo de contratação.',
    responsavelSetor: 'Fiscal do Contrato / Gestão',
    documentoObrigatorio: 'Ateste de Conclusão / Recebimento Definitivo',
    prazoDias: 10,
    bloqueiaAvancoSemConclusao: false,
    checklistItems: [
      { id: 'c14_1', texto: 'Objeto entregue/executado conforme especificações', concluido: false },
      { id: 'c14_2', texto: 'Recebimento provisório registrado', concluido: false },
      { id: 'c14_3', texto: 'Recebimento definitivo e ateste do fiscal emitido', concluido: false },
      { id: 'c14_4', texto: 'Nota fiscal verificada e aprovada', concluido: false },
      { id: 'c14_5', texto: 'Pagamento final processado', concluido: false },
      { id: 'c14_6', texto: 'Documentação do processo arquivada', concluido: false },
    ],
  },
];

@Injectable()
export class ProcessesService {
  constructor(private prisma: PrismaService) {}

  private withPhases = {
    requester: { select: { id: true, name: true, registrationNumber: true } },
    contracts: { select: { id: true, contractNumber: true, status: true } },
    phases: {
      orderBy: { phaseNumber: 'asc' as const },
      include: { responsible: { select: { id: true, name: true } } },
    },
  };

  async findAll(userId: string, role: string) {
    if (role === UserRole.FISCAL) {
      return this.prisma.procurementProcess.findMany({
        where: { requesterId: userId },
        include: this.withPhases,
        orderBy: { processNumber: 'desc' },
      });
    }
    return this.prisma.procurementProcess.findMany({
      include: this.withPhases,
      orderBy: { processNumber: 'desc' },
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const process = await this.prisma.procurementProcess.findUnique({
      where: { id },
      include: {
        requester: { select: { id: true, name: true, registrationNumber: true } },
        contracts: {
          include: {
            contractor: true,
            fiscalAssignments: {
              include: { fiscal: { select: { id: true, name: true } } },
              where: { isActive: true },
            },
          },
        },
        phases: {
          orderBy: { phaseNumber: 'asc' },
          include: { responsible: { select: { id: true, name: true } } },
        },
        documents: true,
      },
    });

    if (!process) throw new NotFoundException('Processo não encontrado');
    if (role === UserRole.FISCAL && process.requesterId !== userId) {
      throw new ForbiddenException('Você não tem permissão para visualizar este processo');
    }
    return process;
  }

  async create(userId: string, data: any) {
    const process = await this.prisma.procurementProcess.create({
      data: {
        processNumber: data.processNumber,
        subject: data.subject,
        description: data.description || null,
        status: (data.status as ProcessStatus) || ProcessStatus.PLANNING,
        modality: data.modality,
        estimatedValue: data.estimatedValue,
        requesterDepartment: data.requesterDepartment,
        requesterId: userId,
        tipoContratacao: data.tipoContratacao || null,
        fundamentoLegalPreliminar: data.fundamentoLegalPreliminar || null,
        dataSolicitacao: data.dataSolicitacao ? new Date(data.dataSolicitacao) : null,
        responsavelDemanda: data.responsavelDemanda || null,
        prioridade: data.prioridade || 'NORMAL',
        possuiPrazoCritico: data.possuiPrazoCritico ?? false,
        dataLimiteProcesso: data.dataLimiteProcesso ? new Date(data.dataLimiteProcesso) : null,
        justificativaUrgencia: data.justificativaUrgencia || null,
        exigeTR: data.exigeTR ?? true,
        exigeParecerJuridico: data.exigeParecerJuridico ?? true,
        exigeRatificacaoAutoridade: data.exigeRatificacaoAutoridade ?? true,
        exigeContratoFormal: data.exigeContratoFormal ?? true,
        exigePublicacaoDivulgacao: data.exigePublicacaoDivulgacao ?? true,
        fiscalDefinido: data.fiscalDefinido ?? false,
        observacoesGerenciais: data.observacoesGerenciais || null,
      },
    });

    // Auto-create 14 default phases
    const phases = DEFAULT_PHASES.map(ph => ({
      processId: process.id,
      phaseNumber: ph.phaseNumber,
      name: ph.name,
      descricao: ph.descricao,
      responsavelSetor: ph.responsavelSetor,
      documentoObrigatorio: ph.documentoObrigatorio,
      prazoDias: ph.prazoDias,
      bloqueiaAvancoSemConclusao: ph.bloqueiaAvancoSemConclusao,
      checklistItems: ph.checklistItems,
      alertaAtivo: true,
      status: PhaseStatus.PENDING,
      isActive: true,
    }));

    await this.prisma.procurementPhase.createMany({ data: phases });

    return this.prisma.procurementProcess.findUnique({
      where: { id: process.id },
      include: this.withPhases,
    });
  }

  async update(id: string, data: any) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id } });
    if (!process) throw new NotFoundException('Processo não encontrado');

    const updateData: any = {};
    const strFields = ['subject', 'requesterDepartment', 'tipoContratacao', 'fundamentoLegalPreliminar', 'responsavelDemanda', 'prioridade', 'justificativaUrgencia', 'observacoesGerenciais', 'description'];
    const boolFields = ['possuiPrazoCritico', 'exigeTR', 'exigeParecerJuridico', 'exigeRatificacaoAutoridade', 'exigeContratoFormal', 'exigePublicacaoDivulgacao', 'fiscalDefinido'];
    const dateFields = ['dataSolicitacao', 'dataLimiteProcesso'];

    if (data.status) updateData.status = data.status as ProcessStatus;
    if (data.estimatedValue !== undefined) updateData.estimatedValue = data.estimatedValue;
    strFields.forEach(f => { if (data[f] !== undefined) updateData[f] = data[f]; });
    boolFields.forEach(f => { if (data[f] !== undefined) updateData[f] = data[f]; });
    dateFields.forEach(f => { if (data[f] !== undefined) updateData[f] = data[f] ? new Date(data[f]) : null; });

    return this.prisma.procurementProcess.update({ where: { id }, data: updateData });
  }

  async updateStatus(id: string, status: string) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id } });
    if (!process) throw new NotFoundException('Processo não encontrado');
    return this.prisma.procurementProcess.update({
      where: { id },
      data: { status: status as ProcessStatus },
    });
  }

  async delete(id: string) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id } });
    if (!process) throw new NotFoundException('Processo não encontrado');
    await this.prisma.procurementProcess.delete({ where: { id } });
    return { ok: true };
  }

  async getPhases(processId: string) {
    return this.prisma.procurementPhase.findMany({
      where: { processId },
      orderBy: { phaseNumber: 'asc' },
      include: { responsible: { select: { id: true, name: true } } },
    });
  }

  async addPhase(processId: string, data: any) {
    const process = await this.prisma.procurementProcess.findUnique({ where: { id: processId } });
    if (!process) throw new NotFoundException('Processo não encontrado');

    return this.prisma.procurementPhase.create({
      data: {
        processId,
        phaseNumber: data.phaseNumber,
        name: data.name,
        descricao: data.descricao || null,
        responsavelSetor: data.responsavelSetor || null,
        documentoObrigatorio: data.documentoObrigatorio || null,
        prazoDias: data.prazoDias || null,
        bloqueiaAvancoSemConclusao: data.bloqueiaAvancoSemConclusao ?? false,
        checklistItems: data.checklistItems || null,
        alertaAtivo: data.alertaAtivo ?? true,
        status: (data.status as PhaseStatus) || PhaseStatus.PENDING,
        plannedStart: data.plannedStart ? new Date(data.plannedStart) : null,
        plannedEnd: data.plannedEnd ? new Date(data.plannedEnd) : null,
        actualStart: data.actualStart ? new Date(data.actualStart) : null,
        actualEnd: data.actualEnd ? new Date(data.actualEnd) : null,
        responsibleId: data.responsibleId || null,
        isActive: data.isActive !== undefined ? data.isActive : true,
        observacoes: data.observacoes || null,
        pendenciaCritica: data.pendenciaCritica || null,
      },
    });
  }

  async updatePhase(processId: string, phaseId: string, data: any) {
    const phase = await this.prisma.procurementPhase.findUnique({ where: { id: phaseId } });
    if (!phase || phase.processId !== processId) throw new NotFoundException('Fase não encontrada');

    // Business rule: cannot complete without previous blocking phase done
    if (data.status === 'COMPLETED' && phase.phaseNumber > 1) {
      const phases = await this.prisma.procurementPhase.findMany({
        where: { processId },
        orderBy: { phaseNumber: 'asc' },
      });
      const previousPhase = phases.find(p => p.phaseNumber === phase.phaseNumber - 1);
      if (previousPhase?.bloqueiaAvancoSemConclusao && previousPhase.status !== PhaseStatus.COMPLETED) {
        throw new BadRequestException(
          `A fase "${previousPhase.name}" precisa ser concluída antes de avançar esta fase.`
        );
      }
    }

    // Business rule: cannot complete Parecer Jurídico (phase 6) without favorable opinion
    if (data.status === 'COMPLETED' && phase.phaseNumber === 6) {
      const items = (data.checklistItems || phase.checklistItems) as ChecklistItem[] | null;
      const parecerItem = items?.find(i => i.id === 'c6_3');
      if (parecerItem && !parecerItem.concluido) {
        throw new BadRequestException('O Parecer Jurídico favorável deve ser marcado como concluído antes de fechar esta fase.');
      }
    }

    // Business rule: cannot complete Ratificação (phase 7) without signature
    if (data.status === 'COMPLETED' && phase.phaseNumber === 7) {
      const items = (data.checklistItems || phase.checklistItems) as ChecklistItem[] | null;
      const ratifItem = items?.find(i => i.id === 'c7_2');
      if (ratifItem && !ratifItem.concluido) {
        throw new BadRequestException('A ratificação/autorização assinada deve ser marcada como concluída antes de fechar esta fase.');
      }
    }

    // Business rule: cannot start Início da Execução (phase 13) without signed contract (phase 10 completed)
    if (data.status === 'IN_PROGRESS' && phase.phaseNumber === 13) {
      const phases = await this.prisma.procurementPhase.findMany({ where: { processId } });
      const assinaturaPhase = phases.find(p => p.phaseNumber === 10);
      if (assinaturaPhase && assinaturaPhase.status !== PhaseStatus.COMPLETED) {
        throw new BadRequestException('O contrato deve estar assinado (fase 10 concluída) antes do início da execução.');
      }
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.status) updateData.status = data.status as PhaseStatus;
    if (data.plannedStart !== undefined) updateData.plannedStart = data.plannedStart ? new Date(data.plannedStart) : null;
    if (data.plannedEnd !== undefined) updateData.plannedEnd = data.plannedEnd ? new Date(data.plannedEnd) : null;
    if (data.actualStart !== undefined) updateData.actualStart = data.actualStart ? new Date(data.actualStart) : null;
    if (data.actualEnd !== undefined) updateData.actualEnd = data.actualEnd ? new Date(data.actualEnd) : null;
    if (data.responsibleId !== undefined) updateData.responsibleId = data.responsibleId || null;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.observacoes !== undefined) updateData.observacoes = data.observacoes || null;
    if (data.pendenciaCritica !== undefined) updateData.pendenciaCritica = data.pendenciaCritica || null;
    if (data.checklistItems !== undefined) updateData.checklistItems = data.checklistItems;
    if (data.responsavelSetor !== undefined) updateData.responsavelSetor = data.responsavelSetor || null;
    if (data.alertaAtivo !== undefined) updateData.alertaAtivo = data.alertaAtivo;

    // Auto-set actualStart when moving to IN_PROGRESS
    if (data.status === 'IN_PROGRESS' && !phase.actualStart && !data.actualStart) {
      updateData.actualStart = new Date();
    }
    // Auto-set actualEnd when completing
    if (data.status === 'COMPLETED' && !phase.actualEnd && !data.actualEnd) {
      updateData.actualEnd = new Date();
    }

    return this.prisma.procurementPhase.update({ where: { id: phaseId }, data: updateData });
  }
}
