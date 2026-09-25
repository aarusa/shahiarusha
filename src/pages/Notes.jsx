import { useState } from 'react'
import NoteList from '../components/NoteList.jsx'
import { notes } from '../content/notes.js'
import { useTitle } from '../lib/hooks.js'

export default function Notes() {
  useTitle('Notes')
  const [tag, setTag] = useState(null)
  const categories = [...new Set(notes.map((n) => n.category))]
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date))
  const shown = tag ? sorted.filter((n) => n.category === tag) : sorted
  const years = [...new Set(shown.map((n) => n.date.slice(0, 4)))]

  return (
    <div className="page notes-page">
      <header className="page-head wrap">
        <h1 className="page-head__title">NOTES</h1>
        <p className="page-head__lead serif">Like a blog, but with less pressure to be finished.</p>
        <p className="page-head__sub mono">technical things, personal things, and things I can’t categorise</p>
      </header>

      <div className="lab-filter wrap mono" role="group" aria-label="filter by category">
        <button type="button" className="lab-filter__btn" aria-pressed={!tag} onClick={() => setTag(null)}>
          everything
        </button>
        {categories.map((c) => (
          <button key={c} type="button" className="lab-filter__btn" aria-pressed={tag === c} onClick={() => setTag(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="wrap notes-page__list">
        {years.length === 0 && <p className="empty serif">Nothing here yet.</p>}
        {years.map((y) => (
          <section key={y} className="notes-year" aria-label={y}>
            <h2 className="notes-year__y mono">{y}</h2>
            <NoteList notes={shown.filter((n) => n.date.startsWith(y))} />
          </section>
        ))}
      </div>
    </div>
  )
}
