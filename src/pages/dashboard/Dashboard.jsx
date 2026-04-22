import React, { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import MainTab from '@/components/dashboard/tabs/MainTab'
import RoadmapsTab from '@/components/dashboard/tabs/RoadmapsTab'
import CommunityTab from '@/components/dashboard/tabs/CommunityTab'
import AiTutorTab from '@/components/dashboard/tabs/AiTutorTab'
import CareerTab from '@/components/dashboard/tabs/CareerTab'
import SettingsTab from '@/components/dashboard/tabs/SettingsTab'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('main')

  const tabComponents = {
    main: <MainTab />,
    roadmaps: <RoadmapsTab />,
    community: <CommunityTab />,
    aiTutor: <AiTutorTab />,
    career: <CareerTab />,
    settings: <SettingsTab />,
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {tabComponents[activeTab] || <MainTab />}
    </DashboardLayout>
  )
}

export default Dashboard
