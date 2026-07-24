import React from 'react'
import { Link2 } from 'lucide-react'

// Renders nothing when there's no link — Job Details simply omits this row,
// per the requirement to show nothing when a job has no posting URL.
export default function JobPostLink({ url }) {
  if (!url || !url.trim()) return null

  return (
    <a
      href={url.trim()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
    >
      <Link2 size={15} />
      View Job Post
    </a>
  )
}
