import { Heart, Clock, BarChart } from "lucide-react";

const RoadmapCard = ({ roadmap }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      
      {/* Title */}
      <h3 className="font-semibold text-lg text-gray-800">
        {roadmap.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-2">
        {roadmap.description}
      </p>

      {/* Tags */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {roadmap.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <BarChart size={16} /> {roadmap.modules} Modules
        </span>
        <span className="flex items-center gap-1">
          <Clock size={16} /> {roadmap.duration}
        </span>
        <span className="flex items-center gap-1">
          <Heart size={16} /> {roadmap.likes}
        </span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-medium text-gray-700">
          {roadmap.author}
        </p>

        <span className="text-xs text-gray-400">
          {roadmap.level}
        </span>
      </div>
    </div>
  );
};

export default RoadmapCard;