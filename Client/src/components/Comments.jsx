import React from 'react'

const Comments = () => {
  return (
    <section className="w-full flex flex-col items-center py-20 bg-white mt-20">
      {/* Top Divider Text */}
      <div className="w-full max-w-5xl flex items-center gap-4 mb-10">
        <div className="flex-1 h-[1px] bg-gray-200"></div>
        <p className="text-sm text-gray-400 whitespace-nowrap">
          Join Students Who Found Their Direction
        </p>
        <div className="flex-1 h-[1px] bg-gray-200"></div>
      </div>

      {/* Stats Box */}
      <div className="border border-[#D9D9D9]  rounded-xl flex overflow-hidden mb-16 ">
        <div className="px-10 py-6 text-center border-r border-[#D9D9D9]">
          <h3 className="text-2xl font-medium">50k+</h3>
          <p className="text-gray-500 text-sm">Students Onboarded</p>
        </div>

        <div className="px-10 py-6 text-center border-r border-[#D9D9D9]">
          <h3 className="text-2xl font-medium">94%</h3>
          <p className="text-gray-500 text-sm">Find Less Overwhelmed</p>
        </div>

        <div className="px-10 py-6 text-center border-r border-[#D9D9D9]">
          <h3 className="text-2xl font-medium">60s</h3>
          <p className="text-gray-500 text-sm">To Your First Roadmap</p>
        </div>

        <div className="px-10 py-6 text-center">
          <h3 className="text-2xl font-medium">4.9</h3>
          <p className="text-gray-500 text-sm">Average Rating</p>
        </div>
      </div>

      {/* Comments are here yet to be solved  */}
      <div className="flex gap-10">
        {/* Comment 1 */}
        <div
          className="bg-white border border-[#D9D9D9] rounded-xl p-6 flex flex-col justify-between shadow-[8px_8px_0px_#B2FF72]"
          style={{ width: '526px', height: '252px' }}
        >
          {/* Stars */}
          <div className="flex gap-1 text-green-500 text-sm">★ ★ ★ ★ ★</div>

          {/* Text */}
          <p className="text-gray-500 leading-relaxed font-light">
            NextTier Has Been A Game-Changer For Me! The Courses Are
            Well-Structured And The Instructors Are Super Knowledgeable. I've
            Already Landed A Job After Completing Their Data Science Program.
          </p>

          {/* User */}
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="rounded-full"
            />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-black">Sam Altman</span> -
              Computer Science Student
            </p>
          </div>
        </div>

        {/* Comment 2 */}
        <div
          className="bg-white border border-[#D9D9D9] rounded-xl p-6 flex flex-col justify-between shadow-[8px_8px_0px_black]"
          style={{ width: '526px', height: '252px' }}
        >
          {/* Stars */}
          <div className="flex gap-1 text-green-500 text-sm">★ ★ ★ ★ ★</div>

          {/* Text */}
          <p className="text-gray-500 leading-relaxed font-light">
            NextTier's Platform Is Easy To Navigate, But Some Courses Feel A Bit
            Outdated. Still, The Community Support Is Amazing And I've Learned A
            Lot. Would Love To See More Hands-On Projects!
          </p>

          {/* User */}
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="rounded-full"
            />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-black">Yi Zing</span> - Computer
              Science Student
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Comments
