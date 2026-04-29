const InternshipCard = () => {
  return (
    <div className="relative bg-black text-white rounded-3xl p-6 w-full max-w-sm overflow-hidden">
      
      {/* Gradient Glow */}
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500 opacity-20 blur-3xl rounded-full"></div>

      {/* Badge */}
      <span className="inline-block bg-green-200 text-black text-xs font-semibold px-4 py-1 rounded-full tracking-wide">
        QUEST: CAREER READY
      </span>

      {/* Title */}
      <h2 className="text-2xl font-bold mt-4 leading-snug">
        Internship <br /> Eligibility: 35%
      </h2>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        Defeat the Logic Dragon to boost your readiness by 15% and unlock interview simulations.
      </p>

      {/* Button */}
      <button className="mt-6 w-full bg-white text-black py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition">
        Accept Challenge ⚡
      </button>
    </div>
  );
};

export default InternshipCard;