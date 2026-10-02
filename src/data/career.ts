import type { Education, Experience } from './types'

// Fonte: currículo, atualizado com as informações mais recentes.
export const experience: Experience[] = [
  {
    role: 'Assessor Comercial',
    company: 'Econet Editora',
    period: 'Abr/2026',
    note: 'Experiência anterior',
    description:
      'Atendimento consultivo e relacionamento com clientes. Apresentação de soluções, suporte comercial e acompanhamento de negociações.',
  },
  {
    role: 'Auxiliar de Logística',
    company: 'Doce de Maria',
    period: 'Set/2025 – Mar/2026',
    description:
      'Controle de estoque, elaboração de relatórios e apoio em rotinas administrativas e financeiras. Atuação como Coordenador da CIPA.',
  },
]

export const strengths = [
  'Atendimento',
  'Relacionamento com clientes',
  'Suporte comercial',
  'Pós-venda',
  'Organização',
  'Planilhas',
  'Processos administrativos',
  'Resolução de problemas',
  'Comunicação',
  'Trabalho em equipe',
]

export const education: Education[] = [
  {
    course: 'Engenharia de Software',
    institution: 'Católica SC',
    mode: 'Presencial',
    location: 'Joinville, SC',
    period: '2025 – 2029 (previsão)',
    status: 'Cursando',
  },
  {
    course: 'Testes de Software',
    institution: 'EBAC',
    mode: 'Online',
    status: 'Em andamento',
  },
  {
    course: 'Técnico em Eletromecânica',
    institution: 'SENAI MG',
    period: '2021',
    status: 'Concluído',
  },
]
