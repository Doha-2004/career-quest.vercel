import React from 'react'
import { colorForCompany } from '../utils/constants'

export default function CompanyLogo({ company, size = 'md' }) {
  const initial = (company || '?').trim().charAt(0).toUpperCase()
  const gradient = colorForCompany(company)
  const sizeClasses = size === 'lg' ? 'h-14 w-14 text-xl rounded-2xl' : 'h-11 w-11 text-base rounded-xl2'

  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br ${gradient} font-display font-bold text-white shadow-glow-brand ${sizeClasses}`}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}
