# Erik Pinheiro — Portfolio

Portfólio de Erik Pinheiro, estudante de Engenharia de Software na Católica SC (Joinville, SC), com foco em desenvolvimento web, front-end e QA.

O site é o computador do Erik: `ERIK_PINHEIRO.EXE`, um sistema operacional 1-bit em que o visitante abre pastas, programas e janelas para conhecer a trajetória e os projetos. Preto e branco como base, laranja só para interação e status.

## Tecnologias

React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion e Lucide React.

## O que tem no sistema

- **Boot** de cerca de 1 segundo, uma vez por sessão (qualquer tecla pula)
- **Área de trabalho** com ícones, status de disponibilidade e wallpaper pontilhado
- **Janelas** com barra de título, minimizar, fechar, arrastar (desktop), foco e z-index
- **Barra de tarefas** com menu Start, janelas abertas e relógio
- **Terminal** que navega pelo site: `help`, `projects`, `open 1`, `about`, `contact`, `github`...
- **Cursor** em pixel art: seta, mão em pastas, texto no terminal, `CLICK` em botões, `OPEN ↗` em links externos
- **Mobile**: ícones em grade, janelas em tela cheia, cursor customizado desligado
- **Acessibilidade**: navegação por teclado, Esc fecha janelas, foco visível, `prefers-reduced-motion`
- Um easter egg no Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)

## Estrutura

```
src/
├── system/        # o "sistema operacional"
│   ├── WindowManager.tsx  # estado das janelas (abrir, fechar, minimizar, foco)
│   ├── AppWindow.tsx      # janela reutilizável
│   ├── registry.tsx       # programas: título, ícone, tamanho, conteúdo
│   ├── Desktop.tsx, Taskbar.tsx, StartMenu.tsx, Wallpaper.tsx
├── apps/          # conteúdo de cada janela (About, Projects, Terminal...)
├── components/    # PixelArt, RetroButton, CustomCursor, BootScreen...
├── data/          # todo o conteúdo editável
├── lib/bitmaps.ts # ícones e cursores em pixel art
└── assets/        # wallpaper.png e screenshots em assets/projects/
```

## Como executar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # verifica os tipos e gera dist/
npm run preview
```

## Adicionando ou editando projetos

Tudo fica em `src/data/projects.ts`. Cada projeto tem `name`, `description`, `technologies`, `github`, `demo` e `image`. Campos `github` e `demo` vazios escondem o botão correspondente, então dá para adicionar links depois sem tocar nos componentes.

Para o **Reservas Saint-Marc**, quando o repositório for publicado:

```ts
github: 'https://github.com/PPereiraErik/nome-do-repositorio',
```

Screenshot: salve em `src/assets/projects/`, importe no topo de `projects.ts` e use em `image`.

## Deploy na Vercel

1. Envie o projeto para um repositório no GitHub.
2. Em vercel.com, clique em **Add New > Project** e importe o repositório.
3. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`). Clique em **Deploy**.
4. Depois, troque `og:image` e `twitter:image` no `index.html` pela URL absoluta publicada.
