import PathCard from './PathCard'
import { paths } from '../../utils/PapularPaths'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '../ui/button'

const filters = ['All', 'Coding', 'Design', 'Data', 'Marketing', 'Business']

const LearningPathsSection = () => {
  return (
    <div className="bg-(--background-color) shadow-sm rounded-3xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-lg text-(--primary-color)">
          Papular Learning Paths
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
        {paths.map((path, index) => (
          <PathCard key={index} path={path} />
        ))}
      </div>
    </div>
  )
}

export default LearningPathsSection
