import { useState } from 'react'

export default function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#232323] bg-[#131313]">
      <div className="flex items-center justify-between border-b border-[#2A2A2A] px-4 py-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8A8A]">
          {language}
        </span>
        <button onClick={handleCopy} className="text-xs font-semibold text-[#BDBDBD] transition-colors hover:text-white">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-6 text-[#ECECEC]">
        <code>{code}</code>
      </pre>
    </div>
  )
}
