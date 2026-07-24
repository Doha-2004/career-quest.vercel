import React, { useState, useEffect } from 'react'
import { colorForCompany } from '../utils/constants'
import { clearbitLogoUrl } from '../utils/companyDomain'

// Tries to load a real company logo from the Clearbit Logo API using a
// best-effort domain guess. If the image 404s, is slow, or the guess is
// simply wrong (Clearbit returns a 404 for unknown domains), we silently
// fall back to the existing gradient initial-letter avatar — the avatar is
// never removed, only ever covered by a successfully-loaded logo.
export default function CompanyLogo({ company, size = 'md' }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const initial = (company || '?').trim().charAt(0).toUpperCase()
  const gradient = colorForCompany(company)
  const sizeClasses = size === 'lg' ? 'h-14 w-14 text-xl rounded-2xl' : 'h-11 w-11 text-base rounded-xl2'
  const logoUrl = clearbitLogoUrl(company)

  // Reset fallback state when switching to a different company (e.g. list re-renders)
  useEffect(() => {
    setLogoFailed(false)
  }, [company])

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} font-display font-bold text-white shadow-glow-brand ${sizeClasses}`}
      aria-hidden="true"
    >
      <span>{initial}</span>
      {logoUrl && !logoFailed && (
        <img
          src={logoUrl}
          alt=""
          loading="lazy"
          onError={() => setLogoFailed(true)}
          className="absolute inset-0 h-full w-full bg-white object-contain p-1.5"
        />
      )}
    </div>
  )
}
