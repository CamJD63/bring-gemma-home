# Bring Gemma Home 🐶

An interactive map website to help find Gemma, a lost dog in Provo, UT.
Built with **React + Vite** and **Leaflet** (OpenStreetMap — no API keys needed).

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Add a new sighting

Open [`src/data/sightings.js`](src/data/sightings.js) and add an object to the
`sightings` array:

```js
{
  lat: 40.2381,
  lng: -111.6402,
  time: 'June 20, 2026 — 7:45 AM',
  notes: 'Spotted near the trailhead, headed north.',
}
```

**Getting coordinates:** open Google Maps, right-click the exact spot, and click the
latitude/longitude numbers at the top to copy them.

The map updates automatically when you save. Hovering a marker shows the sighting time.

## Update the last-seen location

The pink home marker is set in the same file under `lastSeen`. The coordinates are an
approximation for 1145 Meadow Fork Rd — verify and adjust them with Google Maps if
needed.

## Add Gemma's photo

Replace the 🐶 placeholder in [`src/App.jsx`](src/App.jsx) (the `photo-placeholder`
element) with an `<img src="/gemma.jpg" />`, and drop `gemma.jpg` into a new `public/`
folder.

## Deploy for free

Any of these work and give you a public link to share:

- **Netlify** or **Vercel**: connect the repo, build command `npm run build`, publish
  directory `dist`.
- **GitHub Pages**: run `npm run build` and serve the `dist/` folder.
