// ============================================================
//  GEMMA'S LOCATIONS
// ============================================================
//
//  HOW TO ADD A NEW SIGHTING
//  -------------------------
//  1. Get the coordinates: open Google Maps, right-click the
//     exact spot, and click the lat/lng numbers at the top to
//     copy them (format: 40.2338, -111.6585).
//  2. Add a new object to the `sightings` array below.
//  3. Save the file — the map updates automatically.
//
//  Each sighting needs:
//    - lat, lng : the coordinates (numbers)
//    - time     : when she was seen (any text you like)
//    - notes    : optional extra detail shown in the tooltip
//    - date     : optional date for the calendar shown in the tooltip.
//                 Accepts "11/12", "11-12", or "Nov 12". Pass an array
//                 for several dates, e.g. ['6/15', '6/18', '6/20'].
//
// ============================================================

// Gemma's last-known location (where she was lost).
// Coordinates for 1145 S Meadow Fork Rd, Provo, UT 84606
// (geocoded via OpenStreetMap). Tweak slightly if the pin isn't
// exactly on the house.
export const lastSeen = {
  lat: 40.2186783,
  lng: -111.628724,
  address: '1145 S Meadow Fork Rd, Provo, UT 84606',
  time: 'Where Gemma was lost',
  notes: 'This is where we lost Gemma.',
}

// Add confirmed sightings here as they come in.
//
// The hotspots below were transcribed from the hand-marked
// "Gemma Sightings" map (SE Provo / Slate Canyon / Provost South).
// Coordinates are approximate — nudge the lat/lng if a pin is off.
export const sightings = [
  {
    lat: 40.2195,
    lng: -111.6284,
    date: ['06/17', '06/18'],
    time: 'Overnight: 11 PM–12 AM & 5:30 AM',
    notes:
      'Running down Canyon Meadow Dr.',
  },
  {
    lat: 40.2170,
    lng: -111.6291,
    date: '06/18',
    time: '8:00 AM',
    notes: 'Just west, running down Nevada Ave.',
  },
  {
    lat: 40.2176,
    lng: -111.6280,
    date: ['06/17', '06/18'],
    time: '10:00 AM (and later)',
    notes: 'Around the Alpine Loop / Alpine Way neighborhood.',
  },
  {
    lat: 40.2144,
    lng: -111.6290,
    date: ['6/15', '6/18', '6/20'],
    latest: true,
    time: '11 PM & 6:30 AM',
    notes: 'S 1170 E Cul de sac (spotted in the cul de sac and the backyards of these houses multiple times).',
  },
  {
    lat: 40.2115,
    lng: -111.6280,
    date: '06/16',
    time: '6:00 AM',
    notes: 'LDS church lawn',
  },
]
