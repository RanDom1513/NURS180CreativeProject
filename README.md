# Around the World, Back to Myself

An English-language interactive creative project about food, travel, and the places that help make stress feel more manageable.

## Run locally

Requires Node.js 20 or newer and pnpm.

On the project computer, double-click `Start Website.vbs`. It starts the development server and opens the website automatically. Press `Ctrl+C` in the terminal window to stop it.

The PowerShell launcher can also be run directly by right-clicking `start-website.ps1` and selecting **Run with PowerShell**.

If Windows blocks direct script execution, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-website.ps1
```

To start it manually:

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
2. Add web-sized `.jpg` images using sequential names such as `vancouver-01.jpg`, `vancouver-02.jpg`, and so on. A longest edge of about 1600 px is sufficient for the gallery.
3. Open `src/data/cities.ts` and set the actual photo count:

```ts
photos: cityPhotos('vancouver', 'Vancouver', 7),
```

City descriptions are optional. Add `description: '...'` to a city only when it contributes something personal.
Photo captions are also optional. Add captions only for the numbered photos that need them:

```ts
photos: cityPhotos('vancouver', 'Vancouver', 7, {
  1: 'The open water helped me slow down after a stressful week.',
  4: 'Sharing this meal made the day feel lighter.',
}),
```

Photos without a caption do not display an empty description area.

## Optimize photographs

After adding and naming JPG photographs, run:

```powershell
& "C:\Users\75772\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" scripts\optimize-images.py
```

The script creates a 1600 px WebP gallery image and a 480 px WebP thumbnail for every JPG. Original JPG files are moved to the local `.photo-originals` backup folder, which is excluded from Git and deployment.

## Change the writing

- Opening and closing copy: `src/data/siteCopy.ts`
- Cities, coordinates, photos, captions: `src/data/cities.ts`

City and photo counts are not hard-coded. Add or remove entries from the arrays and the globe, navigation, gallery, and counters update automatically.

## Deploy

Push the project to GitHub, import the repository in Vercel, and keep the detected Vite settings. The included `vercel.json` builds with `pnpm build` and publishes `dist`.
