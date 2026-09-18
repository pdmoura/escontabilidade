/**
 * Writes the editorial article set to seed/articles.ndjson.
 * Cover images are attached when a matching file exists in public/images/articles/<slug>.webp.
 * Import with: npx sanity dataset import seed/articles.ndjson production --replace
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

let n = 0;
const key = () => `b${(++n).toString(36).padStart(5, "0")}`;
const block = (style, text, listItem) => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  ...(listItem ? { listItem, level: 1 } : {}),
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});
const p = (t) => block("normal", t);
const h2 = (t) => block("h2", t);
const li = (t) => block("normal", t, "bullet");
const quote = (t) => block("blockquote", t);

const root = process.cwd();
const cover = (slug, alt) => {
  const file = path.join(root, "public/images/articles", `${slug}.webp`);
  if (!existsSync(file)) return undefined;
  return { _type: "image", _sanityAsset: `image@file://${file.replace(/\\/g, "/")}`, alt };
};

const articles = [
  {
    slug: "por-que-profissionais-da-saude-precisam-de-contabilidade-especializada",
    title: "Por que profissionais da saúde precisam de uma contabilidade especializada",
    excerpt:
      "Plantões, convênios, consultório e clínica criam uma rotina contábil diferente da de outros negócios. Entenda o que muda e o que observar ao escolher quem cuida dos seus números.",
    publishedAt: "2026-09-17T12:00:00.000Z",
    category: "category-rotina-contabil",
    seoTitle: "Contabilidade especializada para profissionais da saúde: por que importa",
    seoDescription:
      "Entenda por que a rotina de médicos, dentistas e clínicas exige uma contabilidade que conheça o setor, e o que observar ao escolher o seu contador.",
    coverAlt: "Folhas de papel creme com uma linha dourada em ritmo de pulso sobre fundo café",
    body: [
      p("Quem atende pacientes raramente tem uma única fonte de renda. Há plantões em diferentes instituições, atendimentos particulares, repasses de convênios, um consultório próprio e, em muitos casos, participação em uma clínica com outros profissionais. Cada uma dessas frentes gera documentos, prazos e decisões diferentes."),
      p("Uma contabilidade genérica tende a tratar tudo isso como uma empresa qualquer. Uma contabilidade especializada parte da rotina real de quem cuida de pessoas e organiza os números a partir dela."),
      h2("O que torna a rotina de saúde diferente"),
      li("Múltiplos vínculos ao mesmo tempo, com formas de recebimento distintas."),
      li("Recebimentos de convênios que chegam em datas e valores variáveis."),
      li("Consultório ou clínica com equipe, aluguel, equipamentos e insumos."),
      li("Decisões frequentes sobre abrir empresa, trazer sócios ou mudar de estrutura."),
      p("Nada disso é problema em si. O desafio aparece quando ninguém organiza essas frentes e a leitura dos números fica confusa: não se sabe o que é da pessoa física, o que é da empresa e quanto realmente sobra ao final do mês."),
      h2("O que uma contabilidade especializada faz na prática"),
      p("O primeiro passo é entender como você atende hoje. A partir daí, a contadora organiza a rotina de documentos, acompanha as obrigações no prazo e traduz relatórios em orientações objetivas. Quando surge uma decisão importante, como abrir a empresa ou contratar alguém, a conversa acontece antes, com base na sua realidade, e não depois, para corrigir."),
      p("Também faz parte do trabalho revisar periodicamente o enquadramento e a estrutura, porque a atividade muda: novos vínculos aparecem, a clínica cresce, sócios entram ou saem."),
      h2("O que observar ao escolher quem cuida dos seus números"),
      li("Se a pessoa conhece as particularidades de quem atende pacientes."),
      li("Se o atendimento é direto, com respostas em tempo razoável."),
      li("Se os números chegam com uma leitura clara, e não apenas como relatórios."),
      li("Se há acompanhamento contínuo, e não apenas a entrega de obrigações."),
      p("Contabilidade não precisa ocupar espaço na sua agenda. Com organização e acompanhamento, ela passa a ser uma base para decidir com segurança. Se quiser conversar sobre a sua rotina, o WhatsApp é o caminho mais rápido para falar diretamente com Elenice."),
    ],
  },
  {
    slug: "quando-vale-a-pena-abrir-uma-empresa-sendo-medico",
    title: "Quando vale a pena abrir uma empresa sendo médico",
    excerpt:
      "Atuar como pessoa física funciona bem no começo. Em algum momento, os sinais de que chegou a hora de abrir a pessoa jurídica aparecem. Veja quais são e o que avaliar antes de decidir.",
    publishedAt: "2026-09-10T12:00:00.000Z",
    category: "category-abertura-de-empresa",
    seoTitle: "Abrir empresa sendo médico: quando vale a pena e o que avaliar",
    seoDescription:
      "Sinais de que a atuação como pessoa física deixou de ser suficiente para médicos, e o que analisar antes de abrir a pessoa jurídica.",
    coverAlt: "Chaves e um caderno sobre uma mesa de madeira em luz quente",
    body: [
      p("A maioria dos médicos começa a carreira recebendo como pessoa física: plantões, recibos, repasses. Funciona, é simples e, no início, costuma ser suficiente. Com o tempo, porém, a estrutura de atendimento muda e a pergunta aparece: vale a pena abrir uma empresa?"),
      p("A resposta depende da sua realidade, e não de uma regra geral. Existem, no entanto, sinais que costumam indicar o momento de avaliar a mudança com calma."),
      h2("Sinais de que chegou a hora de avaliar"),
      li("Você atende em mais de um lugar e os recebimentos vêm de fontes diferentes."),
      li("Passou a ter consultório próprio, com aluguel, equipamentos e custos fixos."),
      li("Contratou ou pretende contratar alguém para a rotina do consultório."),
      li("Convênios ou instituições passaram a exigir emissão de nota fiscal."),
      li("Está avaliando entrar como sócio em uma clínica."),
      h2("O que avaliar antes de decidir"),
      p("Abrir a empresa não é apenas uma questão de imposto. Envolve a forma de organizar os recebimentos, a separação entre finanças pessoais e da empresa, a definição de pró-labore e a rotina de obrigações que passa a existir. Uma análise responsável compara o cenário atual com o cenário projetado e considera também o custo de manter a estrutura."),
      p("Também é importante entender que o enquadramento tributário depende de vários fatores e deve ser revisado periodicamente. Por isso, promessas de economia garantida merecem desconfiança: cada caso precisa ser calculado."),
      h2("Como funciona o processo"),
      p("Na prática, a abertura passa pela definição do tipo de empresa, pelo registro nos órgãos competentes, pela inscrição municipal para emissão de notas e pelo registro no conselho profissional, quando exigido. Com uma contadora que conhece a área da saúde, o processo é conduzido de ponta a ponta e você recebe orientação sobre o que muda na rotina a partir da abertura."),
      quote("Abrir a empresa no momento certo organiza a carreira. Abrir cedo demais, ou sem planejamento, cria custos e obrigações sem retorno."),
      p("Se você reconhece alguns dos sinais acima, vale uma conversa. Em poucos minutos pelo WhatsApp é possível entender a sua situação e definir se este é o momento de avançar."),
    ],
  },
  {
    slug: "como-separar-as-financas-pessoais-das-financas-do-consultorio",
    title: "Como separar as finanças pessoais das finanças do consultório",
    excerpt:
      "Misturar contas é um dos erros mais comuns entre profissionais da saúde. Uma rotina simples resolve: conta própria, pró-labore definido e retiradas com regra.",
    publishedAt: "2026-09-03T12:00:00.000Z",
    category: "category-organizacao-financeira",
    seoTitle: "Separar finanças pessoais e do consultório: guia prático",
    seoDescription:
      "Rotina prática para dentistas, médicos e demais profissionais da saúde separarem as finanças pessoais das finanças do consultório ou da clínica.",
    coverAlt: "Duas pilhas de papel creme separadas por uma linha dourada",
    body: [
      p("Quando o consultório começa a dar certo, é natural que o dinheiro entre e saia da mesma conta usada para a vida pessoal. O problema é que, sem separação, ninguém sabe ao certo quanto o negócio gera, quanto custa e quanto sobra. As decisões passam a ser tomadas por sensação."),
      h2("Por que a separação importa"),
      li("Você enxerga o resultado real do consultório, sem misturar despesas pessoais."),
      li("A contabilidade recebe informações limpas, o que evita erros e retrabalho."),
      li("Fica mais fácil planejar investimentos, contratações e reservas."),
      li("Você passa a ter uma remuneração definida, e não retiradas aleatórias."),
      h2("Uma rotina simples que funciona"),
      p("O primeiro passo é abrir uma conta bancária exclusiva para a empresa. Todos os recebimentos do consultório entram nela e todas as despesas do negócio saem dela. Pagamentos pessoais não passam por essa conta."),
      p("O segundo passo é definir o pró-labore, ou seja, a remuneração mensal pelo trabalho na empresa. Ele é transferido para a conta pessoal em uma data fixa, como um salário. Retiradas adicionais, quando fizerem sentido, seguem uma regra combinada com a contadora e são registradas."),
      p("O terceiro passo é manter os comprovantes organizados. Uma pasta digital por mês, com notas, recibos e extratos, resolve a maior parte dos problemas e reduz o tempo gasto com a contabilidade."),
      h2("Erros comuns a evitar"),
      li("Pagar despesas pessoais com o cartão da empresa e vice-versa."),
      li("Fazer retiradas sem registro, apenas quando sobra dinheiro."),
      li("Deixar de guardar comprovantes de despesas do consultório."),
      li("Adiar a organização para o fim do ano."),
      p("Com essa rotina, a contabilidade deixa de ser uma cobrança e passa a ser um espelho fiel do seu negócio. Se quiser ajuda para montar essa estrutura, converse com Elenice pelo WhatsApp."),
    ],
  },
  {
    slug: "o-que-um-dentista-precisa-entregar-ao-contador-todo-mes",
    title: "O que um dentista precisa entregar ao contador todo mês",
    excerpt:
      "Um checklist objetivo do que enviar mensalmente para manter a contabilidade do consultório em dia, sem correria no fim do mês.",
    publishedAt: "2026-08-27T12:00:00.000Z",
    category: "category-rotina-contabil",
    seoTitle: "Checklist mensal: o que o dentista envia ao contador",
    seoDescription:
      "Lista prática de documentos e informações que dentistas devem enviar ao contador todo mês para evitar atrasos, multas e retrabalho.",
    coverAlt: "Caderno aberto com anotações e uma caneta dourada sobre mesa clara",
    body: [
      p("Boa parte dos problemas contábeis de consultórios odontológicos não vem de complexidade, e sim de informação que chega atrasada ou incompleta. Um checklist mensal simples resolve isso e devolve tempo à sua agenda."),
      h2("O que enviar todo mês"),
      li("Extratos bancários da conta da empresa e das maquininhas de cartão."),
      li("Notas fiscais emitidas para pacientes e convênios."),
      li("Notas e recibos de despesas: materiais, laboratório, aluguel, energia, internet, software."),
      li("Relatório de recebimentos por convênio, quando houver."),
      li("Informações da equipe: admissões, desligamentos, férias, horas extras e afastamentos."),
      li("Comprovantes de pagamento de guias e impostos do mês anterior."),
      h2("Como organizar sem esforço"),
      p("Crie uma pasta digital por mês e salve os documentos conforme eles aparecem, e não no último dia. Configure a emissão de notas para gerar uma cópia automática nessa pasta. Peça ao banco o extrato em formato compatível com a contabilidade e mantenha a conta da empresa separada da pessoal."),
      p("Combine com a contadora uma data fixa de envio. Uma rotina previsível permite que as obrigações sejam calculadas com antecedência e que você receba avisos claros sobre o que pagar e quando."),
      h2("O que acontece quando o envio atrasa"),
      p("Guias calculadas em cima da hora, risco de multa por atraso, relatórios que não refletem a realidade e decisões tomadas com informação incompleta. Nada disso é necessário: com o checklist em dia, o mês fecha sem sustos."),
      p("Se a sua rotina ainda não tem esse fluxo, vale conversar. Elenice organiza o processo junto com você e adapta o checklist à realidade do seu consultório."),
    ],
  },
  {
    slug: "planejamento-tributario-para-profissionais-da-saude-o-que-e-e-o-que-nao-e",
    title: "Planejamento tributário para profissionais da saúde: o que é e o que não é",
    excerpt:
      "Planejamento tributário legítimo é análise, comparação e revisão periódica. Entenda o que esperar de um trabalho sério e por que promessas de economia garantida são um alerta.",
    publishedAt: "2026-08-20T12:00:00.000Z",
    category: "category-planejamento-tributario",
    seoTitle: "Planejamento tributário para médicos e dentistas: o que esperar",
    seoDescription:
      "O que é planejamento tributário legítimo para profissionais da saúde, como ele funciona na prática e quais promessas merecem desconfiança.",
    coverAlt: "Folhas translúcidas sobrepostas com uma linha dourada suave",
    body: [
      p("Poucos termos geram tanta expectativa, e tanta confusão, quanto planejamento tributário. Para profissionais da saúde, ele costuma ser apresentado como uma promessa de pagar menos imposto. Na prática, é algo mais sóbrio e mais útil: uma análise cuidadosa da sua estrutura para escolher, dentro da lei, o caminho mais adequado."),
      h2("O que é"),
      li("Um estudo da sua realidade de receitas: plantões, consultório, convênios, clínica."),
      li("A comparação entre as alternativas legais disponíveis para a sua atividade."),
      li("A escolha de uma estrutura coerente com o momento atual do seu negócio."),
      li("A revisão periódica dessa escolha, porque a atividade muda ao longo do tempo."),
      h2("O que não é"),
      p("Planejamento tributário não é uma fórmula única aplicada a todos, nem uma garantia de redução de impostos. Também não é omissão de receita, uso de estruturas artificiais ou qualquer prática que dependa de a fiscalização não perceber. Esse tipo de atalho gera passivo, e o passivo costuma aparecer no pior momento."),
      quote("Planejamento sério se sustenta em números reais e em decisões que você entende e consegue explicar."),
      h2("Como funciona na prática"),
      p("A contadora levanta as suas fontes de receita e os custos da atividade, simula cenários com as alternativas aplicáveis e apresenta os resultados de forma comparável. A decisão é tomada em conjunto, com clareza sobre obrigações e sobre o que muda na rotina. Depois, o cenário é reavaliado periodicamente, especialmente quando surgem novos vínculos, sócios ou mudanças relevantes de faturamento."),
      h2("Sinais de um trabalho sério"),
      li("As alternativas são apresentadas com cálculos, não apenas com uma conclusão."),
      li("Você entende por que a estrutura escolhida faz sentido para o seu caso."),
      li("Existe uma data para revisar a decisão."),
      li("Ninguém promete percentuais de economia antes de conhecer os seus números."),
      p("Se você quer entender qual estrutura faz sentido para a sua atuação, uma conversa inicial pelo WhatsApp é o primeiro passo. Elenice analisa a sua realidade antes de qualquer proposta."),
    ],
  },
];

const docs = articles.map((a) => ({
  _id: `article-${a.slug.slice(0, 60)}`,
  _type: "article",
  title: a.title,
  slug: { _type: "slug", current: a.slug },
  excerpt: a.excerpt,
  status: "published",
  publishedAt: a.publishedAt,
  origin: "manual",
  generatedByAI: false,
  reviewedByHuman: true,
  author: { _type: "reference", _ref: "professional" },
  categories: [{ _type: "reference", _ref: a.category, _key: key() }],
  seoTitle: a.seoTitle,
  seoDescription: a.seoDescription,
  coverImage: cover(a.slug, a.coverAlt),
  body: a.body,
}));

await mkdir(path.join(root, "seed"), { recursive: true });
await writeFile(path.join(root, "seed/articles.ndjson"), docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`articles seed written: ${docs.length} (${docs.filter((d) => d.coverImage).length} with cover)`);
