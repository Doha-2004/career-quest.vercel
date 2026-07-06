import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, Save, X, Calendar, NotebookText } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { STATUS_LIST } from '../utils/constants'
import CompanyLogo from '../components/CompanyLogo'
import StatusBadge from '../components/StatusBadge'
import FormField from '../components/FormField'
import ConfirmModal from '../components/ConfirmModal'
import EmptyState from '../components/EmptyState'
import PageTransition from '../components/PageTransition'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getJobById, updateJob, deleteJob } = useAppContext()
  const job = getJobById(id)

  const [isEditing, setIsEditing] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [form, setForm] = useState(job ? { ...job } : null)
  const [errors, setErrors] = useState({})

  if (!job) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <EmptyState
            title="Application not found"
            description="This application may have been deleted, or the link is no longer valid."
            showAction={false}
          />
          <div className="mt-4 flex justify-center">
            <Link to="/" className="btn-gradient flex items-center gap-2 rounded-xl2 px-5 py-2.5 text-sm">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.company.trim()) next.company = 'Company name is required.'
    if (!form.title.trim()) next.title = 'Job title is required.'
    if (!form.appliedDate) next.appliedDate = 'Application date is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    updateJob(job.id, {
      company: form.company.trim(),
      title: form.title.trim(),
      status: form.status,
      appliedDate: form.appliedDate,
      notes: form.notes.trim(),
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setForm({ ...job })
    setErrors({})
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteJob(job.id)
    navigate('/')
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-5 flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="glass-card animate-fadeUp p-6 sm:p-7">
          {!isEditing ? (
            <>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <CompanyLogo company={job.company} size="lg" />
                  <div>
                    <h1 className="font-display text-xl font-extrabold text-slate-800 dark:text-white sm:text-2xl">{job.title}</h1>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{job.company}</p>
                  </div>
                </div>
                <StatusBadge status={job.status} />
              </div>

              <div className="my-6 h-px bg-slate-200/70 dark:bg-white/10" />

              <div className="mb-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Calendar size={16} className="text-brand-500" />
                Applied on <span className="font-semibold">{formatDate(job.appliedDate)}</span>
              </div>

              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <NotebookText size={16} className="text-brand-500" />
                Notes
              </div>
              <p className="whitespace-pre-wrap rounded-xl2 bg-slate-50/70 p-4 text-sm leading-relaxed text-slate-600 dark:bg-white/[0.03] dark:text-slate-300">
                {job.notes?.trim() ? job.notes : 'No notes added yet.'}
              </p>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setConfirmOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-xl2 border border-rose-200 bg-rose-50 px-5 py-2.5 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-100 active:scale-[0.98] dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300 dark:hover:bg-rose-400/20"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-gradient flex items-center justify-center gap-2 rounded-xl2 px-5 py-2.5 text-sm"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-5 font-display text-lg font-bold text-slate-800 dark:text-white">Edit Application</h2>
              <div className="flex flex-col gap-5">
                <FormField label="Company Name" required error={errors.company}>
                  <input type="text" value={form.company} onChange={(e) => update('company', e.target.value)} className="input-field" />
                </FormField>

                <FormField label="Job Title" required error={errors.title}>
                  <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} className="input-field" />
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
                      max={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => update('appliedDate', e.target.value)}
                      className="input-field"
                    />
                  </FormField>
                </div>

                <FormField label="Notes">
                  <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={5} className="input-field resize-none" />
                </FormField>

                <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button onClick={handleCancelEdit} className="btn-ghost flex items-center justify-center gap-2 rounded-xl2 px-5 py-2.5 text-sm font-semibold">
                    <X size={16} />
                    Cancel
                  </button>
                  <button onClick={handleSave} className="btn-gradient flex items-center justify-center gap-2 rounded-xl2 px-5 py-2.5 text-sm">
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete this application?"
        description={`This will permanently remove ${job.company} — ${job.title} from your tracker. This can't be undone.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </PageTransition>
  )
}
