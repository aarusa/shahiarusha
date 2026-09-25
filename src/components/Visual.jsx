/**
 * Placeholder compositions until real screenshots exist. When a project has
 * `images` or `videos`, those are shown instead.
 */
export default function Visual({ project, ratio = '4 / 3', priority = false }) {
  const video = project.videos?.[0]
  const image = project.images?.[0]

  if (video) {
    return (
      <div className="vis" style={{ aspectRatio: ratio }}>
        <video className="vis__media" src={video.src} poster={video.poster} autoPlay muted loop playsInline />
      </div>
    )
  }
  if (image) {
    return (
      <div className="vis" style={{ aspectRatio: ratio }}>
        <img className="vis__media" src={image.src} alt={image.alt ?? ''} loading={priority ? 'eager' : 'lazy'} />
      </div>
    )
  }

  const Comp = COMPOSITIONS[project.visual] ?? Next
  return (
    <div className={`vis vis--${project.visual}`} style={{ aspectRatio: ratio }} role="img" aria-label={`${project.title}, abstracted`}>
      <Comp />
    </div>
  )
}

function Pupsplash() {
  return (
    <>
      <span className="vis-pup__blob" />
      <span className="vis-pup__drop vis-pup__drop--a" />
      <span className="vis-pup__drop vis-pup__drop--b" />
      <span className="vis-pup__drop vis-pup__drop--c" />
      <span className="vis__caption mono">fig. 1 — a very wet dog, abstracted</span>
    </>
  )
}

function Meal() {
  return (
    <>
      <span className="vis-meal__plate" />
      <span className="vis-meal__yolk" />
      <ul className="vis-meal__stats mono">
        <li>540 kcal</li>
        <li>2.1 L water</li>
        <li>3 items used</li>
      </ul>
      <span className="vis__caption mono">pantry: eggs, rice, spinach</span>
    </>
  )
}

function SmartHire() {
  const ranked = [
    ['014', '94'],
    ['087', '89'],
    ['131', '83'],
  ]
  return (
    <>
      <div className="vis-hire__pile">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="vis-hire__sheet" style={{ '--i': i }}>
            <i /><i /><i /><i />
          </span>
        ))}
      </div>
      <ul className="vis-hire__rank mono">
        {ranked.map(([id, score]) => (
          <li key={id} style={{ '--s': `${score}%` }}>
            <span>{id}</span>
            <span>{score}</span>
          </li>
        ))}
      </ul>
      <span className="vis__caption mono">top 3 of 214 resumes</span>
    </>
  )
}

const RECALL_HITS = new Set([9, 14, 22, 31])

function Recall() {
  return (
    <>
      <div className="vis-recall">
        {Array.from({ length: 40 }, (_, i) => (
          <span key={i} className={RECALL_HITS.has(i) ? 'is-hit' : ''} style={{ '--i': i }} />
        ))}
      </div>
      <span className="vis__caption mono">4 of 1,208 notes · with sources</span>
    </>
  )
}

function Pricy() {
  return (
    <div className="vis-pricy mono">
      <p>&gt; hello</p>
      <p>PRICY: hi! what are you looking for today?</p>
      <p>&gt; cheapest headphones under $100</p>
      <p>PRICY: searching 3 websites…</p>
      <p>PRICY: sorry, I didn’t get that.</p>
      <p className="vis-pricy__cursor">&gt; _</p>
    </div>
  )
}

function Next() {
  return (
    <div className="vis-next">
      <span className="serif">?</span>
    </div>
  )
}

const COMPOSITIONS = { pupsplash: Pupsplash, meal: Meal, smarthire: SmartHire, recall: Recall, pricy: Pricy, next: Next }
