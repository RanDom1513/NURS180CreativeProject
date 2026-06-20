import { lazy, Suspense, useState } from 'react'
import './styles.css'
import { CityGallery } from './components/CityGallery'
import { CityNavigation } from './components/CityNavigation'
import { IntroScreen } from './components/IntroScreen'
import { LookingForward } from './components/LookingForward'
import { SelfReflection } from './components/SelfReflection'
import { cities, type City } from './data/cities'
import { siteCopy } from './data/siteCopy'

const GlobeScene = lazy(() =>
  import('./components/GlobeScene').then((module) => ({ default: module.GlobeScene })),
)

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function isMobileViewport() {
  return window.matchMedia?.('(max-width: 800px)').matches ?? false
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [focusVersion, setFocusVersion] = useState(0)
  const [reflectionOpen, setReflectionOpen] = useState(false)
  const [outroOpen, setOutroOpen] = useState(false)
  const [webGLAvailable] = useState(supportsWebGL)

  const enterExperience = () => {
    setEntered(true)
    if (!isMobileViewport()) setNavOpen(true)
  }

  const selectCity = (city: City) => {
    setSelectedCity(city)
    setPhotoIndex(0)
    setReflectionOpen(false)
    setOutroOpen(false)
    setFocusVersion((version) => version + 1)
    if (isMobileViewport()) setNavOpen(false)
  }

  const showReflection = () => {
    setSelectedCity(null)
    setReflectionOpen(true)
    setOutroOpen(false)
    if (isMobileViewport()) setNavOpen(false)
  }

  const showOutro = () => {
    setSelectedCity(null)
    setReflectionOpen(false)
    setOutroOpen(true)
    if (isMobileViewport()) setNavOpen(false)
  }

  if (!entered) return <IntroScreen onEnter={enterExperience} />

  return (
    <main
      className={`app-shell${selectedCity ? ' app-shell--gallery' : ''}${navOpen ? ' app-shell--nav' : ''}`}
    >
      <div className="brand-lockup" aria-hidden={selectedCity ? 'true' : undefined}>
        <span>Around the World</span>
        <i />
        <span>Back to Myself</span>
      </div>

      <CityNavigation
        isOpen={navOpen}
        selectedCity={selectedCity}
        reflectionActive={reflectionOpen}
        outroActive={outroOpen}
        onToggle={() => setNavOpen((open) => !open)}
        onSelectCity={selectCity}
        onShowReflection={showReflection}
        onShowOutro={showOutro}
      />

      <section className="globe-stage" aria-label="World map experience">
        {webGLAvailable ? (
          <Suspense fallback={<div className="globe-loading"><span />Preparing the world…</div>}>
            <GlobeScene
              cities={cities}
              selectedCity={selectedCity}
              focusVersion={focusVersion}
              onSelectCity={selectCity}
            />
          </Suspense>
        ) : (
          <div className="webgl-fallback">
            <span aria-hidden="true">✦</span>
            <h1>{siteCopy.title}</h1>
            <p>The 3D globe is unavailable in this browser, but every city remains accessible from Places.</p>
          </div>
      )}
      </section>

      {!selectedCity && !reflectionOpen && !outroOpen ? (
        <div className="explore-hint">
          <span className="explore-hint__mouse" aria-hidden="true" />
          <span>Drag to explore · Select a light</span>
        </div>
      ) : null}

      <CityGallery
        city={selectedCity}
        photoIndex={photoIndex}
        onPhotoChange={setPhotoIndex}
        onClose={() => setSelectedCity(null)}
      />

      {reflectionOpen ? <SelfReflection onClose={() => setReflectionOpen(false)} /> : null}

      {outroOpen ? <LookingForward onClose={() => setOutroOpen(false)} /> : null}

      <p className="selection-announcer" aria-live="polite">
        {selectedCity ? `${selectedCity.name} selected` : ''}
      </p>
    </main>
  )
}
