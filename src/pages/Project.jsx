import { Link, useParams } from 'react-router-dom'
import Visual from '../components/Visual.jsx'
import Blocks from '../components/Blocks.jsx'
import StatusTag from '../components/StatusTag.jsx'
import NotFound from './NotFound.jsx'
import { projects, getProject } from '../content/projects.js'
import { useTitle } from '../lib/hooks.js'

export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)
  useTitle(project?.title)
  if (!project || project.future) return <NotFound />

  const shown = projects.filter((p) => !p.future)
  const next = shown[(shown.indexOf(project) + 1) % shown.length]

  return (
    <article className="page project" style={{ '--accent': `var(--${project.color})` }}>
      <header className="project__head wrap">
        <p className="mono project__crumb">
          <Link to="/work">work</Link> / {project.slug}
        </p>
        <h1 className="project__title">
          {project.title}
          {project.fullTitle && <span className="project__full serif">{project.fullTitle}</span>}
        </h1>
        <p className="project__desc serif">{project.description}</p>
      </header>

      <div className="project__visual">
        <Visual project={project} ratio="16 / 9" priority />
      </div>

      <div className="project__body wrap">
        <dl className="project__facts mono">
          <div><dt>year</dt><dd>{project.year}</dd></div>
          <div><dt>type</dt><dd>{project.type}</dd></div>
          <div><dt>role</dt><dd>{project.role}</dd></div>
          <div><dt>status</dt><dd><StatusTag status={project.status} /></dd></div>
          {project.technologies.length > 0 && (
            <div><dt>built with</dt><dd>{project.technologies.join(', ')}</dd></div>
          )}
          {(project.links.length > 0 || project.github) && (
            <div>
              <dt>links</dt>
              <dd className="project__links">
                {project.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
                ))}
                {project.github && <a href={project.github} target="_blank" rel="noreferrer">github ↗</a>}
              </dd>
            </div>
          )}
        </dl>

        <div className="project__text blocks">
          <Blocks blocks={project.body} />
          {project.images.slice(1).map((img) => (
            <img key={img.src} src={img.src} alt={img.alt ?? ''} loading="lazy" className="project__img" />
          ))}
        </div>
      </div>

      <nav className="project__next wrap" aria-label="next project">
        <p className="mono">next</p>
        <Link to={`/work/${next.slug}`} data-cursor="let's look at this →">{next.title} →</Link>
      </nav>
    </article>
  )
}
