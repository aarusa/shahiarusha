import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export const NAV = [
  { to: '/work', label: 'WORK' },
  { to: '/lab', label: 'LAB' },
  { to: '/notes', label: 'NOTES' },
  { to: '/about', label: 'ABOUT' },
  { to: '/index', label: 'INDEX' },
]

const DEPTH_COLORS = ['var(--ink)', 'var(--blue)', 'var(--lavender)', 'var(--pink)', 'var(--lime)']

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const bar = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, y / max) : 0
      if (bar.current) {
        bar.current.style.transform = `scaleX(${p})`
        bar.current.style.background = DEPTH_COLORS[Math.min(DEPTH_COLORS.length - 1, Math.floor(p * DEPTH_COLORS.length))]
      }
      setScrolled(y > 8)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160)
        last = y
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cls = ['nav', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open'].filter(Boolean).join(' ')

  return (
    <header className={cls}>
      <div className="nav__inner wrap">
        <Link to="/" className="nav__home" aria-label="Arusha Shahi — home">
          ARUSHA<span className="nav__dot">.</span>SH
        </Link>

        <nav className="nav__links" aria-label="Main">
          {NAV.map((item, i) => (
            <NavLink key={item.to} to={item.to} className="nav__link">
              <span className="nav__n mono" aria-hidden="true">0{i + 1}</span>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/me" className="nav__link nav__link--q" aria-label="Me, digitally (not yet)" data-cursor="not yet →">
            ?
          </NavLink>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__burger" aria-hidden="true" />
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      <span className="nav__bar" ref={bar} aria-hidden="true" />

      <div id="menu" className="menu" hidden={!open}>
        <ol className="menu__list">
          {NAV.map((item, i) => (
            <li key={item.to} style={{ '--i': i }}>
              <span className="mono">0{i + 1}</span>
              <NavLink to={item.to}>{item.label.toLowerCase()}</NavLink>
            </li>
          ))}
          <li style={{ '--i': NAV.length }}>
            <span className="mono">??</span>
            <NavLink to="/me">?</NavLink>
          </li>
        </ol>
        <p className="menu__foot serif">you can always come back.</p>
      </div>
    </header>
  )
}
