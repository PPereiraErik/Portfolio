import { motion, useReducedMotion } from 'framer-motion'
import { PixelArt } from '../components/PixelArt'
import { folderName, projects } from '../data/projects'
import { icons } from '../lib/bitmaps'
import { easeOut } from '../lib/motion'
import { useWindows } from '../system/WindowManager'

export function ProjectsApp() {
  const { open } = useWindows()
  const reduceMotion = useReducedMotion()

  return (
    <div className="p-5 md:p-7">
      <p className="sys-label mb-6 border-b-2 border-line pb-3 text-mute">
        C:\Users\Erik\Projetos <span className="float-right">{projects.length} itens</span>
      </p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {projects.map((project, i) => (
          <motion.li
            key={project.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut, delay: 0.06 + i * 0.05 }}
          >
            <button
              type="button"
              data-cursor="hand"
              onClick={() => open(`project:${project.slug}`)}
              className="group flex h-full w-full items-center gap-4 border-2 border-transparent p-3 text-left outline-none hover:border-line focus-visible:border-signal sm:flex-col sm:text-center"
            >
              <PixelArt
                bitmap={icons.folder}
                scale={4}
                className="transition-transform duration-150 group-hover:-translate-y-0.5"
              />
              <span className="min-w-0">
                <span className="sys-label block px-1 py-0.5 group-hover:bg-paper group-hover:text-ink group-focus-visible:bg-signal group-focus-visible:text-ink">
                  {folderName(project)}
                </span>
                <span className="mt-2 block text-sm leading-snug text-mute">{project.summary}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
