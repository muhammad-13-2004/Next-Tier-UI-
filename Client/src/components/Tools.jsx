import React from 'react'
import star from '../assets/star.png'
import Toolimg from '../assets/Toolimg.png'
import RightArrow from '../assets/RightArrow.png'

const Tools = () => {
  return (
    <section className="bg-white w-full mt-20 flex items-center justify-center">

      <div className="w-287.5 h-118.5 bg-[#FBFBFB] flex flex-col items-center gap-10 rounded-2xl relative overflow-hidden">

        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 
        bg-[linear-gradient(#e5e5e5_1px,transparent_1px),linear-gradient(90deg,#e5e5e5_1px,transparent_1px)]
        bg-[size:40px_40px] opacity-40"></div>

        {/* LEFT BACKGROUND IMAGE PLACEHOLDER */}
        <img
          src={Toolimg}
          alt="left design"
          className="absolute left-0 top-0 opacity-40"
        />

        {/* RIGHT BACKGROUND IMAGE PLACEHOLDER */}
        <img
          src= {RightArrow}
          alt="right arrow"
          className="absolute right-10 top-10 opacity-30"
        />

        <div className="flex flex-col items-center mt-10 gap-2 relative z-10">
          <span className="font-medium text-[14px] text-[#67D909] flex items-center justify-center gap-2">
            <img src={star} alt="" />
            Learning Tools
          </span>

          <h2 className="text-5xl font-medium">Learning Pack We have!</h2>
        </div>

        <div className='w-[1084px] h-[240px] bg-[#FBFBFB] flex flex-row gap-4 items-center justify-center relative z-10'>

            <div className='bg-white w-[320px] h-full rounded-xl p-5 flex flex-col gap-4 shadow-[4px_4px_0px_#B2FF72]'>
                <h3 className='text-2xl font-light text-[#797979]'>AI Roadmap <br />Builder</h3>
                <p className='text-xs text-[#797979] font-light'>
                  Tell us your goal and skill level, NextTier <br />
                  designs a structured roadmap with weekly <br />
                  milestones and real projects.
                </p>
                <button className='w-[126px] h-[36px] border border-[#D9D9D9] rounded-md'>
                  Explore Now
                </button>
            </div>

            <div className='bg-white w-[320px] h-full rounded-xl p-5 flex flex-col gap-4 shadow-[4px_4px_0px_#B2FF72]'>
                <h3 className='text-2xl font-light text-[#797979]'>NextTier Study <br />Companion</h3>
                <p className='text-xs text-[#797979] font-light'>
                  Tell us your goal and skill level, NextTier <br />
                  designs a structured roadmap with weekly <br />
                  milestones and real projects.
                </p>
                <button className='w-[126px] h-[36px] border border-[#D9D9D9] rounded-md'>
                  Explore Now
                </button>
            </div>

            <div className='bg-white w-[320px] h-full rounded-xl p-5 flex flex-col gap-4 shadow-[4px_4px_0px_#B2FF72]'>
                <h3 className='text-2xl font-light text-[#797979]'>Interview Simulator <br /> Pro</h3>
                <p className='text-xs text-[#797979] font-light'>
                  Tell us your goal and skill level, NextTier <br />
                  designs a structured roadmap with weekly <br />
                  milestones and real projects.
                </p>
                <button className='w-[126px] h-[36px] border border-[#D9D9D9] rounded-md'>
                  Explore Now
                </button>
            </div>

        </div>

      </div>

    </section>
  )
}

export default Tools