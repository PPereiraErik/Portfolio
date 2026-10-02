import { useEffect, useMemo, useState } from 'react'

export function useLocalTime(timeZone: string) {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone }),
    [timeZone],
  )
  const [time, setTime] = useState(() => formatter.format(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatter.format(new Date())), 15_000)
    return () => window.clearInterval(id)
  }, [formatter])

  return time
}
