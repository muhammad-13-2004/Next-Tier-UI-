import React from 'react'
import Zap from '../../assets/Zap.png'
import LogoApp from '../../assets/LogoApp.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="w-full mt-20 flex items-center justify-center flex-col mb-20"
      style={{ backgroundColor: 'var(--background-color)' }}>

      <div className="w-[1084px] flex justify-between mt-20"
        style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 w-[300px]">
          <div className="flex items-center gap-2 w-[149px] h-[35px]">
            <img src={LogoApp} alt="logo" />
          </div>
          <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>
            Plan Your Study Smarter And Faster With <br />
            NextTier AI
          </p>
          <p className="text-sm" style={{ color: 'var(--border-color)' }}>
            @2026 NextTier. All Right Reserved
          </p>
        </div>

        {/* RIGHT SIDE LINKS */}
        <div className="flex gap-20">
          <div className="flex flex-col gap-3">
            <h4 className="font-medium" style={{ color: 'var(--primary-color)' }}>Products</h4>
            <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>AI Roadmap Builder</p>
            <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>Interviewer Pro</p>
            <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>Study Companion</p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-medium" style={{ color: 'var(--primary-color)' }}>Company</h4>
            <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>About</p>
            <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>Career</p>
            <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>Contact</p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-medium" style={{ color: 'var(--primary-color)' }}>Legal</h4>
            <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>Privacy</p>
            <p className="text-sm" style={{ color: 'var(--subtext-color)' }}>Support</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer