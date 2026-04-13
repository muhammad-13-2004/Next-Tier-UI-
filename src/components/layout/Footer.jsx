import React from 'react'
import Zap from '../../assets/Zap.png'
import LogoApp from '../../assets/LogoApp.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section
      className="bg-white w-full mt-20 flex items-center justify-center flex-col mb-20
      bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
      bg-[size:40px_40px]"
    >
      <div className="w-[1036px] h-[385px] rounded-xl bg-gradient-to-r from-[#8EE14A] to-black p-20 flex flex-col gap-5 ">
        <h2 className="text-6xl">
          Ready To Level Up <br /> Your{' '}
          <span className="text-white">Skills & Career?</span>
        </h2>
        <p className="text-white text-md font-light">
          Stop jumping between random tutorials. Get a structured path designed
          for <br />
          your skill level and career goals.
        </p>
        <Link to="/signup">
        <button className="w-[195px] h-[50px] bg-black rounded-[40px] flex flex-row items-center justify-center p-5">
          <span className="font-light text-white ">Sign Up Free</span>
          <img
            src={Zap}
            alt="zap.png"
            style={{ width: '20px', height: '20px' }}
          />
        </button>
        </Link>
      </div>

      {/* footer */}
      <div className="w-[1084px] flex justify-between mt-20">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 w-[300px]">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2 w-[149px] h-[35px]">
            <img src={LogoApp} alt="This is the logo of the webpage" />
          </div>

          <p className="text-sm text-gray-500">
            Plan Your Study Smarter And Faster With <br />
            NextTier AI
          </p>

          <p className="text-sm text-gray-400">
            @2026 NextTier. All Right Reserved
          </p>
        </div>

        {/* RIGHT SIDE LINKS */}
        <div className="flex gap-20">
          {/* Products */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium">Products</h4>
            <p className="text-gray-500 text-sm">AI Roadmap Builder</p>
            <p className="text-gray-500 text-sm">Interviewer Pro</p>
            <p className="text-gray-500 text-sm">Study Companion</p>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium">Company</h4>
            <p className="text-gray-500 text-sm">About</p>
            <p className="text-gray-500 text-sm">Career</p>
            <p className="text-gray-500 text-sm">Contact</p>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium">Legal</h4>
            <p className="text-gray-500 text-sm">Privacy</p>
            <p className="text-gray-500 text-sm">Support</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
