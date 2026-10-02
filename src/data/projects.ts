import type { Project } from './types'

// Para adicionar um projeto, copie um objeto abaixo e preencha.
// github e demo vazios = o botão correspondente não aparece.
//
// Screenshot: salve em src/assets/projects/ e importe:
//   import catolicaFc from '../assets/projects/catolica-fc.webp'
//   ...e use image: catolicaFc

export const projects: Project[] = [
  {
    slug: 'catolica-fc',
    name: 'Católica FC',
    summary: 'Jogo de gestão de futebol no navegador.',
    description:
      'Projeto acadêmico de gerenciamento de futebol. Um jogo de navegador em que você administra um clube universitário: orçamento, elenco, partidas e decisões estratégicas definem a evolução do time.',
    highlights: [
      'Campeonato com 12 clubes',
      'Elenco e mercado de transferências',
      'Finanças, patrocínios e melhorias no estádio',
      'Eventos aleatórios a cada semana',
    ],
    year: '2026',
    category: 'Projeto acadêmico, jogo',
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/PPereiraErik/catolica-fc',
    demo: '',
  },
  {
    slug: 'reservas-saint-marc',
    name: 'Reservas Saint-Marc',
    summary: 'Reservas das áreas comuns de um condomínio.',
    description:
      'Sistema web de reservas para as áreas comuns do condomínio Saint-Marc, criado a partir de um problema real: as reservas eram feitas só por e-mail e dependiam da confirmação manual do síndico. O sistema centraliza as solicitações e organiza os horários, deixando o processo mais rápido e transparente para os moradores.',
    highlights: ['Calendário de reservas', 'Painel administrativo', 'Solicitações centralizadas'],
    year: null,
    category: 'Sistema web',
    technologies: ['React', 'TypeScript', 'Supabase'],
    // Preencha quando o repositório for publicado:
    github: '',
    demo: '',
  },
  {
    slug: 'synergy',
    name: 'Synergy',
    summary: 'Rede social responsiva, mobile-first.',
    description:
      'Projeto acadêmico desenvolvido para a disciplina de Ferramentas Web e UX. Uma rede social responsiva, pensada mobile-first, com foco em UX/UI e na experiência de quem usa.',
    highlights: ['Feed', 'Stories', 'Interações entre usuários'],
    year: null,
    category: 'Projeto acadêmico, UX/UI',
    // Preencha com as tecnologias usadas no projeto
    technologies: [],
    github: 'https://github.com/GabBruno/synergy',
    demo: '',
  },
]

export const folderName = (project: Project) => project.slug.replace(/-/g, '_').toUpperCase()
