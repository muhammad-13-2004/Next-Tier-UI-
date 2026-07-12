import React, { useEffect, useMemo, useState } from 'react'
import { Bell, Globe, HelpCircle, LogOut, Mail, Save, ShieldCheck, User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useDashboard } from '@/hooks/useDashboard'

const ToggleRow = ({ title, description, enabled, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#EBEBEB] bg-white px-4 py-4 text-left transition-colors hover:border-[#D4D4D4]"
  >
    <div className="min-w-0">
      <p className="text-sm font-semibold text-[#111]">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#8A8A8A]">{description}</p>
    </div>
    <div
      className={`relative h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${
        enabled ? 'bg-[#22C55E]' : 'bg-[#D4D4D4]'
      }`}
      aria-hidden="true"
    >
      <span
        className={`block h-5 w-5 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </div>
  </button>
)

const Settings = () => {
  const { profile } = useDashboard()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const initialValues = useMemo(() => {
    const meta = user?.user_metadata ?? {}
    return {
      firstName: profile?.first_name ?? meta?.first_name ?? meta?.given_name ?? '',
      lastName: profile?.last_name ?? meta?.last_name ?? meta?.family_name ?? '',
      email: user?.email ?? profile?.email ?? '',
      timezone: profile?.timezone ?? 'Asia/Karachi',
      language: profile?.language ?? 'English',
    }
  }, [profile, user])

  const [firstName, setFirstName] = useState(initialValues.firstName)
  const [lastName, setLastName] = useState(initialValues.lastName)
  const [timezone, setTimezone] = useState(initialValues.timezone)
  const [language, setLanguage] = useState(initialValues.language)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [productUpdates, setProductUpdates] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  useEffect(() => {
    setFirstName(initialValues.firstName)
    setLastName(initialValues.lastName)
    setTimezone(initialValues.timezone)
    setLanguage(initialValues.language)
  }, [initialValues])

  return (
    <div className="min-h-screen pb-16">
      <div className="mb-6">
        <div className="mt-2 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#111]">
              Settings
            </h1>
            <p className="mt-1 text-sm text-[#8A8A8A]">
              Manage your profile and notification preferences.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#111] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2F2F2F]"
            disabled
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-[#EBEBEB] bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0FDF4] text-[#22C55E]">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111]">Profile details</h2>
                <p className="text-sm text-[#8A8A8A]">Your public account identity.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                  First name
                </span>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#22C55E] focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                  Second name
                </span>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter second name"
                  className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#22C55E] focus:bg-white"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                  Email address
                </span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A3A3]" />
                  <input
                    value={user?.email ?? initialValues.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-2xl border border-[#E5E5E5] bg-[#F8F8F8] py-3 pl-11 pr-4 text-sm text-[#8A8A8A] outline-none"
                  />
                </div>
                <p className="mt-2 text-xs text-[#A3A3A3]">
                  Email is disabled because it is tied to your sign-in account.
                </p>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-[#EBEBEB] bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111]">Preferences</h2>
                <p className="text-sm text-[#8A8A8A]">Simple defaults for your learning experience.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                  Timezone
                </span>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-2xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#22C55E]"
                >
                  <option value="Asia/Karachi">Asia/Karachi</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">
                  Language
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-2xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#111] outline-none transition-colors focus:border-[#22C55E]"
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-[#EBEBEB] bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF7ED] text-[#F97316]">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111]">Notifications</h2>
                <p className="text-sm text-[#8A8A8A]">Choose what updates you want to receive.</p>
              </div>
            </div>

            <div className="space-y-3">
              <ToggleRow
                title="Email updates"
                description="Get product updates, roadmap reminders, and new feature notes."
                enabled={emailUpdates}
                onToggle={() => setEmailUpdates((value) => !value)}
              />
              <ToggleRow
                title="Product announcements"
                description="Hear about new releases and learning tools first."
                enabled={productUpdates}
                onToggle={() => setProductUpdates((value) => !value)}
              />
              <ToggleRow
                title="Weekly digest"
                description="Receive a short weekly summary of your progress."
                enabled={weeklyDigest}
                onToggle={() => setWeeklyDigest((value) => !value)}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-3xl border border-[#EBEBEB] bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#10B981]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111]">Account status</h2>
                <p className="text-sm text-[#8A8A8A]">Your current account details.</p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-[#FAFAFA] p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#8A8A8A]">Plan</span>
                <span className="rounded-full bg-[#111] px-3 py-1 text-xs font-semibold text-white">
                  Free
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#8A8A8A]">Security</span>
                <span className="text-sm font-semibold text-[#111]">Protected</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#8A8A8A]">Password</span>
                <span className="text-sm font-semibold text-[#111]">Managed by login</span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#EBEBEB] bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#EF4444]">
                <LogOut className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111]">Logout</h2>
                <p className="text-sm text-[#8A8A8A]">Sign out from this device.</p>
              </div>
            </div>

            <p className="mb-4 text-sm leading-6 text-[#666]">
              You can safely log out anytime. Your roadmaps and progress stay saved.
            </p>

            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </section>

          <section className="rounded-3xl border border-dashed border-[#E5E7EB] bg-[#FAFAFA] p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#111]">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#111]">Need help later?</h3>
                <p className="mt-1 text-sm leading-6 text-[#8A8A8A]">
                  We can add profile saving, password changes, and notification syncing next.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default Settings
