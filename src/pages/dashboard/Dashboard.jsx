import React from 'react'
import supabase from '@/services/supabase'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import QuickPanel from '@/components/dashboard/QuickPanel'
import LearningPathsSection from '@/components/dashboard/LearningPathsSection'
import DashOverview from '@/components/dashboard/DashOverview'

const Dashboard = () => {
  
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DashOverview />
        </div>

        <div className="col-span-9">
          <LearningPathsSection />
        </div>

        <div className="col-span-3">
          <QuickPanel />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
