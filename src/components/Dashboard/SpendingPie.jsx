import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { useCategoryBreakdown } from '../../hooks/useFinance'
import { CATEGORY_COLORS } from '../../data/transactions'

const fmtAmt = (n) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs border"
      style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
    >
      <p style={{ color: 'var(--text-muted)', marginBottom: 2 }}>{name}</p>
      <p className="font-semibold">{fmtAmt(value)}</p>
    </div>
  )
}

export default function SpendingPie() {
  const breakdown = useCategoryBreakdown()

  if (!breakdown.length) {
    return (
      <div className="flex items-center justify-center h-28" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
        No expense data
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {/* Doughnut */}
      <div style={{ width: 110, height: 110, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={breakdown}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={34}
              outerRadius={52}
              paddingAngle={2}
              strokeWidth={0}
            >
              {breakdown.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={CATEGORY_COLORS[entry.category] || '#7a8299'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
        {breakdown.map(({ category, percentage }) => (
          <div key={category} className="flex items-center gap-1.5">
            <span
              className="flex-shrink-0 rounded-sm"
              style={{
                width: 8, height: 8,
                background: CATEGORY_COLORS[category] || '#7a8299',
              }}
            />
            <span className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
              {category}
            </span>
            <span className="ml-auto text-xs font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
              {percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
