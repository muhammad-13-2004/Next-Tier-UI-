import { Button } from "../../../../components/ui/button";
import { BookOpenText } from 'lucide-react'


const PathCard = ({ path }) => {
  return (
    <div className="border border-(--border-color) rounded-2xl p-5 flex justify-between items-center cursor-pointer">
      <div className="flex items-center gap-4">
         <BookOpenText className="text-(--secondary-color)" size="50px"/>
        <div>
          <h3 className="font-semibold text-(--primary-color)">
            {path.title}
          </h3>

          <p className="text-sm text-(--subtext-color) mt-1">
            {path.duration} • {path.modules} modules • {path.level}
          </p>

          <div className="flex gap-2 mt-3">
            {path.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-(--secondary-color)/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Button variant = "outline" size='lg'>
          Start this course
      </Button>
    </div>
  );
};

export default PathCard;