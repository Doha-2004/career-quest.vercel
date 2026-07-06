import React from 'react'
import { Sparkles } from 'lucide-react'

export default function QuestProgressBar({ progress }) {
  return (
    <div className="glass-card animate-fadeUp p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-brand-500" />
          <h3 className="font-display text-sm font-bold text-slate-800 dark:text-white">Quest Progress</h3>
        </div>
        <span className="font-display text-sm font-extrabold text-brand-600 dark:text-brand-300">{progress}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
        <div
          style={{ '--progress-width': `${progress}%` }}
          className="h-full animate-progressFill rounded-full bg-gradient-to-r from-brand-500 via-accent-600 to-accent-700"
        />
      </div>
      <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
        Based on how many applications you've sent and how they're converting into interviews and offers.
      </p>
    </div>
  )
}
