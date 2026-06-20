import { render, screen } from '@testing-library/react'
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
    expect(screen.getByAltText(/Vancouver: Scenic travel photograph placeholder/i)).toBeInTheDocument()

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
})
