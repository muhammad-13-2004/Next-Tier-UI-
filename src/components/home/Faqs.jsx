import React from "react";
import { ChevronDown } from "lucide-react";
import star from "../../assets/star.png";

const faqsData = [
  {
    question: "What kind of courses does NextTier offer?",
    answer:
      "NextTier offers courses in data science, programming, marketing, and more. Our courses are designed to be practical and industry-relevant.",
  },
  {
    question: "Will I get a certificate after completing a course?",
    answer:
      "Yes! Upon successful completion of any course, you will receive a certificate that you can share on LinkedIn or your resume.",
  },
  {
    question: "Is there support available if I need help?",
    answer:
      "Absolutely! We offer 24/7 support via chat, email, and community forums to help you whenever you need it.",
  },
];

const Faqs = () => {
  return (
    <section
      id="support"
      className="bg-white w-full mt-20 flex items-center justify-center"
    >
      <div className="flex flex-col gap-16">
        
        {/* Heading */}
        <div className="flex flex-col items-center mt-10 gap-2 relative z-10">
          <span className="font-medium text-[14px] text-[#67D909] flex items-center gap-2">
            <img src={star} alt="" />
            Learning Tools
          </span>
          <h2 className="text-5xl font-medium">
            Learning Pack We have!
          </h2>
        </div>

        {/* FAQ List */}
        <div className="w-[1036px] flex flex-col gap-4">
          {faqsData.map((faq, index) => (
            <details
              key={index}
              name="faq"
              className="bg-[#F6F6F6] rounded-lg p-5 group"
            >
              <summary className="flex justify-between items-center cursor-pointer font-light text-[20px] text-[var(--primary-color)] list-none">
                {faq.question}

                <ChevronDown className="transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <p className="text-sm text-[var(--subtext-color)] mt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;