import LeftArrow from '../assets/LeftArrow.png'

const Hero = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-40 
  bg-[linear-gradient(#e5e5e5_1px,transparent_1px),linear-gradient(90deg,#e5e5e5_1px,transparent_1px)] 
  bg-[size:40px_40px]"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        }}
      ></div>

      {/* Arrow Placeholder */}
      <img
        src={LeftArrow}
        alt="arrow"
        className="absolute left-16 top-40 opacity-40"
      />

      <div className="relative text-center max-w-5xl px-6">
        <h1 className="text-7xl font-medium leading-tight">
          Confused About What To{' '}
          <span className="bg-[#B2FF72] text-white  px-4 py-1 rounded-lg">
            Learn
          </span>{' '}
          Next?
        </h1>

        <p className="text-gray-500 mt-6 text-lg font-light">
          Stop Jumping Between Random Tutorials. Get A Structured Path Designed
          For Your Skill Level And Career Goals.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-[#B2FF72] px-6 py-3 rounded-lg font-light hover:scale-105 transition">
            Build My Roadmap
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-lg font-light hover:bg-gray-100 transition">
            Watch Demo
          </button>
        </div>

        {/* Features */}
        <div className="flex justify-center gap-6 text-sm text-gray-600 mt-5 font-light">
          <span>● No Credit Card</span>
          <span>● 100% Free To Start</span>
          <span>● Setup in less than 2 mins</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
