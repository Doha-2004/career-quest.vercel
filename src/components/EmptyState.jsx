import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Compass, Plus } from 'lucide-react'

export default function EmptyState({ title, description, showAction = true }) {
  const navigate = useNavigate()

  return (
    <div className="glass-card animate-fadeUp flex flex-col items-center gap-4 px-6 py-16 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-accent-100 dark:from-brand-500/10 dark:to-accent-500/10">
        <Compass size={40} className="animate-floatSlow text-brand-500" strokeWidth={1.75} />
      </div>
      <div className="max-w-sm">
        <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      {showAction && (
        <button
          onClick={() => navigate('/add')}
          className="btn-gradient mt-2 flex items-center gap-2 rounded-xl2 px-5 py-2.5 text-sm"
        >
          <Plus size={17} />
          Add your first application
        </button>
      )}
    </div>
  )
}
