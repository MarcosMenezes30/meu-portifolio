# Portfolio Web Components 2.0

SPA premium single-page construída com **Web Components + TypeScript + Vite**, com conteúdo 100% dirigido por `src/data/siteData.json`.

## Requisitos

- Node.js 20+
- npm 10+

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Onde editar conteúdo

Edite apenas o arquivo:

- `src/data/siteData.json`

Campos principais:

- `profile`: nome, cargo, bio, tags, foto, links sociais, WhatsApp
- `nav`: itens do menu e CTA
- `metricsHero`: métricas com contador animado
- `aboutCards`: cards da seção Sobre
- `values`: cards da seção Valores
- `projects`: categorias e cards de projetos
- `skills`: cards da faixa/marquee
- `certifications`: certificações e links de verificação
- `courses`: cursos e horas para métricas agregadas
- `contact`: dados de contato e endpoint opcional do formulário
- `footer`: bio curta e créditos

## Onde editar visual

- Tokens de design: `src/styles/tokens.css`
- Estilos globais (reset/background/focus): `src/styles/global.css`

## Assets

Placeholders prontos em `public/assets`:

- `profile.svg`
- `projects/*.svg`
- `skills/*.svg`
- `certs/*.svg`
- `courses/*.svg`

Substitua por arquivos finais mantendo os caminhos no JSON.

## Formulário de contato

- Por padrão usa fallback `mailto:` + toast.
- Se quiser endpoint real, defina `contact.formEndpoint` no JSON.

## Recursos implementados

- Scrollspy com `IntersectionObserver`
- Scroll reveal uniforme
- Hover breathing em elementos interativos
- Hero orbit + parallax
- Counters com `requestAnimationFrame`
- Projetos com filtros + carrossel responsivo
- Skills marquee autoplay com pausa no hover
- Drawer mobile com ESC + clique fora + trap de foco
- `prefers-reduced-motion` respeitado
