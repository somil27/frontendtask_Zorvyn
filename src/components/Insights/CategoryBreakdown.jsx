import React from 'react'
import { useCategoryBreakdown } from '../../hooks/useFinance'
import { CATEGORY_COLORS } from '../../data/transactions'

const fmtAmt = (n) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })

export default function CategoryBreakdown() {
  const breakdown = useCategoryBreakdown()

  if (!breakdown.length) {
    return <p className="text-xs py-4 text-center" style={{ color: 'var(--text-muted)' }}>No expense data</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {breakdown.map(({ category, amount, percentage }) => (
        <div key={category}>
          {/* Label row */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span
                className="rounded-sm flex-shrink-0"
                style={{
                  display: 'inline-block',
                  width: 8, height: 8,
                  background: CATEGORY_COLORS[category] || '#7a8299',
                }}
              />
              <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                {category}
              </span>
            </div>
            <span className="text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
              {fmtAmt(amount)}
              <span className="ml-1.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                {percentage}%
              </span>
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 4, background: 'var(--bg-tertiary)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                background: CATEGORY_COLORS[category] || '#7a8299',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
