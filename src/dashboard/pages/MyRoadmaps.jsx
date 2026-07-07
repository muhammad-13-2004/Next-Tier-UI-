import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import RoadmapCard from '../features/roadmap/components/RoadmapCard'
import RoadmapDetail from './RoadmapDetail'
import { useCourseStore } from '@/store/courseStore'
import LoadingImage from '@/assets/nexttier-icon.png'

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'not-started', label: 'Saved' },
]

const MyRoadmaps = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [filter, setFilter] = useState('all')
  const courses = useCourseStore((s) => s.courses)
  const loadCourses = useCourseStore((s) => s.loadCourses)
  const loadCourse = useCourseStore((s) => s.loadCourse)
  const activeCourse = useCourseStore((s) => s.activeCourse)
  const loading = useCourseStore((s) => s.loading)
  const requestedSlugRef = useRef(null)

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  useEffect(() => {
    if (!slug) {
      requestedSlugRef.current = null
      return
    }

    if (requestedSlugRef.current === String(slug)) return

    requestedSlugRef.current = String(slug)
    loadCourse(slug)
  }, [slug, loadCourse])

  const counts = FILTER_TABS.reduce((acc, t) => {
    acc[t.key] =
      t.key === 'all'
        ? courses.length
        : courses.filter((r) => r.status === t.key).length
    return acc
  }, {})

  const visible =
    filter === 'all' ? courses : courses.filter((r) => r.status === filter)

  const selectedFromList = slug
    ? courses.find((r) => String(r.slug) === String(slug))
    : null
  const selectedFromActive =
    slug && String(activeCourse?.slug) === String(slug) ? activeCourse : null

  const selectedRoadmap =
    slug
      ? (selectedFromActive?.modules?.length ? selectedFromActive : selectedFromList) ??
        selectedFromActive ??
        null
      : null

  if (slug && loading && !selectedRoadmap) {
    return (
      <div className="min-h-screen pb-16 flex items-center justify-center">
        <img
          src={LoadingImage}
          alt="Loading roadmap"
          className="w-24 h-24 object-contain"
          style={{ animation: 'pulse-scale 1.5s ease-in-out infinite' }}
        />
        <style>{`
          @keyframes pulse-scale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
        `}</style>
      </div>
    )
  }

  if (selectedRoadmap) {
    return (
      <RoadmapDetail
        roadmap={selectedRoadmap}
        onBack={() => navigate('/dashboard/roadmaps')}
      />
    )
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111] tracking-tight">
            My Roadmaps
          </h1>
          <p className="text-sm text-[#A3A3A3] mt-0.5">
            All your enrolled and saved learning paths
          </p>
        </div>
        <Link
        to="/dashboard/add-roadmap"
        className="flex items-center gap-2 bg-[#111] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#404040] transition-colors">
        + Add Roadmap
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 border-b border-[#EBEBEB] mb-6">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-all
              ${
                filter === tab.key
                  ? 'border-[#111] text-[#111]'
                  : 'border-transparent text-[#A3A3A3] hover:text-[#737373]'
              }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold
              ${filter === tab.key ? 'bg-[#111] text-white' : 'bg-[#F4F4F4] text-[#A3A3A3]'}`}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid or empty */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#EBEBEB] rounded-2xl bg-white text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-bold text-[#111] mb-1">Nothing here yet</p>
          <p className="text-sm text-[#A3A3A3] max-w-xs leading-relaxed">
            You don't have any roadmaps in this category. Browse paths to get
            started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((rm) => (
            <RoadmapCard
              key={rm.id}
              roadmap={rm}
              onClick={() => navigate(`/dashboard/roadmaps/${rm.slug}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyRoadmaps
