import { experience, strengths } from '../data/career'

export function ExperienceApp() {
  return (
    <div className="p-5 md:p-7">
      <ol className="border-l-2 border-line">
        {experience.map((item) => (
          <li key={`${item.company}-${item.role}`} className="relative pb-8 pl-6 last:pb-2">
            <span aria-hidden="true" className="absolute -left-[7px] top-2 size-3 border-2 border-paper bg-ink" />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-xl font-bold leading-tight">{item.role}</h3>
              {item.note && (
                <span className="sys-label border border-mute px-1.5 py-0.5 text-mute">{item.note}</span>
              )}
            </div>
            <p className="mt-1">
              {item.company}
              {item.period && <span className="text-mute"> / {item.period}</span>}
            </p>
            <p className="mt-3 max-w-[60ch] text-soft">{item.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 border-t-2 border-line pt-6">
        <p className="sys-label mb-3 text-mute">O que levo dessas experiências</p>
        <ul className="flex flex-wrap gap-2">
          {strengths.map((item) => (
            <li key={item} className="border border-line px-2.5 py-1 text-sm text-soft">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
