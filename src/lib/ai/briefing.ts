import { isoWeek } from "./generation-id";

/**
 * Editorial calendar. Topics rotate week by week; each one is phrased as a
 * question the audience actually searches for. Extend freely.
 */
export const TOPICS: ReadonlyArray<{ topic: string; angle: string; category: string }> = [
  { topic: "Quando vale a pena abrir uma empresa sendo médico", angle: "Sinais de que a atuação como pessoa física deixou de ser suficiente e o que avaliar antes de abrir a PJ.", category: "Abertura de empresa" },
  { topic: "Como separar as finanças pessoais das finanças do consultório", angle: "Rotina prática de organização: contas, pró-labore, retiradas e registros.", category: "Organização financeira" },
  { topic: "O que um dentista precisa entregar ao contador todo mês", angle: "Checklist de documentos e informações que evitam atraso e retrabalho.", category: "Rotina contábil" },
  { topic: "Plantões em várias instituições: como organizar os recebimentos", angle: "Múltiplos vínculos, recibos, convênios e o impacto na organização contábil.", category: "Rotina contábil" },
  { topic: "Como se preparar para trazer um sócio para a clínica", angle: "Aspectos societários, contábeis e de governança que devem ser conversados antes.", category: "Clínicas" },
  { topic: "Planejamento tributário para profissionais da saúde: o que é e o que não é", angle: "Diferença entre planejamento legítimo e promessas irreais; por que revisar periodicamente.", category: "Planejamento tributário" },
  { topic: "Pró-labore para médicos e dentistas: como definir", angle: "Conceito, papel na organização financeira e erros comuns.", category: "Pró-labore e folha" },
  { topic: "Como trocar de contador sem perder o controle da clínica", angle: "Passo a passo da transição e documentos a solicitar.", category: "Rotina contábil" },
  { topic: "Indicadores que todo consultório deveria acompanhar", angle: "Leitura simples de receitas, custos e resultado para decidir com base em números.", category: "Organização financeira" },
  { topic: "Contratar a primeira funcionária do consultório: o que muda", angle: "Obrigações, custos de folha e organização necessária.", category: "Pró-labore e folha" },
  { topic: "Psicólogos e fisioterapeutas: pessoa física ou jurídica", angle: "Como avaliar o momento de mudar e quais perguntas fazer ao contador.", category: "Abertura de empresa" },
  { topic: "Nutricionista com atendimento online: organização contábil", angle: "Recebimentos digitais, emissão de notas e rotina de organização.", category: "Rotina contábil" },
];

export function topicForDate(date: Date) {
  const { year, week } = isoWeek(date);
  const index = (year * 53 + week) % TOPICS.length;
  return TOPICS[index];
}

export const SYSTEM_PROMPT = `Você escreve artigos para o site da ES Contabilidade, escritório da contadora Elenice Sousa, especializado em médicos, dentistas, clínicas e demais profissionais da saúde no Brasil.

Regras obrigatórias:
- Idioma: português brasileiro, tom consultivo, claro e próximo. Sem jargão desnecessário, sem clichês ("soluções inovadoras", "excelência", "referência").
- Nunca invente leis, alíquotas, prazos, valores, estatísticas ou jurisprudência. Se um ponto depender de regra tributária específica, descreva o conceito em termos gerais e registre em reviewWarnings que a informação precisa ser confirmada pela contadora antes da publicação.
- Não prometa redução de impostos nem resultados garantidos. Use verbos como avaliar, organizar, planejar, identificar, acompanhar, orientar, analisar.
- Não cite nomes de clientes, depoimentos, números de clientes ou casos.
- Não use travessões (—) nem emojis.
- Estrutura: introdução curta, de 3 a 6 seções com títulos (nível 2, opcionalmente nível 3), listas quando ajudarem, uma conclusão que convide o leitor a conversar com Elenice pelo WhatsApp sem ser insistente.
- O campo slug deve ser em kebab-case, sem acentos.
- O campo sources deve conter apenas URLs oficiais (gov.br, receita.fazenda.gov.br, conselhos profissionais). Se não tiver certeza da URL exata, deixe a lista vazia e adicione um reviewWarning.
- Responda exclusivamente com JSON válido no formato solicitado.`;

export function buildUserPrompt(brief: { topic: string; angle: string; category: string }, date: Date): string {
  const { year, week } = isoWeek(date);
  return `Semana ${week} de ${year}.

Tema do artigo: ${brief.topic}
Ângulo editorial: ${brief.angle}
Categoria sugerida: ${brief.category}

Público: profissionais da saúde que buscam no Google por termos como "contabilidade para médicos", "contador para dentista", "contabilidade para clínicas".

Entregue um artigo de 700 a 1100 palavras seguindo estritamente as regras do sistema.`;
}
