// Shared tooltip/popup content: a little tear-off calendar next to the
// sighting details. Used by both the Leaflet and Google map components so
// the styling stays identical everywhere.

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

// Accepts dates like "11/12", "11-12", or "Nov 12" and returns
// { month: 'NOV', day: 12 }. Returns null if it can't parse one.
function parseCalendar(date) {
  if (!date) return null
  const str = String(date).trim()

  let month
  let day

  const numeric = str.match(/^(\d{1,2})[/\-.](\d{1,2})$/)
  if (numeric) {
    month = parseInt(numeric[1], 10)
    day = parseInt(numeric[2], 10)
  } else {
    const named = str.match(/^([A-Za-z]{3,})\.?\s+(\d{1,2})/)
    if (named) {
      const idx = MONTHS.indexOf(named[1].slice(0, 3).toUpperCase())
      if (idx >= 0) {
        month = idx + 1
        day = parseInt(named[2], 10)
      }
    }
  }

  if (!month || month < 1 || month > 12 || !day) return null
  return { month: MONTHS[month - 1], day }
}

// Normalizes one date or an array of dates into month-grouped entries,
// e.g. ['6/15', '6/18', '6/20'] -> [{ month: 'JUN', days: [15, 18, 20] }].
function toCalendarGroups(date) {
  const list = Array.isArray(date) ? date : [date]
  const parsed = list.map(parseCalendar).filter(Boolean)

  const groups = []
  for (const p of parsed) {
    const last = groups[groups.length - 1]
    if (last && last.month === p.month) last.days.push(p.day)
    else groups.push({ month: p.month, days: [p.day] })
  }
  return groups
}

export default function SightingCard({
  date,
  time,
  notes,
  heading,
  accent = '#e8590c',
  fallbackGlyph = '🐾',
  latest = false,
}) {
  const groups = toCalendarGroups(date)

  return (
    <div className="sight-card">
      {groups.length > 0 ? (
        <div className="cal-stack" aria-hidden="true">
          {groups.map((g, i) => (
            <div className="cal" key={i}>
              <div className="cal-top" style={{ background: accent }}>
                {g.month}
              </div>
              <div className={`cal-day${g.days.length > 1 ? ' cal-day-multi' : ''}`}>
                {g.days.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cal" aria-hidden="true">
          <div className="cal-top" style={{ background: accent }}>
            •
          </div>
          <div className="cal-day">{fallbackGlyph}</div>
        </div>
      )}
      <div className="sight-meta">
        {heading ? (
          <strong
            className={`sight-head${latest ? ' sight-badge' : ''}`}
            style={latest ? { background: accent, color: '#fff' } : { color: accent }}
          >
            {heading}
          </strong>
        ) : null}
        {time ? <span className="sight-time">{time}</span> : null}
        {notes ? <span className="sight-notes">{notes}</span> : null}
      </div>
    </div>
  )
}
