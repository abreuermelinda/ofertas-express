# Ofertas Express

Aplicação desenvolvida com Next.js, React e TypeScript para simular um fluxo simples de negociação de ofertas.

O usuário pode visualizar ofertas disponíveis, adicioná-las ao carrinho e concluir um acordo. O fluxo de checkout é controlado por uma feature flag: no fluxo padrão, o acordo é confirmado diretamente; quando a flag está habilitada, o usuário escolhe entre Pix e Boleto antes da confirmação.

## Tecnologias

- Next.js
- React
- TypeScript
- TanStack React Query
- Zustand
- MSW (Mock Service Worker)
- CSS Modules
- Vitest
- React Testing Library

## Como executar

### Pré-requisitos

- Node.js 20.9.0 ou superior
- npm 10 ou superior

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em:

`http://localhost:3000`

## Testes

Para executar os testes:

```bash
npm run test:run
```

Os testes cobrem os seguintes comportamentos:

- exibição das ofertas retornadas pela API;
- fallback para o fluxo antigo quando a API da feature flag falha;
- tratamento de erro no checkout, mantendo os itens no carrinho para permitir uma nova tentativa.

## Qualidade e build

Para executar o lint:

```bash
npm run lint
```

Para gerar o build de produção:

```bash
npm run build
```

## Decisões técnicas

### React Query para estado do servidor

TanStack React Query é utilizado para os dados provenientes das APIs simuladas, como ofertas e feature flag, além da mutation responsável pelo checkout.

Essa separação mantém o estado remoto fora do estado global da aplicação e centraliza o ciclo de requisição, carregamento e erro.

### Zustand para o carrinho

O carrinho é compartilhado entre diferentes páginas da aplicação e, por isso, foi mantido em um store global com Zustand.

O store é responsável por adicionar e remover ofertas e limpar o carrinho após a conclusão bem-sucedida do checkout.

### Feature flag e fallback seguro

O checkout possui dois fluxos:

- `checkoutV2 = false`: confirmação direta do acordo;
- `checkoutV2 = true`: seleção da forma de pagamento entre Pix e Boleto antes da confirmação.

O novo fluxo somente é ativado quando a API retorna explicitamente `checkoutV2: true`.

Caso a requisição da feature flag falhe, a aplicação utiliza o fluxo antigo como fallback seguro.

### MSW

O Mock Service Worker é utilizado para simular as APIs da aplicação durante o desenvolvimento e também nos testes.

Endpoints simulados:

- `GET /api/offers`
- `GET /api/feature-flag`
- `POST /api/checkout`

Isso permite exercitar os fluxos da aplicação sem depender de um backend real e sobrescrever respostas específicas durante os testes, como erros HTTP 500.

### Tratamento de erro no checkout

Em caso de falha na confirmação do acordo, a aplicação exibe uma mensagem de erro e preserva os itens do carrinho.

O carrinho só é limpo após uma resposta bem-sucedida do checkout, permitindo que o usuário tente novamente em caso de falha.

### Responsividade

A interface foi construída com abordagem mobile-first e adaptada para desktop.

No desktop, a aplicação utiliza uma navegação lateral e mantém o conteúdo principal organizado ao lado da sidebar. No mobile, a sidebar é ocultada e a navegação contextual das páginas é preservada.

## Fluxo da aplicação

1. O usuário visualiza as ofertas disponíveis.
2. Adiciona uma ou mais ofertas ao carrinho.
3. Revisa os itens selecionados.
4. Avança para o checkout.
5. Dependendo da feature flag, confirma diretamente o acordo ou seleciona Pix/Boleto.
6. Após uma confirmação bem-sucedida, o carrinho é limpo.