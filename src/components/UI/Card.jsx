import React from 'react'

/**
 * Base card shell used throughout the dashboard.
 * Accepts className for layout overrides (e.g. col-span).
 */
export default function Card({ children, className = '', style }) {
  return (
    <div
      className={`rounded-xl border transition-theme ${className}`}
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--border)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
