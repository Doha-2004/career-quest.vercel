import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Compass, Plus, Moon, SunMedium, Download, Upload, Menu, X } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { computeStatistics } from '../utils/stats'

export default function Navbar() {
  const { theme, toggleTheme, jobs, importJobs, showToast } = useAppContext()
  const [mobileOpen, setMobileOpen] = useState(false)
  const fileInputRef = useRef(null)

  const handleExport = () => {
    const exportPayload = {
      exportDate: new Date().toISOString(),
      totalJobs: jobs.length,
      statistics: computeStatistics(jobs),
      jobs,
    }
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `career-quest-export-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    showToast('Applications exported to JSON', 'success')
  }

  const handleImportClick = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result)
        importJobs(parsed)
      } catch (err) {
        showToast('Import failed: invalid JSON file', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const navLinkClasses = ({ isActive }) =>
    `rounded-xl2 px-4 py-2 text-sm font-semibold transition-all duration-200 ${
      isActive ? 'btn-gradient' : 'text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-white/5'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl dark:border-white/5 dark:bg-[#0b0b1a]/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl2 bg-gradient-to-br from-brand-500 to-accent-700 text-white shadow-glow-brand">
            <Compass size={18} strokeWidth={2.25} />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-800 dark:text-white">
            Career<span className="text-brand-600 dark:text-brand-300">Quest</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" end className={navLinkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/add" className={navLinkClasses}>
            Add Job
          </NavLink>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button onClick={handleExport} className="btn-ghost flex items-center gap-1.5 rounded-xl2 px-3.5 py-2 text-sm font-semibold" title="Export applications to JSON">
            <Download size={16} />
            Export
          </button>
          <button onClick={handleImportClick} className="btn-ghost flex items-center gap-1.5 rounded-xl2 px-3.5 py-2 text-sm font-semibold" title="Import applications from JSON">
            <Upload size={16} />
            Import
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileChange} className="hidden" />
          <button
            onClick={toggleTheme}
            className="btn-ghost flex h-9 w-9 items-center justify-center rounded-xl2"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {theme === 'light' ? <Moon size={17} /> : <SunMedium size={17} />}
          </button>
          <NavLink to="/add" className="btn-gradient flex items-center gap-1.5 rounded-xl2 px-4 py-2 text-sm">
            <Plus size={16} />
            Add Job
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="btn-ghost flex h-9 w-9 items-center justify-center rounded-xl2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fadeUp flex flex-col gap-2 border-t border-white/40 px-4 py-4 dark:border-white/5 md:hidden">
          <NavLink to="/" end onClick={() => setMobileOpen(false)} className={navLinkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/add" onClick={() => setMobileOpen(false)} className={navLinkClasses}>
            Add Job
          </NavLink>
          <div className="mt-1 flex items-center gap-2">
            <button onClick={handleExport} className="btn-ghost flex flex-1 items-center justify-center gap-1.5 rounded-xl2 px-3.5 py-2 text-sm font-semibold">
              <Download size={16} />
              Export
            </button>
            <button onClick={handleImportClick} className="btn-ghost flex flex-1 items-center justify-center gap-1.5 rounded-xl2 px-3.5 py-2 text-sm font-semibold">
              <Upload size={16} />
              Import
            </button>
            <button onClick={toggleTheme} className="btn-ghost flex h-9 w-9 shrink-0 items-center justify-center rounded-xl2" aria-label="Toggle dark mode">
              {theme === 'light' ? <Moon size={17} /> : <SunMedium size={17} />}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
