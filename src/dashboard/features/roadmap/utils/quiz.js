const sanitizeQuizItems = (items) => {
  if (!Array.isArray(items)) return []
  return items
    .filter((q) => q && typeof q === 'object')
    .map((q) => ({
      question: String(q.question ?? ''),
      options: Array.isArray(q.options) ? q.options.map((o) => String(o ?? '')) : [],
      correctIndex: Number.isInteger(q.correctIndex) ? q.correctIndex : 0,
    }))
    .filter((q) => q.question && q.options.length > 0)
}

const tryParseJson = (raw) => {
  if (typeof raw !== 'string') return null
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .replace(/\|+$/, '')
  try {
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}

export function extractQuizItems(payload) {
  if (!payload) return []

  const direct = sanitizeQuizItems(payload.quiz)
  if (direct.length) return direct

  const nested = sanitizeQuizItems(payload?.data?.quiz)
  if (nested.length) return nested

  if (typeof payload === 'string') {
    const parsed = tryParseJson(payload)
    return parsed ? extractQuizItems(parsed) : []
  }

  if (typeof payload?.value === 'string') {
    const parsed = tryParseJson(payload.value)
    return parsed ? extractQuizItems(parsed) : []
  }

  return []
}
