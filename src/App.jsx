import { motion } from 'framer-motion'
import SightingsMap from './components/SightingsMap.jsx'
import GoogleSightingsMap from './components/GoogleSightingsMap.jsx'
import ShareBar from './components/ShareBar.jsx'
import Flyer from './components/Flyer.jsx'
import { sightings } from './data/sightings.js'

const CONTACT_PHONE = '(801) 792-6800'

// If a Google Maps API key is configured, use Google Maps.
// Otherwise fall back to the free Leaflet/OpenStreetMap map so the
// site always works with no setup.
const useGoogle = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

// Shared animation helpers
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <motion.div
          className="hero-inner"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="photo-frame"
            variants={fadeUp}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            whileHover={{ scale: 1.05, rotate: -3 }}
          >
            <img
              className="gemma-photo"
              src="/gemma.jpg"
              alt="Gemma — a black and tan German Shepherd mix wearing a pink collar"
              onError={(e) => {
                e.currentTarget.parentElement.classList.add('photo-fallback')
                e.currentTarget.remove()
              }}
            />
          </motion.div>
          <div className="hero-text">
            <motion.p className="eyebrow" variants={fadeUp}>
              Lost Dog · Provo, UT
            </motion.p>
            <motion.h1 variants={fadeUp}>Bring Gemma Home</motion.h1>
            <motion.p className="lede" variants={fadeUp}>
              Our dog Gemma is lost near Meadow Fork Rd. If you spot her, please don't
              call her or chase her — she's very skittish and will run. Note where and
              when you saw her and contact us right away.
            </motion.p>
            <motion.div className="contact" variants={fadeUp}>
              <motion.a
                className="call-btn"
                href="tel:+18017926800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: [
                    '0 4px 14px rgba(214, 51, 108, 0.3)',
                    '0 6px 22px rgba(214, 51, 108, 0.55)',
                    '0 4px 14px rgba(214, 51, 108, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Call {CONTACT_PHONE}
              </motion.a>
              <span className="contact-alt">or call Animal Control</span>
            </motion.div>
          </div>
        </motion.div>
      </header>

      <main>
        <motion.section
          className="see-her"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2>If you see her</h2>
          <p className="section-lede">
            Gemma is very timid and will run if she&rsquo;s approached or called. The best
            way to help is to stay calm, keep your distance, and tell us exactly where and
            when you saw her.
          </p>

          <div className="see-her-grid">
            <div className="do-dont do">
              <h3>Please do</h3>
              <ul>
                <li>Note the exact location, time, and which way she was headed.</li>
                <li>Take a photo from a distance if you can.</li>
                <li>Call or text us right away &mdash; even hours later still helps.</li>
                <li>If she&rsquo;s close, sit down, avoid eye contact, and gently toss food.</li>
              </ul>
            </div>
            <div className="do-dont dont">
              <h3>Please don&rsquo;t</h3>
              <ul>
                <li>Chase her or call out her name &mdash; she will bolt.</li>
                <li>Try to grab, corner, or crowd her.</li>
                <li>Honk, whistle, or send other dogs after her.</li>
              </ul>
            </div>

            <dl className="gemma-details">
              <div><dt>Breed</dt><dd>German Shepherd (8 months)</dd></div>
              <div><dt>Size</dt><dd>30&ndash;35 lbs</dd></div>
              <div><dt>Color</dt><dd>Black with tan legs &amp; underside</dd></div>
              <div><dt>Collar</dt><dd>Slipped her collar &mdash; none on now</dd></div>
              <div><dt>Chip</dt><dd>Not microchipped &middot; not spayed</dd></div>
              <div><dt>Temperament</dt><dd>Very timid, non-aggressive</dd></div>
            </dl>
          </div>

          <a className="call-btn" href="tel:+18017926800">
            Call {CONTACT_PHONE}
          </a>
        </motion.section>

        <motion.section
          className="map-section"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2>Where Gemma&rsquo;s been spotted</h2>
          <p className="map-help">
            Hover over a marker to see the time of the sighting.{' '}
            <span className="legend">
              <span className="dot home" /> Lost here &nbsp;
              <span className="dot sighting" /> Sighting
            </span>
          </p>
          {useGoogle ? <GoogleSightingsMap /> : <SightingsMap />}
          {sightings.length === 0 && (
            <p className="empty-note">
              No sightings reported yet. The pink marker shows where Gemma was lost &mdash;
              new sightings will appear here as they come in.
            </p>
          )}
        </motion.section>

        <motion.section
          className="spread"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2>Help spread the word</h2>
          <p className="section-lede">
            Every share helps Gemma get home faster. Post this page on Facebook, Nextdoor,
            and neighborhood group chats &mdash; or print a flyer to put up nearby.
          </p>
          <ShareBar />

          <div className="spread-flyer">
            <img
              className="qr"
              src="/petco-love-lost-qr.png"
              alt="Petco Love Lost QR code to report a sighting"
            />
            <div className="spread-flyer-text">
              <h3>Print a flyer</h3>
              <p>
                Post it at vets, parks, and around the neighborhood. It includes Gemma&rsquo;s
                photo, description, your contact number, and the QR code above.
              </p>
              <button
                type="button"
                className="call-btn print-btn"
                onClick={() => window.print()}
              >
                Print flyer
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p>
          Please help us bring Gemma home. Share this page with neighbors. If you see
          her, call <a href="tel:+18017926800">{CONTACT_PHONE}</a> or Animal Control.
        </p>
        <p className="reminder">Remember: don&rsquo;t chase or call her &mdash; she will run.</p>
      </motion.footer>

      {/* Hidden on screen; shown only when printing a flyer */}
      <Flyer />
    </div>
  )
}
