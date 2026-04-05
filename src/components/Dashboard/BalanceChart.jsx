import React, { useState } from 'react'
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, Legend,
} from 'recharts'
import { useStore } from '../../store/useStore'
import { useTotals } from '../../hooks/useFinance'


const useBalanceData = () => {
  const { balance, income, expenses } = useTotals()
  return [
    { month: 'Nov', balance: 18200, income: 6800, expenses: 4200 },
    { month: 'Dec', balance: 19800, income: 7400, expenses: 5100 },
    { month: 'Jan', balance: 21000, income: 6900, expenses: 4600 },
    { month: 'Feb', balance: 22400, income: 7200, expenses: 5800 },
    { month: 'Mar', balance: 23100, income: 7100, expenses: 4900 },
    {
      month: 'Apr',
      balance:  Math.max(0, balance),
      income:   Math.max(0, income),
      expenses: Math.max(0, expenses),
    },
  ]
}


const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  const balance  = payload.find((p) => p.dataKey === 'balance')
  const income   = payload.find((p) => p.dataKey === 'income')
  const expenses = payload.find((p) => p.dataKey === 'expenses')

  return (
    <div
      className="rounded-xl px-3.5 py-3 text-xs border"
      style={{
        background:  'var(--card-bg)',
        borderColor: 'var(--border)',
        color:       'var(--text-primary)',
        boxShadow:   '0 8px 24px rgba(0,0,0,0.3)',
        minWidth:    140,
      }}
    >
      
      <p
        className="font-semibold mb-2 pb-1.5 border-b text-xs uppercase tracking-widest"
        style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
      >
        {label}
      </p>
      {balance && (
        <div className="flex justify-between gap-6 mb-1">
          <span style={{ color: 'var(--text-muted)' }}>Balance</span>
          <span className="font-bold" style={{ color: '#6366f1' }}>
            ${balance.value.toLocaleString()}
          </span>
        </div>
      )}
      {income && (
        <div className="flex justify-between gap-6 mb-1">
          <span style={{ color: 'var(--text-muted)' }}>Income</span>
          <span className="font-semibold" style={{ color: '#10b981' }}>
            +${income.value.toLocaleString()}
          </span>
        </div>
      )}
      {expenses && (
        <div className="flex justify-between gap-6">
          <span style={{ color: 'var(--text-muted)' }}>Expenses</span>
          <span className="font-semibold" style={{ color: '#f43f5e' }}>
            -${expenses.value.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}


const ActiveDot = ({ cx, cy, fill }) => (
  <g>
    <circle cx={cx} cy={cy} r={7} fill={fill} fillOpacity={0.15} />
    <circle cx={cx} cy={cy} r={4} fill={fill} />
    <circle cx={cx} cy={cy} r={2} fill="#fff" />
  </g>
)


const SERIES = [
  { key: 'balance',  label: 'Balance',  color: '#6366f1' },
  { key: 'income',   label: 'Income',   color: '#10b981' },
  { key: 'expenses', label: 'Expenses', color: '#f43f5e' },
]


export default function BalanceChart() {
  const theme  = useStore((s) => s.theme)
  const data   = useBalanceData()
  const [active, setActive] = useState('balance')

  const isDark    = theme !== 'light'
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'
  const tickColor = isDark ? '#7a8299' : '#9ca3af'

  // The currently selected series config
  const series = SERIES.find((s) => s.key === active) || SERIES[0]
  const gradId = `grad_${series.key}`


  const avg = Math.round(data.reduce((s, d) => s + d[series.key], 0) / data.length)

  return (
    <div>
      
      <div className="flex gap-1.5 mb-4">
        {SERIES.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              background:  active === key ? color + '20' : 'var(--bg-tertiary)',
              color:       active === key ? color        : 'var(--text-muted)',
              border:      `1px solid ${active === key ? color + '50' : 'transparent'}`,
              boxShadow:   active === key ? `0 0 8px ${color}30` : 'none',
            }}
          >
            
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: active === key ? color : 'var(--text-muted)' }}
            />
            {label}
          </button>
        ))}
      </div>

      
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 10, right: 4, bottom: 0, left: -8 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={series.color} stopOpacity={isDark ? 0.25 : 0.18} />
              <stop offset="100%" stopColor={series.color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />

          {/* Average reference dashed line */}
          <ReferenceLine
            y={avg}
            stroke={series.color}
            strokeDasharray="4 3"
            strokeOpacity={0.35}
            label={{
              value: `Avg $${(avg / 1000).toFixed(1)}k`,
              position: 'insideTopRight',
              fontSize: 9,
              fill: series.color,
              opacity: 0.7,
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: series.color, strokeWidth: 1, strokeOpacity: 0.3 }}
          />

          <Area
            key={active}               // force re-mount so stroke animates on switch
            type="monotone"
            dataKey={series.key}
            stroke={series.color}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            dot={false}
            activeDot={<ActiveDot fill={series.color} />}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* ── Footer: current value pill ── */}
      <div className="flex items-center gap-2 mt-3">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            background: series.color + '15',
            color:      series.color,
            border:     `1px solid ${series.color}30`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: series.color }} />
          Apr (current): ${data[data.length - 1][series.key].toLocaleString()}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          · 6-month view
        </span>
      </div>
    </div>
  )
}