import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react'

export type StaticAppId =
  | 'about'
  | 'projects'
  | 'experience'
  | 'education'
  | 'skills'
  | 'terminal'
  | 'contact'
  | 'secret'

export type AppId = StaticAppId | `project:${string}`

export type WindowState = {
  id: AppId
  /** Ordem de empilhamento: maior = mais à frente */
  z: number
  minimized: boolean
  /** Ordem de abertura, usada na barra de tarefas e no deslocamento em cascata */
  slot: number
}

type State = { windows: WindowState[]; top: number; nextSlot: number }

type Action =
  | { type: 'open'; id: AppId }
  | { type: 'close'; id: AppId }
  | { type: 'minimize'; id: AppId }
  | { type: 'focus'; id: AppId }

function reducer(state: State, action: Action): State {
  const current = state.windows.find((w) => w.id === action.id)

  switch (action.type) {
    case 'open': {
      const top = state.top + 1
      if (current) {
        return {
          ...state,
          top,
          windows: state.windows.map((w) => (w.id === action.id ? { ...w, z: top, minimized: false } : w)),
        }
      }
      return {
        top,
        nextSlot: state.nextSlot + 1,
        windows: [...state.windows, { id: action.id, z: top, minimized: false, slot: state.nextSlot }],
      }
    }
    case 'close':
      return current ? { ...state, windows: state.windows.filter((w) => w.id !== action.id) } : state
    case 'minimize':
      return current
        ? { ...state, windows: state.windows.map((w) => (w.id === action.id ? { ...w, minimized: true } : w)) }
        : state
    case 'focus': {
      if (!current || (current.z === state.top && !current.minimized)) return state
      const top = state.top + 1
      return {
        ...state,
        top,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, z: top, minimized: false } : w)),
      }
    }
  }
}

type WindowManager = {
  windows: WindowState[]
  /** Janela visível mais à frente */
  activeId: AppId | null
  open: (id: AppId) => void
  close: (id: AppId) => void
  minimize: (id: AppId) => void
  focus: (id: AppId) => void
  /** Comportamento da barra de tarefas: abre, restaura, traz para frente ou minimiza */
  toggle: (id: AppId) => void
}

const WindowContext = createContext<WindowManager | null>(null)

export function WindowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { windows: [], top: 10, nextSlot: 0 })

  const activeId = useMemo(() => {
    const visible = state.windows.filter((w) => !w.minimized)
    if (visible.length === 0) return null
    return visible.reduce((a, b) => (b.z > a.z ? b : a)).id
  }, [state.windows])

  const open = useCallback((id: AppId) => dispatch({ type: 'open', id }), [])
  const close = useCallback((id: AppId) => dispatch({ type: 'close', id }), [])
  const minimize = useCallback((id: AppId) => dispatch({ type: 'minimize', id }), [])
  const focus = useCallback((id: AppId) => dispatch({ type: 'focus', id }), [])

  const toggle = useCallback(
    (id: AppId) => {
      const win = state.windows.find((w) => w.id === id)
      if (!win) dispatch({ type: 'open', id })
      else if (win.minimized) dispatch({ type: 'focus', id })
      else if (id === activeId) dispatch({ type: 'minimize', id })
      else dispatch({ type: 'focus', id })
    },
    [state.windows, activeId],
  )

  const value = useMemo(
    () => ({ windows: state.windows, activeId, open, close, minimize, focus, toggle }),
    [state.windows, activeId, open, close, minimize, focus, toggle],
  )

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
}

export function useWindows() {
  const context = useContext(WindowContext)
  if (!context) throw new Error('useWindows precisa estar dentro de <WindowProvider>')
  return context
}
