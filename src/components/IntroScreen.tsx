import { siteCopy } from '../data/siteCopy'

type IntroScreenProps = {
  onEnter: () => void
}

export function IntroScreen({ onEnter }: IntroScreenProps) {
  return (
    <section className="intro-screen" aria-labelledby="intro-title">
      <div className="intro-screen__stars" aria-hidden="true" />
      <div className="intro-screen__content">
        <p className="eyebrow">{siteCopy.eyebrow}</p>
        <h1 id="intro-title">{siteCopy.title}</h1>
        <div className="intro-screen__rule" aria-hidden="true">
          <span />
        </div>
        <p className="intro-screen__copy">{siteCopy.introduction}</p>
        <button className="enter-button" type="button" onClick={onEnter}>
          <span>Enter the journey</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="intro-screen__footnote">Food · Travel · The practice of noticing</p>
    </section>
  )
}
