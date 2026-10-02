export type Project = {
  /** Identificador usado em ids e no nome da pasta (catolica-fc -> CATOLICA_FC) */
  slug: string
  name: string
  /** Uma linha, aparece na pasta e no preview */
  summary: string
  description: string
  /** Pontos principais, só o que existe no projeto */
  highlights?: string[]
  /** null quando o ano ainda não foi confirmado */
  year: string | null
  category: string
  technologies: string[]
  /** Screenshot importado de src/assets/projects. Sem imagem, o site gera um preview em pixel */
  image?: string
  /** URL do repositório. Vazio = botão GitHub não aparece */
  github?: string
  /** URL publicada. Vazio = botão Live Demo não aparece */
  demo?: string
}

export type ContactLink = {
  id: 'email' | 'phone' | 'whatsapp' | 'linkedin' | 'github'
  label: string
  value: string
  /** Observação curta, ex.: "Somente mensagens" */
  note?: string
  href: string
  external: boolean
}

export type Experience = {
  role: string
  company: string
  period?: string
  /** Rótulo extra, ex.: "Experiência anterior" */
  note?: string
  description: string
}

export type Education = {
  course: string
  institution: string
  mode?: string
  location?: string
  period?: string
  status: string
}

export type SkillGroup = {
  title: string
  items: string[]
}
