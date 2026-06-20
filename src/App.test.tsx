import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('complete visitor flow', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  })

  it('moves from the introduction to a city gallery and both reflection panels', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Around the World, Back to Myself' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /enter the journey/i }))

    expect(screen.getByText(/3D globe is unavailable/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /vancouver/i }))
    expect(screen.getByRole('heading', { name: 'Vancouver' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close vancouver gallery/i }))
    await user.click(screen.getByRole('button', { name: /self-reflection/i }))

    expect(screen.getByRole('heading', { name: 'Self-Reflection' })).toBeInTheDocument()
    expect(screen.getByText(/interrupts the cycle of worrying/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close self-reflection/i }))
    await user.click(screen.getByRole('button', { name: /looking forward/i }))

    expect(screen.getByRole('heading', { name: 'Looking Forward' })).toBeInTheDocument()
    expect(screen.getByText(/self-care to be less of an emergency response/i)).toBeInTheDocument()
  })
})
