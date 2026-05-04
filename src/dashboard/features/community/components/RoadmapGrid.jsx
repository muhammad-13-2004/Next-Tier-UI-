import RoadmapCard from "@/dashboard/features/community/components/RoadmapCard";

const dummyData = [
  {
    title: "Frontend Developer Roadmap",
    description: "Complete path to become a frontend developer.",
    tags: ["React", "CSS", "JavaScript"],
    modules: 12,
    duration: "6h 30m",
    likes: "1.2k",
    author: "Ahmed Khan",
    level: "Beginner",
  },
  {
    title: "Full Stack Web Dev",
    description: "From basics to advanced full stack apps.",
    tags: ["Node", "MongoDB", "React"],
    modules: 18,
    duration: "10h",
    likes: "980",
    author: "Sarah Ali",
    level: "Intermediate",
  },
];

const RoadmapGrid = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {dummyData.map((roadmap, index) => (
        <RoadmapCard key={index} roadmap={roadmap} />
      ))}
    </div>
  );
};

export default RoadmapGrid;