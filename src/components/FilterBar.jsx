import React from 'react'
import { ArrowDownUp } from 'lucide-react'
import { STATUS_LIST } from '../utils/constants'

export default function FilterBar({ statusFilter, onStatusChange, sortOrder, onSortChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="input-field w-auto cursor-pointer py-2.5 pr-9"
        aria-label="Filter by status"
      >
        <option value="All">All statuses</option>
        {STATUS_LIST.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        onClick={() => onSortChange(sortOrder === 'newest' ? 'oldest' : 'newest')}
        className="btn-ghost flex items-center gap-2 rounded-xl2 px-4 py-2.5 text-sm font-semibold"
      >
        <ArrowDownUp size={16} />
        {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
      </button>
    </div>
  )
}
