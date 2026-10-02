/** Indicador laranja com pulso lento. Decorativo: o texto ao lado carrega o significado. */
export function StatusDot({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`status-pulse inline-block size-2.5 shrink-0 rounded-full bg-signal ${className}`}
    />
  )
}
