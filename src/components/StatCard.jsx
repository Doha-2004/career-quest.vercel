import React from 'react'

export default function StatCard({ label, value, icon: Icon, accent = 'from-brand-500 to-accent-700' }) {
  return (
    <div className="glass-card animate-fadeUp flex items-center gap-4 p-5">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-gradient-to-br ${accent} text-white shadow-glow-brand`}>
        <Icon size={22} strokeWidth={2.25} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-display font-extrabold leading-tight text-slate-800 dark:text-white">{value}</p>
        <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  )
}
