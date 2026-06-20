import { useEffect, useState } from 'react'
import type { City } from '../data/cities'

type PhotoOrientation = 'loading' | 'landscape' | 'portrait' | 'square'

type CityGalleryProps = {
  city: City | null
  photoIndex: number
  onPhotoChange: (index: number) => void
  onClose: () => void
}

export function CityGallery({ city, photoIndex, onPhotoChange, onClose }: CityGalleryProps) {
  const photoCount = city?.photos.length ?? 0
  const [orientation, setOrientation] = useState<PhotoOrientation>('loading')

  const goToPrevious = () => {
    if (!photoCount) return
    onPhotoChange((photoIndex - 1 + photoCount) % photoCount)
  }

  const goToNext = () => {
    if (!photoCount) return
    onPhotoChange((photoIndex + 1) % photoCount)
  }

  useEffect(() => {
    if (!city) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goToPrevious()
      if (event.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  useEffect(() => {
    setOrientation('loading')
  }, [city?.id, photoIndex])

  if (!city) return null

  const currentPhoto = city.photos[photoIndex]
  const isPlaceholder = currentPhoto?.src.includes('/placeholders/')

  return (
    <aside className="gallery" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
      <div className="gallery__header">
        <div>
          <p className="eyebrow">{city.region}</p>
          <h2 id="gallery-title">{city.name}</h2>
        </div>
        <button className="icon-button" type="button" aria-label={`Close ${city.name} gallery`} onClick={onClose}>
          ×
        </button>
      </div>

      {city.description ? <p className="gallery__description">{city.description}</p> : null}

      {currentPhoto ? (
        <>
          <div className={`gallery__image-wrap gallery__image-wrap--${orientation}`}>
            <img
              className={`gallery__image gallery__image--${orientation}`}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              loading="lazy"
              decoding="async"
              onLoad={(event) => {
                const { naturalWidth, naturalHeight } = event.currentTarget
                const ratio = naturalWidth / naturalHeight

                if (ratio > 1.15) setOrientation('landscape')
                else if (ratio < 0.85) setOrientation('portrait')
                else setOrientation('square')
              }}
            />
            {isPlaceholder ? <span className="placeholder-label">Sample placeholder</span> : null}
            <div className="gallery__controls">
              <button type="button" aria-label="Previous photo" onClick={goToPrevious}>←</button>
              <span>{String(photoIndex + 1).padStart(2, '0')} / {String(photoCount).padStart(2, '0')}</span>
              <button type="button" aria-label="Next photo" onClick={goToNext}>→</button>
            </div>
          </div>

          {currentPhoto.caption ? (
            <p className="gallery__caption">{currentPhoto.caption}</p>
          ) : null}

          <div className="gallery__thumbnails" aria-label={`${city.name} photo thumbnails`}>
            {city.photos.map((photo, index) => (
              <button
                className={index === photoIndex ? 'thumbnail thumbnail--selected' : 'thumbnail'}
                type="button"
                key={`${photo.src}-${index}`}
                aria-label={`View photo ${index + 1}`}
                aria-current={index === photoIndex ? 'true' : undefined}
                onClick={() => onPhotoChange(index)}
              >
                <img src={photo.thumbnail} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="gallery-empty">
          <span aria-hidden="true">✦</span>
          <h3>This memory is waiting for its photographs.</h3>
          <p>Add images and short reflections to this city in <code>src/data/cities.ts</code>.</p>
        </div>
      )}
    </aside>
  )
}
