import { useState } from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps'
import { lastSeen, sightings } from '../data/sightings.js'
import SightingCard from './SightingCard.jsx'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
// A Map ID is required for Advanced Markers. 'DEMO_MAP_ID' works for
// development; for production create one in Google Cloud > Map Management
// and set VITE_GOOGLE_MAPS_MAP_ID in your .env.
const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID'

export default function GoogleSightingsMap() {
  const center = { lat: lastSeen.lat, lng: lastSeen.lng }
  const [hovered, setHovered] = useState(null)

  const points = [
    {
      key: 'home',
      position: center,
      color: '#d6336c',
      glyph: '🏠',
      heading: 'Where Gemma was lost',
      date: lastSeen.date,
      title: lastSeen.address,
      notes: lastSeen.notes,
    },
    ...sightings.map((s, i) => ({
      key: `sighting-${i}`,
      position: { lat: s.lat, lng: s.lng },
      color: '#e8590c',
      glyph: '🐾',
      heading: s.latest ? 'Latest sighting' : 'Sighting',
      date: s.date,
      title: s.time,
      notes: s.notes,
      latest: Boolean(s.latest),
    })),
  ]

  return (
    <div className="map">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={16}
          mapId={mapId}
          mapTypeId="hybrid"
          gestureHandling="greedy"
          style={{ width: '100%', height: '100%' }}
        >
          {points.map((p) => (
            <AdvancedMarker key={p.key} position={p.position} zIndex={p.latest ? 1000 : 1}>
              <div
                className={p.latest ? 'g-marker latest' : 'g-marker'}
                onMouseEnter={() => setHovered(p)}
                onMouseLeave={() => setHovered(null)}
              >
                <Pin
                  background={p.color}
                  borderColor="#ffffff"
                  glyphColor="#ffffff"
                  scale={p.latest ? 1.3 : 1}
                >
                  {p.glyph}
                </Pin>
              </div>
            </AdvancedMarker>
          ))}

          {hovered && (
            <InfoWindow
              position={hovered.position}
              onCloseClick={() => setHovered(null)}
              disableAutoPan
            >
              <SightingCard
                heading={hovered.heading}
                date={hovered.date}
                time={hovered.title}
                notes={hovered.notes}
                accent={hovered.color}
                fallbackGlyph={hovered.glyph}
                latest={hovered.latest}
              />
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  )
}
