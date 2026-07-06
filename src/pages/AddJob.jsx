import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, X, Briefcase } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { STATUS, STATUS_LIST } from '../utils/constants'
import FormField from '../components/FormField'
import PageTransition from '../components/PageTransition'

const todayStr = () => new Date().toISOString().slice(0, 10)

export default function AddJob() {
  const navigate = useNavigate()
  const { addJob } = useAppContext()

  const [form, setForm] = useState({
    company: '',
    title: '',
    status: STATUS.APPLIED,
    appliedDate: todayStr(),
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.company.trim()) next.company = 'Company name is required.'
    if (!form.title.trim()) next.title = 'Job title is required.'
    if (!form.appliedDate) {
      next.appliedDate = 'Application date is required.'
    } else if (new Date(form.appliedDate) > new Date(todayStr())) {
      next.appliedDate = 'Application date cannot be in the future.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const id = addJob({
      company: form.company.trim(),
      title: form.title.trim(),
      status: form.status,
      appliedDate: form.appliedDate,
      notes: form.notes.trim(),
    })
    navigate(`/job/${id}`)
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-brand-500 to-accent-700 text-white shadow-glow-brand">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold text-slate-800 dark:text-white sm:text-2xl">Add Application</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Log a new role you've applied to.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="glass-card animate-fadeUp flex flex-col gap-5 p-6 sm:p-7">
          <FormField label="Company Name" required error={errors.company}>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="e.g. Nimbus Analytics"
              className="input-field"
            />
          </FormField>

          <FormField label="Job Title" required error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="input-field"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Status" required>
              <select value={form.status} onChange={(e) => update('status', e.target.value)} className="input-field cursor-pointer">
                {STATUS_LIST.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Application Date" required error={errors.appliedDate}>
              <input
                type="date"
                value={form.appliedDate}
                max={todayStr()}
                onChange={(e) => update('appliedDate', e.target.value)}
                className="input-field"
              />
            </FormField>
          </div>

          <FormField label="Notes" hint="Interview prep, contacts, salary details — anything worth remembering.">
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Add any details about this application…"
              rows={5}
              className="input-field resize-none"
            />
          </FormField>

          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-ghost flex items-center justify-center gap-2 rounded-xl2 px-5 py-2.5 text-sm font-semibold"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-gradient flex items-center justify-center gap-2 rounded-xl2 px-5 py-2.5 text-sm"
            >
              <Save size={16} />
              Save Application
            </button>
          </div>
        </form>
      </div>
    </PageTransition>
  )
}
