# ES Contabilidade

Site institucional e landing page de conversão da **ES Contabilidade** (Elenice Sousa), contabilidade especializada em médicos, dentistas, clínicas e demais profissionais da saúde.

- Produção: configurada na Vercel (ver seção Deploy)
- CMS: Sanity, com Studio embutido em `/studio`
- Conversão principal: WhatsApp (`https://wa.me/5561996796542`)

## Stack

- Next.js 16 (App Router, Turbopack, Server Components)
- React 19 e TypeScript strict
- Tailwind CSS 4
- Motion for React (animações, com respeito a `prefers-reduced-motion`)
- Sanity (conteúdo editável) e `next-sanity`
- Vitest (testes unitários)
- Vercel (hospedagem e cron)

## Estrutura

```
src/app                 rotas (home, /conteudos, /conteudos/[slug], /privacidade, /studio, SEO files)
src/app/api/cron        job semanal de geração de rascunhos de artigos
src/components          layout, seções da home, UI e utilitários de motion
src/lib/content         tipos, conteúdo padrão (fallback) e leitura do CMS
src/lib/ai              integração OpenRouter, validação, sanitização e criação de rascunhos
src/lib                 site.ts, whatsapp.ts, analytics.ts, seo.ts
src/sanity              schemas, cliente, queries e helpers de imagem
sanity.config.ts        configuração do Studio
scripts                 geração de assets de marca e seed do CMS
assets/originals        originais das fotos e do logotipo (não servidos)
public                  brand/, images/, generated/
```

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev
```

O site renderiza integralmente mesmo sem CMS configurado: todo o conteúdo tem um fallback editorial em `src/lib/content/defaults.ts`. Quando `NEXT_PUBLIC_SANITY_PROJECT_ID` está definido, o conteúdo do Sanity tem prioridade.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run test` | Vitest |
| `npm run check` | lint + typecheck + testes + build |
| `npm run assets` | regenera favicon, ícones e o painel editorial a partir do logotipo |
| `npm run seed:build` | gera `seed/seed.ndjson` para popular o CMS |

Para popular um dataset vazio do Sanity com o conteúdo padrão:

```bash
npm run seed:build
npx sanity dataset import seed/seed.ndjson production --replace
```

## Variáveis de ambiente

Veja `.env.example`. Resumo:

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica do site (metadata, sitemap, JSON-LD) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | número no formato internacional, somente dígitos |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` | leitura do CMS e Studio |
| `SANITY_API_WRITE_TOKEN` | token com papel Editor, usado apenas no servidor pela automação de artigos |
| `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `OPENROUTER_FALLBACK_MODEL` | geração semanal de rascunhos (opcional) |
| `CRON_SECRET` | protege a rota `/api/cron/weekly-article` |

Nenhuma chave de servidor é exposta ao navegador. Nunca use prefixo `NEXT_PUBLIC_` em segredos.

## CMS (Sanity)

Tipos de documento: `siteSettings`, `professional`, `service`, `faq`, `testimonial`, `articleCategory`, `article`.

- Depoimentos só aparecem quando `approved` está marcado.
- Artigos só aparecem quando `status` é `published` e `publishedAt` já passou.
- A home revalida a cada 5 minutos (ISR).

Acesse o Studio em `/studio` com a conta convidada no projeto Sanity.

## Automação de conteúdo

Toda segunda-feira às 09:00 UTC a Vercel chama `/api/cron/weekly-article` (ver `vercel.json`). O job:

1. escolhe o tema da semana (`src/lib/ai/briefing.ts`);
2. gera o artigo via OpenRouter com saída estruturada;
3. valida com Zod, sanitiza e marca pontos de revisão (alíquotas, leis, prazos, afirmações absolutas);
4. cria um **rascunho** no Sanity com `generatedByAI: true` e `reviewedByHuman: false`.

A publicação é sempre manual, após revisão. O `generationId` é determinístico por semana e tema, então repetições do job não criam duplicatas. Sem `OPENROUTER_API_KEY` o job apenas responde `skipped`.

## SEO

- Metadata API (title, description, canonical, Open Graph, Twitter)
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, ícones e imagem Open Graph gerados por código
- JSON-LD: `AccountingService`/`Organization`, `Person`, `WebSite`, `BreadcrumbList`, `FAQPage`, `BlogPosting`
- Endereço, horários e avaliações só entram no JSON-LD se forem cadastrados no CMS

## Deploy

O projeto é publicado na Vercel a partir da branch `main`. Configure as variáveis de ambiente no painel da Vercel (ou com `vercel env add`) e adicione a URL de produção nas origens CORS do Sanity:

```bash
npx sanity cors add https://SEU-DOMINIO --credentials
```

## Fluxo de trabalho

1. Crie uma branch descritiva (`feature/...`, `fix/...`, `chore/...`).
2. Faça commits pequenos com mensagens no imperativo.
3. Rode `npm run check` antes de abrir o Pull Request.
4. Após aprovação, faça merge em `main` e remova a branch remota.

---

## Serviço prestado por

- **Empresa:** CTR NEXUS MARKETING DIGITAL LTDA
- **CNPJ:** 67.849.747/0001-90
- **Site:** [ctrnexus.com](https://ctrnexus.com)
