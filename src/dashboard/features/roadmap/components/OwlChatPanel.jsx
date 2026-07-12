import { X } from 'lucide-react'
import ChatMessages from '@/dashboard/features/ai-tutor/component/ChatMessages'
import ChatInput from '@/dashboard/features/ai-tutor/component/ChatInput'
import { useAiTutor } from '@/hooks/useAiTutor'

export default function OwlChatPanel({ open, onClose, lessonTitle, courseTitle }) {
  const { messages, loading, error, sendMessage } = useAiTutor()

  if (!open) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close chat"
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-[#E9E9E9] bg-white shadow-2xl"
        role="dialog"
        aria-label="Talk with Owl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-[#F0F0F0] px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">
              Talk with Owl
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#111]">Your lesson assistant</h2>
            {lessonTitle ? (
              <p className="mt-1 truncate text-sm text-[#666]">
                {courseTitle ? `${courseTitle} · ` : ''}
                {lessonTitle}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#E5E5E5] p-2 text-[#666] transition-colors hover:bg-[#F7F7F7] hover:text-[#111]"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-[#ECECEC] bg-[#FAFAFA] p-4 text-sm leading-6 text-[#666]">
              Ask Owl anything about this lesson — concepts, examples, or quiz help.
            </div>
          ) : null}
          <ChatMessages messages={messages} loading={loading} />
        </div>

        {error ? (
          <p className="px-5 pb-2 text-sm text-red-600">{error}</p>
        ) : null}

        <div className="border-t border-[#F0F0F0] px-5 py-4">
          <ChatInput onSend={sendMessage} disabled={loading} fullWidth />
        </div>
      </aside>
    </>
  )
}
