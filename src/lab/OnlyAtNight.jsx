import { useEffect, useState } from 'react'

const isNight = (d) => d.getHours() >= 21 || d.getHours() < 5

export default function OnlyAtNight() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!isNight(now)) {
    const next = new Date(now)
    next.setHours(21, 0, 0, 0)
    const mins = Math.max(0, Math.round((next - now) / 60000))
    return (
      <div className="night night--day">
        <p className="serif">It’s daytime.</p>
        <p className="mono">come back in {Math.floor(mins / 60)}h {mins % 60}m. (your time.)</p>
      </div>
    )
  }

  return (
    <div className="night night--on">
      <p className="serif">You’re up late too.</p>
      <p className="mono">most of the things on this site were built around this time.</p>
      <p className="mono">drink some water. then go build something small.</p>
    </div>
  )
}
