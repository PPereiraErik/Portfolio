import { motion, useDragControls, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { PixelArt } from '../components/PixelArt'
import { easeOut } from '../lib/motion'
import type { AppConfig } from './registry'
import { useWindows, type WindowState } from './WindowManager'

type AppWindowProps = {
  win: WindowState
  config: AppConfig
  active: boolean
  /** Área de trabalho: limite para arrastar */
  boundsRef: RefObject<HTMLElement | null>
  /** No celular a janela ocupa a tela e não é arrastável */
  isDesktop: boolean
}

export function AppWindow({ win, config, active, boundsRef, isDesktop }: AppWindowProps) {
  const { close, minimize, focus } = useWindows()
  const dragControls = useDragControls()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const titleId = `window-${win.id.replace(':', '-')}-title`

  // Ao abrir, leva o foco para a janela (sem roubar de um campo que já pediu foco, como o terminal)
  useEffect(() => {
    const node = ref.current
    if (node && !node.contains(document.activeElement)) node.focus({ preventScroll: true })
  }, [])

  // Cascata: janelas abertas em sequência não ficam exatamente uma sobre a outra
  const offset = (win.slot % 5) * 22
  const desktopStyle: CSSProperties = {
    zIndex: win.z,
    width: `min(${config.width}px, calc(100% - 2rem))`,
    left: `max(1rem, min(calc(${config.left} + ${offset}px), calc(100% - ${config.width}px - 1rem)))`,
    top: `calc(${config.top} + ${offset}px)`,
    maxHeight: `calc(100% - ${config.top} - ${offset}px - 1rem)`,
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const tag = (event.target as HTMLElement).tagName
    if (event.key === 'Escape' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      event.stopPropagation()
      close(win.id)
    }
  }

  return (
    <motion.section
      ref={ref}
      role="dialog"
      aria-labelledby={titleId}
      aria-hidden={win.minimized || undefined}
      inert={win.minimized}
      tabIndex={-1}
      onPointerDown={() => focus(win.id)}
      onFocus={() => focus(win.id)}
      onKeyDown={onKeyDown}
      className={`absolute flex flex-col border-2 bg-ink outline-none ${
        active ? 'border-paper shadow-[6px_6px_0_0_rgb(0_0_0/0.7)]' : 'border-mute shadow-[4px_4px_0_0_rgb(0_0_0/0.5)]'
      } ${isDesktop ? '' : 'inset-2'}`}
      style={isDesktop ? desktopStyle : { zIndex: win.z }}
      drag={isDesktop}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={boundsRef}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.9, transitionEnd: { visibility: 'hidden' } }
          : { opacity: 1, scale: 1, visibility: 'visible' }
      }
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.14, ease: easeOut } }}
      transition={{ duration: 0.2, ease: easeOut }}
    >
      <header
        onPointerDown={(event) => {
          focus(win.id)
          if (isDesktop) dragControls.start(event)
        }}
        className={`flex h-9 shrink-0 select-none items-center gap-2 border-b-2 pl-2 pr-1 ${
          active ? 'border-paper bg-paper text-ink' : 'border-mute bg-ink text-mute'
        }`}
        style={isDesktop ? { touchAction: 'none' } : undefined}
      >
        <PixelArt bitmap={config.icon} scale={1} />
        <h2 id={titleId} className="sys-label min-w-0 flex-1 truncate">
          {config.title}
        </h2>
        <div className="flex gap-1" onPointerDown={(event) => event.stopPropagation()}>
          <TitleButton label={`Minimizar ${config.title}`} active={active} onClick={() => minimize(win.id)}>
            <span className="block h-0.5 w-2.5 translate-y-1 bg-current" />
          </TitleButton>
          <TitleButton label={`Fechar ${config.title}`} active={active} danger onClick={() => close(win.id)}>
            <span className="sys-label leading-none">×</span>
          </TitleButton>
        </div>
      </header>

      <div className="os-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">{config.content}</div>
    </motion.section>
  )
}

type TitleButtonProps = {
  label: string
  active: boolean
  danger?: boolean
  onClick: () => void
  children: ReactNode
}

function TitleButton({ label, active, danger = false, onClick, children }: TitleButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid size-7 place-items-center border-2 transition-colors ${
        active ? 'border-ink' : 'border-mute'
      } ${danger ? 'hover:border-signal hover:bg-signal hover:text-ink' : 'hover:bg-ink hover:text-paper'}`}
    >
      {children}
    </button>
  )
}
