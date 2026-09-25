import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Archived from '../components/Archived.jsx'
import ProjectFeature from '../components/ProjectFeature.jsx'
import LabItem from '../components/LabItem.jsx'
import NoteList from '../components/NoteList.jsx'
import { projects } from '../content/projects.js'
import { deskSample } from '../content/experiments.js'
import { notes } from '../content/notes.js'
import { site } from '../content/site.js'
import { useTitle } from '../lib/hooks.js'

const Letters = ({ word, offset = 0 }) =>
  [...word].map((ch, i) => (
    <span key={i} className="hero__ch" style={{ '--d': `${(offset + i) * 45}ms` }}>
      {ch}
    </span>
  ))

export default function Home() {
  useTitle()
  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => p.home && !p.featured).slice(0, 2)
  const origin = projects.find((p) => p.archived)
  const desk = deskSample()
  const sides = ['left', 'right']

  return (
    <>
      <section className="hero wrap" aria-label="Arusha Shahi">
        <h1 className="hero__name" aria-label="Arusha Shahi">
          <span className="hero__word" aria-hidden="true"><Letters word="ARUSHA" /></span>
          <span className="hero__word hero__word--2" aria-hidden="true"><Letters word="SHAHI" offset={6} /></span>
        </h1>

        <div className="hero__claim">
          <p className="hero__build">I BUILD THINGS.</p>
          <p className="hero__sub mono">software / AI / products</p>
        </div>

        <dl className="hero__meta mono">
          <div>
            <dt>archive</dt>
            <dd>2017 — now</dd>
          </div>
          <div>
            <dt>currently</dt>
            <dd>{site.currently}</dd>
          </div>
          <div>
            <dt>status</dt>
            <dd>still becoming</dd>
          </div>
        </dl>

        <a href="#work-title" className="hero__scroll mono" aria-label="Scroll down">
          scroll <span aria-hidden="true">↓</span>
        </a>
        <span className="hero__mark" aria-hidden="true" />
      </section>

      <section className="work-sec wrap" aria-labelledby="work-title">
        <header className="sec-head">
          <p className="mono sec-head__n">01</p>
          <h2 id="work-title" className="sec-head__title">WORK</h2>
          <p className="mono sec-head__aside">things I’ve built, and the one that started it</p>
        </header>

        {featured && <ProjectFeature project={featured} index={1} layout="lead" />}

        {others.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} index={i + 2} layout={sides[i]} delay={80} />
        ))}

        {origin && <Archived project={origin} />}

        <p className="sec-more mono">
          <Link to="/work">all the work →</Link>
        </p>
      </section>

      <section className="lab-sec wrap" aria-labelledby="lab-title">
        <header className="sec-head">
          <p className="mono sec-head__n">02</p>
          <h2 id="lab-title" className="sec-head__title">LAB</h2>
          <p className="serif sec-head__serif">small things I built to answer a question.</p>
        </header>

        <Reveal className="desk desk--preview">
          {desk.map((e) => (
            <LabItem key={e.id} exp={e} />
          ))}
        </Reveal>

        <p className="sec-more mono">
          <Link to="/lab">the whole desk — some of it broken →</Link>
        </p>
      </section>

      <section className="notes-sec wrap" aria-labelledby="notes-title">
        <header className="sec-head">
          <p className="mono sec-head__n">03</p>
          <h2 id="notes-title" className="sec-head__title">NOTES</h2>
          <p className="mono sec-head__aside">written down so I stop thinking about it</p>
        </header>
        <NoteList notes={notes.slice(0, 4)} />
        <p className="sec-more mono">
          <Link to="/notes">the whole notebook →</Link>
        </p>
      </section>

      <section className="tease wrap" aria-label="something that doesn't exist yet">
        <Link to="/me" className="tease__q serif" data-cursor="not yet →" aria-label="Me, digitally — not yet">
          ?
        </Link>
        <p className="tease__small mono">something will live here eventually.</p>
      </section>
    </>
  )
}
