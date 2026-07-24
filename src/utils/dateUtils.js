// Centralized date helpers so formatting logic lives in one place instead of
// being copy-pasted across JobCard, JobDetails, and the dashboard widgets.

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function parseISODate(dateStr) {
  if (!dateStr) return null
  const d = new Date(`${dateStr}T00:00:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

export function formatDateShort(dateStr) {
  const d = parseISODate(dateStr)
  if (!d) return '—'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateLong(dateStr) {
  const d = parseISODate(dateStr)
  if (!d) return '—'
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function daysSince(dateStr) {
  const d = parseISODate(dateStr)
  if (!d) return null
  const diffMs = Date.now() - d.getTime()
  return Math.max(0, Math.floor(diffMs / 86400000))
}

export function daysAgoLabel(dateStr) {
  const days = daysSince(dateStr)
  if (days === null) return 'Applied —'
  if (days === 0) return 'Applied today'
  if (days === 1) return 'Applied 1 day ago'
  return `Applied ${days} days ago`
}

export function isToday(dateStr) {
  if (!dateStr) return false
  return dateStr === todayISO()
}

export function isFutureOrToday(dateStr) {
  const d = parseISODate(dateStr)
  if (!d) return false
  const today = parseISODate(todayISO())
  return d.getTime() >= today.getTime()
}

export function formatMonthLabel(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}
