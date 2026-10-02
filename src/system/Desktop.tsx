import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { PixelArt } from '../components/PixelArt'
import { StatusDot } from '../components/StatusDot'
import { availability, profile } from '../data/profile'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { easeOut } from '../lib/motion'
import { AppWindow } from './AppWindow'
import { desktopItems, getAppConfig } from './registry'
import { Taskbar } from './Taskbar'
import { Wallpaper } from './Wallpaper'
import { useWindows } from './WindowManager'

export function Desktop({ ready }: { ready: boolean }) {
  const { windows, activeId } = useWindows()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const boundsRef = useRef<HTMLElement>(null)

  return (
    <div className="safe-shell fixed inset-0 flex h-dvh flex-col overflow-hidden bg-ink">
      <main ref={boundsRef} className="relative isolate min-h-0 flex-1">
        <Wallpaper />
        <DesktopSurface ready={ready} />
        <AnimatePresence>
          {windows.map((win) => {
            const config = getAppConfig(win.id)
            if (!config) return null
            return (
              <AppWindow
                key={win.id}
                win={win}
                config={config}
                active={win.id === activeId}
                boundsRef={boundsRef}
                isDesktop={isDesktop}
              />
            )
          })}
        </AnimatePresence>
      </main>
      <Taskbar />
    </div>
  )
}

/** Ícones, identidade e status. No celular vira uma tela inicial rolável. */
function DesktopSurface({ ready }: { ready: boolean }) {
  const { open, windows } = useWindows()
  const reduceMotion = useReducedMotion()
  const openIds = new Set(windows.map((w) => w.id))

  return (
    <div className="os-scroll absolute inset-0 overflow-y-auto md:overflow-hidden">
      <div className="flex min-h-full flex-col gap-10 p-5 md:block md:h-full md:p-6">
        <motion.header
          className="order-1 md:absolute md:bottom-8 md:right-8 md:max-w-[min(34rem,45%)] md:text-right"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.15 }}
        >
          <p className="sys-label mb-3 text-mute">C:\Users\Erik</p>
          <h1 className="text-display font-extrabold [font-stretch:112%]">
            Erik
            <br />
            Pinheiro
          </h1>
          <p className="mt-4 text-lead font-semibold">{profile.headline}</p>
          <p className="mt-1 text-soft">{profile.focus.join(' • ')}</p>
        </motion.header>

        <div className="order-2 md:absolute md:right-6 md:top-6 md:w-72">
          <div className="border-2 border-paper bg-ink/85">
            <p className="sys-label border-b-2 border-paper px-2 py-1.5 text-mute">STATUS.SYS</p>
            <div className="px-3 py-3">
              <p className="flex items-center gap-2.5 font-semibold">
                <StatusDot />
                {availability.label}
              </p>
              <p className="mt-1 text-sm text-soft">{availability.roles.join(', ')}</p>
            </div>
          </div>
        </div>

        <nav id="desktop-icons" aria-label="Área de trabalho" className="order-3 md:h-full">
          <ul className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4 md:flex md:h-full md:w-max md:flex-col md:flex-wrap md:content-start md:gap-1">
            {desktopItems.map((item, i) => (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.35, ease: easeOut, delay: 0.05 + i * 0.04 }}
              >
                <button
                  type="button"
                  data-cursor="hand"
                  onClick={() => open(item.id)}
                  className="group flex w-full flex-col items-center gap-2 p-2 text-center outline-none md:w-24"
                >
                  <span className="relative grid size-16 place-items-center border-2 border-transparent transition-colors group-hover:border-line group-hover:bg-ink/70 group-focus-visible:border-signal">
                    <PixelArt
                      bitmap={item.icon}
                      scale={3}
                      className="transition-transform duration-150 group-hover:-translate-y-0.5"
                    />
                    {openIds.has(item.id) && (
                      <span aria-hidden="true" className="absolute -bottom-1 size-1.5 bg-signal" />
                    )}
                  </span>
                  <span className="sys-label px-1 py-0.5 group-hover:bg-paper group-hover:text-ink group-focus-visible:bg-signal group-focus-visible:text-ink">
                    {item.label}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
