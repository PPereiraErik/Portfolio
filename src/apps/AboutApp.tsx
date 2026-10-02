import { RetroButton } from '../components/RetroButton'
import { StatusDot } from '../components/StatusDot'
import { about, availability, profile } from '../data/profile'
import { useWindows } from '../system/WindowManager'

export function AboutApp() {
  const { open } = useWindows()

  return (
    <div className="space-y-7 p-5 md:p-7">
      <header>
        <p className="sys-label text-mute">Usuário</p>
        <h3 className="mt-2 text-title font-bold">{profile.name}</h3>
        <p className="mt-1 text-lead text-soft">{profile.headline}</p>
      </header>

      <div className="max-w-[60ch] space-y-4 text-soft">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>{about.languages}</p>
      </div>

      <div>
        <p className="sys-label mb-3 text-mute">Quero atuar principalmente em</p>
        <ul className="flex flex-wrap gap-2">
          {availability.interests.map((item) => (
            <li key={item} className="border-2 border-line px-3 py-1.5">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="flex items-center gap-2.5 border-l-2 border-signal pl-3 font-semibold">
        <StatusDot />
        {availability.label}. <span className="font-normal text-soft">{availability.note}</span>
      </p>

      <div className="flex flex-wrap gap-4">
        <RetroButton variant="primary" onClick={() => open('projects')}>
          Ver projetos
        </RetroButton>
        <RetroButton onClick={() => open('contact')}>Contato</RetroButton>
      </div>
    </div>
  )
}
