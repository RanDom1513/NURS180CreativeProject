import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { cities } from '../data/cities'
import { CityGallery } from './CityGallery'

describe('CityGallery', () => {
  it('shows the selected photo and requests the next index', async () => {
    const user = userEvent.setup()
    const onPhotoChange = vi.fn()

    render(
      <CityGallery
        city={cities[0]}
        photoIndex={0}
        onPhotoChange={onPhotoChange}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Vancouver' })).toBeInTheDocument()
    expect(screen.getByAltText(/Vancouver travel memory 1/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next photo' }))
    expect(onPhotoChange).toHaveBeenCalledWith(1)
  })

  it('renders a friendly empty state when a city has no photos', () => {
    render(
      <CityGallery
        city={{ ...cities[0], photos: [] }}
        photoIndex={0}
        onPhotoChange={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByText(/waiting for its photographs/i)).toBeInTheDocument()
  })

  it('detects portrait photographs and switches to the uncropped layout', () => {
    render(
      <CityGallery
        city={cities[0]}
        photoIndex={0}
        onPhotoChange={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    const image = screen.getByAltText(/Vancouver travel memory 1/i)
    Object.defineProperty(image, 'naturalWidth', { configurable: true, value: 800 })
    Object.defineProperty(image, 'naturalHeight', { configurable: true, value: 1200 })
    fireEvent.load(image)

    expect(image).toHaveClass('gallery__image--portrait')
  })

  it('does not render description areas when city and photo descriptions are absent', () => {
    const photoWithoutCaption = { ...cities[0].photos[0], caption: undefined }
    const { container } = render(
      <CityGallery
        city={{ ...cities[0], description: undefined, photos: [photoWithoutCaption] }}
        photoIndex={0}
        onPhotoChange={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    expect(container.querySelector('.gallery__description')).not.toBeInTheDocument()
    expect(container.querySelector('.gallery__caption')).not.toBeInTheDocument()
  })
})
