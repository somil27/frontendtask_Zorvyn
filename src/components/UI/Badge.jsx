import React from 'react'

const VARIANTS = {
  income:  { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  expense: { bg: 'rgba(244,63,94,0.12)',   color: '#f43f5e' },
  neutral: { bg: 'var(--bg-tertiary)',      color: 'var(--text-muted)' },
  success: { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  warning: { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },
  danger:  { bg: 'rgba(244,63,94,0.12)',   color: '#f43f5e' },
  info:    { bg: 'rgba(99,102,241,0.12)',  color: '#6366f1' },
}

export default function Badge({ variant = 'neutral', children, className = '' }) {
  const { bg, color } = VARIANTS[variant] || VARIANTS.neutral
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ background: bg, color }}
    >
      {children}
    </span>
  )
}
