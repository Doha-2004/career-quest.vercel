import React from 'react'
import { ArrowDownUp, Star } from 'lucide-react'
import { STATUS_LIST } from '../utils/constants'
import SelectField from './SelectField'

export default function FilterBar({ statusFilter, onStatusChange, sortOrder, onSortChange, favoritesOnly, onFavoritesToggle }) {
  const statusOptions = [
    { value: 'All', label: 'All statuses' },
    ...STATUS_LIST.map((s) => ({ value: s, label: s })),
  ]

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SelectField
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        options={statusOptions}
        ariaLabel="Filter by status"
      />

      <button
        onClick={onFavoritesToggle}
        aria-pressed={favoritesOnly}
        className={`flex items-center gap-2 rounded-xl2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
          favoritesOnly ? 'btn-gradient' : 'btn-ghost'
        }`}
      >
        <Star size={16} className={favoritesOnly ? 'fill-white' : ''} />
        {favoritesOnly ? 'Favorites' : 'All jobs'}
      </button>

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
