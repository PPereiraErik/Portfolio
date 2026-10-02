import type { ReactNode } from 'react'

type RetroButtonProps = {
  children: ReactNode
  /** Com href vira link; sem href, botão com onClick */
  href?: string
  onClick?: () => void
  external?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}

/**
 * Botão de sistema 1-bit: sombra deslocada que fica laranja no hover
 * e some quando o botão "afunda" ao clicar.
 */
export function RetroButton({
  children,
  href,
  onClick,
  external = false,
  variant = 'secondary',
  className = '',
}: RetroButtonProps) {
  const classes = `inline-flex min-h-10 items-center justify-center gap-2 border-2 border-paper px-4 py-2 text-[0.9375rem] font-semibold leading-none shadow-[4px_4px_0_0_var(--color-mute)] transition-[transform,translate,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_var(--color-signal)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_0_var(--color-signal)] ${
    variant === 'primary' ? 'bg-paper text-ink' : 'bg-ink text-paper'
  } ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {children}
        {external && <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
