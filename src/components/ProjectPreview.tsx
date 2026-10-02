import type { Project } from '../data/types'
import { initials } from '../lib/initials'
import { Frame } from './Frame'

const angles = [135, 220, 60]

type ProjectPreviewProps = {
  project: Project
  index: number
}

/**
 * Screenshot do projeto quando existir em data/projects.ts.
 * Enquanto não houver, mostra um preview pontilhado com as iniciais e o resumo.
 */
export function ProjectPreview({ project, index }: ProjectPreviewProps) {
  const angle = angles[index % angles.length]
  const mask = `linear-gradient(${angle}deg, #000 0%, transparent 78%)`

  return (
    <Frame title={`${project.slug}.exe`} bodyClassName="relative aspect-[4/3] overflow-hidden">
      {project.image ? (
        <img
          src={project.image}
          alt={`Tela do projeto ${project.name}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-top"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="dither absolute inset-0"
            style={{ maskImage: mask, WebkitMaskImage: mask }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center font-pixel text-5xl mix-blend-difference sm:text-6xl"
          >
            {initials(project.name)}
          </span>
          <p className="absolute inset-x-0 bottom-0 border-t-2 border-paper bg-ink px-3 py-2 text-sm leading-snug text-soft">
            {project.summary}
          </p>
        </>
      )}
    </Frame>
  )
}
