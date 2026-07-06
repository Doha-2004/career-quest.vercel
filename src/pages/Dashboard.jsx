import React, { useMemo, useState } from 'react'
import { Briefcase, Send, MessagesSquare, Trophy, XCircle } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { STATUS } from '../utils/constants'
import { getUnlockedAchievements, getQuestProgress, getMotivationalMessage } from '../utils/achievements'
import StatCard from '../components/StatCard'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import JobCard from '../components/JobCard'
import EmptyState from '../components/EmptyState'
import QuestProgressBar from '../components/QuestProgressBar'
import AchievementBadges from '../components/AchievementBadges'
import PageTransition from '../components/PageTransition'
import { StatCardSkeleton, JobCardSkeleton } from '../components/LoadingSkeleton'

export default function Dashboard() {
  const { jobs, isLoading } = useAppContext()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')

  const stats = useMemo(
    () => ({
      total: jobs.length,
      applied: jobs.filter((j) => j.status === STATUS.APPLIED).length,
      interviewing: jobs.filter((j) => j.status === STATUS.INTERVIEWING).length,
      offers: jobs.filter((j) => j.status === STATUS.OFFER).length,
      rejected: jobs.filter((j) => j.status === STATUS.REJECTED).length,
    }),
    [jobs]
  )

  const achievements = useMemo(() => getUnlockedAchievements(jobs), [jobs])
  const progress = useMemo(() => getQuestProgress(jobs), [jobs])
  const motivation = useMemo(() => getMotivationalMessage(jobs), [jobs])

  const filteredJobs = useMemo(() => {
    let result = [...jobs]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter((j) => j.company.toLowerCase().includes(q) || j.title.toLowerCase().includes(q))
    }
    if (statusFilter !== 'All') {
      result = result.filter((j) => j.status === statusFilter)
    }
    result.sort((a, b) => (sortOrder === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt))
    return result
  }, [jobs, search, statusFilter, sortOrder])

  const hasAnyJobs = jobs.length > 0
  const hasFilteredResults = filteredJobs.length > 0

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome section */}
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="font-display text-2xl font-extrabold text-slate-800 dark:text-white sm:text-3xl">
            Welcome back, Job Seeker 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-base">{motivation}</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatCard label="Total Applications" value={stats.total} icon={Briefcase} accent="from-brand-500 to-accent-700" />
              <StatCard label="Applied" value={stats.applied} icon={Send} accent="from-sky-400 to-brand-600" />
              <StatCard label="Interviewing" value={stats.interviewing} icon={MessagesSquare} accent="from-amber-400 to-orange-500" />
              <StatCard label="Offers" value={stats.offers} icon={Trophy} accent="from-emerald-400 to-teal-600" />
              <StatCard label="Rejected" value={stats.rejected} icon={XCircle} accent="from-rose-400 to-rose-600" />
            </>
          )}
        </div>

        {/* Gamification */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <QuestProgressBar progress={progress} />
          </div>
          <div className="lg:col-span-2">
            <AchievementBadges achievements={achievements} />
          </div>
        </div>

        {/* Search + filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar statusFilter={statusFilter} onStatusChange={setStatusFilter} sortOrder={sortOrder} onSortChange={setSortOrder} />
        </div>

        {/* Job list */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : !hasAnyJobs ? (
          <EmptyState
            title="No applications yet"
            description="Start your quest by logging the first role you've applied to. Every great job search begins with one entry."
          />
        ) : !hasFilteredResults ? (
          <EmptyState
            title="No matches found"
            description="Try adjusting your search or filter — nothing in your tracker matches those criteria right now."
            showAction={false}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
