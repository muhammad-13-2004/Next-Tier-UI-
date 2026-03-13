import React from 'react'
import star from '../assets/star.png'

const Steps = () => {
  return (
    <section className="w-full flex items-center justify-center bg-white mt-20">
      <div>
        <div className="flex flex-col items-center">
          <span className="font-medium text-[14px] text-[#67D909] flex items-center justify-center gap-2">
            <img src={star} alt="" />
            Get Started With Us!{' '}
          </span>
          <h2 className="text-5xl font-medium">Its Easy As It Looks</h2>
        </div>

        <div className="flex flex-row w-full bg-white gap-4 mt-16">
          <div className="w-[447px] h-62.5 border border-[#D9D9D9]  rounded-xl p-7.5">
            <div className="w-[54px] h-[54px] rounded-full bg-[#B2FF72] shadow-[4px_0px_0px_black] text-center flex items-center justify-center">
              <span className="text-2xl">1</span>
            </div>
            <h3 className="text-3xl font-light mt-7">Take Quick Assessment</h3>
            <p className="text-base font-light text-[#797979] mt-2">
              Answer a few questions and mini coding challenges. <br /> NextTier
              evaluates your skill level.
            </p>
          </div>

          <div className="w-[679px] h-62.5 border border-[#D9D9D9]  rounded-xl p-7.5">
            <div className="w-[54px] h-[54px] rounded-full bg-[#B2FF72] shadow-[4px_0px_0px_black] text-center flex items-center justify-center">
              <span className="text-2xl">2</span>
            </div>
            <h3 className="text-3xl font-light mt-7">
              Get Personalized Roadmap{' '}
            </h3>
            <p className="text-base font-light text-[#797979] mt-2">
              Receive a dynamic learning path designed for your goal:
              internship, freelance, or startup-ready.
            </p>
          </div>
        </div>

        <div className="flex flex-row w-full bg-white gap-4 mt-10">
          <div className="w-[679px] h-62.5 border border-[#D9D9D9]  rounded-xl p-7.5">
            <div className="w-[54px] h-[54px] rounded-full bg-[#B2FF72] shadow-[4px_0px_0px_black] text-center flex items-center justify-center">
              <span className="text-2xl">3</span>
            </div>
            <h3 className="text-3xl font-light mt-7">Execute Weekly Tasks </h3>
            <p className="text-base font-light text-[#797979] mt-2">
              Track daily micro-tasks, quizzes, and assignments to level up your
              skills.
            </p>
          </div>

          <div className="w-[447px] h-62.5 border border-[#D9D9D9]  rounded-xl p-7.5">
            <div className="w-[54px] h-[54px] rounded-full bg-[#B2FF72] shadow-[4px_0px_0px_black] text-center flex items-center justify-center">
              <span className="text-2xl">4</span>
            </div>
            <h3 className="text-3xl font-light mt-7">
              Earn Skill XP & Level Up
            </h3>
            <p className="text-base font-light text-[#797979] mt-2">
              Complete challenges, unlock badges, and showcase progress on your
              dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Steps
