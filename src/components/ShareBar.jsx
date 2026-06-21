import { useState } from 'react'

const SITE_URL = 'https://bring-gemma-home.vercel.app'
const SHARE_TEXT =
  'Help bring Gemma home — a timid lost dog in Provo, UT. If you spot her, please don\u2019t chase her. Note where & when you saw her and call right away.'

export default function ShareBar() {
  const [copied, setCopied] = useState(false)
  const enc = encodeURIComponent
  const canNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const nativeShare = async () => {
    try {
      await navigator.share({ title: 'Bring Gemma Home', text: SHARE_TEXT, url: SITE_URL })
    } catch {
      /* user dismissed the share sheet — nothing to do */
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="share-bar">
      {canNativeShare && (
        <button type="button" className="share-btn primary" onClick={nativeShare}>
          Share
        </button>
      )}
      <a
        className="share-btn fb"
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(SITE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
      <a
        className="share-btn x"
        href={`https://twitter.com/intent/tweet?text=${enc(SHARE_TEXT)}&url=${enc(SITE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a className="share-btn sms" href={`sms:?&body=${enc(`${SHARE_TEXT} ${SITE_URL}`)}`}>
        Text
      </a>
      <button type="button" className="share-btn copy" onClick={copyLink}>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}
