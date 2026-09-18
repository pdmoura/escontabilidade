import { site } from "@/lib/site";
import type {
  Faq,
  Professional,
  Service,
  SiteSettings,
} from "./types";

/**
 * Editorial fallback content. Everything here can be overridden from the CMS;
 * the site renders completely even when Sanity is empty or unavailable.
 */

export const defaultSettings: SiteSettings = {
  brandName: site.name,
  phone: site.phoneDisplay,
  whatsapp: "5561996796542",
  email: site.email,
  googleProfileUrl: site.googleProfileUrl,
  instagramUrl: site.instagramUrl,
  seoTitle:
    "ES Contabilidade | Contabilidade especializada para profissionais da saúde",
  seoDescription: site.description,
  defaultCta: "Falar com Elenice no WhatsApp",
  heroEyebrow: "Contabilidade especializada em saúde",
  heroHeadline: "Contabilidade especializada para quem fez da saúde a sua profissão.",
  heroSubheadline:
    "Há mais de 15 anos, Elenice Sousa ajuda médicos, dentistas e clínicas a organizarem sua vida contábil com clareza, acompanhamento próximo e segurança.",
  heroMicrocopy: "Atendimento direto e personalizado.",
  serviceArea: "Atendimento online para todo o Brasil",
};

export const defaultProfessional: Professional = {
  name: "Elenice Sousa",
  title: "Contadora especializada em profissionais da saúde",
  shortBio:
    "Contadora com mais de 15 anos de experiência e atuação voltada ao atendimento de médicos, dentistas, clínicas e demais profissionais da saúde.",
  biography: [
    "Elenice Sousa é contadora com mais de 15 anos de experiência no mercado e dedica sua atuação ao atendimento de profissionais da área da saúde.",
    "Seu trabalho combina conhecimento técnico com a compreensão das particularidades do setor: rotinas intensas, múltiplos vínculos, plantões, consultórios e clínicas em crescimento.",
    "A proposta é simples: oferecer soluções contábeis personalizadas para que quem cuida de pessoas possa se concentrar nos seus pacientes e na sua atividade principal.",
  ],
  experienceYears: 15,
  specialties: [
    "Médicos",
    "Dentistas",
    "Clínicas e consultórios",
    "Psicólogos",
    "Fisioterapeutas",
    "Nutricionistas",
  ],
  portrait: {
    src: "/images/elenice/elenice-sentada.webp",
    alt: "Elenice Sousa, contadora da ES Contabilidade, sorrindo em seu escritório",
    width: 1086,
    height: 1448,
  },
  secondaryPortrait: {
    src: "/images/elenice/elenice-mesa.webp",
    alt: "Elenice Sousa trabalhando em sua mesa com o notebook aberto",
    width: 1229,
    height: 1280,
  },
};

export const defaultServices: Service[] = [
  {
    id: "abertura-regularizacao",
    title: "Abertura e regularização de empresas",
    slug: "abertura-e-regularizacao",
    shortDescription:
      "Constituição de pessoa jurídica para profissionais da saúde, escolha do enquadramento e regularização de registros.",
    description:
      "Avaliamos o momento certo de abrir a empresa, o tipo societário mais adequado e os registros exigidos para a atividade. Também cuidamos da regularização de empresas já existentes que estejam com pendências ou desatualizadas.",
    featured: true,
    order: 1,
  },
  {
    id: "contabilidade-mensal",
    title: "Contabilidade mensal",
    slug: "contabilidade-mensal",
    shortDescription:
      "Escrituração, obrigações acessórias e acompanhamento contínuo, com uma rotina previsível para você.",
    description:
      "Organização da rotina contábil e fiscal da sua empresa com prazos acompanhados de perto. Você recebe orientação clara sobre o que precisa ser feito e quando, sem surpresas de última hora.",
    featured: true,
    order: 2,
  },
  {
    id: "planejamento-tributario",
    title: "Planejamento tributário",
    slug: "planejamento-tributario",
    shortDescription:
      "Análise do regime tributário e das alternativas legais para a sua realidade de atendimento.",
    description:
      "Estudo da sua estrutura de receitas para identificar o regime mais coerente com a sua atividade, considerando plantões, consultório próprio, convênios e vínculos. Sempre dentro da lei e revisado periodicamente.",
    featured: true,
    order: 3,
  },
  {
    id: "pro-labore-folha",
    title: "Pró-labore e folha de pagamento",
    slug: "pro-labore-e-folha",
    shortDescription:
      "Definição de pró-labore, admissões, folha e encargos da equipe do consultório ou da clínica.",
    description:
      "Organização da remuneração dos sócios e da equipe, com cálculo de encargos, envio de obrigações e orientação sobre a separação entre as finanças da empresa e as suas finanças pessoais.",
    featured: false,
    order: 4,
  },
  {
    id: "organizacao-financeira",
    title: "Organização financeira",
    slug: "organizacao-financeira",
    shortDescription:
      "Leitura clara dos números do seu negócio para decidir com segurança.",
    description:
      "Apoio na separação entre pessoa física e jurídica, na leitura dos relatórios e na compreensão do que os números dizem sobre a saúde do seu consultório ou da sua clínica.",
    featured: false,
    order: 5,
  },
  {
    id: "consultoria-contabil",
    title: "Consultoria contábil para clínicas",
    slug: "consultoria-contabil",
    shortDescription:
      "Orientação para clínicas em crescimento, novos sócios e mudanças de estrutura.",
    description:
      "Acompanhamento em momentos de decisão: entrada de sócios, expansão, contratação, mudança de regime ou reorganização societária. Uma conversa antes de decidir evita retrabalho depois.",
    featured: false,
    order: 6,
  },
];

export const defaultFaqs: Faq[] = [
  {
    id: "faq-1",
    question:
      "Por que profissionais da saúde podem se beneficiar de uma contabilidade especializada?",
    answer:
      "Porque a rotina de quem atende pacientes tem particularidades: plantões em várias instituições, recebimentos por convênios e por pessoa física, consultório próprio, sociedade em clínicas. Uma contabilidade que conhece essas situações consegue orientar com mais precisão e evitar erros comuns.",
    order: 1,
  },
  {
    id: "faq-2",
    question: "A ES Contabilidade atende médicos e clínicas?",
    answer:
      "Sim. Atendemos médicos, dentistas, psicólogos, fisioterapeutas, nutricionistas e demais profissionais da saúde, tanto na atuação individual quanto em consultórios e clínicas com equipe.",
    order: 2,
  },
  {
    id: "faq-3",
    question: "É possível trocar de contador?",
    answer:
      "Sim. A troca de contador é um procedimento comum e organizado. Cuidamos da transição, solicitamos a documentação necessária ao escritório anterior e garantimos que nada fique para trás.",
    order: 3,
  },
  {
    id: "faq-4",
    question: "Vocês atendem profissionais autônomos?",
    answer:
      "Sim. Muitos profissionais começam atuando como pessoa física e, em algum momento, avaliam se vale a pena abrir uma empresa. Ajudamos a analisar esse momento e a organizar a rotina em qualquer um dos cenários.",
    order: 4,
  },
  {
    id: "faq-5",
    question: "Como funciona o primeiro contato?",
    answer:
      "Você chama no WhatsApp, conta um pouco sobre a sua atuação e sobre o que precisa. A partir dessa conversa inicial, entendemos a sua realidade e apresentamos os próximos passos, sem compromisso.",
    order: 5,
  },
  {
    id: "faq-6",
    question: "O atendimento pode ser online?",
    answer:
      "Sim. O atendimento é feito de forma online para profissionais de todo o Brasil, com documentos, assinaturas e reuniões conduzidos digitalmente.",
    order: 6,
  },
  {
    id: "faq-7",
    question: "Posso falar diretamente com Elenice?",
    answer:
      "Sim. O atendimento é direto e personalizado: a conversa acontece com Elenice, que acompanha o seu caso de perto.",
    order: 7,
  },
];

export const pains = [
  {
    title: "Uma rotina que não deixa espaço para burocracia",
    text: "Entre consultas, plantões e procedimentos, sobra pouco tempo para acompanhar prazos, guias e obrigações.",
  },
  {
    title: "Números que ninguém traduz",
    text: "Relatórios chegam, mas sem uma leitura clara do que significam para o seu consultório ou clínica.",
  },
  {
    title: "Pessoa física e empresa misturadas",
    text: "Recebimentos de convênios, plantões e atendimentos particulares acabam no mesmo lugar, sem organização.",
  },
  {
    title: "Decisões tomadas sem planejamento",
    text: "Abrir a empresa, contratar, mudar de regime ou trazer um sócio sem avaliar antes o impacto contábil.",
  },
  {
    title: "Um contador que nunca responde",
    text: "Falta acompanhamento próximo: a dúvida surge e a resposta demora, quando chega.",
  },
];

export const storyLines = [
  {
    lead: "Enquanto você cuida dos seus pacientes,",
    focus: "as obrigações são acompanhadas.",
  },
  {
    lead: "Enquanto você cuida dos seus pacientes,",
    focus: "os números ficam organizados.",
  },
  {
    lead: "Enquanto você cuida dos seus pacientes,",
    focus: "o planejamento avança.",
  },
  {
    lead: "Enquanto você cuida dos seus pacientes,",
    focus: "as decisões ganham base.",
  },
  {
    lead: "Você cuida da saúde deles.",
    focus: "A ES cuida da saúde contábil do seu negócio.",
  },
];

export const audiences = [
  "Médicos",
  "Dentistas",
  "Clínicas e consultórios",
  "Psicólogos",
  "Fisioterapeutas",
  "Nutricionistas",
  "Demais profissionais da saúde",
];

export const processSteps = [
  {
    title: "Conversa inicial",
    text: "Você conta como atende hoje: vínculos, plantões, consultório, clínica. Entendemos a sua realidade antes de qualquer proposta.",
  },
  {
    title: "Avaliação",
    text: "Analisamos documentos, estrutura e regime atual para identificar o que precisa ser organizado, corrigido ou planejado.",
  },
  {
    title: "Plano de atendimento",
    text: "Definimos juntos os próximos passos, o que fica sob nossa responsabilidade e o que você precisa nos enviar, com prazos claros.",
  },
  {
    title: "Acompanhamento",
    text: "A rotina passa a ser acompanhada de perto, com respostas diretas e revisões periódicas conforme o seu negócio muda.",
  },
];

export const differentials = [
  {
    title: "Especialização no setor de saúde",
    text: "Conhecimento das particularidades de quem atende pacientes: plantões, convênios, múltiplos vínculos, clínicas com equipe.",
  },
  {
    title: "Atendimento direto com a contadora",
    text: "Sem intermediários. As dúvidas são respondidas por quem conhece o seu caso e acompanha a sua rotina.",
  },
  {
    title: "Mais de 15 anos de experiência",
    text: "Uma trajetória construída acompanhando profissionais e clínicas em diferentes fases: início, crescimento e reorganização.",
  },
  {
    title: "Linguagem clara, sem jargão",
    text: "Números, impostos e obrigações traduzidos em orientações objetivas para decidir com segurança.",
  },
];
