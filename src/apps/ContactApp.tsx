import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { contacts, email } from '../data/contact'

export function ContactApp() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="p-5 md:p-7">
      <p className="mb-6 text-lead">Vamos conversar? Respondo por qualquer um destes canais.</p>

      <ul className="grid gap-3 sm:grid-cols-2">
        {contacts.map((contact) => (
          <li key={contact.id} className={`min-w-0 ${contact.id === 'email' ? 'sm:col-span-2' : ''}`}>
            <a
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noopener noreferrer' : undefined}
              className="group flex h-full items-center justify-between gap-3 border-2 border-paper p-4 shadow-[4px_4px_0_0_var(--color-line)] transition-[transform,translate,box-shadow,background-color,color] duration-150 hover:-translate-x-px hover:-translate-y-px hover:bg-paper hover:text-ink hover:shadow-[5px_5px_0_0_var(--color-signal)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              <span className="min-w-0">
                <span className="sys-label block text-mute group-hover:text-ink">
                  {contact.label}
                  {contact.note && <span className="text-signal group-hover:text-ink"> / {contact.note}</span>}
                </span>
                <span className="mt-1.5 block truncate font-semibold">{contact.value}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="shrink-0" size={20} strokeWidth={1.75} />
              {contact.external && <span className="sr-only"> (abre em nova aba)</span>}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={copyEmail}
        className="sys-label mt-6 inline-flex items-center gap-2 border-2 border-line px-3 py-2 text-soft transition-colors hover:border-signal hover:text-signal"
      >
        {copied ? <Check aria-hidden="true" size={14} /> : <Copy aria-hidden="true" size={14} />}
        <span aria-live="polite">{copied ? 'E-mail copiado' : 'Copiar e-mail'}</span>
      </button>
    </div>
  )
}
