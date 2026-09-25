import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusTag from '../components/StatusTag.jsx'
import Thinking from '../components/Thinking.jsx'
import NotFound from './NotFound.jsx'
import { getExperiment, isExpired, liveExperiments } from '../content/experiments.js'
import { getLivePage } from '../lab/registry.js'
import { pad, fmtDate } from '../lib/format.js'
import { useTitle } from '../lib/hooks.js'

export default function Experiment() {
  const { slug } = useParams()
  const exp = getExperiment(slug)
  const Live = getLivePage(slug)
  useTitle(exp ? `Experiment ${pad(exp.id)}` : undefined)

  if (!exp) return <NotFound />

  const all = liveExperiments()
  const idx = all.indexOf(exp)
  const next = all[(idx + 1) % all.length]
  const expired = isExpired(exp)
  const links = [
    exp.demo && { label: 'demo', href: exp.demo },
    exp.video && { label: 'video', href: exp.video },
    exp.github && { label: 'github', href: exp.github },
  ].filter(Boolean)
  const hasDetail = exp.tried || exp.learned || exp.code || exp.output || exp.image || Live

  return (
    <article className="page experiment wrap" style={{ '--c': exp.color ? `var(--${exp.color})` : 'var(--lime)' }}>
      <header className="experiment__head">
        <p className="mono experiment__crumb">
          <Link to="/lab">lab</Link> / EXPERIMENT {pad(exp.id)} · {fmtDate(exp.date)}
        </p>
        <h1 className="experiment__title serif">{exp.title}</h1>
        <p className="experiment__meta mono">
          <StatusTag status={exp.status} />
          {exp.duration && <span>{exp.duration}</span>}
          <span>#{exp.type}</span>
        </p>
      </header>

      <div className="experiment__grid">
        <dl className="experiment__log">
          {exp.description && (
            <div>
              <dt className="mono">in short</dt>
              <dd>{exp.description}</dd>
            </div>
          )}
          {exp.tried && (
            <div>
              <dt className="mono">what I tried</dt>
              <dd>{exp.tried}</dd>
            </div>
          )}
          {exp.learned && (
            <div>
              <dt className="mono">what I learned</dt>
              <dd className="serif experiment__learned">{exp.learned}</dd>
            </div>
          )}
          {links.length > 0 && (
            <div>
              <dt className="mono">links</dt>
              <dd className="experiment__links mono">
                {links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer">[{l.label}] ↗</a>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <div className="experiment__stage">
          {expired ? (
            <p className="empty serif">This one’s gone. It was only meant to last a while.</p>
          ) : (
            <>
              {Live && (
                <Suspense fallback={<Thinking />}>
                  <Live />
                </Suspense>
              )}
              {exp.image && <img src={exp.image.src} alt={exp.image.alt ?? ''} className="experiment__img" />}
              {exp.code && (
                <pre className="blocks__code mono" tabIndex={0} aria-label={`${exp.code.lang ?? 'code'} snippet`}>
                  <code>{exp.code.text}</code>
                </pre>
              )}
              {exp.output && (
                <pre className="experiment__output mono" tabIndex={0} aria-label="output">{exp.output}</pre>
              )}
              {!hasDetail && <p className="experiment__small hand">that’s all there is. it was a small one.</p>}
            </>
          )}
          {exp.note && !expired && <p className="experiment__note hand">{exp.note}</p>}
        </div>
      </div>

      {exp.expires && !expired && (
        <p className="experiment__expires mono">temporary · disappears after {fmtDate(exp.expires)}</p>
      )}

      {next && next !== exp && (
        <nav className="experiment__next mono" aria-label="next experiment">
          <Link to="/lab">← back to the desk</Link>
          <Link to={`/lab/${next.slug}`}>next: EXP {pad(next.id)} →</Link>
        </nav>
      )}
    </article>
  )
}
