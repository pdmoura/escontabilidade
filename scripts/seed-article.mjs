/**
 * Writes an initial, human-written article to seed/article.ndjson.
 * Import with: npx sanity dataset import seed/article.ndjson production
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

let n = 0;
const key = () => `a${(++n).toString(36).padStart(5, "0")}`;
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

const article = {
  _id: "article-por-que-medicos-precisam-de-contabilidade-especializada",
  _type: "article",
  title: "Por que profissionais da saúde precisam de uma contabilidade especializada",
  slug: { _type: "slug", current: "por-que-profissionais-da-saude-precisam-de-contabilidade-especializada" },
  excerpt:
    "Plantões, convênios, consultório e clínica criam uma rotina contábil diferente da de outros negócios. Entenda o que muda e o que observar ao escolher quem cuida dos seus números.",
  status: "published",
  publishedAt: "2026-09-17T12:00:00.000Z",
  origin: "manual",
  generatedByAI: false,
  reviewedByHuman: true,
  author: { _type: "reference", _ref: "professional" },
  categories: [{ _type: "reference", _ref: "category-rotina-contabil", _key: key() }],
  seoTitle: "Contabilidade especializada para profissionais da saúde: por que importa",
  seoDescription:
    "Entenda por que a rotina de médicos, dentistas e clínicas exige uma contabilidade que conheça o setor, e o que observar ao escolher o seu contador.",
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
};

await mkdir(path.join(process.cwd(), "seed"), { recursive: true });
await writeFile(path.join(process.cwd(), "seed/article.ndjson"), JSON.stringify(article) + "\n");
console.log("article seed written");
