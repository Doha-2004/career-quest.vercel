import React from 'react'
import { Star } from 'lucide-react'

export default function FavoriteToggle({ isFavorite, onToggle, size = 18, className = '' }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
      title={isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
      className={`flex items-center justify-center rounded-full p-1.5 transition-all duration-200 hover:scale-110 active:scale-95 ${className}`}
    >
      <Star
        size={size}
        className={isFavorite ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-slate-300 dark:text-slate-500'}
        strokeWidth={2}
      />
    </button>
  )
}
