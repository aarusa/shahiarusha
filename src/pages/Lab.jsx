import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import LabItem from '../components/LabItem.jsx'
import Scribble from '../components/Scribble.jsx'
import StatusTag from '../components/StatusTag.jsx'
import { STATUSES, liveExperiments } from '../content/experiments.js'
import { useTitle } from '../lib/hooks.js'

export default function Lab() {
  useTitle('Lab')
  const [filter, setFilter] = useState('ALL')
  const live = useMemo(liveExperiments, [])
  const shown = filter === 'ALL' ? live : live.filter((e) => e.status === filter)
  const counts = useMemo(
    () => Object.fromEntries(STATUSES.map((s) => [s, live.filter((e) => e.status === s).length])),
    [live],
  )

  return (
    <div className="page lab-page wrap">
      <header className="lab-page__head">
        <h1 className="page-head__title">LAB</h1>
        <p className="lab-page__serif serif">
          things I was{' '}
          <span className="lab-page__curious">
            curious
            <Scribble kind="circle" color="lime" className="lab-page__circle" />
          </span>{' '}
          about
        </p>

        <div className="lab-page__about">
          <p>
            Every entry here is one small experiment: a question, what I tried, and what happened. Most took an
            afternoon or a weekend. Some are broken. All of them taught me something.
          </p>
          <p className="mono lab-page__rule">
            thoughts without code go in <Link to="/notes">notes</Link> · finished things go in <Link to="/work">work</Link>
          </p>
        </div>
      </header>

      <div className="lab-filter mono" role="group" aria-label="filter by status">
        <button type="button" className="lab-filter__btn" aria-pressed={filter === 'ALL'} onClick={() => setFilter('ALL')}>
          all <sup>{live.length}</sup>
        </button>
        {STATUSES.filter((s) => counts[s] > 0).map((s) => (
          <button
            key={s}
            type="button"
            className="lab-filter__btn"
            aria-pressed={filter === s}
            onClick={() => setFilter(s)}
          >
            <StatusTag status={s} /> <sup>{counts[s]}</sup>
          </button>
        ))}
      </div>

      <div className="desk desk--full">
        {shown.length === 0 ? (
          <p className="empty serif">Nothing here yet.</p>
        ) : (
          shown.map((e) => <LabItem key={e.id} exp={e} />)
        )}
      </div>
    </div>
  )
}
