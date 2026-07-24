import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Calendar, CalendarClock } from 'lucide-react'
import { STATUS, NO_RESPONSE_DAYS_THRESHOLD } from '../utils/constants'
import { daysAgoLabel, daysSince, formatDateShort, isToday } from '../utils/dateUtils'
import { useAppContext } from '../context/AppContext'
import CompanyLogo from './CompanyLogo'
import StatusBadge from './StatusBadge'
import FavoriteToggle from './FavoriteToggle'
import WarningBadge from './WarningBadge'

export default function JobCard({ job }) {
  const navigate = useNavigate()
  const { toggleFavorite } = useAppContext()

  const daysApplied = daysSince(job.appliedDate)
  const isStale = job.status === STATUS.APPLIED && daysApplied !== null && daysApplied > NO_RESPONSE_DAYS_THRESHOLD
  const interviewToday = job.status === STATUS.INTERVIEWING && isToday(job.interviewDate)

  return (
    <div className="glass-card animate-fadeUp group flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CompanyLogo company={job.company} />
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-bold text-slate-800 dark:text-white">{job.title}</h3>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <FavoriteToggle isFavorite={Boolean(job.isFavorite)} onToggle={() => toggleFavorite(job.id)} size={17} />
          <StatusBadge status={job.status} size="sm" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500" title={formatDateShort(job.appliedDate)}>
          <Calendar size={14} />
          {daysAgoLabel(job.appliedDate)}
        </div>
        {isStale && <WarningBadge>⚠ No response yet</WarningBadge>}
        {interviewToday && (
          <WarningBadge tone="brand">
            <CalendarClock size={11} />
            Interview today
          </WarningBadge>
        )}
      </div>

      <button
        onClick={() => navigate(`/job/${job.id}`)}
        className="btn-ghost mt-1 flex items-center justify-center gap-1.5 rounded-xl2 px-4 py-2 text-sm font-semibold"
      >
        Quick View
        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  )
}
