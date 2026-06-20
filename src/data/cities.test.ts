import { describe, expect, it } from 'vitest'
import { cities } from './cities'

describe('city content', () => {
  it('includes all 18 planned destinations', () => {
    expect(cities).toHaveLength(18)
    expect(cities.map((city) => city.name)).toEqual(
      expect.arrayContaining([
        'Vancouver',
        'Seattle',
        'Las Vegas',
        'Banff',
        'Montreal',
        'California',
        'Oxford',
        'London',
        'Prague',
        'Stockholm',
        'Copenhagen',
        'Suzhou',
        'Hangzhou',
        'Nanchang',
        'Harbin',
        'Shanghai',
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

  it('provides valid photo records for every city', () => {
    for (const city of cities) {
      expect(city.photos.length).toBeGreaterThan(0)
      for (const photo of city.photos) {
        expect(photo.src).toBeTruthy()
        expect(photo.thumbnail).toBeTruthy()
        expect(photo.alt).toBeTruthy()
      }
    }
  })
})
