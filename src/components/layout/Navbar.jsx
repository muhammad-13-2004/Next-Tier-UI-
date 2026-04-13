import React from 'react'
import LogoApp from '@/assets/LogoApp.png'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowUpRight, Zap } from 'lucide-react'
import { useAuthStore } from "@/store/authStore";


const Navbar = () => {

  const { user } = useAuthStore();

  return (
    <div className="w-full h-16.75 flex flex-row items-center justify-evenly">
      <div className="w-[149px] h-[35px] ">
        <img src={LogoApp} alt="This is the logo of the webpage" />
      </div>

      <div className="font-light flex flex-row items-center gap-8">
        <a href='#howitworks'>How It Works</a>
        <a href='#tools'>Tools</a>
        <a href='#pricing'>Pricing</a>
        <a href='#support'>Support</a>
      </div>

      <div className="">
        {
          user ?
            <Link to="/dashboard">
              <Button>
                Dashboard
                <ArrowUpRight  className='w-6 h-6 text-(--secondary-color)' />
              </Button>
            </Link>
            :
            <Link to="/signup">
              <Button>
                Sign up for Free
                <Zap className='w-6 h-6 text-(--secondary-color)' />
              </Button>
            </Link>
        }
      </div>
    </div>
  )
}

export default Navbar
