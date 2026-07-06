import React from 'react'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const VARIANT_STYLES = {
  success: { icon: CheckCircle2, classes: 'from-emerald-500 to-teal-500' },
  info: { icon: Info, classes: 'from-sky-500 to-brand-500' },
  error: { icon: AlertTriangle, classes: 'from-rose-500 to-orange-500' },
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useAppContext()

  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2.5 sm:bottom-6 sm:right-6">
      {toasts.map((toast) => {
        const variant = VARIANT_STYLES[toast.variant] || VARIANT_STYLES.success
        const Icon = variant.icon
        return (
          <div
            key={toast.id}
            className="glass-panel animate-fadeUp pointer-events-auto flex items-center gap-3 rounded-xl2 px-4 py-3.5"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${variant.classes} text-white`}>
              <Icon size={16} />
            </div>
            <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-100">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
