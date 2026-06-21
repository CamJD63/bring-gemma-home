// Print-only flyer. Hidden on screen; when the user prints (via the
// "Print flyer" button), print CSS hides the rest of the page and shows
// just this, laid out for a single 8.5x11 sheet.

const CONTACT_PHONE = '(801) 792-6800'
const SITE_URL = 'bring-gemma-home.vercel.app'

export default function Flyer() {
  return (
    <div className="flyer" aria-hidden="true">
      <div className="flyer-banner">LOST DOG</div>
      <h1 className="flyer-name">GEMMA</h1>

      <img className="flyer-photo" src="/gemma.jpg" alt="Gemma" />

      <p className="flyer-tag">
        German Shepherd · 8 months · 30–35 lbs · black with tan legs &amp; underside
      </p>

      <div className="flyer-warn">
        Very timid &amp; skittish — please <strong>DON&rsquo;T chase or call out</strong> to
        her. She will run. Note where &amp; when you saw her, then call us right away.
      </div>

      <div className="flyer-contact">
        <div className="flyer-call">
          <span>CALL OR TEXT</span>
          <strong>{CONTACT_PHONE}</strong>
        </div>
        <div className="flyer-qr">
          <img src="/petco-love-lost-qr.png" alt="Scan to report a sighting" />
          <span>Scan to report a sighting</span>
        </div>
      </div>

      <p className="flyer-url">See the live sightings map → {SITE_URL}</p>
    </div>
  )
}
