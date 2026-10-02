import { skills } from '../data/skills'

export function SkillsApp() {
  return (
    <div className="grid gap-7 p-5 sm:grid-cols-2 md:p-7">
      {skills.map((group) => (
        <section key={group.title} aria-labelledby={`skills-${group.title}`}>
          <h3 id={`skills-${group.title}`} className="sys-label mb-3 border-b-2 border-line pb-2 text-mute">
            {group.title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="border-2 border-paper px-2.5 py-1 font-semibold shadow-[3px_3px_0_0_var(--color-line)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
