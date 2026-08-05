# ES Contabilidade
Landing page institucional da ES Contabilidade

## Como criar branches e colaborar

1. Crie uma nova branch para trabalhar em uma funcionalidade, correção ou melhoria:

```bash
git checkout -b nome-da-branch
``` 
   Use um nome descritivo, como `feature/novo-layout`, `fix/error-contato` ou `chore/atualizar-dependencias`.

2. Trabalhe na branch local e faça commits atômicos:
   - Cada commit deve representar uma única mudança lógica.
   - Escreva mensagens claras e significativas.
   - Exemplos de mensagens:
     - `Adicionar seção de depoimentos`
     - `Corrigir layout responsivo na página inicial`
     - `Atualizar conteúdo do rodapé`

3. Push da branch para o repositório remoto quando estiver pronto:

```bash
git push origin nome-da-branch
```

4. Abra um Pull Request no GitHub para revisão e colaboração:
   - Adicione uma descrição do que foi alterado.
   - Inclua o motivo da mudança e como testar.
   - Peça revisão a colegas quando necessário.

5. Quando o trabalho estiver aprovado e pronto para produção:
   - Faça merge do Pull Request na branch `main`.
   - Remova a branch remota se ela não for mais necessária:

```bash
git push origin --delete nome-da-branch
```

## Boas práticas de commits atômicos

- Faça commits pequenos e focados, evitando juntar várias alterações diferentes em um único commit.
- Cada commit deve ter uma mensagem que explique claramente o objetivo da mudança.
- Use o tempo verbal no imperativo: `Adicionar`, `Corrigir`, `Remover`, `Atualizar`.
- Se precisar, divida o trabalho em commits menores como:
  - `Criar componente de botão`
  - `Estilizar componente de botão`
  - `Adicionar testes para componente de botão`

Seguindo essas regras, o fluxo de trabalho fica mais organizado e facilita a revisão do código.

---

## Serviço prestado por

- **Empresa:** CTR NEXUS MARKETING DIGITAL LTDA
- **CNPJ:** 67.849.747/0001-90
- **Site:** [ctrnexus.com](https://ctrnexus.com)
