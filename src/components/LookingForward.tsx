import { siteCopy } from '../data/siteCopy'

type LookingForwardProps = {
  onClose: () => void
}

export function LookingForward({ onClose }: LookingForwardProps) {
  return (
    <section className="outro-panel" role="dialog" aria-modal="true" aria-labelledby="outro-title">
      <button className="icon-button outro-panel__close" type="button" aria-label="Close reflection" onClick={onClose}>
        ×
      </button>
      <p className="eyebrow">A promise to my future self</p>
      <h2 id="outro-title">{siteCopy.outroTitle}</h2>
      <p>{siteCopy.outro}</p>
      <div className="outro-panel__symbol" aria-hidden="true">
        <span />
        ✦
        <span />
      </div>
    </section>
  )
}
