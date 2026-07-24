import React, { useMemo, useState } from 'react'
import { Briefcase, Send, MessagesSquare, Trophy, XCircle } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { computeStatistics } from '../utils/stats'
import { getUnlockedAchievements, getQuestProgress, getMotivationalMessage } from '../utils/achievements'
import StatCard from '../components/StatCard'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import JobCard from '../components/JobCard'
import EmptyState from '../components/EmptyState'
import QuestProgressBar from '../components/QuestProgressBar'
import AchievementBadges from '../components/AchievementBadges'
import InterviewAlertCard from '../components/InterviewAlertCard'
import UpcomingInterviews, { InterviewTodayBanner } from '../components/UpcomingInterviews'
import AnalyticsCharts from '../components/AnalyticsCharts'
import StatisticsPanel from '../components/StatisticsPanel'
import PageTransition from '../components/PageTransition'
import { StatCardSkeleton, JobCardSkeleton } from '../components/LoadingSkeleton'

export default function Dashboard() {
  const { jobs, isLoading, alertThreshold } = useAppContext()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  // Single source of truth for every count/rate shown across the dashboard,
  // the analytics charts, and the JSON export.
  const stats = useMemo(() => computeStatistics(jobs), [jobs])

  const achievements = useMemo(() => getUnlockedAchievements(jobs), [jobs])
  const progress = useMemo(() => getQuestProgress(jobs), [jobs])
  const motivation = useMemo(() => getMotivationalMessage(jobs), [jobs])

  const showInterviewAlert = useMemo(
    () => stats.applied >= alertThreshold && stats.interviewing === 0,
    [stats.applied, stats.interviewing, alertThreshold]
  )

  const filteredJobs = useMemo(() => {
    let result = [...jobs]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (j) =>
          j.company.toLowerCase().includes(q) ||
          j.title.toLowerCase().includes(q) ||
          (j.notes || '').toLowerCase().includes(q) ||
          (j.jobPostLink || '').toLowerCase().includes(q)
      )
    }
    if (statusFilter !== 'All') {
      result = result.filter((j) => j.status === statusFilter)
    }
    if (favoritesOnly) {
      result = result.filter((j) => j.isFavorite)
    }
    result.sort((a, b) => (sortOrder === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt))
    return result
  }, [jobs, search, statusFilter, sortOrder, favoritesOnly])

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

        {/* Interview today banner */}
        {!isLoading && <InterviewTodayBanner jobs={jobs} />}

        {/* Smart Job Search Alert */}
        {!isLoading && showInterviewAlert && (
          <div className="mb-6">
            <InterviewAlertCard />
          </div>
        )}

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

        {/* Upcoming interviews */}
        {!isLoading && <UpcomingInterviews jobs={jobs} />}

        {/* Analytics */}
        {!isLoading && hasAnyJobs && (
          <div className="mb-6">
            <AnalyticsCharts jobs={jobs} />
          </div>
        )}

        {/* Statistics */}
        {!isLoading && hasAnyJobs && (
          <div className="mb-6">
            <StatisticsPanel stats={stats} />
          </div>
        )}

        {/* Search + filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={search} onChange={setSearch} placeholder="Search company, role, notes, or link…" />
          <FilterBar
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            favoritesOnly={favoritesOnly}
            onFavoritesToggle={() => setFavoritesOnly((v) => !v)}
          />
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
            title="Start your job search journey."
            description="Log your first application to begin tracking offers, interviews, and everything in between."
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
