import { Link } from 'react-router-dom'
import StatusTag, { TONE } from './StatusTag.jsx'
import { variantOf } from '../content/experiments.js'
import { pad, hash } from '../lib/format.js'

export default function LabItem({ exp }) {
  const variant = variantOf(exp)
  const tilt = (((hash(`${exp.id}${exp.title}`) % 7) - 3) * 0.35).toFixed(2)
  const classes = [
    'lab-item',
    `lab-item--${variant}`,
    `lab-item--${exp.size ?? 'm'}`,
    exp.color === 'blue' && 'is-dark',
    exp.color && TONE[exp.status] === exp.color && 'is-clash',
  ].filter(Boolean).join(' ')

  return (
    <article
      className={classes}
      style={{ '--r': `${tilt}deg`, '--c': exp.color ? `var(--${exp.color})` : undefined }}
      data-cursor="open →"
    >
      <header className="lab-item__head mono">
        <span>EXP {pad(exp.id)}</span>
        <StatusTag status={exp.status} />
      </header>

      {exp.duration && <p className="lab-item__duration mono">{exp.duration}</p>}

      <h3 className="lab-item__title">
        <Link to={`/lab/${exp.slug}`} className="lab-item__link">{exp.title}</Link>
      </h3>

      {exp.description && <p className="lab-item__desc">{exp.description}</p>}

      {exp.code && (
        <pre className="lab-item__code mono">
          <code>{exp.code.text}</code>
        </pre>
      )}

      {exp.output && <pre className="lab-item__output mono">{exp.output}</pre>}

      <footer className="lab-item__foot mono">
        <span>#{exp.type}</span>
        {exp.note && <span className="lab-item__hand hand">{exp.note}</span>}
      </footer>
    </article>
  )
}
