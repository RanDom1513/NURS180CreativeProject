export type Region = 'North America' | 'Europe' | 'China'

export type Photo = {
  src: string
  thumbnail: string
  alt: string
  caption?: string
}

export type City = {
  id: string
  name: string
  region: Region
  latitude: number
  longitude: number
  description?: string
  photos: Photo[]
}

const cityPhotos = (
  cityId: string,
  cityName: string,
  count: number,
  captions: Partial<Record<number, string>> = {},
): Photo[] =>
  Array.from({ length: count }, (_, index) => {
    const photoNumber = String(index + 1).padStart(2, '0')
    const src = `/photos/${cityId}/${cityId}-${photoNumber}.webp`
    const thumbnail = `/photos/${cityId}/${cityId}-${photoNumber}-thumb.webp`
    const caption = captions[index + 1]

    return {
      src,
      thumbnail,
      alt: `${cityName} travel memory ${index + 1}`,
      ...(caption ? { caption } : {}),
    }
  })

export const cities: City[] = [
  {
    id: 'vancouver',
    name: 'Vancouver',
    region: 'North America',
    latitude: 49.2827,
    longitude: -123.1207,
    photos: cityPhotos('vancouver', 'Vancouver', 7),
  },
  {
    id: 'seattle',
    name: 'Seattle',
    region: 'North America',
    latitude: 47.6062,
    longitude: -122.3321,
    photos: cityPhotos('seattle', 'Seattle', 6, {
      2: 'A photo of my friend and me.',
    }),
  },
  {
    id: 'las-vegas',
    name: 'Las Vegas',
    region: 'North America',
    latitude: 36.1699,
    longitude: -115.1398,
    photos: cityPhotos('las-vegas', 'Las Vegas', 6),
  },
  {
    id: 'banff',
    name: 'Banff',
    region: 'North America',
    latitude: 51.1784,
    longitude: -115.5708,
    photos: cityPhotos('banff', 'Banff', 5),
  },
  {
    id: 'montreal',
    name: 'Montreal',
    region: 'North America',
    latitude: 45.5019,
    longitude: -73.5674,
    photos: cityPhotos('montreal', 'Montreal', 5),
  },
  {
    id: 'california',
    name: 'California',
    region: 'North America',
    latitude: 36.7783,
    longitude: -119.4179,
    photos: cityPhotos('california', 'California', 10),
  },
  {
    id: 'oxford',
    name: 'Oxford',
    region: 'Europe',
    latitude: 51.752,
    longitude: -1.2577,
    photos: cityPhotos('oxford', 'Oxford', 5),
  },
  {
    id: 'london',
    name: 'London',
    region: 'Europe',
    latitude: 51.5074,
    longitude: -0.1278,
    photos: cityPhotos('london', 'London', 5),
  },
  {
    id: 'prague',
    name: 'Prague',
    region: 'Europe',
    latitude: 50.0755,
    longitude: 14.4378,
    photos: cityPhotos('prague', 'Prague', 5),
  },
  {
    id: 'stockholm',
    name: 'Stockholm',
    region: 'Europe',
    latitude: 59.3293,
    longitude: 18.0686,
    photos: cityPhotos('stockholm', 'Stockholm', 5),
  },
  {
    id: 'copenhagen',
    name: 'Copenhagen',
    region: 'Europe',
    latitude: 55.6761,
    longitude: 12.5683,
    photos: cityPhotos('copenhagen', 'Copenhagen', 7),
  },
  {
    id: 'suzhou',
    name: 'Suzhou',
    region: 'China',
    latitude: 31.2989,
    longitude: 120.5853,
    description:
      'Suzhou is known for its distinctive Suzhou-style cuisine and graceful classical gardens. Local favorites include Dongpo pork—slow-braised pork belly—and squirrel-shaped mandarin fish—crispy sweet-and-sour fish.',
    photos: cityPhotos('suzhou', 'Suzhou', 6, {
      6: 'A refreshing glass of Suzhou-style mung bean soup.',
    }),
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou',
    region: 'China',
    latitude: 30.2741,
    longitude: 120.1551,
    description:
      'Hangzhou is known for its delicate local cuisine, fragrant Longjing tea and tea snacks, and the serene beauty of West Lake.',
    photos: cityPhotos('hangzhou', 'Hangzhou', 6, {
      1: 'Tea fields where Longjing tea is grown.',
      4: 'Longjing tea served with traditional tea snacks.',
      5: 'Fish prepared in the traditional Hangzhou style.',
    }),
  },
  {
    id: 'nanchang',
    name: 'Nanchang',
    region: 'China',
    latitude: 28.682,
    longitude: 115.8579,
    description:
      'Nanchang is known for its bold, spicy cuisine and beautiful historic architecture, including the iconic Pavilion of Prince Teng.',
    photos: cityPhotos('nanchang', 'Nanchang', 7, {
      5: 'The iconic Pavilion of Prince Teng.',
    }),
  },
  {
    id: 'harbin',
    name: 'Harbin',
    region: 'China',
    latitude: 45.8038,
    longitude: 126.5349,
    description:
      'Harbin is known for its spectacular ice sculptures, artistic streetscapes, and distinctive Russian-inspired architecture.',
    photos: cityPhotos('harbin', 'Harbin', 7),
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    region: 'China',
    latitude: 31.2304,
    longitude: 121.4737,
    description:
      'Shanghai is where modern life and tradition intertwine, blending the energy of the city with the quiet beauty of the countryside.',
    photos: cityPhotos('shanghai', 'Shanghai', 8),
  },
  {
    id: 'nanjing',
    name: 'Nanjing',
    region: 'China',
    latitude: 32.0603,
    longitude: 118.7969,
    photos: cityPhotos('nanjing', 'Nanjing', 6),
  },
  {
    id: 'tongren',
    name: 'Tongren',
    region: 'China',
    latitude: 27.7183,
    longitude: 109.1916,
    photos: cityPhotos('tongren', 'Tongren', 4),
  },
]

export const regions: Region[] = ['North America', 'Europe', 'China']
