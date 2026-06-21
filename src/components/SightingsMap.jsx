import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Circle,
  LayersControl,
  LayerGroup,
} from 'react-leaflet'
import L from 'leaflet'
import { lastSeen, sightings } from '../data/sightings.js'
import SightingCard from './SightingCard.jsx'

const { BaseLayer, Overlay } = LayersControl

// Custom marker icons built with inline SVG so we don't depend on
// Leaflet's default image assets (which can break under bundlers).
function makeIcon(color, glyph, extraClass = '') {
  const html = `
    <div class="marker-pin ${extraClass}" style="--pin-color:${color}">
      <span class="marker-glyph">${glyph}</span>
    </div>`
  return L.divIcon({
    html,
    className: 'gemma-marker',
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    tooltipAnchor: [0, -40],
    popupAnchor: [0, -40],
  })
}

const homeIcon = makeIcon('#d6336c', '🏠')
const sightingIcon = makeIcon('#e8590c', '🐾')
const latestIcon = makeIcon('#e8590c', '🐾', 'latest')

export default function SightingsMap() {
  const center = [lastSeen.lat, lastSeen.lng]

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom className="map">
      <LayersControl position="topright">
        {/* Satellite first so it's the default view — shows current
            ground truth (new houses, trails, fields) even when the
            OpenStreetMap street data hasn't caught up yet. */}
        <BaseLayer checked name="Satellite (Esri)">
          <TileLayer
            attribution='Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
        </BaseLayer>
        <BaseLayer name="Satellite (USGS)">
          <TileLayer
            attribution='Imagery &copy; USGS The National Map'
            url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
        </BaseLayer>
        <BaseLayer name="Street map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        {/* Transparent label overlay so street names appear on top of
            the satellite photos (a "hybrid" view). Toggle off for a
            clean, unlabeled aerial. */}
        <Overlay checked name="Street names">
          <LayerGroup>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
            <TileLayer
              attribution='Labels &copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          </LayerGroup>
        </Overlay>
      </LayersControl>

      {/* Search radius hugging the immediate sighting cluster */}
      <Circle
        center={center}
        radius={850}
        pathOptions={{
          color: '#d6336c',
          fillColor: '#d6336c',
          fillOpacity: 0.14,
          weight: 3,
          dashArray: '6 6',
        }}
      />

      {/* Last-seen / home marker */}
      <Marker position={center} icon={homeIcon}>
        <Tooltip direction="top" opacity={1} className="gemma-tip">
          <SightingCard
            heading="Where Gemma was lost"
            date={lastSeen.date}
            time={lastSeen.address}
            notes={lastSeen.notes}
            accent="#d6336c"
            fallbackGlyph="🏠"
          />
        </Tooltip>
      </Marker>

      {/* Sighting markers — tooltip shows the time on hover */}
      {sightings.map((s, i) => (
        <Marker
          key={i}
          position={[s.lat, s.lng]}
          icon={s.latest ? latestIcon : sightingIcon}
          zIndexOffset={s.latest ? 1000 : 0}
        >
          <Tooltip direction="top" opacity={1} className="gemma-tip">
            <SightingCard
              heading={s.latest ? 'Latest sighting' : undefined}
              date={s.date}
              time={s.time}
              notes={s.notes}
              latest={s.latest}
            />
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
