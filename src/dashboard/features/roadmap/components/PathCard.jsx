import { Button } from "../../../../components/ui/button";
import { BookOpenText } from "lucide-react";

const PathCard = ({ path, onClick, onStart }) => {
  const modules = Array.isArray(path.modules) ? path.modules : [];
  const totalCount = path.total_modules ?? modules.length;
  const doneCount =
    path.completed_modules ?? modules.filter((module) => module.status === "completed").length;
  const duration = path.duration ?? path.time ?? path.time_commitment ?? "Self paced";
  const level = path.level ?? path.complexity ?? "Beginner";
  const subtitle = path.short_description ?? path.subtitle ?? path.description ?? "";
  const tags =
    Array.isArray(path.tags) && path.tags.length > 0
      ? path.tags
      : [path.status ?? "Active", `${totalCount} modules`];

  return (
    <div
      onClick={onClick}
      className="bg-linear-to-b from-(--secondary-color)/10 to-(--background-color) border border-(--secondary-color)/80 rounded-2xl p-5 flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center gap-4">
        <BookOpenText className="text-(--secondary-color)" size="50px" />
        <div>
          <h3 className="font-semibold text-(--primary-color)">{path.title}</h3>

          {/* <p className="text-sm text-(--subtext-color) mt-1">
            {duration} - {totalCount} modules - {level}
          </p> */}

          <p className="text-xs text-(--subtext-color) mt-1">
            {doneCount} / {totalCount} modules completed
          </p>

          <div className="flex gap-2 mt-3">
            {tags.map((tag) => (
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

      <Button
        onClick={(event) => {
          event.stopPropagation();
          onStart?.();
        }}
        className="bg-(--secondary-color) text-(--primary-color) hover:bg-(--secondary-color)"
        size="lg"
      >
        Start this course
      </Button>
    </div>
  );
};

export default PathCard;
