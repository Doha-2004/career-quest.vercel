import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, Save, X, Calendar, NotebookText, CalendarClock } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { STATUS, STATUS_LIST } from '../utils/constants'
import { isValidUrl } from '../utils/validation'
import { formatDateLong } from '../utils/dateUtils'
import CompanyLogo from '../components/CompanyLogo'
import StatusBadge from '../components/StatusBadge'
import FormField from '../components/FormField'
import SelectField from '../components/SelectField'
import JobPostLink from '../components/JobPostLink'
import InterviewFields from '../components/InterviewFields'
import FavoriteToggle from '../components/FavoriteToggle'
import ApplicationTimeline from '../components/ApplicationTimeline'
import ConfirmModal from '../components/ConfirmModal'
import EmptyState from '../components/EmptyState'
import PageTransition from '../components/PageTransition'

function withDefaults(job) {
  return {
    ...job,
    jobPostLink: job.jobPostLink || '',
    interviewDate: job.interviewDate || '',
    interviewTime: job.interviewTime || '',
    interviewType: job.interviewType || '',
    interviewNotes: job.interviewNotes || '',
  }
}

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getJobById, updateJob, deleteJob, toggleFavorite } = useAppContext()
  const job = getJobById(id)

  const [isEditing, setIsEditing] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [form, setForm] = useState(job ? withDefaults(job) : null)
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
    if (form.jobPostLink.trim() && !isValidUrl(form.jobPostLink)) {
      next.jobPostLink = 'Enter a valid URL (e.g. https://company.com/job/123).'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    const isInterviewing = form.status === STATUS.INTERVIEWING
    updateJob(job.id, {
      company: form.company.trim(),
      title: form.title.trim(),
      status: form.status,
      appliedDate: form.appliedDate,
      notes: form.notes.trim(),
      jobPostLink: form.jobPostLink.trim(),
      interviewDate: isInterviewing ? form.interviewDate : '',
      interviewTime: isInterviewing ? form.interviewTime : '',
      interviewType: isInterviewing ? form.interviewType : '',
      interviewNotes: isInterviewing ? form.interviewNotes.trim() : '',
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setForm(withDefaults(job))
    setErrors({})
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteJob(job.id)
    navigate('/')
  }

  const hasInterviewInfo =
    job.status === STATUS.INTERVIEWING && (job.interviewDate || job.interviewTime || job.interviewType || job.interviewNotes)

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
                    <div className="flex items-center gap-2">
                      <h1 className="font-display text-xl font-extrabold text-slate-800 dark:text-white sm:text-2xl">{job.title}</h1>
                      <FavoriteToggle isFavorite={Boolean(job.isFavorite)} onToggle={() => toggleFavorite(job.id)} />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{job.company}</p>
                  </div>
                </div>
                <StatusBadge status={job.status} />
              </div>

              <div className="my-6 h-px bg-slate-200/70 dark:bg-white/10" />

              <div className="mb-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Calendar size={16} className="text-brand-500" />
                Applied on <span className="font-semibold">{formatDateLong(job.appliedDate)}</span>
              </div>

              {hasInterviewInfo && (
                <div className="mb-6 rounded-xl2 border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-400/20 dark:bg-amber-400/[0.05]">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300">
                    <CalendarClock size={16} />
                    Interview Details
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
                    {job.interviewDate && (
                      <span>
                        <span className="font-semibold">Date:</span> {formatDateLong(job.interviewDate)}
                      </span>
                    )}
                    {job.interviewTime && (
                      <span>
                        <span className="font-semibold">Time:</span> {job.interviewTime}
                      </span>
                    )}
                    {job.interviewType && (
                      <span>
                        <span className="font-semibold">Type:</span> {job.interviewType}
                      </span>
                    )}
                  </div>
                  {job.interviewNotes && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300">{job.interviewNotes}</p>
                  )}
                </div>
              )}

              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <NotebookText size={16} className="text-brand-500" />
                Notes
              </div>
              <p className="whitespace-pre-wrap rounded-xl2 bg-slate-50/70 p-4 text-sm leading-relaxed text-slate-600 dark:bg-white/[0.03] dark:text-slate-300">
                {job.notes?.trim() ? job.notes : 'No notes added yet.'}
              </p>

              {job.jobPostLink?.trim() && (
                <div className="mt-4">
                  <JobPostLink url={job.jobPostLink} />
                </div>
              )}

              <div className="my-7 h-px bg-slate-200/70 dark:bg-white/10" />

              <ApplicationTimeline status={job.status} />

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
                    <SelectField
                      value={form.status}
                      onChange={(e) => update('status', e.target.value)}
                      options={STATUS_LIST.map((s) => ({ value: s, label: s }))}
                      ariaLabel="Application status"
                      fullWidth
                    />
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

                {form.status === STATUS.INTERVIEWING && (
                  <InterviewFields form={form} onChange={update} errors={errors} />
                )}

                <FormField label="Notes">
                  <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={5} className="input-field resize-none" />
                </FormField>

                <FormField label="Job Post Link" error={errors.jobPostLink} hint="Optional — paste the original job posting URL.">
                  <input
                    type="url"
                    value={form.jobPostLink}
                    onChange={(e) => update('jobPostLink', e.target.value)}
                    placeholder="https://company.com/job/..."
                    className="input-field"
                  />
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
