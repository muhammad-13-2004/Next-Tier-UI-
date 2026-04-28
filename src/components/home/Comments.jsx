import React from 'react'
import { Star } from 'lucide-react'

const comments = [
  {
    text: "NextTier Has Been A Game-Changer For Me! The Courses Are Well-Structured And The Instructors Are Super Knowledgeable. I've Already Landed A Job After Completing Their Data Science Program.",
    name: "Sam Altman",
    role: "Computer Science Student",
    shadow: "shadow-[8px_8px_0px_var(--secondary-color)]"
  },
  {
    text: "NextTier's Platform Is Easy To Navigate, But Some Courses Feel A Bit Outdated. Still, The Community Support Is Amazing And I've Learned A Lot. Would Love To See More Hands-On Projects!",
    name: "Yi Zing",
    role: "Computer Science Student",
    shadow: "shadow-[8px_8px_0px_var(--primary-color)]"
  },
  {
    text: "I Was Completely Lost Before NextTier. Now I Have A Clear Roadmap And The Confidence To Apply For Jobs. The AI Tools Are Incredibly Helpful For My Learning Journey!",
    name: "Maria Lopez",
    role: "Frontend Developer Student",
    shadow: "shadow-[8px_8px_0px_var(--secondary-color)]"
  },
  {
    text: "The Structured Path NextTier Provided Saved Me Months Of Confusion. I Knew Exactly What To Learn And In What Order. Highly Recommend To Anyone Starting Out!",
    name: "James Chen",
    role: "Data Science Student",
    shadow: "shadow-[8px_8px_0px_var(--primary-color)]"
  },
  {
    text: "Amazing Platform! The Community Is Super Active And The Instructors Actually Respond To Questions. My Skills Have Improved Drastically In Just 3 Months.",
    name: "Aisha Malik",
    role: "UI/UX Design Student",
    shadow: "shadow-[8px_8px_0px_var(--secondary-color)]"
  },
]


const CommentCard = ({ text, name, role, shadow }) => (
    <div className={` ${shadow} 
      w-[540px] h-[260px] flex-shrink-0
      rounded-2xl p-8 flex flex-col justify-between
      bg-[#f5f5f5]
      border border-(--border-color) `}
    >

    {/* Stars (ICON BOXES) */}
    <div className="flex gap-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="
            w-8 h-8 rounded-md
            bg-(--secondary-color)
            flex items-center justify-center
          "
        >
          <Star className="w-4 h-4 text-black " />
        </div>
      ))}
    </div>

    {/* Text */}
    <p className="
      text-[17px] leading-relaxed font-light
      text-sub opacity-70
    ">
      {text}
    </p>

    {/* User */}
    <div className="flex items-center gap-4">
      <img
        src="https://i.pravatar.cc/100?img=5"
        alt="avatar"
        className="w-11 h-11 rounded-full object-cover"
      />

      <p className="text-base text-sub">
        <span className="font-semibold text-primary">{name}</span>
        <span className="mx-2">-</span>
        {role}
      </p>
    </div>
    </div>
)

const Comments = () => {
  return (
    <section className="w-full flex flex-col items-center py-20 overflow-hidden bg-base">

      {/* Divider */}
      <div className="w-full max-w-5xl flex items-center gap-4 mb-10">
        <div className="flex-1 h-[1px] border-base border-t"></div>

        <p className="text-sm text-sub whitespace-nowrap">
          Join Students Who Found Their Direction
        </p>

        <div className="flex-1 h-[1px] border-base border-t"></div>
      </div>

      {/* Stats */}
      <div className="border border-base rounded-xl flex overflow-hidden mb-16">

        <div className="px-10 py-6 text-center border-r border-base">
          <h3 className="text-2xl font-medium text-primary">50k+</h3>
          <p className="text-sm text-sub">Students Onboarded</p>
        </div>

        <div className="px-10 py-6 text-center border-r border-base">
          <h3 className="text-2xl font-medium text-primary">94%</h3>
          <p className="text-sm text-sub">Find Less Overwhelmed</p>
        </div>

        <div className="px-10 py-6 text-center border-r border-base">
          <h3 className="text-2xl font-medium text-primary">60s</h3>
          <p className="text-sm text-sub">To Your First Roadmap</p>
        </div>

        <div className="px-10 py-6 text-center">
          <h3 className="text-2xl font-medium text-primary">4.9</h3>
          <p className="text-sm text-sub">Average Rating</p>
        </div>

      </div>

      {/* Marquee */}
      <div className="w-full h-[300px] overflow-hidden relative">
        <div className="flex gap-6 animate-marquee w-max">
          {[...comments, ...comments].map((c, i) => (
            <CommentCard key={i} {...c} />
          ))}
        </div>
        <div className='absolute left-0 top-0 w-100 h-100 bg-linear-to-r from-[#ffff] to-[#ffff]/0'></div>
        <div className='absolute right-0 top-0 w-100 h-100 bg-linear-to-l from-[#ffff] to-[#ffff]/0'></div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  )
}

export default Comments








