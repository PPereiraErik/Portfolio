import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { education, experience } from '../data/career'
import { contacts, githubProfile, linkedinProfile } from '../data/contact'
import { availability, profile } from '../data/profile'
import { folderName, projects } from '../data/projects'
import { skills } from '../data/skills'
import { useFinePointer } from '../hooks/useMediaQuery'
import { useWindows, type AppId } from '../system/WindowManager'

type Line = { id: number; kind: 'in' | 'out' | 'err' | 'dim'; text: string }
type Output = { lines: string[]; kind?: Line['kind'] }
type Api = { open: (id: AppId) => void; closeSelf: () => void; clear: () => void }

const PROMPT = 'C:\\Users\\Erik>'
const TYPE_DELAY = 26

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

/** Comandos. Cada um devolve texto e pode executar uma ação no sistema. */
const commands: Record<string, { help: string; run: (api: Api, args: string[]) => Output }> = {
  help: {
    help: 'lista os comandos',
    run: () => ({
      lines: Object.entries(commands)
        .filter(([name]) => !hidden.has(name))
        .map(([name, cmd]) => `${name.padEnd(11, ' ')}${cmd.help}`),
    }),
  },
  whoami: {
    help: 'quem é o erik',
    run: () => ({ lines: [profile.name, 'Software Engineering Student', 'Front-End / Web / QA'] }),
  },
  about: {
    help: 'abre ABOUT_ERIK.EXE',
    run: (api) => {
      api.open('about')
      return { lines: ['abrindo ABOUT_ERIK.EXE...'], kind: 'dim' }
    },
  },
  projects: {
    help: 'abre a pasta de projetos',
    run: (api) => {
      api.open('projects')
      return {
        lines: [
          ...projects.map((p, i) => `[${i + 1}] ${folderName(p)}`),
          'digite open 1, open 2... para abrir um projeto',
        ],
      }
    },
  },
  open: {
    help: 'abre um projeto: open 1',
    run: (api, args) => {
      const key = (args[0] ?? '').toLowerCase()
      const byIndex = projects[Number(key) - 1]
      const project =
        byIndex ?? projects.find((p) => p.slug.startsWith(key) || folderName(p).toLowerCase().startsWith(key))
      if (!key || !project) return { lines: ['uso: open 1 | open catolica | open synergy'], kind: 'err' }
      api.open(`project:${project.slug}`)
      return { lines: [`abrindo ${folderName(project)}...`], kind: 'dim' }
    },
  },
  skills: {
    help: 'tecnologias',
    run: (api) => {
      api.open('skills')
      return { lines: skills.map((g) => `${g.title.padEnd(12, ' ')}${g.items.join(', ')}`) }
    },
  },
  education: {
    help: 'formação',
    run: (api) => {
      api.open('education')
      return { lines: education.map((e) => `${e.course}, ${e.institution} (${e.status.toLowerCase()})`) }
    },
  },
  experience: {
    help: 'experiência profissional',
    run: (api) => {
      api.open('experience')
      return {
        lines: experience.map((e) => `${e.role}, ${e.company}${e.note ? ` (${e.note.toLowerCase()})` : ''}`),
      }
    },
  },
  status: {
    help: 'disponibilidade',
    run: () => ({ lines: [`● ${availability.label}`, availability.roles.join(', ')] }),
  },
  contact: {
    help: 'abre CONTACT.EXE',
    run: (api) => {
      api.open('contact')
      return { lines: contacts.map((c) => `${c.label.padEnd(10, ' ')}${c.value}${c.note ? `  (${c.note.toLowerCase()})` : ''}`) }
    },
  },
  github: {
    help: 'abre o GitHub',
    run: () => {
      openExternal(githubProfile)
      return { lines: ['abrindo github.com/PPereiraErik ↗'], kind: 'dim' }
    },
  },
  linkedin: {
    help: 'abre o LinkedIn',
    run: () => {
      openExternal(linkedinProfile)
      return { lines: ['abrindo linkedin ↗'], kind: 'dim' }
    },
  },
  clear: {
    help: 'limpa a tela',
    run: (api) => {
      api.clear()
      return { lines: [] }
    },
  },
  exit: {
    help: 'fecha o terminal',
    run: (api) => {
      api.closeSelf()
      return { lines: [] }
    },
  },
  date: { help: 'data e hora', run: () => ({ lines: [new Date().toLocaleString('pt-BR')] }) },
  sudo: {
    help: '',
    run: () => ({ lines: ['permissão negada. acesso de administrador só depois do estágio.'], kind: 'err' }),
  },
  ls: {
    help: '',
    run: () => ({ lines: ['Projetos/  about_erik.exe  experience.exe  education.exe  skills.exe  contact.exe'] }),
  },
}

const hidden = new Set(['sudo', 'ls', 'date'])

const aliases: Record<string, string> = {
  sobre: 'about',
  projetos: 'projects',
  tecnologias: 'skills',
  formacao: 'education',
  formação: 'education',
  experiencia: 'experience',
  experiência: 'experience',
  contato: 'contact',
  cls: 'clear',
  dir: 'ls',
  '?': 'help',
}

let nextId = 0
const line = (kind: Line['kind'], text: string): Line => ({ id: nextId++, kind, text })

export function TerminalApp() {
  const { open, close } = useWindows()
  const reduceMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const [lines, setLines] = useState<Line[]>(() => [
    line('out', 'ERIK_PINHEIRO.EXE [versão 2026]'),
    line('dim', 'Digite help para ver os comandos.'),
  ])
  const [value, setValue] = useState('')
  const history = useRef<string[]>([])
  const historyIndex = useRef(-1)
  const queue = useRef<Line[]>([])
  const timer = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (finePointer) inputRef.current?.focus({ preventScroll: true })
    return () => window.clearTimeout(timer.current)
  }, [finePointer])

  useEffect(() => {
    const output = outputRef.current
    if (output) output.scrollTop = output.scrollHeight
  }, [lines])

  // Efeito de digitação: as linhas entram uma a uma
  const print = useCallback(
    (newLines: Line[]) => {
      if (reduceMotion) {
        setLines((current) => [...current, ...newLines].slice(-150))
        return
      }
      queue.current.push(...newLines)
      if (timer.current) return
      const tick = () => {
        const next = queue.current.shift()
        if (!next) {
          timer.current = 0
          return
        }
        setLines((current) => [...current, next].slice(-150))
        timer.current = window.setTimeout(tick, TYPE_DELAY)
      }
      tick()
    },
    [reduceMotion],
  )

  const run = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const raw = value.trim()
    setValue('')
    historyIndex.current = -1
    if (!raw) {
      print([line('in', '')])
      return
    }
    history.current = [raw, ...history.current].slice(0, 30)

    const [first, ...args] = raw.split(/\s+/)
    const typed = first.toLowerCase()
    const name = aliases[typed] ?? typed
    const command = commands[name]

    const api: Api = {
      open,
      closeSelf: () => close('terminal'),
      clear: () => {
        queue.current = []
        setLines([])
      },
    }

    print([line('in', raw)])
    if (!command) {
      print([line('err', `'${first}' não é reconhecido como comando. digite help.`)])
      return
    }
    const result = command.run(api, args)
    if (name === 'clear') return
    print(result.lines.map((text) => line(result.kind ?? 'out', text)))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      const max = history.current.length - 1
      historyIndex.current =
        event.key === 'ArrowUp' ? Math.min(historyIndex.current + 1, max) : Math.max(historyIndex.current - 1, -1)
      setValue(historyIndex.current === -1 ? '' : history.current[historyIndex.current])
    } else if (event.key === 'Tab' && value.trim()) {
      const match = Object.keys(commands).find((name) => !hidden.has(name) && name.startsWith(value.trim().toLowerCase()))
      if (match) {
        event.preventDefault()
        setValue(match)
      }
    }
  }

  const color: Record<Line['kind'], string> = {
    in: 'text-paper',
    out: 'text-soft',
    dim: 'text-mute',
    err: 'text-signal',
  }

  return (
    <div
      data-cursor="text"
      className="flex h-[min(24rem,calc(100dvh-17rem))] flex-col bg-ink font-mono text-[0.875rem] leading-relaxed max-md:h-full"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Saída do terminal"
        className="os-scroll min-h-0 flex-1 overflow-y-auto px-4 pt-3"
      >
        {lines.map((l) => (
          <p key={l.id} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
            {l.kind === 'in' && <span className="text-signal">{PROMPT} </span>}
            {l.text}
          </p>
        ))}
      </div>
      <form onSubmit={run} className="flex items-center gap-2 border-t-2 border-line px-4 py-2.5">
        <label htmlFor="terminal-input" className="shrink-0 text-signal">
          {PROMPT}
        </label>
        <input
          ref={inputRef}
          id="terminal-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
          aria-describedby="terminal-hint"
          className="min-w-0 flex-1 bg-transparent text-paper caret-signal outline-none"
        />
        <span id="terminal-hint" className="sr-only">
          Digite help e pressione Enter para ver os comandos.
        </span>
      </form>
    </div>
  )
}
