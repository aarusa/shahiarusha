import { Link } from 'react-router-dom'
import { site } from '../content/site.js'
import { useClock } from '../lib/hooks.js'
import { fmtDate } from '../lib/format.js'
import { NAV } from './Nav.jsx'

export default function Footer() {
  const time = useClock(site.timezone)

  return (
    <footer className="footer wrap">
      <div className="footer__grid">
        <div className="footer__say">
          <p className="serif footer__line">If something here made you curious, say hi.</p>
          <a className="footer__email" href={`mailto:${site.email}`} data-cursor="write to me →">
            {site.email}
          </a>
        </div>

        <ul className="footer__links mono">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link to={n.to}>{n.label}</Link>
            </li>
          ))}
        </ul>

        <ul className="footer__links mono">
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          </li>
          <li>
            <Link to="/me">?</Link>
          </li>
        </ul>

        <dl className="footer__meta mono">
          <div>
            <dt>it’s {time} in {site.city}</dt>
            <dd>{isAwake(time) ? 'probably awake' : 'probably asleep'}</dd>
          </div>
          <div>
            <dt>site updated</dt>
            <dd>{fmtDate(site.lastUpdated)}</dd>
          </div>
          <div>
            <dt>this website</dt>
            <dd>always inprogress</dd>
          </div>
        </dl>
      </div>
      <p className="footer__sign mono">
        © {new Date().getFullYear()} {site.name.toUpperCase()}.
      </p>
    </footer>
  )
}

function isAwake(hhmm) {
  const h = Number(hhmm.slice(0, 2))
  return h >= 7 && h < 24
}
