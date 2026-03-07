import React from 'react'

const Hero = () => {
  return (
    <section className="w-full h-full bg-white text-black ">
      <div className="w-[1248px] h-[632px] bg-[#D9D9D9]">
        <h1 className="text-7xl font-medium">
          Confused About What To <br />
          <span className="bg-[#8EE14A] text-white">Learn</span> Next?
        </h1>
        <p className="font-light">
          Stop Jumping Between Random Tutorials. Get A Structured Path Designed
          For your skill level and career goals.
        </p>
        <div className="font-light">
          <button className="w-[180px] h-[40px] bg-black text-white rounded-[40px]">
            Build My Roadmap
          </button>
          <button className="w-[180px] h-[40px] bg-white text-black rounded-[40px]">
            Watch Demo
          </button>
        </div>

        <div>
          <div>
            <span>50K+</span>
            <span>Users</span>
          </div>

          <div>
            <span>3K+</span>
            <span>Daily SignUp</span>
          </div>

          <div>
            <span>5+</span>
            <span>Tools</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
