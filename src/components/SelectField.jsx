import React from 'react'
import { ChevronDown } from 'lucide-react'

// Native <select> elements ignore most text-input styling and keep the
// browser's own arrow, which is what was clashing with the glass inputs.
// This wraps a select with appearance-none + a matching chevron so every
// dropdown in the app looks consistent across browsers.
export default function SelectField({ value, onChange, options, className = '', ariaLabel, fullWidth = false }) {
  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'w-auto'}`}>
      <select
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className={`input-field appearance-none cursor-pointer pr-10 ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  )
}
