import React from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-accent-100 dark:from-brand-500/10 dark:to-accent-500/10">
          <Compass size={30} className="text-brand-500" />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-slate-800 dark:text-white">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">This part of the map hasn't been charted yet.</p>
        <Link to="/" className="btn-gradient mt-6 rounded-xl2 px-5 py-2.5 text-sm">
          Back to Dashboard
        </Link>
      </div>
    </PageTransition>
  )
}
