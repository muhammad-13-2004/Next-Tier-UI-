const PathCard = ({ path }) => {
    return (
      <div className="bg-(--background-color) shadow-sm rounded-2xl p-5">
        <h3 className="font-bold text-(--primary-color)">
          {path.title}
        </h3>
  
        <p className="text-sm text-(--subtext-color) mt-1">
          {path.duration} · {path.modules} modules · {path.level}
        </p>
  
        <button className="mt-4 px-4 py-2 rounded-full bg-(--secondary-color) text-black font-semibold">
          Start Learning
        </button>
      </div>
    );
  };
  
  export default PathCard;