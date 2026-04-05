import React, { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

/**
 * Summary card used in Dashboard header row.
 * Enhanced with hover lift, animated glow, and gradient border/background.
 *
 * @param {string}      label     — Card title
 * @param {string}      value     — Formatted value string
 * @param {string}      change    — e.g. "+8.2% this month"
 * @param {'up'|'down'} trend     — Drives change colour
 * @param {ReactNode}   icon      — Icon element
 * @param {string}      iconBg    — Background colour for icon container
 * @param {string}      glowColor — CSS colour used for the hover glow
 */
export default function StatCard({
  label,
  value,
  change,
  trend,
  icon,
  iconBg,
  glowColor = 'rgba(99,102,241,0.45)',
  className = '',
}) {
  const [hovered, setHovered] = useState(false)

  const isUp        = trend === 'up'
  const changeColor = isUp ? '#10b981' : '#f43f5e'
  const TrendIcon   = isUp ? TrendingUp : TrendingDown

  
  const glowSoft = glowColor.replace(/[\d.]+\)$/, '0.07)')

  return (
    <div
      className={`relative rounded-xl animate-fade-in ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        
        transform:  hovered ? 'translateY(-3px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',

      
        boxShadow: hovered
          ? `0 0 0 1px ${glowColor}, 0 8px 32px ${glowColor}, 0 2px 8px rgba(0,0,0,0.28)`
          : '0 1px 3px rgba(0,0,0,0.18)',

        
        background: hovered
          ? `linear-gradient(var(--card-bg), var(--card-bg)) padding-box,
             linear-gradient(135deg, ${glowColor}, transparent 65%) border-box`
          : 'var(--card-bg)',
        border: '1px solid transparent',
        borderRadius: 12,
      }}
    >
      
      <div
        style={{
          position:      'absolute',
          inset:         0,
          borderRadius:  11,
          background:    `radial-gradient(ellipse at top left, ${glowSoft}, transparent 70%)`,
          opacity:       hovered ? 1 : 0,
          transition:    'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      
      <div className="relative p-4">

        
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
          style={{
            background: iconBg,
            transform:  hovered ? 'scale(1.12)' : 'scale(1)',
            transition: 'transform 0.2s ease',
          }}
        >
          {icon}
        </div>

      
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>

        
        <p
          className="text-2xl font-bold leading-none mb-1"
          style={
            hovered
              ? {
                  background:           `linear-gradient(90deg, var(--text-primary) 55%, ${glowColor.replace(/[\d.]+\)$/, '0.95)')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  transition:           'all 0.2s ease',
                }
              : {
                  color:      'var(--text-primary)',
                  transition: 'all 0.2s ease',
                }
          }
        >
          {value}
        </p>

        
        {change && (
          <p className="text-xs flex items-center gap-1 mt-1" style={{ color: changeColor }}>
            <TrendIcon size={11} />
            {change}
          </p>
        )}
      </div>
    </div>
  )
}