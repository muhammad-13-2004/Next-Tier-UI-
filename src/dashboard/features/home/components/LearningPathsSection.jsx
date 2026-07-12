import { useNavigate } from 'react-router-dom'
import PathCard from '../../roadmap/components/PathCard'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { useDashboard } from '@/hooks/useDashboard'

const LearningPathsSection = () => {
  const navigate = useNavigate()
  const { courses, loading, hasLoaded } = useDashboard()

  const recentCourses = [...courses]
    .sort((left, right) => {
      const leftTime = new Date(left.updated_at ?? left.created_at ?? 0).getTime()
      const rightTime = new Date(right.updated_at ?? right.created_at ?? 0).getTime()
      return rightTime - leftTime
    })
    .slice(0, 3)

  return (
    <div className="bg-(--background-color) border border-(--subtext-color)/10 rounded-3xl p-6 mb-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-lg text-(--primary-color)">
          Recent Learning Paths
        </h2>

        <Button
          variant="link"
          size="sm"
          onClick={() => navigate('/dashboard/roadmaps')}
        >
          View All
          <ArrowUpRight className="w-6 h-6 text-(--primary-color)" />
        </Button>
      </div>

      {/* <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm border ${
              index === 0
                ? 'bg-(--primary-color) text-white'
                : 'border-(--border-color) text-(--subtext-color)'
            }`}
          >
            {filter}
          </button>
        ))}
      </div> */}

      <div className="space-y-4">
        {loading && !hasLoaded ? (
          <div className="rounded-2xl border border-(--border-color) p-5 text-sm text-(--subtext-color)">
            Loading your learning paths...
          </div>
        ) : recentCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E7EB] p-8 text-center">
            <h3 className="font-semibold text-(--primary-color)">
              No courses yet
            </h3>
            <p className="mt-2 text-sm text-(--subtext-color)">
              Start a roadmap and it will appear here.
            </p>
          </div>
        ) : (
          recentCourses.map((course) => (
          <PathCard
            key={course.slug ?? course.id}
            path={course}
            onStart={() => navigate(`/dashboard/roadmaps/${course.slug ?? course.id}`)}
            onClick={() => navigate(`/dashboard/roadmaps/${course.slug ?? course.id}`)}
          />
          ))
        )}
      </div>
    </div>
  )
}

export default LearningPathsSection
