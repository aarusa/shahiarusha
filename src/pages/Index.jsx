import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusTag from '../components/StatusTag.jsx'
import { projects } from '../content/projects.js'
import { experiments, isExpired } from '../content/experiments.js'
import { notes } from '../content/notes.js'
import { pad, yearOf } from '../lib/format.js'
import { useTitle } from '../lib/hooks.js'

function buildArchive() {
  const rows = [
    ...projects
      .filter((p) => !p.future)
      .map((p) => ({ key: `w-${p.slug}`, year: yearOf(p.year), kind: 'work', title: p.title, status: p.status, to: `/work/${p.slug}`, sort: `${yearOf(p.year)}` })),
    ...experiments
      .filter((e) => !isExpired(e))
      .map((e) => ({
        key: `l-${e.id}`,
        year: yearOf(e.date),
        kind: 'lab',
        title: `${pad(e.id)} — ${e.title}`,
        status: e.status,
        to: `/lab/${e.slug}`,
        sort: e.date,
      })),
    ...notes.map((n) => ({ key: `n-${n.slug}`, year: yearOf(n.date), kind: 'note', title: n.title, to: `/notes/${n.slug}`, sort: n.date })),
  ]
  return rows.sort((a, b) => b.sort.localeCompare(a.sort))
}

export default function Index() {
  useTitle('Index')
  const archive = useMemo(buildArchive, [])
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const shown = query
    ? archive.filter((r) => `${r.title} ${r.kind} ${r.year} ${r.status ?? ''}`.toLowerCase().includes(query))
    : archive

  return (
    <div className="page index-page wrap">
      <header className="page-head index-page__head">
        <h1 className="page-head__title">INDEX</h1>
        <p className="page-head__sub mono">everything in the archive, newest first · {archive.length} entries</p>
      </header>

      <label className="index-search">
        <span className="sr-only">Search the archive</span>
        <input
          type="search"
          className="mono"
          placeholder="search the archive…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>

      {shown.length === 0 ? (
        <p className="empty serif">Nothing here yet.</p>
      ) : (
        <table className="index-table">
          <thead className="mono">
            <tr>
              <th scope="col">year</th>
              <th scope="col">kind</th>
              <th scope="col">title</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.key} className={`is-${r.kind}`}>
                <td className="mono">{r.year}</td>
                <td className="mono index-table__kind">{r.kind}</td>
                <td className="index-table__title">
                  <Link to={r.to}>{r.title}</Link>
                </td>
                <td>{r.status && <StatusTag status={r.status} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
