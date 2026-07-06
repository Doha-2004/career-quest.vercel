import { STATUS } from './constants'

// Each achievement declares how to check itself against the current job list.
// Keeping the check colocated with the definition means adding a new badge
// later is a one-object change, nothing else in the app needs to know.
export const ACHIEVEMENT_DEFS = [
  {
    id: 'first-application',
    title: 'First Application',
    description: 'Logged your very first application.',
    icon: 'Rocket',
    check: (jobs) => jobs.length >= 1,
  },
  {
    id: 'ten-applications',
    title: '10 Applications',
    description: 'Reached double digits. Momentum is building.',
    icon: 'Flame',
    check: (jobs) => jobs.length >= 10,
  },
  {
    id: 'first-interview',
    title: 'First Interview',
    description: 'Landed your first interview invite.',
    icon: 'MessagesSquare',
    check: (jobs) => jobs.some((j) => j.status === STATUS.INTERVIEWING || j.status === STATUS.OFFER),
  },
  {
    id: 'first-offer',
    title: 'First Offer',
    description: 'An employer said yes. Huge milestone.',
    icon: 'Trophy',
    check: (jobs) => jobs.some((j) => j.status === STATUS.OFFER),
  },
]

export function getUnlockedAchievements(jobs) {
  return ACHIEVEMENT_DEFS.map((def) => ({
    ...def,
    unlocked: def.check(jobs),
  }))
}

// Progress is intentionally simple and legible: a blend of volume (are you
// applying enough?) and outcomes (is it converting?), capped at 100.
export function getQuestProgress(jobs) {
  if (jobs.length === 0) return 0
  const volumeScore = Math.min(jobs.length / 15, 1) * 60
  const interviewCount = jobs.filter((j) => j.status === STATUS.INTERVIEWING || j.status === STATUS.OFFER).length
  const offerCount = jobs.filter((j) => j.status === STATUS.OFFER).length
  const outcomeScore = Math.min(interviewCount * 8 + offerCount * 20, 40)
  return Math.round(Math.min(volumeScore + outcomeScore, 100))
}

export function getMotivationalMessage(jobs) {
  const total = jobs.length
  const offers = jobs.filter((j) => j.status === STATUS.OFFER).length
  const interviews = jobs.filter((j) => j.status === STATUS.INTERVIEWING).length

  if (total === 0) return "Your quest begins with a single application. Add your first one below."
  if (offers > 0) return `${offers} offer${offers > 1 ? 's' : ''} on the table. You're winning this quest.`
  if (interviews > 0) return `${interviews} interview${interviews > 1 ? 's' : ''} lined up. Keep the momentum going.`
  if (total >= 10) return "10+ applications sent. Consistency like this pays off — stay the course."
  if (total >= 5) return "Solid progress. A few more applications and the odds tip in your favor."
  return "Every application is a step forward. Keep going."
}
