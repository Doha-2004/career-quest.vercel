import React from 'react'

export default function WarningBadge({ children, tone = 'amber' }) {
  const toneClasses =
    tone === 'amber'
      ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20'
      : 'bg-brand-100 text-brand-700 border-brand-200 dark:bg-brand-400/10 dark:text-brand-300 dark:border-brand-400/20'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${toneClasses}`}>
      {children}
    </span>
  )
}
