import { Link } from 'react-router-dom'
import Visual from './Visual.jsx'
import Reveal from './Reveal.jsx'
import StatusTag from './StatusTag.jsx'
import { pad } from '../lib/format.js'

const RATIO = { lead: '16 / 9', left: '4 / 3', right: '5 / 4', wide: '16 / 9' }

/**
 * layout: 'lead' | 'left' | 'right' | 'wide'
 * Each one places the picture and the text on a different side.
 */
export default function ProjectFeature({ project, index, layout = 'left', delay = 0 }) {
  const href = `/work/${project.slug}`

  return (
    <Reveal
      as="article"
      className={`feat feat--${layout}`}
      delay={delay}
      style={{ '--accent': `var(--${project.color})` }}
    >
      <Link to={href} className="feat__visual" data-cursor="let's look at this →" tabIndex={-1} aria-hidden="true">
        <Visual project={project} ratio={RATIO[layout]} />
        {project.note && <span className="feat__note hand">{project.note}</span>}
      </Link>

      <div className="feat__meta">
        <p className="feat__index mono">
          {pad(index)}
          {layout === 'lead' && <span className="feat__flag">featured</span>}
          {import.meta.env.DEV && project.sample && <span className="feat__sample">sample — replace me</span>}
        </p>
        <h3 className="feat__title">
          <Link to={href}>{project.title}</Link>
        </h3>
        {project.fullTitle && <p className="feat__full serif">{project.fullTitle}</p>}
        <p className="feat__desc">{project.description}</p>
        <p className="feat__line mono">
          <span>{project.year}</span>
          <span>{project.type}</span>
          <StatusTag status={project.status} />
        </p>
        {project.technologies.length > 0 && (
          <p className="feat__tech mono">{project.technologies.join(' · ')}</p>
        )}
        <Link to={href} className="feat__more">
          let’s look at this <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Reveal>
  )
}
