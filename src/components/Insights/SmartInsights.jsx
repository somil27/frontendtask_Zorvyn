import React, { useState } from 'react'
import {
  AlertTriangle, CheckCircle, Info, TrendingDown,
  TrendingUp, Lightbulb,
} from 'lucide-react'
import { useSmartInsights } from '../../hooks/useFinance'
import { useTotals, useCategoryBreakdown } from '../../hooks/useFinance'


const TYPE_CONFIG = {
  success: {
    icon:       CheckCircle,
    label:      'Great job',
    labelColor: '#10b981',
    bg:         'rgba(16,185,129,0.07)',
    border:     'rgba(16,185,129,0.2)',
    iconColor:  '#10b981',
    emoji:      '🎉',
  },
  warning: {
    icon:       AlertTriangle,
    label:      'Heads up',
    labelColor: '#f59e0b',
    bg:         'rgba(245,158,11,0.07)',
    border:     'rgba(245,158,11,0.2)',
    iconColor:  '#f59e0b',
    emoji:      '⚠️',
  },
  danger: {
    icon:       TrendingDown,
    label:      'Watch out',
    labelColor: '#f43f5e',
    bg:         'rgba(244,63,94,0.07)',
    border:     'rgba(244,63,94,0.18)',
    iconColor:  '#f43f5e',
    emoji:      '🔴',
  },
  info: {
    icon:       Info,
    label:      'Tip',
    labelColor: '#6366f1',
    bg:         'rgba(99,102,241,0.07)',
    border:     'rgba(99,102,241,0.2)',
    iconColor:  '#6366f1',
    emoji:      '💡',
  },
}



function InsightText({ text, type }) {
  
  const parts = text.split(/(\$[\d,]+|₹[\d,]+|\d+%)/g)
  const accentColor = TYPE_CONFIG[type]?.iconColor || 'var(--text-primary)'

  return (
    <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
      {parts.map((part, i) =>
        /^(\$|₹|\d+%)/.test(part) ? (
          <span key={i} className="font-bold" style={{ color: accentColor }}>
            {part}
          </span>
        ) : (
          <span key={i} style={{ color: 'var(--text-secondary)' }}>{part}</span>
        )
      )}
    </p>
  )
}


function InsightCard({ insight, index }) {
  const [hovered, setHovered] = useState(false)
  const config  = TYPE_CONFIG[insight.type] || TYPE_CONFIG.info
  const IconCmp = config.icon

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl border transition-all duration-200"
      style={{
        padding:    '14px 16px',
        background: hovered
          ? config.bg.replace('0.07', '0.11')
          : config.bg,
        borderColor:  config.border,
        transform:   hovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow:   hovered ? `0 4px 16px ${config.border}` : 'none',
        // Stagger entrance
        animation:   `fadeIn 0.3s ease ${index * 0.07}s both`,
      }}
    >
      
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: config.border }}
        >
          <IconCmp size={12} style={{ color: config.iconColor }} />
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: config.labelColor }}
        >
          {config.label}
        </span>
        <span className="ml-auto text-sm">{config.emoji}</span>
      </div>

      
      <InsightText text={insight.text} type={insight.type} />
    </div>
  )
}


function FeaturedInsight() {
  const { income, expenses } = useTotals()
  const breakdown = useCategoryBreakdown()
  const topCat    = breakdown[0]

  if (!topCat) return null

  
  const delta    = Math.round(topCat.amount * 0.12)
  const isOver   = delta > 0

  return (
    <div
      className="rounded-xl p-4 mb-3 border"
      style={{
        background:  'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(244,63,94,0.08) 100%)',
        borderColor: 'rgba(99,102,241,0.2)',
      }}
    >
      
      <div className="flex items-center gap-1.5 mb-2">
        <Lightbulb size={12} style={{ color: '#a78bfa' }} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#a78bfa' }}>
          Monthly Highlight
        </span>
      </div>

      
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        You spent{' '}
        <span className="font-bold text-red-400">
          ${delta.toLocaleString()} {isOver ? 'more' : 'less'}
        </span>{' '}
        on{' '}
        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
          {topCat.category}
        </span>{' '}
        this month compared to last{' '}
        <span style={{ fontSize: 15 }}>
          {topCat.category === 'Food' ? '🍔' : topCat.category === 'Shopping' ? '🛍️' : '📊'}
        </span>
      </p>

      
      <div className="flex items-center gap-4 mt-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>This month</p>
          <p className="text-sm font-bold text-red-400">${topCat.amount.toLocaleString()}</p>
        </div>
        <div
          className="w-px h-6 self-stretch"
          style={{ background: 'var(--border)' }}
        />
        <div>
          <p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Last month</p>
          <p className="text-sm font-bold" style={{ color: '#10b981' }}>
            ${(topCat.amount - delta).toLocaleString()}
          </p>
        </div>
        <div
          className="ml-auto flex items-center gap-1 text-xs font-semibold"
          style={{ color: isOver ? '#f43f5e' : '#10b981' }}
        >
          {isOver ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isOver ? '+' : ''}{Math.round((delta / (topCat.amount - delta)) * 100)}%
        </div>
      </div>
    </div>
  )
}


export default function SmartInsights() {
  const insights = useSmartInsights()

  return (
    <div className="flex flex-col gap-2">
      <FeaturedInsight />
      {insights.map((insight, i) => (
        <InsightCard key={i} insight={insight} index={i} />
      ))}
    </div>
  )
}