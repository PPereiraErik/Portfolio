import { education } from '../data/career'

export function EducationApp() {
  return (
    <ul className="divide-y-2 divide-line px-5 md:px-7">
      {education.map((item) => (
        <li key={item.course} className="py-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xl font-bold leading-tight">{item.course}</h3>
            <span className={`sys-label ${item.status === 'Concluído' ? 'text-mute' : 'text-signal'}`}>
              {item.status}
            </span>
          </div>
          <p className="mt-1">{item.institution}</p>
          <p className="mt-1 text-sm text-mute">
            {[item.mode, item.location, item.period].filter(Boolean).join(' / ')}
          </p>
        </li>
      ))}
    </ul>
  )
}
