import { STATUS } from './constants'
import { formatMonthLabel } from './dateUtils'

function pct(part, total) {
  if (!total) return 0
  return Math.round((part / total) * 1000) / 10 // one decimal place
}

// Single source of truth for every number shown on the dashboard, the
// analytics charts, and the JSON export — keeping the math in one function
// guarantees they never disagree with each other.
export function computeStatistics(jobs) {
  const total = jobs.length
  const applied = jobs.filter((j) => j.status === STATUS.APPLIED).length
  const interviewing = jobs.filter((j) => j.status === STATUS.INTERVIEWING).length
  const offers = jobs.filter((j) => j.status === STATUS.OFFER).length
  const rejected = jobs.filter((j) => j.status === STATUS.REJECTED).length

  // "Reached interview stage" includes anyone currently interviewing or who
  // has since received an offer (an offer implies an interview happened).
  const reachedInterview = interviewing + offers

  const monthsSpanned = new Set(jobs.map((j) => formatMonthLabel(j.createdAt))).size || 1

  return {
    total,
    applied,
    interviewing,
    offers,
    rejected,
    successRate: pct(offers, total),
    interviewRate: pct(reachedInterview, total),
    offerRate: pct(offers, total),
    rejectionRate: pct(rejected, total),
    avgApplicationsPerMonth: Math.round((total / monthsSpanned) * 10) / 10,
  }
}

// Buckets jobs by status for the "Applications by Status" pie/bar chart.
export function getStatusBreakdown(jobs) {
  return [STATUS.APPLIED, STATUS.INTERVIEWING, STATUS.OFFER, STATUS.REJECTED].map((status) => ({
    status,
    count: jobs.filter((j) => j.status === status).length,
  }))
}

// Buckets jobs by creation month, sorted chronologically, for the
// "Applications per Month" chart. Always returns at least the last 6 months
// so the chart doesn't look empty for brand-new trackers.
export function getMonthlyApplicationCounts(jobs) {
  const now = new Date()
  const months = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: formatMonthLabel(d.getTime()), count: 0 })
  }

  jobs.forEach((j) => {
    const d = new Date(j.createdAt)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    const bucket = months.find((m) => m.key === key)
    if (bucket) bucket.count += 1
  })

  return months
}
