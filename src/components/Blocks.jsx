const publicSrc = (src) =>
  src?.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src

export default function Blocks({ blocks = [] }) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case 'h':
        return <h2 key={i} className="blocks__h mono">{b.text}</h2>
      case 'quote':
        return <blockquote key={i} className="blocks__quote serif">{b.text}</blockquote>
      case 'code':
        return (
          <figure key={i} className="blocks__codewrap">
            {(b.lang || b.caption) && (
              <figcaption className="blocks__codehead mono">
                {b.lang && <span>{b.lang}</span>}
                {b.caption && <span>{b.caption}</span>}
              </figcaption>
            )}
            <pre className="blocks__code mono">
              <code>{b.text}</code>
            </pre>
          </figure>
        )
      case 'image':
      case 'screenshot':
        return (
          <figure key={i} className={b.type === 'screenshot' ? 'blocks__figure blocks__shot' : 'blocks__figure'}>
            <img src={publicSrc(b.src)} alt={b.alt ?? ''} width={b.width ?? 960} height={b.height ?? 540} />
            {b.caption && <figcaption className="mono">{b.caption}</figcaption>}
          </figure>
        )
      case 'aside':
        return <aside key={i} className="blocks__aside hand">{b.text}</aside>
      case 'list':
        return (
          <ul key={i} className="blocks__list">
            {b.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        )
      default:
        return <p key={i} className="blocks__p">{b.text}</p>
    }
  })
}
