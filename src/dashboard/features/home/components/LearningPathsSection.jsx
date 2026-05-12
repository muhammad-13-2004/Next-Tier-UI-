import PathCard from '../../roadmap/components/PathCard'
import { paths as fallbackPaths } from '../../../../utils/PapularPaths'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { useDashboard } from '@/hooks/useDashboard'

const filters = ['All', 'Coding', 'Design', 'Data', 'Marketing', 'Business']

const LearningPathsSection = () => {
  const { courses, loading, hasLoaded } = useDashboard()
  const fallbackIcon = fallbackPaths[0]?.img
  const learningPaths = courses.map((course) => ({
    title: course.title ?? course.name ?? 'Untitled course',
    duration: course.duration ?? course.time_commitment ?? 'Self paced',
    modules: Array.isArray(course.modules)
      ? course.modules.length
      : course.modules_count ?? course.module_count ?? 0,
    level: course.level ?? course.complexity ?? 'Beginner',
    img: course.img ?? course.image_url ?? course.icon_url ?? fallbackIcon,
    tags: Array.isArray(course.tags) ? course.tags : [course.status ?? 'Active'],
  }))

  return (
    <div className="bg-(--background-color) shadow-sm rounded-3xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-lg text-(--primary-color)">
          Recent Learning Paths
        </h2>

        <Button variant="link" size="sm">
          View All
          <ArrowUpRight className="w-6 h-6 text-(--primary-color)" />
        </Button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
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
      </div>

      <div className="space-y-4">
        {loading && !hasLoaded ? (
          <div className="rounded-2xl border border-(--border-color) p-5 text-sm text-(--subtext-color)">
            Loading your learning paths...
          </div>
        ) : learningPaths.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E7EB] p-8 text-center">
            <h3 className="font-semibold text-(--primary-color)">
              No courses yet
            </h3>
            <p className="mt-2 text-sm text-(--subtext-color)">
              Start a roadmap and it will appear here.
            </p>
          </div>
        ) : (
          learningPaths.map((path, index) => (
          <PathCard key={index} path={path} />
          ))
        )}
      </div>
    </div>
  )
}

export default LearningPathsSection
