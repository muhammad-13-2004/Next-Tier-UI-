import React from 'react'
import CodeBlock from './CodeBlock'
import LessonLoadingPlaceholder from './LessonLoadingPlaceholder'
import { parseInline } from '@/dashboard/features/roadmap/utils/lessonContent.jsx'

export default function ReadingTabContent({ contentLoading, contentBlocks }) {
  if (contentLoading) {
    return <LessonLoadingPlaceholder variant="reading" />
  }

  return (
    <div className="space-y-6">
      {contentBlocks.length === 0 ? (
        <p className="text-sm text-[#666]">No content available for this lesson yet.</p>
      ) : null}
      {contentBlocks.map((block, index) => {
        if (block.type === 'h2') return <h2 key={index} className="text-2xl font-bold text-[#111]">{block.text}</h2>
        if (block.type === 'h3') return <h3 key={index} className="text-lg font-bold text-[#111]">{block.text}</h3>
        if (block.type === 'paragraph') return <p key={index} className="text-sm leading-7 text-[#4F4F4F]">{parseInline(block.text)}</p>
        if (block.type === 'list') {
          return (
            <ul key={index} className="space-y-2 pl-5 text-sm leading-7 text-[#4F4F4F]">
              {block.items.map((item) => <li key={item} className="list-disc">{parseInline(item)}</li>)}
            </ul>
          )
        }
        if (block.type === 'table') {
          const [header, ...rows] = block.rows
          return (
            <div key={index} className="overflow-x-auto rounded-2xl border border-[#ECECEC]">
              <table className="min-w-full divide-y divide-[#ECECEC] text-sm">
                <thead className="bg-[#FAFAFA]">
                  <tr>{header.map((cell) => <th key={cell} className="px-4 py-3 text-left font-semibold text-[#111]">{parseInline(cell)}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1F1]">
                  {rows.map((row, rowIndex) => (
                    <tr key={`${row.join('-')}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-[#4F4F4F]">{parseInline(cell)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        if (block.type === 'code') return <CodeBlock key={index} language={block.language} code={block.code} />
        return null
      })}
    </div>
  )
}
