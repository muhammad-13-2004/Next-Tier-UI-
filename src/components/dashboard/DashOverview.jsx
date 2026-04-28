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

      <div className="flex pt-10 ">
      <div className="p-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
        <p className="font-bold pt-3">12</p>
        <p ClassName="">Courses Enrolled</p>
      </div>
      <div className="bg-blue-400 p-4">Item 2</div>
      <div className="bg-green-400 p-4">Item 3</div>
    </div>

    </div>
  )
}

export default DashOverview