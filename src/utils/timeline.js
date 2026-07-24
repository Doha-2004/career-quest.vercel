import { STATUS, TIMELINE_STAGES } from './constants'

// Maps a job's status onto an index in TIMELINE_STAGES. "Recruiter Viewed"
// and "Assessment" aren't real statuses we track, so once a job reaches
// Interviewing we treat everything up through "Interview" as passed.
export function getTimelineStageIndex(status) {
  switch (status) {
    case STATUS.APPLIED:
      return 0
    case STATUS.INTERVIEWING:
      return 3
    case STATUS.OFFER:
      return 4
    default:
      return 0
  }
}

export function getTimelineStages() {
  return TIMELINE_STAGES
}
