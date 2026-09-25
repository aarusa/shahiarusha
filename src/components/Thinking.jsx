export default function Thinking({ className = '' }) {
  return (
    <p className={`thinking mono ${className}`} role="status" aria-live="polite">
      <s aria-hidden="true">loading</s> thinking
      <span className="thinking__dots" aria-hidden="true">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </p>
  )
}
