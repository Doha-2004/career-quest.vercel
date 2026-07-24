import React from 'react'
import { Check } from 'lucide-react'
import { STATUS } from '../utils/constants'
import { getTimelineStages, getTimelineStageIndex } from '../utils/timeline'

export default function ApplicationTimeline({ status }) {
  const stages = getTimelineStages()
  const currentIndex = getTimelineStageIndex(status)
  const isRejected = status === STATUS.REJECTED

  return (
    <div>
      <h3 className="mb-4 font-display text-sm font-bold text-slate-800 dark:text-white">Application Timeline</h3>

      {/* Desktop: horizontal timeline */}
      <div className="hidden items-center sm:flex" role="list" aria-label="Application progress">
        {stages.map((stage, idx) => {
          const isDone = idx < currentIndex || (idx === currentIndex && !isRejected)
          const isCurrent = idx === currentIndex && !isRejected
          return (
            <React.Fragment key={stage}>
              <div className="flex flex-col items-center gap-2" role="listitem">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                    isDone
                      ? 'border-transparent bg-gradient-to-br from-brand-500 to-accent-700 text-white shadow-glow-brand'
                      : 'border-slate-300 bg-white text-slate-400 dark:border-white/15 dark:bg-white/5 dark:text-slate-500'
                  } ${isCurrent ? 'ring-4 ring-brand-400/25' : ''}`}
                >
                  {isDone ? <Check size={15} /> : idx + 1}
                </div>
                <span
                  className={`max-w-[80px] text-center text-[11px] font-semibold leading-tight ${
                    isDone ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {stage}
                </span>
              </div>
              {idx < stages.length - 1 && (
                <div
                  className={`mx-1 mb-5 h-0.5 flex-1 rounded-full transition-all duration-300 ${
                    idx < currentIndex ? 'bg-gradient-to-r from-brand-500 to-accent-700' : 'bg-slate-200 dark:bg-white/10'
                  }`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="flex flex-col gap-0 sm:hidden" role="list" aria-label="Application progress">
        {stages.map((stage, idx) => {
          const isDone = idx < currentIndex || (idx === currentIndex && !isRejected)
          const isCurrent = idx === currentIndex && !isRejected
          const isLast = idx === stages.length - 1
          return (
            <div key={stage} className="flex gap-3" role="listitem">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold ${
                    isDone
                      ? 'border-transparent bg-gradient-to-br from-brand-500 to-accent-700 text-white'
                      : 'border-slate-300 bg-white text-slate-400 dark:border-white/15 dark:bg-white/5 dark:text-slate-500'
                  } ${isCurrent ? 'ring-4 ring-brand-400/25' : ''}`}
                >
                  {isDone ? <Check size={13} /> : idx + 1}
                </div>
                {!isLast && (
                  <div className={`w-0.5 flex-1 ${idx < currentIndex ? 'bg-brand-500' : 'bg-slate-200 dark:bg-white/10'}`} style={{ minHeight: 20 }} />
                )}
              </div>
              <span
                className={`pb-5 text-sm font-semibold ${isDone ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}
              >
                {stage}
              </span>
            </div>
          )
        })}
      </div>

      {isRejected && (
        <p className="mt-1 text-xs font-medium text-rose-500">This application was marked as Rejected.</p>
      )}
    </div>
  )
}
