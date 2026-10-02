import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ProjectPreview } from '../components/ProjectPreview'
import { RetroButton } from '../components/RetroButton'
import { projects } from '../data/projects'
import type { Project } from '../data/types'
import { easeOut } from '../lib/motion'

/** Os botões só aparecem quando o link existe em data/projects.ts */
export function ProjectApp({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion()
  const index = projects.findIndex((p) => p.slug === project.slug)

  return (
    <article className="grid gap-8 p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10 md:p-7">
      <motion.div
        className="min-w-0"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: easeOut, delay: 0.1 }}
      >
        <ProjectPreview project={project} index={index} />
      </motion.div>

      <div className="min-w-0">
        <p className="sys-label text-mute">
          {project.category}
          {project.year ? ` / ${project.year}` : ''}
        </p>
        <h3 className="mt-3 text-title font-bold">{project.name}</h3>
        <p className="mt-4 text-soft">{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-6 space-y-1.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-signal" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {project.technologies.length > 0 && (
          <div className="mt-6">
            <p className="sys-label mb-2 text-mute">Tecnologias</p>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech} className="border-2 border-line px-2.5 py-1 text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.github || project.demo ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.github && (
              <RetroButton href={project.github} external variant={project.demo ? 'secondary' : 'primary'}>
                GitHub
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
              </RetroButton>
            )}
            {project.demo && (
              <RetroButton href={project.demo} external variant="primary">
                Live demo
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
              </RetroButton>
            )}
          </div>
        ) : (
          <p className="sys-label mt-8 text-mute">Link público em breve</p>
        )}
      </div>
    </article>
  )
}
