import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinePointer } from '../hooks/useMediaQuery'
import { cursorHotspots, cursors } from '../lib/bitmaps'
import { PixelArt } from './PixelArt'

type Shape = keyof typeof cursors
type CursorState = { shape: Shape; label: string | null }

const SCALE = 2

/**
 * Cursor de sistema em pixel art. Segue o mouse sem atraso (como um cursor real):
 *   seta         padrão
 *   mão          pastas e ícones (data-cursor="hand")
 *   texto        terminal e campos (data-cursor="text")
 *   CLICK        botões
 *   OPEN ↗       links externos
 * Só existe com mouse ou trackpad.
 */
export function CustomCursor() {
  const enabled = useFinePointer()
  const [state, setState] = useState<CursorState>({ shape: 'arrow', label: null })
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible((v) => v || true)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null
      const explicit = target?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor
      let next: CursorState = { shape: 'arrow', label: null }

      if (target?.closest('input, textarea') || explicit === 'text') next = { shape: 'text', label: null }
      else if (explicit === 'hand') next = { shape: 'hand', label: null }
      else if (target?.closest('a[target="_blank"]')) next = { shape: 'arrow', label: 'OPEN ↗' }
      else if (target?.closest('a, button')) next = { shape: 'arrow', label: 'CLICK' }

      setState((current) =>
        current.shape === next.shape && current.label === next.label ? current : next,
      )
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    root.addEventListener('pointerleave', onLeave)

    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const [hx, hy] = cursorHotspots[state.shape]

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[400]"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      <div
        className="transition-transform duration-75"
        style={{
          transform: `translate(${-hx * SCALE}px, ${-hy * SCALE}px) scale(${pressed ? 0.9 : 1})`,
          transformOrigin: `${hx * SCALE}px ${hy * SCALE}px`,
          filter: state.shape === 'hand' ? 'drop-shadow(0 0 6px rgb(255 106 26 / 0.35))' : undefined,
        }}
      >
        <PixelArt bitmap={cursors[state.shape]} scale={SCALE} />
      </div>
      <AnimatePresence>
        {state.label && (
          <motion.span
            key={state.label}
            className="sys-label absolute left-6 top-8 whitespace-nowrap bg-signal px-1.5 py-1 text-ink"
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {state.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
