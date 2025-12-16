# 🎮 PRV GAMER DASHBOARD — Style Guide de Classes CSS

Este guia documenta todas as classes utilizadas no `index.html` do projeto, agrupadas por seção e com descrições concisas baseadas em nome, função e contexto visual. Ideal para manutenção, onboarding ou migração para sistemas componentizados (ex: React + Tailwind).

---

## 🧱 Layout Geral

| Classe            | Função |
|------------------|--------|
| `main-wrapper`   | Container principal que envolve todo o conteúdo da página (exceto sidebar). Define margens, posicionamento e layout relativo à barra lateral. |
| `UI_design`      | Wrapper conceitual que agrupa elementos da interface. Pode conter estilos globais como fontes, cores base ou configurações de tema. |
| `main-content`   | Agrupa o conteúdo principal da página. Controla padding, largura máxima e comportamento de rolagem. |
| `main-nav`       | Container vertical que engloba header, seções principais e footer. Organiza o fluxo e espaçamento entre blocos. |
| `main-container` | Caixa centralizada com largura controlada (ex: `max-width: 1200px`) e padding/margin consistentes. |
| `framed`         | Aplica um estilo visual de "moldura": borda, sombra, fundo diferenciado ou destaque visual. |

---

## 🎭 Dashboard — Painel de Status do Personagem

| Classe                   | Função |
|--------------------------|--------|
| `character-status-panel` | Container principal do painel de status do jogador. Inicialmente oculto (`hidden`), exibido via toggle. |
| `profile-size`           | Define proporção/layout do bloco que combina perfil e avatar principal. |
| `user-profile-card`      | Card visual com nome, nível, XP e botão de ação. |
| `bg-card`                | Estilo reutilizável de fundo para cards: cor, borda arredondada, sombra. |
| `avatar-frame`           | Container para sobreposição de elementos decorativos do avatar (fundo + moldura + badge). |
| `avatar-bg`              | Imagem base ou de fundo do avatar. |
| `moldura-overlay`        | Imagem de moldura decorativa sobreposta ao avatar. |
| `level-badge`            | Badge visual do nível do jogador, geralmente posicionada sobre o avatar. |
| `arcade`                 | Estilo temático "arcade": fonte pixelada/retrô, cores vibrantes, efeitos visuais. |
| `glow`                   | Efeito de brilho (via `text-shadow` ou `box-shadow`) para destaque em elementos-chave. |
| `username`               | Estiliza o nome do jogador (tamanho, cor, peso). |
| `cinzel-title`           | Aplica a fonte **Cinzel** (serifada, estilo medieval/gamer) ao nome. |
| `progress-container`     | Container da barra de XP, com layout para barra + valor numérico. |
| `progress-bar`           | Fundo estático da barra de progresso (com ARIA para acessibilidade). |
| `progress-fill`          | Elemento interno cuja largura é atualizada dinamicamente (ex: `width: 45%`). |
| `progress-value`         | Texto com valor atual de XP e meta (ex: `"120 / 200"`). |
| `add-button`             | Botão de ação (ex: abrir menu lateral). Nome genérico, mas funcional. |
| `avatar-main`            | Container do avatar principal/animado do personagem. |
| `avatar-main-placeholder`| Wrapper para centralização, redimensionamento ou lazy loading do avatar. |

---

## 📊 Header

| Classe           | Função |
|------------------|--------|
| `header-title`   | Container do título principal e linha de informações (nome, cargo, data). |
| `header-actions` | Agrupa botões de ação (tema, exportação), alinhados à direita. |
| `btn`            | Classe base reutilizável para botões: padding, bordas, comportamento interativo. |
| `arcade`         | *(já documentada)* — Aplicada a botões para estilo temático. |

---

## 📈 KPI Grid

| Classe        | Função |
|---------------|--------|
| `kpi-grid`    | Layout em grade que organiza os cartões de indicadores. |
| `kpi-card`    | Cartão individual de métrica, com fundo e destaque visual. |
| `kpi-label`   | Rótulo descritivo em caixa alta, com fonte secundária. |
| `kpi-value`   | Valor numérico/percentual em destaque, atualizado via JS. |

---

## 🧩 Módulos Operacionais

| Classe            | Função |
|-------------------|--------|
| `modules-section` | Seção principal dos módulos. Define estilo do título e espaçamento. |
| `modules-grid`    | Grade responsiva (2x2, 1x4, etc.) dos cartões de módulo. |
| `module-card`     | Link estilizado como cartão clicável, com título e descrição. |

---

## ⚔️ Seção PRV (Missão & Multiplicador)

| Classe                 | Função |
|------------------------|--------|
| `prv-section`          | Container da seção "PRV" — núcleo da gamificação do dashboard. |
| `prv-header`           | Envolvório do título da missão. |
| `prv-cards`            | Container em linha/grade dos três indicadores PRV. |
| `prv-card`             | Cartão individual de métrica PRV (semelhante a `kpi-card`). |
| `prv-label`            | Rótulo descritivo (ex: `"ORDERS COMPLETED"`). |
| `prv-value`            | Valor decimal ou numérico, atualizado dinamicamente. |
| `xp-section`           | Subseção dedicada ao progresso de XP até o multiplicador. |
| `xp-header`            | Container com meta (`"800 XP"`) e progresso atual (`"120 / 800"`). |
| `xp-bar-container-full`| Barra de fundo estática do progresso. |
| `xp-bar-full`          | Elemento interno com largura dinâmica (`style="width: X%"`). |
| `multiplier-status`    | Feedback textual do estado do multiplicador (`"ACTIVE"`, `"CALCULATING..."`). |

---

## 🛡️ Sidebar de Navegação

| Classe                | Função |
|-----------------------|--------|
| `sidebar-container`   | Envolvório externo da sidebar. Controla posicionamento (`fixed`) e largura. |
| `sidebar`             | Elemento `<aside>` principal, com altura total e estilo visual. |
| `sidebar-header`      | Cabeçalho com título do sistema. |
| `sidebar-title`       | Título `"RUNES OF FATE"`, com fonte temática e efeitos. |
| `sidebar-nav`         | Container do menu de navegação. |
| `sidebar-menu`        | Lista (`<ul>`) dos itens, sem bullets padrão. |
| `sidebar-link`        | Link de navegação estilizado como item de menu. |
| `link-icon`           | Ícone decorativo (emoji/SVG), alinhado com texto. |
| `link-text`           | Texto legível do item de menu. |
| `theme-toggle`        | Container do botão de alternância de tema na base da sidebar. |
| `btn`                 | *(já documentada)* — Reutilizada para consistência visual. |

---

## 🔍 Verificação de Duplicidades

As seguintes classes aparecem em mais de uma seção, mas com uso intencional e consistente — **não são duplicidades problemáticas**, e sim **reutilização correta**:

| Classe      | Seções onde aparece       | Observação |
|-------------|----------------------------|-----------|
| `arcade`    | Dashboard, Header          | Estilo temático reaproveitado em botões, badges e valores. |
| `btn`       | Header, Sidebar            | Classe base de botão, usada de forma consistente. |
| `bg-card`   | Dashboard                  | Pode ser usada em `kpi-card` ou `prv-card` (compatível semanticamente). |
| `glow`      | Dashboard                  | Pode ser aplicada a `kpi-value` ou `prv-value` futuramente. |

✅ **Conclusão**: Nenhuma duplicidade redundante ou conflitante foi identificada. A arquitetura de classes é **modular, semântica e reutilizável**, alinhada com boas práticas de CSS escalável.

---

> 💡 **Próximos passos sugeridos**:
> - Migrar essas classes para utilitários do **Tailwind** (ex: `@apply` em componentes ou usar classes diretamente).
> - Criar **componentes React** para `KpiCard`, `PrvCard`, `ModuleCard`, etc., reforçando a reutilização.
> - Centralizar efeitos como `glow` e `arcade` em **classes personalizadas** no `tailwind.config.js`.

> 🔧 Se quiser, posso gerar:
> - Um arquivo de **design tokens** (cores, fontes, sombras)
> - Um exemplo de **migração para Tailwind + Next.js**
> - Componentes React funcionais com TypeScript

Basta pedir!