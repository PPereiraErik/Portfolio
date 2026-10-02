import type { ReactNode } from 'react'

type FrameProps = {
  title: string
  children: ReactNode
  className?: string
  bodyClassName?: string
}

/** Moldura estática de janela 1-bit, usada dentro das janelas (ex.: previews) */
export function Frame({ title, children, className = '', bodyClassName = '' }: FrameProps) {
  return (
    <div className={`border-2 border-paper bg-ink ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b-2 border-paper px-2 py-1.5">
        <span className="truncate font-pixel text-[10px] leading-none">{title}</span>
        <span aria-hidden="true" className="flex shrink-0 gap-[3px]">
          <i className="block size-2.5 border border-paper" />
          <i className="block size-2.5 border border-paper" />
          <i className="block size-2.5 border border-paper bg-paper" />
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
