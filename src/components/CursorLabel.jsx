import { useEffect, useRef, useState } from 'react'

export default function CursorLabel() {
  const ref = useRef(null)
  const [label, setLabel] = useState('')
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const move = (e) => {
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX + 18}px, ${e.clientY + 14}px, 0)`
      setOn(Boolean(target))
      if (target) setLabel(target.dataset.cursor)
    }
    const hide = () => setOn(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('scroll', hide, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('scroll', hide)
    }
  }, [])

  return (
    <div ref={ref} className={`cursor-label${on ? ' is-on' : ''}`} aria-hidden="true">
      {label}
    </div>
  )
}
