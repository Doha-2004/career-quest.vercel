export const STATUS = {
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
}

export const STATUS_LIST = [STATUS.APPLIED, STATUS.INTERVIEWING, STATUS.OFFER, STATUS.REJECTED]

// Tailwind class tokens per status — used for badges, borders, and chart accents
export const STATUS_STYLES = {
  [STATUS.APPLIED]: {
    badge: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-400/10 dark:text-sky-300 dark:border-sky-400/20',
    dot: 'bg-sky-500',
    ring: 'ring-sky-400/30',
  },
  [STATUS.INTERVIEWING]: {
    badge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/20',
    dot: 'bg-amber-500',
    ring: 'ring-amber-400/30',
  },
  [STATUS.OFFER]: {
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/20',
    dot: 'bg-emerald-500',
    ring: 'ring-emerald-400/30',
  },
  [STATUS.REJECTED]: {
    badge: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:border-rose-400/20',
    dot: 'bg-rose-500',
    ring: 'ring-rose-400/30',
  },
}

export const STORAGE_KEYS = {
  JOBS: 'careerquest.jobs',
  THEME: 'careerquest.theme',
}

// A small deterministic palette used to color company-initial placeholders
export const LOGO_PALETTE = [
  'from-brand-500 to-accent-700',
  'from-sky-400 to-brand-600',
  'from-fuchsia-500 to-accent-500',
  'from-emerald-400 to-sky-600',
  'from-amber-400 to-rose-500',
  'from-violet-500 to-sky-500',
]

export function colorForCompany(name = '') {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  const idx = Math.abs(hash) % LOGO_PALETTE.length
  return LOGO_PALETTE[idx]
}
