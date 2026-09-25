import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

const LINES = [
  { kind: 'cmd', text: '$ python pricy.py' },
  { kind: 'in', text: 'hello' },
  { kind: 'out', text: 'hi! what are you looking for today?' },
  { kind: 'in', text: 'cheapest headphones under $100' },
  { kind: 'out', text: 'searching 3 websites...' },
  { kind: 'out', text: 'sorry, I didn’t get that.' },
]

export default function Archived({ project }) {
  const href = `/work/${project.slug}`
  return (
    <Reveal as="section" className="archive" aria-labelledby="archived-title">
      <p className="archive__kicker mono">from the archive · python · {project.year}</p>

      <div className="archive__grid">
        <div className="term" aria-label="Pricy running in a Python terminal">
          <p className="term__bar mono">
            <span className="term__dot" aria-hidden="true" />
            python — pricy.py
          </p>
          <div className="term__body mono">
            {LINES.map((line, i) => (
              <p key={i} className={`term__line is-${line.kind}`}>
                {line.kind === 'in' && <span className="term__prompt" aria-hidden="true">&gt;&gt;&gt; </span>}
                {line.text}
              </p>
            ))}
            <p className="term__line is-in">
              <span className="term__prompt" aria-hidden="true">&gt;&gt;&gt; </span>
              <span className="term__caret" aria-hidden="true">_</span>
            </p>
          </div>
        </div>

        <div className="archive__meta">
          <h3 id="archived-title" className="archive__title">
            <Link to={href}>{project.title}</Link>
            <span className="mono">{project.year}</span>
          </h3>
          <p className="archive__desc">{project.description}</p>
          <p className="archive__line serif">
            A Python script, a terminal, and a lot of nights trying to understand how a chatbot could mean anything at all.
          </p>
          <Link to={href} className="archive__more">read how it started →</Link>
        </div>
      </div>
    </Reveal>
  )
}
