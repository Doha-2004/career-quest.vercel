import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'
import { STORAGE_KEYS, STATUS } from '../utils/constants'

const AppContext = createContext(null)

function generateId() {
  return `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

const SEED_JOBS = [
  {
    id: generateId(),
    company: 'Nimbus Analytics',
    title: 'Frontend Engineer',
    status: STATUS.INTERVIEWING,
    appliedDate: new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10),
    notes: 'Recruiter screen went well. Technical round scheduled for next week — review system design basics.',
    createdAt: Date.now() - 6 * 86400000,
  },
  {
    id: generateId(),
    company: 'Solstice Labs',
    title: 'Product Designer',
    status: STATUS.APPLIED,
    appliedDate: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10),
    notes: 'Applied through referral from Priya. Portfolio tailored to their design system work.',
    createdAt: Date.now() - 2 * 86400000,
  },
  {
    id: generateId(),
    company: 'Harborlight',
    title: 'Senior React Developer',
    status: STATUS.OFFER,
    appliedDate: new Date(Date.now() - 20 * 86400000).toISOString().slice(0, 10),
    notes: 'Offer received: competitive base + equity. Need to respond by Friday.',
    createdAt: Date.now() - 20 * 86400000,
  },
]

export function AppProvider({ children }) {
  const [jobs, setJobs] = useState(() => loadFromStorage(STORAGE_KEYS.JOBS, SEED_JOBS))
  const [theme, setTheme] = useState(() => loadFromStorage(STORAGE_KEYS.THEME, 'light'))
  const [toasts, setToasts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate a brief load so skeleton states have something real to show,
  // and so first paint doesn't flash unstyled content on slow devices.
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.JOBS, jobs)
  }, [jobs])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const showToast = useCallback((message, variant = 'success') => {
    const id = generateId()
    setToasts((prev) => [...prev, { id, message, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addJob = useCallback(
    (job) => {
      const newJob = {
        id: generateId(),
        createdAt: Date.now(),
        notes: '',
        ...job,
      }
      setJobs((prev) => [newJob, ...prev])
      showToast(`${job.company} added to your tracker`, 'success')
      return newJob.id
    },
    [showToast]
  )

  const updateJob = useCallback(
    (id, updates) => {
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updates } : j)))
      showToast('Application updated', 'success')
    },
    [showToast]
  )

  const deleteJob = useCallback(
    (id) => {
      setJobs((prev) => prev.filter((j) => j.id !== id))
      showToast('Application deleted', 'info')
    },
    [showToast]
  )

  const getJobById = useCallback((id) => jobs.find((j) => j.id === id), [jobs])

  const importJobs = useCallback(
    (incoming) => {
      if (!Array.isArray(incoming)) {
        showToast('Import failed: file is not a valid job list', 'error')
        return
      }
      const cleaned = incoming
        .filter((j) => j && j.company && j.title)
        .map((j) => ({
          id: j.id || generateId(),
          company: j.company,
          title: j.title,
          status: Object.values(STATUS).includes(j.status) ? j.status : STATUS.APPLIED,
          appliedDate: j.appliedDate || new Date().toISOString().slice(0, 10),
          notes: j.notes || '',
          createdAt: j.createdAt || Date.now(),
        }))
      setJobs((prev) => [...cleaned, ...prev])
      showToast(`Imported ${cleaned.length} application${cleaned.length === 1 ? '' : 's'}`, 'success')
    },
    [showToast]
  )

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(
    () => ({
      jobs,
      isLoading,
      theme,
      toggleTheme,
      addJob,
      updateJob,
      deleteJob,
      getJobById,
      importJobs,
      toasts,
      showToast,
      dismissToast,
    }),
    [jobs, isLoading, theme, toggleTheme, addJob, updateJob, deleteJob, getJobById, importJobs, toasts, showToast, dismissToast]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within an AppProvider')
  return ctx
}
