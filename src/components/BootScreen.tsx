import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { availability } from '../data/profile'
import { projects } from '../data/projects'
import { easeOut } from '../lib/motion'

const lines = [
  'ERIK_PINHEIRO.EXE',
  'C:\\ERIK> iniciando sistema',
  'carregando wallpaper.bmp ........ ok',
  `carregando projetos ............. ${projects.length}`,
  `status: ${availability.label.toLowerCase()}`,
]

const STEP_MS = 130
const BAR = 16

/**
 * Inicialização curta (~1s), exibida uma vez por sessão.
 * Qualquer tecla ou clique pula. Com movimento reduzido, não aparece.
 * É decorativa: o conteúdo real já está na página por trás dela.
 */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const finished = step >= lines.length + 2

  useEffect(() => {
    const id = window.setTimeout(() => (finished ? onDone() : setStep((s) => s + 1)), finished ? 250 : STEP_MS)
    return () => window.clearTimeout(id)
  }, [step, finished, onDone])

  useEffect(() => {
    const skip = () => onDone()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [onDone])

  const progress = Math.min(step / (lines.length + 1), 1)
  const filled = Math.round(progress * BAR)

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[150] flex items-end bg-ink p-5 sm:items-center sm:justify-center"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <div className="w-full max-w-md font-pixel text-[0.75rem] leading-relaxed sm:text-[0.8125rem]">
        {lines.slice(0, step).map((line, i) => (
          <p key={line} className={i === 0 ? 'mb-3 text-paper' : 'text-mute'}>
            {line}
          </p>
        ))}
        <p className="mt-4 text-paper">
          INITIALIZING... <span className="text-signal">{'█'.repeat(filled)}</span>
          <span className="text-line">{'█'.repeat(BAR - filled)}</span>
        </p>
        <p className="mt-6 text-mute">pressione qualquer tecla para pular</p>
      </div>
    </motion.div>
  )
}
