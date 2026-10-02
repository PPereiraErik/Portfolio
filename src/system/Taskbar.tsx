import { AnimatePresence } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { PixelArt } from '../components/PixelArt'
import { StatusDot } from '../components/StatusDot'
import { availability, profile } from '../data/profile'
import { useLocalTime } from '../hooks/useLocalTime'
import { icons } from '../lib/bitmaps'
import { getAppConfig } from './registry'
import { StartMenu } from './StartMenu'
import { useWindows } from './WindowManager'

export function Taskbar() {
  const { windows, activeId, toggle } = useWindows()
  const [menuOpen, setMenuOpen] = useState(false)
  const startRef = useRef<HTMLButtonElement>(null)
  const time = useLocalTime(profile.timeZone)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const ordered = [...windows].sort((a, b) => a.slot - b.slot)

  return (
    <nav
      aria-label="Barra de tarefas"
      className="relative z-[60] flex h-12 shrink-0 items-center gap-2 border-t-2 border-paper bg-ink px-1.5"
    >
      <div className="relative">
        <button
          ref={startRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="start-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className={`sys-label flex h-9 items-center gap-2 border-2 px-2.5 transition-colors ${
            menuOpen ? 'border-signal bg-signal text-ink' : 'border-paper hover:bg-paper hover:text-ink'
          }`}
        >
          <PixelArt bitmap={icons.logo} scale={2} />
          Start
        </button>
        <AnimatePresence>{menuOpen && <StartMenu onClose={closeMenu} anchorRef={startRef} />}</AnimatePresence>
      </div>

      <ul className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {ordered.map((win) => {
          const config = getAppConfig(win.id)
          if (!config) return null
          const active = win.id === activeId
          return (
            <li key={win.id} className="shrink-0">
              <button
                type="button"
                aria-pressed={active}
                aria-label={`${config.taskLabel}${win.minimized ? ' (minimizado)' : ''}`}
                onClick={() => toggle(win.id)}
                className={`flex h-9 max-w-44 items-center gap-2 border-2 px-2 text-sm transition-colors ${
                  active
                    ? 'border-paper bg-paper text-ink'
                    : win.minimized
                      ? 'border-line text-mute hover:border-mute'
                      : 'border-mute text-soft hover:border-paper'
                }`}
              >
                <PixelArt bitmap={config.icon} scale={1} />
                <span className="truncate">{config.taskLabel}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex h-9 shrink-0 items-center gap-3 border-2 border-line px-2.5">
        <span className="flex items-center gap-2" title={availability.label}>
          <StatusDot />
          <span className="sys-label hidden text-soft sm:inline">{availability.short}</span>
          <span className="sr-only sm:hidden">{availability.label}</span>
        </span>
        <time className="sys-label tabular-nums">{time}</time>
      </div>
    </nav>
  )
}
