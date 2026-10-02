import { useEffect } from 'react'

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

/** Dispara onUnlock quando o Konami Code é digitado */
export function useKonami(onUnlock: () => void) {
  useEffect(() => {
    let position = 0
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      position = key === SEQUENCE[position] ? position + 1 : key === SEQUENCE[0] ? 1 : 0
      if (position === SEQUENCE.length) {
        position = 0
        onUnlock()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onUnlock])
}
