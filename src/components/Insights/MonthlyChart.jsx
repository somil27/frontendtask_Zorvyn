import React from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { useMonthlyComparison } from '../../hooks/useFinance'
import { useStore } from '../../store/useStore'

const MONTHS = ['2024-02', '2024-03', '2024-04']
const LABELS  = { '2024-02': 'Feb', '2024-03': 'Mar', '2024-04': 'Apr' }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs border"
      style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
    >
      <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill, marginBottom: 1 }}>
          {p.name}: ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function MonthlyChart() {
  const theme   = useStore((s) => s.theme)
  const rawData = useMonthlyComparison(MONTHS)

  const data = rawData.map((d) => ({
    month:    LABELS[d.month],
    Income:   d.income,
    Expenses: d.expenses,
  }))

  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'
  const tickColor = theme === 'dark' ? '#7a8299' : '#9ca3af'

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} barGap={4} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 11, fill: tickColor }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Legend
          wrapperStyle={{ fontSize: 11, color: tickColor, paddingTop: 8 }}
          iconType="square"
          iconSize={8}
        />
        <Bar dataKey="Income"   fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={36} />
        <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  )
}
