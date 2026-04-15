import React from 'react'
import supabase from '@/services/supabase'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import PathCard from '@/components/dashboard/PathCard'

const Dashboard = () => {
  
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const suggestedPaths = [
    {
      id: 1,
      title: "Python for Beginners",
      duration: "12 weeks",
      modules: 6,
      level: "Beginner",
    },
    {
      id: 2,
      title: "Full Stack Development",
      duration: "16 weeks",
      modules: 8,
      level: "Intermediate",
    },
  ];

  return (
    <DashboardLayout>
      <section className="space-y-6">
        <div className="rounded-3xl bg-(--background-color) shadow-sm p-8">
          <h1 className="text-3xl font-bold text-(--primary-color)">
            Welcome back, Muhammad
          </h1>

          <p className="text-(--subtext-color) mt-2">
            What do you want to learn today?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {suggestedPaths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  )
}

export default Dashboard
