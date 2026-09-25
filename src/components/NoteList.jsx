import { Link } from 'react-router-dom'
import { CATEGORY_COLOR } from '../content/notes.js'
import { fmtDate } from '../lib/format.js'

export default function NoteList({ notes }) {
  return (
    <ol className="note-list">
      {notes.map((n) => (
        <li key={n.slug}>
          <Link to={`/notes/${n.slug}`} className="note-row" data-cursor="read →">
            <time className="note-row__date mono" dateTime={n.date}>{fmtDate(n.date)}</time>
            <span className="note-row__title serif">{n.title}</span>
            <span className="note-row__cat mono" style={{ '--c': `var(--${CATEGORY_COLOR[n.category]})` }}>
              {n.category}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
