import React from 'react'
import { Button } from '../ui/button'
import { Dumbbell, Play } from 'lucide-react'

const DashOverview = () => {
  return (
    <div className="rounded-3xl bg-gradient-to-b from-(--background-color) to-(--secondary-color)/10 shadow-sm px-8 py-12">
      <h1 className="text-5xl font-bold text-(--primary-color)">
        Welcome back, <span className='text-(--secondary-color)'>Muhammad</span>
      </h1>

      <p className="text-(--subtext-color) mt-4">
        What do you want to learn today? Browse paths below or let AI suggest the perfect one for you in 60 seconds.
      </p>
      <div className="flex justify-start gap-2 mt-8">
        <Button variant = "default" size='lg'>
          Let AI Pick for me 
          <Dumbbell className='w-6 h-6 text-(--secondary-color)' />
        </Button>
        <Button variant = "outline" size='lg'>
          Watch Demo
          <Play className='w-6 h-6 text-(--primary-color)' />
        </Button>
      </div>
    </div>
  )
}

export default DashOverview