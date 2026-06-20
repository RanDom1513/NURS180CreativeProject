import { siteCopy } from '../data/siteCopy'

type SelfReflectionProps = {
  onClose: () => void
}

export function SelfReflection({ onClose }: SelfReflectionProps) {
  return (
    <section
      className="outro-panel reflection-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reflection-title"
    >
      <button
        className="icon-button outro-panel__close"
        type="button"
        aria-label="Close self-reflection"
        onClick={onClose}
      >
        ×
      </button>
      <p className="eyebrow">What these memories taught me</p>
      <h2 id="reflection-title">{siteCopy.reflectionTitle}</h2>
      <div className="reflection-panel__body">
        {siteCopy.reflection.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="outro-panel__symbol" aria-hidden="true">
        <span />
        ✦
        <span />
      </div>
    </section>
  )
}
