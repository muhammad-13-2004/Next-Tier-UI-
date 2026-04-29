import React from 'react'
import DashboardLayout from '@/dashboard/layout/DashboardLayout'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const activeTab = (() => {
    const path = location.pathname
    if (path === '/dashboard' || path === '/dashboard/') return 'main'
    if (path.startsWith('/dashboard/roadmaps')) return 'roadmaps'
    if (path.startsWith('/dashboard/lesson/')) return 'roadmaps' // lesson reading originates from roadmaps
    if (path.startsWith('/dashboard/community')) return 'community'
    if (path.startsWith('/dashboard/ai-tutor')) return 'aiTutor'
    if (path.startsWith('/dashboard/career')) return 'career'
    if (path.startsWith('/dashboard/settings')) return 'settings'
    return 'main'
  })()

  const handleTabChange = (id) => {
    switch (id) {
      case 'main':
        navigate('/dashboard')
        break
      case 'roadmaps':
        navigate('/dashboard/roadmaps')
        break
      case 'community':
        navigate('/dashboard/community')
        break
      case 'aiTutor':
        navigate('/dashboard/ai-tutor')
        break
      case 'career':
        navigate('/dashboard/career')
        break
      case 'settings':
        navigate('/dashboard/settings')
        break
      default:
        navigate('/dashboard')
        break
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <Outlet />
    </DashboardLayout>
  )
}

export default Dashboard
