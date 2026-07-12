import React from 'react'

export function parseInline(text) {
  return String(text ?? '')
    .split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-[#111]">
            {part.slice(2, -2)}
          </strong>
        )
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="rounded bg-[#F5F5F5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#111]">
            {part.slice(1, -1)}
          </code>
        )
      }
      return part
    })
}

export function normalizeContentToString(content) {
  const formatStructuredBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return null
    const valid = blocks.filter((item) => item && typeof item === 'object' && typeof item.type === 'string' && item.value != null)
    if (!valid.length) return null
    return valid
      .map((item) => {
        const blockValue = typeof item.value === 'string' ? item.value : String(item.value)
        const t = item.type.toLowerCase()
        if (t === 'text') return blockValue
        if (t === 'example') return `## Example\n\n${blockValue}`
        if (t === 'code') return `sql\n${blockValue}`
        if (t === 'references') return `## References\n\n${blockValue}`
        return blockValue
      })
      .join('\n\n')
  }

  const tryParseConcatenatedJsonObjects = (raw) => {
    if (typeof raw !== 'string') return null
    const trimmed = raw.trim()
    if (!trimmed.startsWith('{') || !trimmed.includes('"type"')) return null
    try {
      const asArray = `[${trimmed.replace(/}\s*{/g, '},{')}]`
      return formatStructuredBlocks(JSON.parse(asArray))
    } catch {
      return null
    }
  }

  if (typeof content === 'string') return tryParseConcatenatedJsonObjects(content) || content
  if (content == null) return ''
  if (Array.isArray(content)) {
    const formatted = formatStructuredBlocks(content)
    if (formatted) return formatted
    return content.map((item) => normalizeContentToString(item)).join('\n')
  }
  if (typeof content === 'object') {
    const formatted = formatStructuredBlocks([content])
    if (formatted) return formatted
    if (typeof content.content === 'string') return content.content
    if (typeof content.text === 'string') return content.text
    try {
      const json = JSON.stringify(content, null, 2)
      return tryParseConcatenatedJsonObjects(json) || json
    } catch {
      return ''
    }
  }
  return String(content)
}

export function parseContentBlocks(content = '') {
  const safeContent = normalizeContentToString(content)
  const lines = safeContent.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const trimmed = lines[i].trim()
    if (!trimmed) {
      i += 1
      continue
    }

    if (/^[a-z]+$/i.test(trimmed) && i + 1 < lines.length) {
      const codeLines = []
      i += 1
      while (i < lines.length) {
        const currentTrimmed = lines[i].trim()
        const nextTrimmed = lines[i + 1]?.trim() ?? ''
        if (!currentTrimmed && (!nextTrimmed || nextTrimmed.startsWith('#') || nextTrimmed.startsWith('- ') || nextTrimmed.startsWith('|'))) break
        codeLines.push(lines[i])
        i += 1
      }
      blocks.push({ type: 'code', language: trimmed, code: codeLines.join('\n').replace(/```+$/g, '').trimEnd() })
      continue
    }

    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.slice(4) })
      i += 1
      continue
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3) })
      i += 1
      continue
    }
    if (trimmed.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace(/^- /, ''))
        i += 1
      }
      blocks.push({ type: 'list', items })
      continue
    }
    if (trimmed.startsWith('|')) {
      const rows = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i].trim().split('|').slice(1, -1).map((cell) => cell.trim())
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) rows.push(cells)
        i += 1
      }
      if (rows.length) blocks.push({ type: 'table', rows })
      continue
    }

    const paragraph = []
    while (i < lines.length) {
      const current = lines[i].trim()
      if (!current || current.startsWith('## ') || current.startsWith('### ') || current.startsWith('- ') || current.startsWith('|') || /^[a-z]+$/i.test(current)) break
      paragraph.push(current)
      i += 1
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
  }

  return blocks.filter((block) => block.type !== 'code' || block.code.length > 0)
}
