import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { cities } from '../data/cities'
import { CityNavigation } from './CityNavigation'

describe('CityNavigation', () => {
  it('groups cities and sends the selected city to the shared handler', async () => {
    const user = userEvent.setup()
    const onSelectCity = vi.fn()

    render(
      <CityNavigation
        isOpen
        selectedCity={null}
        outroActive={false}
        onToggle={vi.fn()}
        onSelectCity={onSelectCity}
        onShowOutro={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: 'North America' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'China' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /hangzhou/i }))
    expect(onSelectCity).toHaveBeenCalledWith(cities.find((city) => city.id === 'hangzhou'))
  })

  it('marks the current city and exposes the closing reflection', () => {
    const vancouver = cities[0]

    render(
      <CityNavigation
        isOpen
        selectedCity={vancouver}
        outroActive={false}
        onToggle={vi.fn()}
        onSelectCity={vi.fn()}
        onShowOutro={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: /vancouver/i })).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('button', { name: /looking forward/i })).toBeInTheDocument()
  })
})
