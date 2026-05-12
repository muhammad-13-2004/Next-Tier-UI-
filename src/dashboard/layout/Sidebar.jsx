import {
  PanelLeftClose,
  PanelLeftOpen,
  House,
  BookOpen,
  Users,
  Bot,
  Briefcase,
  Settings,
  Zap,
} from 'lucide-react'
import LogoApp from '@/assets/LogoApp.png'
import { useDashboard } from '@/hooks/useDashboard'

const menuItems = [
  { id: 'main', label: 'Home', icon: House },
  { id: 'roadmaps', label: 'My Roadmaps', icon: BookOpen },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'aiTutor', label: 'AI Tutor', icon: Bot },
  { id: 'career', label: 'Career', icon: Briefcase },
]

const Sidebar = ({ collapsed, setCollapsed, activeTab, onTabChange }) => {
  const { profile } = useDashboard()
  const creditsRemaining = profile?.credits ?? 0
  const totalCredits = 100
  const creditProgress = Math.min(
    100,
    Math.max(0, (creditsRemaining / totalCredits) * 100)
  )
  const creditProgressLabel = Math.round(creditProgress)

  return (
    <aside
      className={`fixed left-0 top-0 flex h-screen flex-col border-r border-[#F1F5F9] bg-(--background-color) transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-5 border-b border-[#F1F5F9]">
        {!collapsed && (
          <img
            src={LogoApp}
            width="100px"
            alt="This is the logo of the webpage"
          />
        )}

        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-2 p-3 rounded-xl transition ${
                activeTab === item.id
                  ? 'bg-(--primary-color)/6 text-(--primary-color)'
                  : 'hover:bg-(--primary-color)/6 text-(--subtext-color)'
              }`}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="font-normal">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="shrink-0 space-y-1 p-3 mt-3">
        <div
          className={`${
            collapsed
              ? 'px-2 py-3'
              : 'rounded-xl border border-(--secondary-color)/40 bg-(--secondary-color)/20 p-4'
          }`}
        >
          {!collapsed && (
            <>
              <div className="mb-3 flex items-center gap-2 text-(--primary-color)">
                <Zap className="h-4 w-4" />
                <h2 className="text-base font-semibold">Upgrade</h2>
              </div>
              <p className="mb-5 text-xs leading-5 text-(--subtext-color)">
                Get access to all features and benefits of the AI Tutor.
              </p>
              
            </>
          )}
          <div
            role="progressbar"
            aria-label={`${creditProgressLabel}% credits remaining`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={creditProgressLabel}
            className="h-1 w-full overflow-hidden rounded-full bg-(--primary-color)/15"
          >
            <div
              className="h-full rounded-full bg-(--secondary-color)"
              style={{ width: `${creditProgress}%` }}
            />
          </div>
          {!collapsed && (
            <p className="mt-3 text-xs text-(--subtext-color)">
              {creditProgressLabel}% of the daily limit left
            </p>
          )}
          {collapsed && (
            <div className="mt-2 flex justify-center">
              <Zap className="h-4 w-4 text-(--primary-color)" />
            </div>
          )}
        </div>
        <button
          onClick={() => onTabChange('settings')}
          className={`w-full flex items-center gap-2 p-3 mt-3 rounded-xl transition ${
            activeTab === 'settings'
             ? 'bg-(--primary-color)/6 text-(--primary-color)'
              : 'hover:bg-(--primary-color)/6 text-(--subtext-color)'
          }`}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="font-normal">Settings</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
