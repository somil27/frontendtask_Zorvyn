import React, { useState, useEffect } from 'react'
import {
  SearchX, FileX, BarChart3, Inbox,
  RefreshCw, Plus, ArrowRight,
} from 'lucide-react'

// ── Variant config: icon, colours, illustration dots 
const VARIANTS = {
  search: {
    Icon:       SearchX,
    color:      '#6366f1',
    bg:         'rgba(99,102,241,0.08)',
    ring:       'rgba(99,102,241,0.15)',
    label:      'No results',
    defaultMsg: 'Try different keywords or clear the filters.',
    actionLabel: 'Clear filters',
    actionIcon:  RefreshCw,
  },
  data: {
    Icon:       Inbox,
    color:      '#10b981',
    bg:         'rgba(16,185,129,0.08)',
    ring:       'rgba(16,185,129,0.15)',
    label:      'Nothing here yet',
    defaultMsg: 'Add your first transaction to get started.',
    actionLabel: 'Add transaction',
    actionIcon:  Plus,
  },
  chart: {
    Icon:       BarChart3,
    color:      '#f59e0b',
    bg:         'rgba(245,158,11,0.08)',
    ring:       'rgba(245,158,11,0.15)',
    label:      'No data to display',
    defaultMsg: 'There\'s not enough data to generate this chart.',
    actionLabel: 'View transactions',
    actionIcon:  ArrowRight,
  },
  default: {
    Icon:       FileX,
    color:      '#7a8299',
    bg:         'rgba(122,130,153,0.08)',
    ring:       'rgba(122,130,153,0.12)',
    label:      'No data found',
    defaultMsg: 'Try adjusting your filters.',
    actionLabel: 'Reset',
    actionIcon:  RefreshCw,
  },
}

// ── Floating particle dots 
const DOTS = [
  { size: 4,  top: '18%', left: '14%', delay: 0,    dur: 3.2 },
  { size: 3,  top: '70%', left: '10%', delay: 0.6,  dur: 2.8 },
  { size: 5,  top: '25%', left: '80%', delay: 1.1,  dur: 3.6 },
  { size: 3,  top: '75%', left: '78%', delay: 0.3,  dur: 2.5 },
  { size: 4,  top: '50%', left: '92%', delay: 1.6,  dur: 3.0 },
  { size: 2,  top: '12%', left: '55%', delay: 0.9,  dur: 4.0 },
]

function FloatDot({ size, top, left, delay, dur, color }) {
  return (
    <span
      style={{
        position:        'absolute',
        width:           size,
        height:          size,
        borderRadius:    '50%',
        background:      color,
        top, left,
        opacity:         0.35,
        animation:       `emptyFloat ${dur}s ease-in-out ${delay}s infinite alternate`,
        pointerEvents:   'none',
      }}
    />
  )
}

// ── Animated ring illustration 
function IconIllustration({ Icon, color, bg, ring, visible }) {
  return (
    <div className="relative flex items-center justify-center mb-6" style={{ width: 96, height: 96 }}>
      {/* Outer pulse ring */}
      <span
        style={{
          position:     'absolute',
          inset:        0,
          borderRadius: '50%',
          border:       `1.5px dashed ${ring}`,
          animation:    visible ? 'emptySpinSlow 12s linear infinite' : 'none',
        }}
      />
      {/* Middle ring */}
      <span
        style={{
          position:     'absolute',
          inset:        10,
          borderRadius: '50%',
          border:       `1px solid ${ring}`,
          animation:    visible ? 'emptySpinSlow 8s linear infinite reverse' : 'none',
          opacity:      0.6,
        }}
      />
      {/* Icon bubble */}
      <div
        style={{
          width:          56,
          height:         56,
          borderRadius:   '50%',
          background:     bg,
          border:         `1.5px solid ${ring}`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          animation:      visible ? 'emptyBob 3s ease-in-out infinite' : 'none',
        }}
      >
        <Icon size={22} style={{ color }} strokeWidth={1.5} />
      </div>
    </div>
  )
}

/**
 * EmptyState — contextual empty/zero-data placeholder.
 *
 * @param {'search'|'data'|'chart'|'default'} variant
 * @param {string}   title      — Override headline
 * @param {string}   message    — Override body text
 * @param {string}   actionLabel — Override CTA label (pass '' to hide)
 * @param {Function} onAction   — CTA callback
 */
export default function EmptyState({
  variant    = 'default',
  title,
  message,
  actionLabel,
  onAction,
}) {
  const [visible, setVisible] = useState(false)
  const cfg = VARIANTS[variant] || VARIANTS.default

  // Trigger entrance after paint
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(id)
  }, [])

  const ActionIcon = cfg.actionIcon
  const showAction = actionLabel !== '' && (onAction || actionLabel)
  const btnLabel   = actionLabel ?? cfg.actionLabel

  return (
    <>
      {/* Keyframes injected once via a style tag */}
      <style>{`
        @keyframes emptyFloat    { from { transform: translateY(0);    } to { transform: translateY(-6px); } }
        @keyframes emptyBob      { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes emptySpinSlow { from { transform: rotate(0deg); }     to { transform: rotate(360deg); } }
        @keyframes emptyFadeUp   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          padding:   '48px 32px',
          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition:'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        {/* Floating dots */}
        {DOTS.map((d, i) => (
          <FloatDot key={i} {...d} color={cfg.color} />
        ))}

        {/* Radial glow behind illustration */}
        <div
          style={{
            position:     'absolute',
            width:         160,
            height:        160,
            borderRadius:  '50%',
            background:    cfg.bg,
            filter:        'blur(32px)',
            pointerEvents: 'none',
            top:           '50%',
            left:          '50%',
            transform:     'translate(-50%, -68%)',
          }}
        />

        {/* Icon with spinning rings */}
        <IconIllustration
          Icon={cfg.Icon}
          color={cfg.color}
          bg={cfg.bg}
          ring={cfg.ring}
          visible={visible}
        />

        {/* Text */}
        <p
          className="text-sm font-semibold mb-1.5"
          style={{ color: 'var(--text-primary)', animation: 'emptyFadeUp 0.4s ease 0.1s both' }}
        >
          {title || cfg.label}
        </p>
        <p
          className="text-xs max-w-xs leading-relaxed"
          style={{ color: 'var(--text-muted)', animation: 'emptyFadeUp 0.4s ease 0.18s both' }}
        >
          {message || cfg.defaultMsg}
        </p>

        {/* CTA button */}
        {showAction && (
          <button
            onClick={onAction}
            className="mt-5 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:scale-105 active:scale-95"
            style={{
              background:  cfg.bg,
              color:       cfg.color,
              borderColor: cfg.ring,
              animation:   'emptyFadeUp 0.4s ease 0.26s both',
              boxShadow:   `0 4px 14px ${cfg.ring}`,
            }}
          >
            <ActionIcon size={12} strokeWidth={2.5} />
            {btnLabel}
          </button>
        )}
      </div>
    </>
  )
}