import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Zap } from 'lucide-react'


const CTA = () => {
    return (
        <section className="w-full flex items-center justify-center mt-20 mb-20 bg-var(--background-color)">

        <div className="w-[1036px] h-[385px] rounded-2xl overflow-hidden relative flex flex-col items-center justify-center gap-5 text-center bg-gradient-to-br from-[var(--secondary-color)] via-[#d4fca0] to-[#f0ffe0]"> 

                    {/* grid */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0,180,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,0,0.15) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* rings */}
                <div className="absolute bg-(--background-color)/20 shadow-md bottom-[-110px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full"/>
                <div className="absolute bg-(--background-color)/30 shadow-md bottom-[-70px] left-1/2 -translate-x-1/2 w-[310px] h-[310px] rounded-full"/>
                <div className="absolute bg-(--background-color)/40 shadow-md bottom-[-40px] left-1/2 -translate-x-1/2 w-[210px] h-[210px] rounded-full" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <h2 className="text-5xl font-bold leading-tight"
                        style={{ color: 'var(--primary-color)' }}>
                        Ready To Level Up Your <br />
                        <span style={{ color: '#3a7d00' }}>Skills & Career?</span>
                    </h2>
                    <p className="text-sm font-light max-w-[500px]"
                        style={{ color: 'var(--subtext-color)' }}>
                        Stop Jumping Between Random Tutorials. Get A Structured Path Designed For Your Skill
                        Level And Career Goals.
                    </p>
                    <Link to="/signup">
                        <Button>
                            Sign up for Free
                            <Zap className='w-6 h-6 text-(--secondary-color)' />
                        </Button>
                    </Link>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
            </div>

        </section>
    )
}

export default CTA