import { Check, CheckCircle2Icon } from 'lucide-react'
import LeftArrow from '../../assets/LeftArrow.png'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <section className="w-full py-30 flex items-center justify-center bg-white relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-40 
        bg-[linear-gradient(#e5e5e5_1px,transparent_1px),linear-gradient(90deg,#e5e5e5_1px,transparent_1px)] 
        bg-[size:40px_40px]"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        }}
      ></div>

      {/* Arrow Placeholder */}
      <img
        src={LeftArrow}
        alt="arrow"
        width='270px'
        className="absolute left-16 top-34 -rotate-4 opacity-100"
      />

      <div className="relative text-center max-w-7xl px-6">
        <h1 className="text-[90px] font-semibold leading-26">
          Confused About What To{' '}
          <span className="bg-(--secondary-color) text-(--background-color) px-2 rounded-lg">
            Learn
          </span>{' '}
          Next?
        </h1>

        <p className="text-(--subtext-color) mt-6 text-md font-light">
          Stop Jumping Between Random Tutorials. Get A Structured Path Designed
          For Your Skill Level And Career Goals.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant = "secondary" size='lg'>
            Build My Roadmap
          </Button>
          <Button variant = "outline" size='lg'>
            Watch Demo
          </Button>
        </div>

        {/* Features */}
        <div className="flex justify-center gap-4 text-sm text-(--subtext-color) mt-5 font-light">
          <span className='flex items-center gap-1'><CheckCircle2Icon className='w-4 h-4 text-(--primary-color)' /> No Credit Card</span>
          <span className='flex items-center gap-1'><CheckCircle2Icon className='w-4 h-4 text-(--primary-color)' /> 100% Free To Start</span>
          <span className='flex items-center gap-1'><CheckCircle2Icon className='w-4 h-4 text-(--primary-color)' /> Setup in less than 2 mins</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
