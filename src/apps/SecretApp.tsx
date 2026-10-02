import { RetroButton } from '../components/RetroButton'
import { useWindows } from '../system/WindowManager'

/** Aberto pelo Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) */
export function SecretApp() {
  const { open } = useWindows()
  return (
    <div className="space-y-5 p-5">
      <p className="sys-label text-signal">Acesso liberado</p>
      <p className="text-soft">
        Você encontrou o arquivo escondido. Quem explora um portfólio até aqui provavelmente também gosta de achar o
        detalhe que ninguém viu. Eu também.
      </p>
      <RetroButton variant="primary" onClick={() => open('contact')}>
        Falar com o Erik
      </RetroButton>
    </div>
  )
}
