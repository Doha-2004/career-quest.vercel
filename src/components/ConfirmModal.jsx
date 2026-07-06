import React, { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function ConfirmModal({
  isOpen,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeUp"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="glass-panel animate-popIn w-full max-w-sm rounded-xl3 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl2 ${
            danger ? 'bg-rose-100 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300' : 'bg-brand-100 text-brand-600 dark:bg-brand-400/10 dark:text-brand-300'
          }`}
        >
          <AlertTriangle size={20} />
        </div>
        <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
        {description && <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>}

        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className="btn-ghost flex-1 rounded-xl2 py-2.5 text-sm font-semibold">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl2 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98] ${
              danger ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:brightness-110' : 'btn-gradient'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
