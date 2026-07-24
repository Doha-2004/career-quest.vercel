import React, { useState } from 'react'
import { AlertTriangle, Settings2 } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export default function InterviewAlertCard() {
  const { alertThreshold, updateAlertThreshold } = useAppContext()
  const [showSettings, setShowSettings] = useState(false)
  const [draftThreshold, setDraftThreshold] = useState(alertThreshold)

  const handleSave = () => {
    updateAlertThreshold(draftThreshold)
    setShowSettings(false)
  }

  return (
    <div className="glass-card animate-fadeUp relative overflow-hidden border border-amber-200/70 bg-gradient-to-br from-amber-50/80 via-white/70 to-brand-50/60 p-5 dark:border-amber-400/20 dark:from-amber-400/[0.06] dark:via-white/[0.03] dark:to-brand-500/[0.06] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl2 bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-glow-brand">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-slate-800 dark:text-white">
              You've applied to many jobs but haven't received any interviews yet
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
              It might be a good time to review your CV, improve your portfolio, or tailor your applications.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="btn-gradient rounded-xl2 px-4 py-2 text-sm">Review My CV</button>
              <button
                onClick={() => setShowSettings((v) => !v)}
                className="btn-ghost flex items-center gap-1.5 rounded-xl2 px-3.5 py-2 text-xs font-semibold"
              >
                <Settings2 size={14} />
                Alert settings
              </button>
            </div>

            {showSettings && (
              <div className="animate-fadeUp mt-4 flex flex-wrap items-center gap-3 rounded-xl2 border border-slate-200/70 bg-white/70 p-3.5 dark:border-white/10 dark:bg-white/[0.04]">
                <label htmlFor="alert-threshold" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Interview Alert Threshold
                </label>
                <input
                  id="alert-threshold"
                  type="number"
                  min={1}
                  value={draftThreshold}
                  onChange={(e) => setDraftThreshold(e.target.value)}
                  className="input-field w-20 py-1.5 text-center"
                />
                <button onClick={handleSave} className="btn-gradient rounded-xl2 px-3.5 py-1.5 text-xs">
                  Save
                </button>
                <span className="basis-full text-xs text-slate-400">
                  Applied applications ≥ this number with zero interviews will trigger this alert.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
