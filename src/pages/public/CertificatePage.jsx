import { useNavigate } from 'react-router-dom'

// ── Mock Data ─────────────────────────────────────────────────────────────────
const CERTIFICATE_DATA = {
  studentName: 'Muhammad Usman',
  courseName: 'Python for Data Science',
  completionDate: 'May 25, 2025',
  instructorName: 'NextTier Team',
  instructorTitle: 'Instructor',
  certificateId: 'NT-2025-PY-00847',
}

// ── Decorative dots scattered around the congrats section ────────────────────
const DOTS = [
  { top: '8%', left: '12%', size: 6, color: '#7AE84A', opacity: 0.8 },
  { top: '15%', left: '25%', size: 4, color: '#7AE84A', opacity: 0.5 },
  { top: '5%', left: '55%', size: 5, color: '#7AE84A', opacity: 0.6 },
  { top: '18%', left: '72%', size: 4, color: '#7AE84A', opacity: 0.4 },
  { top: '10%', left: '85%', size: 6, color: '#7AE84A', opacity: 0.7 },
  { top: '30%', left: '5%', size: 3, color: '#7AE84A', opacity: 0.4 },
  { top: '28%', left: '90%', size: 4, color: '#7AE84A', opacity: 0.5 },
]

// ── Certificate visual (printable card) ──────────────────────────────────────
function CertificateCard({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mx-auto w-full max-w-xl overflow-hidden">
      {/* Green top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#7AE84A] via-[#a3f06e] to-[#7AE84A]" />

      <div className="px-10 py-8 flex flex-col items-center text-center gap-4">
        {/* Header label */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-[9px] font-bold tracking-[0.25em] text-[#7AE84A] uppercase">
            Certificate of Completion
          </p>
          <p className="text-xs text-gray-400 mt-1">This is to certify that</p>
        </div>

        {/* Student name */}
        <h2
          className="text-4xl font-bold text-gray-900"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}
        >
          {data.studentName}
        </h2>

        {/* Body text */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">
            has successfully completed the course
          </p>
          <p className="text-base font-bold text-[#7AE84A]">
            {data.courseName}
          </p>
          <p className="text-xs text-gray-500">
            and has demonstrated the required skills and knowledge.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-dashed border-gray-200 my-1" />

        {/* Footer row: date | medal | signature */}
        <div className="w-full flex items-center justify-between">
          {/* Date */}
          <div className="flex items-center gap-2 text-left">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7AE84A"
                strokeWidth="2"
                className="w-3.5 h-3.5"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">
                Date of Completion
              </p>
              <p className="text-xs font-semibold text-gray-700">
                {data.completionDate}
              </p>
            </div>
          </div>

          {/* Medal badge */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-red-400 rounded-sm" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-sm rotate-45" />
            </div>
          </div>

          {/* Signature */}
          <div className="text-right">
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: 'Brush Script MT, cursive', lineHeight: 1 }}
            >
              {data.instructorName}
            </p>
            <div className="w-24 h-px bg-gray-300 mt-1 ml-auto mb-1" />
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">
              {data.instructorTitle}
            </p>
          </div>
        </div>

        {/* Certificate ID */}
        <p className="text-[9px] text-gray-300 tracking-widest mt-1">
          ID: {data.certificateId}
        </p>
      </div>

      {/* Green bottom accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#7AE84A] via-[#a3f06e] to-[#7AE84A]" />
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CertificatePage() {
  const navigate = useNavigate()
  const data = CERTIFICATE_DATA

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Congrats hero ── */}
      <div className="relative bg-white border-b border-gray-100 py-10 flex flex-col items-center overflow-hidden">
        {/* Scattered dots */}
        {DOTS.map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              background: d.color,
              opacity: d.opacity,
            }}
          />
        ))}

        {/* Green check circle */}
        <div className="w-14 h-14 rounded-full border-4 border-[#7AE84A] flex items-center justify-center mb-4 bg-white shadow-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7AE84A"
            strokeWidth="3"
            className="w-7 h-7"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Congratulations!
        </h1>
        <p className="text-sm text-gray-500 mb-0.5">
          You have successfully completed
        </p>
        <p className="text-base font-bold text-[#7AE84A]">{data.courseName}</p>
        <p className="text-xs text-gray-400 mt-1.5">
          Keep up the great work and continue your learning journey.
        </p>
      </div>

      {/* ── Certificate card ── */}
      <div className="flex-1 flex flex-col items-center px-6 py-8 gap-6">
        <CertificateCard data={data} />

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="flex items-center gap-2 bg-[#7AE84A] text-black font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Certificate
          </button>
          <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share Certificate
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* What's Next banner */}
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xl">
            🚀
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">What's next?</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Continue your learning journey by exploring new roadmaps.
            </p>
          </div>
          <button
            onClick={() => navigate('/roadmaps')}
            className="flex items-center gap-1.5 bg-green-50 border border-[#7AE84A]/40 text-[#3a7a1a] font-semibold text-xs px-4 py-2 rounded-xl hover:bg-green-100 transition-colors whitespace-nowrap shrink-0"
          >
            Explore Roadmaps
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-3.5 h-3.5"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
