import { useEffect, useRef, useState } from 'react'

const RULES = [
  [/\b(hi|hello|hey|yo)\b/i, 'hello. i am pricy. i find prices. (i am a list of if-statements.)'],
  [/\b(price|cost|cheap|cheapest|\$|buy)\b/i, 'i would search 3 websites for that. in 2018 i would also have crashed.'],
  [/\b(neural|network|ai|machine learning|ml)\b/i, 'i was supposed to be a neural network. i am regex. we don’t talk about it.'],
  [/\b(who|made|built|arusha)\b/i, 'arusha, at 3am, reading stack overflow.'],
  [/how.*(work|do you)/i, 'honestly? pattern matching. that’s the whole secret.'],
  [/\b(thanks|thank you|bye)\b/i, 'you’re welcome. i hope you find cheap headphones.'],
  [/\b(chatgpt|llm|gpt|claude)\b/i, 'i have heard of them. we are not the same.'],
]

const FALLBACK = [
  'sorry, I didn’t get that.',
  'can you rephrase that? i only know about 14 words.',
  'error: intent not found. (this was my most common reply.)',
]

function reply(text, misses) {
  const hit = RULES.find(([re]) => re.test(text))
  return hit ? hit[1] : FALLBACK[misses % FALLBACK.length]
}

export default function PricyAgain() {
  const [log, setLog] = useState([{ who: 'pricy', text: 'hi! what are you looking for today?' }])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const misses = useRef(0)
  const end = useRef(null)

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest' })
  }, [log, thinking])

  const send = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || thinking) return
    setInput('')
    setLog((l) => [...l, { who: 'you', text }])
    setThinking(true)
    const answer = reply(text, misses.current)
    if (FALLBACK.includes(answer)) misses.current++
    setTimeout(() => {
      setLog((l) => [...l, { who: 'pricy', text: answer }])
      setThinking(false)
    }, 700 + Math.random() * 600)
  }

  return (
    <div className="pricy-again">
      <div className="pricy-again__log mono" role="log" aria-live="polite">
        {log.map((m, i) => (
          <p key={i} className={`pricy-again__msg is-${m.who}`}>
            <span>{m.who === 'you' ? '>' : 'PRICY:'}</span> {m.text}
          </p>
        ))}
        {thinking && <p className="pricy-again__msg is-pricy is-thinking">PRICY: thinking…</p>}
        <span ref={end} />
      </div>
      <form className="pricy-again__form" onSubmit={send}>
        <label htmlFor="pricy-input" className="sr-only">Say something to Pricy</label>
        <span className="mono" aria-hidden="true">&gt;</span>
        <input
          id="pricy-input"
          className="mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="say something. it's 2018."
          autoComplete="off"
        />
        <button type="submit" className="mono">send</button>
      </form>
    </div>
  )
}
