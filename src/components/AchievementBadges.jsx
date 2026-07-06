import React from 'react'
import { Rocket, Flame, MessagesSquare, Trophy, Lock } from 'lucide-react'

const ICONS = { Rocket, Flame, MessagesSquare, Trophy }

export default function AchievementBadges({ achievements }) {
  return (
    <div className="glass-card animate-fadeUp p-5">
      <h3 className="mb-4 font-display text-sm font-bold text-slate-800 dark:text-white">Achievements</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {achievements.map((a) => {
          const Icon = ICONS[a.icon] || Trophy
          return (
            <div
              key={a.id}
              title={a.description}
              className={`flex flex-col items-center gap-2 rounded-xl2 border p-3.5 text-center transition-all duration-300 ${
                a.unlocked
                  ? 'border-brand-200 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-500/10 dark:to-accent-500/10 dark:border-brand-400/20'
                  : 'border-slate-200/70 bg-slate-50/60 opacity-60 dark:border-white/10 dark:bg-white/[0.03]'
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  a.unlocked ? 'bg-gradient-to-br from-brand-500 to-accent-700 text-white shadow-glow-brand' : 'bg-slate-200 text-slate-400 dark:bg-white/10'
                }`}
              >
                {a.unlocked ? <Icon size={18} /> : <Lock size={16} />}
              </div>
              <span className="text-[11px] font-semibold leading-tight text-slate-700 dark:text-slate-200">{a.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
