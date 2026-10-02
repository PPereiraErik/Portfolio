import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import wallpaper from '../assets/wallpaper.png'
import { useFinePointer } from '../hooks/useMediaQuery'

/**
 * A imagem das mãos como fundo do sistema: vinheta, granulação e linhas de monitor.
 * Parallax de poucos pixels só com mouse, atualizado no máximo uma vez por frame.
 */
export function Wallpaper() {
  const reduceMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 40, damping: 20 })
  const y = useSpring(rawY, { stiffness: 40, damping: 20 })

  useEffect(() => {
    if (!finePointer || reduceMotion) return
    let frame = 0
    let pointerX = 0
    let pointerY = 0

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        rawX.set((pointerX / window.innerWidth - 0.5) * -14)
        rawY.set((pointerY / window.innerHeight - 0.5) * -9)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [finePointer, reduceMotion, rawX, rawY])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Posição em uma camada, parallax em outra: as duas transformações não se sobrescrevem */}
      <div className="wallpaper-mask absolute left-1/2 top-[46%] w-[230%] max-w-none -translate-x-[52%] -translate-y-1/2 opacity-35 md:top-1/2 md:w-[108%] md:-translate-x-1/2 md:opacity-55">
        <motion.img
          src={wallpaper}
          alt=""
          width={1835}
          height={945}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="block h-auto w-full select-none"
          style={{ x, y }}
        />
      </div>
      <div className="grain absolute inset-0 opacity-[0.06]" />
      <div className="scanlines absolute inset-0" />
    </div>
  )
}
