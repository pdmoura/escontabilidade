import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { getSettings } from "@/lib/content/get";
import { breadcrumbJsonLd, graph } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como a ES Contabilidade trata os dados de quem visita o site e entra em contato pelo WhatsApp ou e-mail.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Privacidade", path: "/privacidade" },
];

export default async function PrivacyPage() {
  const settings = await getSettings();
  const updated = "17 de setembro de 2026";

  return (
    <PageShell>
      <JsonLd data={graph(breadcrumbJsonLd(crumbs))} />
      <section className="container-x pt-10 pb-20 md:pt-14 md:pb-28">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-[60ch]">
          <p className="eyebrow">Privacidade</p>
          <h1 className="h2 mt-5 text-coffee-900">Política de privacidade</h1>
          <p className="mt-4 text-[0.85rem] text-muted">Última atualização: {updated}</p>
        </div>

        <div className="prose-editorial mt-12 max-w-[68ch]">
          <p>
            Esta página explica, de forma simples, como o site da {settings.brandName} lida com informações de quem o
            visita. O princípio é coletar o mínimo necessário.
          </p>

          <h2>Quais dados este site coleta</h2>
          <p>
            O site não possui formulários de cadastro nem exige criação de conta. A navegação pode gerar registros
            técnicos básicos, como endereço IP, tipo de navegador e páginas acessadas, mantidos pelo provedor de
            hospedagem para fins de segurança e funcionamento.
          </p>

          <h2>Contato pelo WhatsApp e e-mail</h2>
          <p>
            Ao clicar em um botão de WhatsApp, você é direcionado ao aplicativo com uma mensagem sugerida, que só é
            enviada se você decidir enviá-la. As informações compartilhadas nessa conversa, ou por e-mail, são
            utilizadas exclusivamente para responder ao seu contato e, se houver interesse, para a prestação dos
            serviços contábeis.
          </p>

          <h2>Cookies e medição de audiência</h2>
          <p>
            Este site não utiliza cookies de publicidade. Caso ferramentas de medição de audiência sejam ativadas no
            futuro, elas serão configuradas de forma agregada e anônima, e esta página será atualizada.
          </p>

          <h2>Compartilhamento</h2>
          <p>
            Não vendemos nem compartilhamos dados pessoais com terceiros para fins comerciais. Prestadores de
            serviço tecnológico (como a hospedagem do site) podem processar dados técnicos apenas na medida
            necessária para o funcionamento da página.
          </p>

          <h2>Seus direitos</h2>
          <p>
            Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar confirmação,
            acesso, correção ou exclusão de dados pessoais que tenham sido compartilhados conosco. Basta enviar um
            e-mail para <a href={`mailto:${settings.email}`}>{settings.email}</a>.
          </p>

          <h2>Alterações</h2>
          <p>
            Esta política pode ser revisada para refletir mudanças no site ou na legislação. A data de atualização
            no topo da página indica a versão vigente.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
