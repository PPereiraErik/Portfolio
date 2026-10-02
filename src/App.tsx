import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BootScreen } from './components/BootScreen'
import { CustomCursor } from './components/CustomCursor'
import { useKonami } from './hooks/useKonami'
import { useMediaQuery } from './hooks/useMediaQuery'
import { Desktop } from './system/Desktop'
import { useWindows, WindowProvider } from './system/WindowManager'

const BOOT_KEY = 'erik-pinheiro:booted'

function hasBooted() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <WindowProvider>
        <System />
      </WindowProvider>
    </MotionConfig>
  )
}

function System() {
  const { open } = useWindows()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [booted, setBooted] = useState(() => reduceMotion || hasBooted())
  const didOpenDefaults = useRef(false)

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      // Sem storage: a inicialização aparece de novo no próximo carregamento
    }
    setBooted(true)
  }, [])

  // Em telas grandes o sistema já abre com Sobre e Terminal na área de trabalho
  useEffect(() => {
    if (!booted || didOpenDefaults.current) return
    didOpenDefaults.current = true
    if (window.matchMedia('(min-width: 1024px)').matches) {
      open('terminal')
      open('about')
    }
  }, [booted, open])

  useKonami(useCallback(() => open('secret'), [open]))

  return (
    <>
      <a
        href="#desktop-icons"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Ir para os ícones da área de trabalho
      </a>
      <AnimatePresence>{!booted && <BootScreen onDone={finishBoot} />}</AnimatePresence>
      <CustomCursor />
      <Desktop ready={booted} />
    </>
  )
}
