import { cloneConfig } from './config.js'

const NOT_YET = [
  'I’m not here yet. The real one is probably reading a paper about how to build me.',
  'Not yet. Come back later — I might be able to answer that.',
  'I don’t exist yet. Neither did Pricy, once.',
]

let turn = 0

export async function askClone(message, history = []) {
  if (cloneConfig.enabled && cloneConfig.endpoint) {
    const res = await fetch(cloneConfig.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    })
    if (!res.ok) throw new Error('clone unavailable')
    const data = await res.json()
    return data.reply
  }
  await new Promise((r) => setTimeout(r, 900))
  return NOT_YET[turn++ % NOT_YET.length]
}
