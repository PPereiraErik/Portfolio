import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, type RefObject } from 'react'
import { PixelArt } from '../components/PixelArt'
import { StatusDot } from '../components/StatusDot'
import { githubProfile, linkedinProfile } from '../data/contact'
import { availability } from '../data/profile'
import { easeOut } from '../lib/motion'
import { desktopItems } from './registry'
import { useWindows } from './WindowManager'

type StartMenuProps = {
  onClose: () => void
  /** O botão START: clicar nele não deve contar como "clique fora" */
  anchorRef: RefObject<HTMLButtonElement | null>
}

export function StartMenu({ onClose, anchorRef }: StartMenuProps) {
  const { open } = useWindows()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('button, a')?.focus()

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (!ref.current?.contains(target) && !anchorRef.current?.contains(target)) onClose()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        anchorRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, anchorRef])

  const links = [
    { label: 'GitHub', href: githubProfile },
    { label: 'LinkedIn', href: linkedinProfile },
  ]

  return (
    <motion.div
      ref={ref}
      id="start-menu"
      className="absolute bottom-[calc(100%+2px)] left-0 flex w-[min(18rem,calc(100vw-1rem))] border-2 border-paper bg-ink shadow-[6px_6px_0_0_rgb(0_0_0/0.7)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8, transition: { duration: 0.12 } }}
      transition={{ duration: 0.18, ease: easeOut }}
    >
      <p
        aria-hidden="true"
        className="sys-label flex items-end bg-paper px-1.5 py-3 text-ink [writing-mode:vertical-rl] rotate-180"
      >
        ERIK_PINHEIRO.EXE
      </p>

      <nav aria-label="Menu Iniciar" className="min-w-0 flex-1 py-2">
        <ul>
          {desktopItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  open(item.id)
                  onClose()
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-paper hover:text-ink focus-visible:bg-signal focus-visible:text-ink focus-visible:outline-none"
              >
                <PixelArt bitmap={item.icon} scale={1} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <ul className="mt-2 border-t-2 border-line pt-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-paper hover:text-ink focus-visible:bg-signal focus-visible:text-ink focus-visible:outline-none"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" size={15} />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-2 flex items-center gap-2 border-t-2 border-line px-3 pt-3 text-sm text-soft">
          <StatusDot />
          {availability.label}
        </p>
      </nav>
    </motion.div>
  )
}
