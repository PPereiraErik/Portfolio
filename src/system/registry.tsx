import type { ReactNode } from 'react'
import { AboutApp } from '../apps/AboutApp'
import { ContactApp } from '../apps/ContactApp'
import { EducationApp } from '../apps/EducationApp'
import { ExperienceApp } from '../apps/ExperienceApp'
import { ProjectApp } from '../apps/ProjectApp'
import { ProjectsApp } from '../apps/ProjectsApp'
import { SecretApp } from '../apps/SecretApp'
import { SkillsApp } from '../apps/SkillsApp'
import { TerminalApp } from '../apps/TerminalApp'
import { folderName, projects } from '../data/projects'
import { icons, type Bitmap } from '../lib/bitmaps'
import type { AppId, StaticAppId } from './WindowManager'

export type AppConfig = {
  title: string
  /** Nome curto na barra de tarefas */
  taskLabel: string
  icon: Bitmap
  /** Largura padrão no desktop, em px (encolhe em telas menores) */
  width: number
  /** Posição inicial em CSS. O sistema mantém a janela dentro da tela. */
  left: string
  top: string
  content: ReactNode
}

const staticApps: Record<StaticAppId, AppConfig> = {
  about: {
    title: 'ABOUT_ERIK.EXE',
    taskLabel: 'Sobre',
    icon: icons.user,
    width: 580,
    left: '16rem',
    top: '2.5rem',
    content: <AboutApp />,
  },
  projects: {
    title: 'MEUS_PROJETOS',
    taskLabel: 'Projetos',
    icon: icons.folder,
    width: 600,
    left: '17rem',
    top: '3.5rem',
    content: <ProjectsApp />,
  },
  experience: {
    title: 'EXPERIENCE.EXE',
    taskLabel: 'Experiência',
    icon: icons.briefcase,
    width: 620,
    left: '15rem',
    top: '3rem',
    content: <ExperienceApp />,
  },
  education: {
    title: 'EDUCATION.EXE',
    taskLabel: 'Formação',
    icon: icons.cap,
    width: 600,
    left: '19rem',
    top: '4rem',
    content: <EducationApp />,
  },
  skills: {
    title: 'SKILLS.EXE',
    taskLabel: 'Tecnologias',
    icon: icons.chip,
    width: 580,
    left: '21rem',
    top: '4.5rem',
    content: <SkillsApp />,
  },
  terminal: {
    title: 'TERMINAL.EXE',
    taskLabel: 'Terminal',
    icon: icons.terminal,
    width: 520,
    left: 'calc(100% - 520px - 1.5rem)',
    top: '9.5rem',
    content: <TerminalApp />,
  },
  contact: {
    title: 'CONTACT.EXE',
    taskLabel: 'Contato',
    icon: icons.mail,
    width: 580,
    left: 'calc(50% - 290px)',
    top: '5rem',
    content: <ContactApp />,
  },
  secret: {
    title: 'SECRET.TXT',
    taskLabel: 'secret.txt',
    icon: icons.file,
    width: 400,
    left: 'calc(50% - 200px)',
    top: '7rem',
    content: <SecretApp />,
  },
}

export function getAppConfig(id: AppId): AppConfig | null {
  if (id.startsWith('project:')) {
    const project = projects.find((p) => p.slug === id.slice('project:'.length))
    if (!project) return null
    return {
      title: folderName(project),
      taskLabel: project.name,
      icon: icons.folder,
      width: 880,
      left: 'calc(50% - 440px)',
      top: '2.5rem',
      content: <ProjectApp project={project} />,
    }
  }
  return staticApps[id as StaticAppId] ?? null
}

/** Ícones da área de trabalho, na ordem em que aparecem */
export const desktopItems: { id: StaticAppId; label: string; icon: Bitmap }[] = [
  { id: 'projects', label: 'Meus projetos', icon: icons.folder },
  { id: 'about', label: 'Sobre mim', icon: icons.user },
  { id: 'experience', label: 'Experiência', icon: icons.briefcase },
  { id: 'education', label: 'Formação', icon: icons.cap },
  { id: 'skills', label: 'Tecnologias', icon: icons.chip },
  { id: 'terminal', label: 'Terminal.exe', icon: icons.terminal },
  { id: 'contact', label: 'Contato', icon: icons.mail },
]
