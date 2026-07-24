import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarClock, ArrowUpRight } from 'lucide-react'
import { STATUS } from '../utils/constants'
import { formatDateShort, isFutureOrToday, isToday } from '../utils/dateUtils'
import CompanyLogo from './CompanyLogo'

export function InterviewTodayBanner({ jobs }) {
  const todaysInterviews = useMemo(
    () => jobs.filter((j) => j.status === STATUS.INTERVIEWING && isToday(j.interviewDate)),
    [jobs]
  )

  if (todaysInterviews.length === 0) return null

  return (
    <div className="glass-card animate-fadeUp mb-6 flex items-center gap-3 border border-brand-200/60 bg-gradient-to-r from-brand-50/80 to-accent-50/60 p-4 dark:border-brand-400/20 dark:from-brand-500/10 dark:to-accent-500/10">
      <span className="text-xl" aria-hidden="true">
        📅
      </span>
      <p className="text-sm font-bold text-slate-800 dark:text-white">
        You have {todaysInterviews.length > 1 ? `${todaysInterviews.length} interviews` : 'an interview'} today!
      </p>
    </div>
  )
}

export default function UpcomingInterviews({ jobs }) {
  const navigate = useNavigate()

  const upcoming = useMemo(
    () =>
      jobs
        .filter((j) => j.status === STATUS.INTERVIEWING && j.interviewDate && isFutureOrToday(j.interviewDate))
        .sort((a, b) => a.interviewDate.localeCompare(b.interviewDate))
        .slice(0, 5),
    [jobs]
  )

  if (upcoming.length === 0) return null

  return (
    <div className="glass-card animate-fadeUp mb-6 p-5">
      <div className="mb-4 flex items-center gap-2">
        <CalendarClock size={18} className="text-brand-500" />
        <h3 className="font-display text-sm font-bold text-slate-800 dark:text-white">Upcoming Interviews</h3>
      </div>
      <div className="flex flex-col gap-2.5">
        {upcoming.map((job) => (
          <button
            key={job.id}
            onClick={() => navigate(`/job/${job.id}`)}
            className="group flex w-full items-center gap-3 rounded-xl2 border border-slate-200/60 bg-white/50 p-3 text-left transition-all duration-200 hover:border-brand-200 hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
          >
            <CompanyLogo company={job.company} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800 dark:text-white">{job.title}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {job.company} · {formatDateShort(job.interviewDate)}
                {job.interviewTime && ` at ${job.interviewTime}`}
                {job.interviewType && ` · ${job.interviewType}`}
              </p>
            </div>
            <ArrowUpRight size={16} className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500" />
          </button>
        ))}
      </div>
    </div>
  )
}
