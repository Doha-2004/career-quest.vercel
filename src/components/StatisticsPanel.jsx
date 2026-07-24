import React from 'react'
import { TrendingUp, MessagesSquare, Trophy, TrendingDown, CalendarRange } from 'lucide-react'

function RateTile({ label, value, suffix = '%', icon: Icon, accent }) {
  return (
    <div className="flex items-center gap-3 rounded-xl2 border border-slate-200/70 bg-white/50 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accent} text-white`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="font-display text-base font-extrabold leading-tight text-slate-800 dark:text-white">
          {value}
          <span className="text-xs font-semibold text-slate-400">{suffix}</span>
        </p>
        <p className="truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  )
}

export default function StatisticsPanel({ stats }) {
  return (
    <div className="glass-card animate-fadeUp p-5 sm:p-6">
      <h3 className="mb-4 font-display text-sm font-bold text-slate-800 dark:text-white">Statistics</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <RateTile label="Success Rate" value={stats.successRate} icon={TrendingUp} accent="from-emerald-400 to-teal-600" />
        <RateTile label="Interview Rate" value={stats.interviewRate} icon={MessagesSquare} accent="from-amber-400 to-orange-500" />
        <RateTile label="Offer Rate" value={stats.offerRate} icon={Trophy} accent="from-brand-500 to-accent-700" />
        <RateTile label="Rejection Rate" value={stats.rejectionRate} icon={TrendingDown} accent="from-rose-400 to-rose-600" />
        <RateTile
          label="Avg. Applications / Month"
          value={stats.avgApplicationsPerMonth}
          suffix=""
          icon={CalendarRange}
          accent="from-sky-400 to-brand-600"
        />
      </div>
    </div>
  )
}
