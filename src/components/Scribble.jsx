const PATHS = {
  circle: {
    viewBox: '0 0 200 80',
    d: 'M104 6C58 3 12 14 8 38c-4 26 52 38 104 35 50-3 84-15 80-37C188 14 140 4 88 9',
  },
  underline: {
    viewBox: '0 0 200 20',
    d: 'M3 12c30-6 62-8 96-5 30 2 58 1 98-6',
  },
  squiggle: {
    viewBox: '0 0 120 30',
    d: 'M3 18c10-14 18 12 28 0s18-14 28 0 18 12 28 0 18-12 30 0',
  },
  arrow: {
    viewBox: '0 0 120 60',
    d: 'M4 10c30 4 70 12 98 38M86 44l17 5-3-18',
  },
  x: {
    viewBox: '0 0 40 40',
    d: 'M6 7c10 9 19 18 29 27M33 6C23 16 14 25 7 34',
  },
}

export default function Scribble({ kind = 'underline', color = 'orange', className = '', width = 3 }) {
  const shape = PATHS[kind]
  return (
    <svg
      className={`scribble scribble--${kind} ${className}`}
      viewBox={shape.viewBox}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d={shape.d} stroke={`var(--${color})`} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
