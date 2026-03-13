import React from 'react'
import LogoApp from '../assets/LogoApp.png'
import Zap from '../assets/Zap.png'

const Navbar = () => {
  return (
    <div className="w-full h-16.75 flex flex-row items-center justify-evenly">
      <div className="w-[149px] h-[35px] ">
        <img src={LogoApp} alt="This is the logo of the webpage" />
      </div>

      <div className="font-light flex flex-row items-center gap-8">
        <span>How It Works</span>
        <span>Tools</span>
        <span>Pricing</span>
        <span>Support</span>
      </div>

      <div className="">
        <button className="w-[125px] h-[35px] bg-black rounded-[40px] flex flex-row items-center justify-center">
          <span className="font-light text-white ">Sign Up Free</span>
          <img
            src={Zap}
            alt="zap.png"
            style={{ width: '20px', height: '20px' }}
          />
        </button>
      </div>
    </div>
  )
}

export default Navbar
