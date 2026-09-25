export const TONE = {
  BUILDING: 'orange',
  BROKEN: 'pink',
  TESTING: 'lavender',
  CURIOUS: 'blue',
  ABANDONED: 'grey',
  WORKS: 'lime',
  "I DON'T KNOW YET": 'yellow',
  ARCHIVED: 'outline',
}

export default function StatusTag({ status }) {
  if (!status) return null
  const tone = TONE[status] ?? 'grey'
  return <span className={`status status--${tone}`}>{status}</span>
}
