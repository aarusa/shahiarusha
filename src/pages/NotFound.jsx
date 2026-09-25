import { Link } from 'react-router-dom'
import Scribble from '../components/Scribble.jsx'
import { useTitle } from '../lib/hooks.js'

export default function NotFound() {
  useTitle('404')
  return (
    <div className="page lost wrap">
      <p className="lost__code mono">404</p>
      <h1 className="lost__title serif">
        welp. this doesn’t exist.
        <Scribble kind="x" color="pink" className="lost__x" />
      </h1>
      <p className="lost__small mono">maybe it did once. maybe it will later.</p>
      <p className="lost__back mono">
        <Link to="/">← back to somewhere real</Link>
      </p>
    </div>
  )
}
