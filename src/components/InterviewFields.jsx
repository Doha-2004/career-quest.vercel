import React from 'react'
import { CalendarClock } from 'lucide-react'
import { INTERVIEW_TYPES } from '../utils/constants'
import FormField from './FormField'
import SelectField from './SelectField'

// Shared by AddJob and the JobDetails edit form so the "Status = Interviewing"
// conditional fields only exist in one place.
export default function InterviewFields({ form, onChange, errors = {} }) {
  return (
    <div className="animate-fadeUp flex flex-col gap-5 rounded-xl2 border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-400/20 dark:bg-amber-400/[0.05] sm:p-5">
      <div className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300">
        <CalendarClock size={16} />
        Interview Scheduler
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Interview Date" error={errors.interviewDate}>
          <input
            type="date"
            value={form.interviewDate}
            onChange={(e) => onChange('interviewDate', e.target.value)}
            className="input-field"
          />
        </FormField>

        <FormField label="Interview Time">
          <input
            type="time"
            value={form.interviewTime}
            onChange={(e) => onChange('interviewTime', e.target.value)}
            className="input-field"
          />
        </FormField>
      </div>

      <FormField label="Interview Type">
        <SelectField
          value={form.interviewType}
          onChange={(e) => onChange('interviewType', e.target.value)}
          options={[{ value: '', label: 'Select type…' }, ...INTERVIEW_TYPES.map((t) => ({ value: t, label: t }))]}
          ariaLabel="Interview type"
          fullWidth
        />
      </FormField>

      <FormField label="Interview Notes" hint="Interviewer names, prep topics, logistics.">
        <textarea
          value={form.interviewNotes}
          onChange={(e) => onChange('interviewNotes', e.target.value)}
          rows={3}
          placeholder="Add interview details…"
          className="input-field resize-none"
        />
      </FormField>
    </div>
  )
}
