export type Region = 'North America' | 'China'

export type Photo = {
  src: string
  thumbnail: string
  alt: string
  caption: string
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

const placeholderScenes = [
  {
    src: '/placeholders/landscape.svg',
    alt: 'Scenic travel photograph placeholder',
    caption: 'Replace this with a moment when the view helped you slow down and breathe.',
  },
  {
    src: '/placeholders/food.svg',
    alt: 'Food memory photograph placeholder',
    caption: 'Replace this with a meal that brought comfort, curiosity, or connection.',
  },
  {
    src: '/placeholders/street.svg',
    alt: 'City street photograph placeholder',
    caption: 'Replace this with a small detail that pulled you into the present moment.',
  },
  {
    src: '/placeholders/landscape.svg',
    alt: 'Outdoor travel photograph placeholder',
    caption: 'Replace this with a place that gave your mind more room to wander.',
  },
  {
    src: '/placeholders/food.svg',
    alt: 'Shared food photograph placeholder',
    caption: 'Replace this with a taste, conversation, or ritual that helped you feel restored.',
  },
] as const

const placeholderPhotos = (city: string): Photo[] =>
  placeholderScenes.map((photo, index) => ({
    ...photo,
    thumbnail: photo.src,
    alt: `${city}: ${photo.alt}`,
    caption: photo.caption,
  }))

export const cities: City[] = [
  {
    id: 'vancouver',
    name: 'Vancouver',
    region: 'North America',
    latitude: 49.2827,
    longitude: -123.1207,
    photos: placeholderPhotos('Vancouver'),
  },
  {
    id: 'seattle',
    name: 'Seattle',
    region: 'North America',
    latitude: 47.6062,
    longitude: -122.3321,
    photos: placeholderPhotos('Seattle'),
  },
  {
    id: 'calgary',
    name: 'Calgary',
    region: 'North America',
    latitude: 51.0447,
    longitude: -114.0719,
    photos: placeholderPhotos('Calgary'),
  },
  {
    id: 'las-vegas',
    name: 'Las Vegas',
    region: 'North America',
    latitude: 36.1699,
    longitude: -115.1398,
    photos: placeholderPhotos('Las Vegas'),
  },
  {
    id: 'banff',
    name: 'Banff',
    region: 'North America',
    latitude: 51.1784,
    longitude: -115.5708,
    photos: placeholderPhotos('Banff'),
  },
  {
    id: 'montreal',
    name: 'Montreal',
    region: 'North America',
    latitude: 45.5019,
    longitude: -73.5674,
    photos: placeholderPhotos('Montreal'),
  },
  {
    id: 'santa-barbara',
    name: 'Santa Barbara',
    region: 'North America',
    latitude: 34.4208,
    longitude: -119.6982,
    photos: placeholderPhotos('Santa Barbara'),
  },
  {
    id: 'suzhou',
    name: 'Suzhou',
    region: 'China',
    latitude: 31.2989,
    longitude: 120.5853,
    photos: placeholderPhotos('Suzhou'),
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou',
    region: 'China',
    latitude: 30.2741,
    longitude: 120.1551,
    photos: placeholderPhotos('Hangzhou'),
  },
  {
    id: 'nanchang',
    name: 'Nanchang',
    region: 'China',
    latitude: 28.682,
    longitude: 115.8579,
    photos: placeholderPhotos('Nanchang'),
  },
  {
    id: 'harbin',
    name: 'Harbin',
    region: 'China',
    latitude: 45.8038,
    longitude: 126.5349,
    photos: placeholderPhotos('Harbin'),
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    region: 'China',
    latitude: 31.2304,
    longitude: 121.4737,
    photos: placeholderPhotos('Shanghai'),
  },
  {
    id: 'shenzhen',
    name: 'Shenzhen',
    region: 'China',
    latitude: 22.5431,
    longitude: 114.0579,
    photos: placeholderPhotos('Shenzhen'),
  },
  {
    id: 'nanjing',
    name: 'Nanjing',
    region: 'China',
    latitude: 32.0603,
    longitude: 118.7969,
    photos: placeholderPhotos('Nanjing'),
  },
  {
    id: 'tongren',
    name: 'Tongren',
    region: 'China',
    latitude: 27.7183,
    longitude: 109.1916,
    photos: placeholderPhotos('Tongren'),
  },
]

export const regions: Region[] = ['North America', 'China']
