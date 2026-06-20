import { cities, regions, type City } from '../data/cities'

type CityNavigationProps = {
  isOpen: boolean
  selectedCity: City | null
  outroActive: boolean
  onToggle: () => void
  onSelectCity: (city: City) => void
  onShowOutro: () => void
}

export function CityNavigation({
  isOpen,
  selectedCity,
  outroActive,
  onToggle,
  onSelectCity,
  onShowOutro,
}: CityNavigationProps) {
  return (
    <>
      <button
        className={`nav-toggle${isOpen ? ' nav-toggle--open' : ''}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls="city-navigation"
        onClick={onToggle}
      >
        <span className="nav-toggle__lines" aria-hidden="true"><i /><i /></span>
        <span>{isOpen ? 'Close' : 'Places'}</span>
      </button>

      <button
        className={`nav-backdrop${isOpen ? ' nav-backdrop--visible' : ''}`}
        type="button"
        aria-label="Close city navigation"
        tabIndex={isOpen ? 0 : -1}
        onClick={onToggle}
      />

      <nav
        id="city-navigation"
        className={`city-nav${isOpen ? ' city-nav--open' : ''}`}
        aria-label="City navigation"
      >
        <div className="city-nav__header">
          <p className="eyebrow">Personal atlas</p>
          <p className="city-nav__title">Choose a place</p>
          <p className="city-nav__intro">Each light holds a moment of release.</p>
        </div>

        <div className="city-nav__groups">
          {regions.map((region) => (
            <section
              className="city-group"
              key={region}
              aria-labelledby={`region-${region.toLowerCase().replaceAll(' ', '-')}`}
            >
              <h2 id={`region-${region.toLowerCase().replaceAll(' ', '-')}`}>{region}</h2>
              <ol>
                {cities
                  .filter((city) => city.region === region)
                  .map((city, index) => {
                    const selected = selectedCity?.id === city.id && !outroActive
                    return (
                      <li key={city.id}>
                        <button
                          className={`city-link${selected ? ' city-link--selected' : ''}`}
                          type="button"
                          aria-current={selected ? 'location' : undefined}
                          onClick={() => onSelectCity(city)}
                        >
                          <span className="city-link__number">{String(index + 1).padStart(2, '0')}</span>
                          <span>{city.name}</span>
                          <span className="city-link__dot" aria-hidden="true" />
                        </button>
                      </li>
                    )
                  })}
              </ol>
            </section>
          ))}
        </div>

        <button
          className={`outro-link${outroActive ? ' outro-link--selected' : ''}`}
          type="button"
          onClick={onShowOutro}
        >
          <span>Looking Forward</span>
          <span aria-hidden="true">↗</span>
        </button>
      </nav>
    </>
  )
}
