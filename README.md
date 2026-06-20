# Around the World, Back to Myself

An English-language interactive creative project about food, travel, and the places that help make stress feel more manageable.

## Run locally

Requires Node.js 20 or newer and pnpm.

```powershell
pnpm install
pnpm dev
```

Production checks:

```powershell
pnpm test
pnpm build
```

## Add personal photographs

1. Create a folder for a city under `public/photos`, for example `public/photos/vancouver`.
2. Add web-sized `.webp` images. A longest edge of about 1600 px is sufficient for the gallery; thumbnails can be around 480 px.
3. Open `src/data/cities.ts` and replace `placeholderPhotos('Vancouver')` with photo objects:

```ts
photos: [
  {
    src: '/photos/vancouver/stanley-park.webp',
    thumbnail: '/photos/vancouver/stanley-park-thumb.webp',
    alt: 'Evening light along the Stanley Park seawall',
    caption: 'The long path and open water helped the week feel less crowded.',
  },
]
```

City descriptions are optional. Add `description: '...'` to a city only when it contributes something personal.

## Change the writing

- Opening and closing copy: `src/data/siteCopy.ts`
- Cities, coordinates, photos, captions: `src/data/cities.ts`

City and photo counts are not hard-coded. Add or remove entries from the arrays and the globe, navigation, gallery, and counters update automatically.

## Deploy

Push the project to GitHub, import the repository in Vercel, and keep the detected Vite settings. The included `vercel.json` builds with `pnpm build` and publishes `dist`.
