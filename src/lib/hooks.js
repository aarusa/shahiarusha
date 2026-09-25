import { useEffect, useState } from 'react'

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Arusha Shahi` : 'Arusha Shahi — I build things'
  }, [title])
}

export function useInView(ref, rootMargin = '0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function useClock(timeZone) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(now)
}
