import React from 'react'
import star from '../assets/star.png'

const Faqs = () => {
  return (
    <section className="bg-white w-full mt-20 flex items-center justify-center">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center mt-10 gap-2 relative z-10">
          <span className="font-medium text-[14px] text-[#67D909] flex items-center justify-center gap-2">
            <img src={star} alt="" />
            Learning Tools
          </span>

          <h2 className="text-5xl font-medium">Learning Pack We have!</h2>
        </div>

        <div className="w-[1036px] flex flex-col gap-4">
          {/* FAQ 1 */}
          <details className="bg-[#F6F6F6] rounded-lg p-5 open:shadow-sm">
            <summary className="flex justify-between items-center cursor-pointer font-light text-[20px] text-gray-800">
              What kind of courses does NextTier offer?
              <span>⌃</span>
            </summary>

            <p className="text-sm text-gray-500 mt-3">
              NextTier offers courses in data science, programming, marketing,
              and more. Our courses are designed to be practical and
              industry-relevant.
            </p>
          </details>

          {/* FAQ 2 */}
          <details className="bg-[#F6F6F6] rounded-lg p-5">
            <summary className="flex justify-between items-center cursor-pointer font-light text-[20px] text-gray-800">
              Will I get a certificate after completing a course?
              <span>⌄</span>
            </summary>
          </details>

          {/* FAQ 3 */}
          <details className="bg-[#F6F6F6] rounded-lg p-5">
            <summary className="flex justify-between items-center cursor-pointer font-light text-gray-800 text-[20px]">
              Is there support available if I need help?
              <span>⌄</span>
            </summary>
          </details>
        </div>
      </div>
    </section>
  )
}

export default Faqs
