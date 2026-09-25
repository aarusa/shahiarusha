import { useState } from 'react'
import { Link } from 'react-router-dom'
import { askClone } from './client.js'
import { cloneConfig } from './config.js'
import { site } from '../../content/site.js'
import { useTitle } from '../../lib/hooks.js'

export default function ClonePage() {
  useTitle('?')
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [thinking, setThinking] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const text = message.trim()
    if (!text || thinking) return
    setMessage('')
    setHistory((h) => [...h, { who: 'you', text }])
    setThinking(true)
    try {
      const reply = await askClone(text, history)
      setHistory((h) => [...h, { who: 'me', text: reply }])
    } catch {
      setHistory((h) => [...h, { who: 'me', text: 'something broke. very on brand.' }])
    } finally {
      setThinking(false)
    }
  }

  return (
    <div className="clone wrap">
      <p className="clone__q serif" aria-hidden="true">?</p>

      <div className="clone__body">
        <h1 className="clone__title mono">{cloneConfig.name}</h1>
        <p className="clone__lead serif">
          Eventually, you’ll be able to talk to a version of me here.
        </p>
        <p className="clone__small">
          It will be built from my notes, my experiments and the things I’ve written down since 2017.
          It will probably get things wrong. So do I.
        </p>

        {history.length > 0 && (
          <div className="clone__log mono" role="log" aria-live="polite">
            {history.map((m, i) => (
              <p key={i} className={`is-${m.who}`}>
                <span>{m.who === 'you' ? 'you' : 'arusha?'}</span> {m.text}
              </p>
            ))}
          </div>
        )}
        {thinking && <p className="clone__thinking mono">thinking…</p>}

        <form className="clone__form" onSubmit={submit}>
          <label htmlFor="clone-input" className="sr-only">Ask something</label>
          <input
            id="clone-input"
            className="serif"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ask me something…"
            autoComplete="off"
          />
          <button type="submit" className="mono">ask</button>
        </form>

        <p className="clone__real mono">
          the real one: <a href={`mailto:${site.email}`}>{site.email}</a> · or read the <Link to="/notes">notes</Link>
        </p>
      </div>
    </div>
  )
}
