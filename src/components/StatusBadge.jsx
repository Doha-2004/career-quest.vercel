import React from 'react'
import { STATUS_STYLES } from '../utils/constants'

export default function StatusBadge({ status, size = 'md' }) {
  const styles = STATUS_STYLES[status] || STATUS_STYLES.Applied
  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-xs px-3 py-1.5'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${sizeClasses} ${styles.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  )
}
