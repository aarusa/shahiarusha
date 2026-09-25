import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Scribble from '../components/Scribble.jsx'
import { about } from '../content/about.js'
import { site } from '../content/site.js'
import { useTitle } from '../lib/hooks.js'

export default function About() {
  useTitle('About')

  return (
    <div className="page about wrap">
      <header className="about__head">
        <h1 className="page-head__title">ABOUT</h1>
        <p className="about__lead serif">
          Arusha Shahi. Software engineer. Builds products, mostly on her own, sometimes with others.
          Has been trying to understand how things work since roughly 2017.
        </p>
      </header>

      <Reveal as="section" className="about__block about__block--like" aria-labelledby="like">
        <h2 id="like" className="about__label mono">THINGS I LIKE</h2>
        <ul className="about__list">
          {about.like.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </Reveal>

      <Reveal as="section" className="about__block about__block--dunno" aria-labelledby="dunno">
        <h2 id="dunno" className="about__label mono">
          THINGS I DON’T KNOW
          <Scribble kind="squiggle" color="orange" className="about__squiggle" />
        </h2>
        <ul className="about__list serif">
          {about.dontKnow.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </Reveal>

      <Reveal as="section" className="about__block about__block--now" aria-labelledby="now">
        <h2 id="now" className="about__label mono">CURRENTLY</h2>
        <ul className="about__list about__list--now">
          {about.currently.map((l, i) => (
            <li key={l} style={{ '--i': i }}>{l}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="about__block about__block--else" aria-labelledby="else">
        <h2 id="else" className="about__label mono">ELSEWHERE</h2>
        <ul className="about__links mono">
          <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><a href={site.github} target="_blank" rel="noreferrer">github ↗</a></li>
          <li><a href={site.linkedin} target="_blank" rel="noreferrer">linkedin ↗</a></li>
          <li><Link to="/me">a digital version (not yet)</Link></li>
        </ul>
      </Reveal>

      <p className="about__end hand">that’s enough about me. the rest is in the lab.</p>
    </div>
  )
}
