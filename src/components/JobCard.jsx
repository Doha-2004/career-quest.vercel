import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Calendar } from 'lucide-react'
import CompanyLogo from './CompanyLogo'
import StatusBadge from './StatusBadge'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function JobCard({ job }) {
  const navigate = useNavigate()

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
        <StatusBadge status={job.status} size="sm" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
        <Calendar size={14} />
        Applied {formatDate(job.appliedDate)}
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
