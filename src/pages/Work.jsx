import ProjectFeature from '../components/ProjectFeature.jsx'
import Archived from '../components/Archived.jsx'
import Reveal from '../components/Reveal.jsx'
import StatusTag from '../components/StatusTag.jsx'
import { projects } from '../content/projects.js'
import { useTitle } from '../lib/hooks.js'

const LAYOUTS = ['lead', 'left', 'right', 'wide']

export default function Work() {
  useTitle('Work')
  const main = projects.filter((p) => !p.archived && !p.future)
  const featured = main.find((p) => p.featured)
  const rest = main.filter((p) => p !== featured)
  const archived = projects.filter((p) => p.archived)
  const future = projects.filter((p) => p.future)

  return (
    <div className="page work-page wrap">
      <header className="page-head">
        <h1 className="page-head__title">WORK</h1>
        <p className="page-head__lead serif">Things I’ve built, and one thing that started it all.</p>
        <p className="page-head__sub mono">{main.length} projects · {archived.length} archived · ? next</p>
      </header>

      {featured && <ProjectFeature project={featured} index={1} layout="lead" />}

      {rest.map((p, i) => (
        <ProjectFeature key={p.slug} project={p} index={i + 2} layout={LAYOUTS[(i + 1) % LAYOUTS.length]} />
      ))}

      {archived.map((p) => (
        <Archived key={p.slug} project={p} />
      ))}

      {future.map((p) => (
        <Reveal as="section" key={p.slug} className="work-next" aria-label="next">
          <div className="work-next__box">
            <p className="mono">{p.year}</p>
            <p className="serif work-next__title">{p.description}</p>
            <StatusTag status={p.status} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}
