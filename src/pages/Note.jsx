import { Link, useParams } from 'react-router-dom'
import Blocks from '../components/Blocks.jsx'
import NotFound from './NotFound.jsx'
import { notes, getNote, CATEGORY_COLOR } from '../content/notes.js'
import { fmtDate } from '../lib/format.js'
import { useTitle } from '../lib/hooks.js'

export default function Note() {
  const { slug } = useParams()
  const note = getNote(slug)
  useTitle(note?.title)
  if (!note) return <NotFound />

  const ordered = [...notes].sort((a, b) => b.date.localeCompare(a.date))
  const index = ordered.findIndex((n) => n.slug === note.slug)
  const previous = ordered[index + 1]
  const next = ordered[index - 1]
  const color = CATEGORY_COLOR[note.category]

  return (
    <article className={`page note wrap${color === 'blue' ? ' is-dark' : ''}`} style={{ '--c': `var(--${color})` }}>
      <header className="note__head">
        <p className="mono note__meta">
          <Link to="/notes">notes</Link>
          <span>/</span>
          <time dateTime={note.date}>{fmtDate(note.date)}</time>
          <span className="note__cat">{note.category}</span>
        </p>
        <h1 className="note__title serif">{note.title}</h1>
      </header>

      <div className="note__body blocks">
        <Blocks blocks={note.content} />
      </div>

      <footer className="note__foot">
        <p className="note__tags mono">{note.tags.map((t) => `#${t.replaceAll(' ', '-')}`).join('  ')}</p>
        <nav className="note__nav" aria-label="More notes">
          {previous ? (
            <Link to={`/notes/${previous.slug}`} className="note__nav-link note__nav-link--prev">
              <span className="mono">← previous</span>
              <span className="note__nav-title">{previous.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/notes/${next.slug}`} className="note__nav-link note__nav-link--next">
              <span className="mono">next →</span>
              <span className="note__nav-title">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </footer>
    </article>
  )
}
