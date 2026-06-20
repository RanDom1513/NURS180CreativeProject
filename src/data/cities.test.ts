import { describe, expect, it } from 'vitest'
import { cities } from './cities'

describe('city content', () => {
  it('includes all 15 planned destinations', () => {
    expect(cities).toHaveLength(15)
    expect(cities.map((city) => city.name)).toEqual(
      expect.arrayContaining([
        'Vancouver',
        'Seattle',
        'Calgary',
        'Las Vegas',
        'Banff',
        'Montreal',
        'Santa Barbara',
        'Suzhou',
        'Hangzhou',
        'Nanchang',
        'Harbin',
        'Shanghai',
        'Shenzhen',
        'Nanjing',
        'Tongren',
      ]),
    )
  })

  it('uses unique ids and valid coordinates', () => {
    expect(new Set(cities.map((city) => city.id)).size).toBe(cities.length)

    for (const city of cities) {
      expect(city.latitude).toBeGreaterThanOrEqual(-90)
      expect(city.latitude).toBeLessThanOrEqual(90)
      expect(city.longitude).toBeGreaterThanOrEqual(-180)
      expect(city.longitude).toBeLessThanOrEqual(180)
    }
  })

  it('provides at least five replaceable photo slots per city', () => {
    for (const city of cities) {
      expect(city.photos.length).toBeGreaterThanOrEqual(5)
      for (const photo of city.photos) {
        expect(photo.src).toBeTruthy()
        expect(photo.thumbnail).toBeTruthy()
        expect(photo.alt).toBeTruthy()
        expect(photo.caption).toBeTruthy()
      }
    }
  })
})
