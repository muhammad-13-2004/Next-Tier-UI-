const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-6">
    
    <input
        type="text"
        placeholder="Search roadmaps..."
        className="flex-1 min-w-[250px] px-4 py-2 rounded-full border outline-none"
    />

    <select className="px-4 py-2 rounded-full border">
        <option>All Topics</option>
    </select>

    <select className="px-4 py-2 rounded-full border">
        <option>All Levels</option>
    </select>

    <select className="px-4 py-2 rounded-full border">
        <option>Most Liked</option>
    </select>
    </div>
  );
};

export default FilterBar;