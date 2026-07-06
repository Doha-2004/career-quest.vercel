import React from 'react'

export function StatCardSkeleton() {
  return (
    <div className="glass-card flex items-center gap-4 p-5">
      <div className="skeleton h-12 w-12" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-5 w-12" />
        <div className="skeleton h-3 w-20" />
      </div>
    </div>
  )
}

export function JobCardSkeleton() {
  return (
    <div className="glass-card flex flex-col gap-4 p-5">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 rounded-xl2" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-9 w-full rounded-xl2" />
    </div>
  )
}
