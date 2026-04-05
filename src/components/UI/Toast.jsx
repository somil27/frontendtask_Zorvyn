import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import {
  CheckCircle2, XCircle, AlertTriangle, Info,
  X, ArrowRight,
} from 'lucide-react'

// ── Config 
const TOAST_DURATION  = 4000   // ms auto-dismiss
const MAX_TOASTS      = 5      // stack cap

const TYPE_CONFIG = {
  success: {
    Icon:        CheckCircle2,
    iconColor:   '#10b981',
    bg:          'rgba(16,185,129,0.1)',
    border:      'rgba(16,185,129,0.25)',
    progressBg:  '#10b981',
    label:       'Success',
  },
  error: {
    Icon:        XCircle,
    iconColor:   '#f43f5e',
    bg:          'rgba(244,63,94,0.1)',
    border:      'rgba(244,63,94,0.25)',
    progressBg:  '#f43f5e',
    label:       'Error',
  },
  warning: {
    Icon:        AlertTriangle,
    iconColor:   '#f59e0b',
    bg:          'rgba(245,158,11,0.1)',
    border:      'rgba(245,158,11,0.25)',
    progressBg:  '#f59e0b',
    label:       'Warning',
  },
  info: {
    Icon:        Info,
    iconColor:   '#6366f1',
    bg:          'rgba(99,102,241,0.1)',
    border:      'rgba(99,102,241,0.25)',
    progressBg:  '#6366f1',
    label:       'Info',
  },
}

// ── Context 
const ToastContext = createContext(null)

// ── Single toast card 
function ToastCard({ toast, onDismiss }) {
  const [exiting, setExiting] = useState(false)
  const [paused,  setPaused]  = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startRef  = useRef(Date.now())
  const timerRef  = useRef(null)
  const rafRef    = useRef(null)

  const cfg = TYPE_CONFIG[toast.type] || TYPE_CONFIG.info

  // ── Progress bar animation ──
  useEffect(() => {
    const tick = () => {
      if (!paused) {
        const now     = Date.now()
        const total   = TOAST_DURATION
        const gone    = Math.min(now - startRef.current, total)
        setElapsed(gone)
        if (gone >= total) { dismiss(); return }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused])

  const dismiss = useCallback(() => {
    setExiting(true)
    setTimeout(() => onDismiss(toast.id), 300)
  }, [toast.id, onDismiss])

  const handleMouseEnter = () => {
    setPaused(true)
  }
  const handleMouseLeave = () => {
    // Shift the start time so remaining duration is preserved
    startRef.current = Date.now() - elapsed
    setPaused(false)
  }

  const progress = Math.min((elapsed / TOAST_DURATION) * 100, 100)

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        // Slide in from right + fade; slide out on exit
        animation:  exiting
          ? 'toastOut 0.28s cubic-bezier(0.4,0,1,1) forwards'
          : 'toastIn  0.32s cubic-bezier(0.34,1.56,0.64,1) forwards',
        background:     'var(--card-bg)',
        border:         `1px solid ${cfg.border}`,
        borderRadius:   14,
        overflow:       'hidden',
        width:          320,
        maxWidth:       'calc(100vw - 32px)',
        backdropFilter: 'blur(16px)',
        boxShadow:      `0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px ${cfg.border}`,
        position:       'relative',
        cursor:         'default',
      }}
    >
      {/* Coloured left accent */}
      <div
        style={{
          position:   'absolute',
          left:       0,
          top:        0,
          bottom:     0,
          width:      3,
          background: cfg.iconColor,
          borderRadius: '14px 0 0 14px',
        }}
      />

      {/* Body */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px 12px 18px' }}>
        {/* Icon */}
        <cfg.Icon
          size={16}
          style={{ color: cfg.iconColor, flexShrink: 0, marginTop: 1 }}
        />

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize:   12,
            fontWeight: 600,
            color:      'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: toast.description ? 3 : 0,
          }}>
            {toast.title}
          </p>
          {toast.description && (
            <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.45 }}>
              {toast.description}
            </p>
          )}
          {/* Optional action link */}
          {toast.action && (
            <button
              onClick={() => { toast.action.onClick(); dismiss() }}
              style={{
                marginTop:  6,
                fontSize:   11,
                fontWeight: 600,
                color:      cfg.iconColor,
                display:    'flex',
                alignItems: 'center',
                gap:        3,
                background: 'none',
                border:     'none',
                padding:    0,
                cursor:     'pointer',
              }}
            >
              {toast.action.label}
              <ArrowRight size={10} />
            </button>
          )}
        </div>

        {/* Dismiss button */}
        <button
          onClick={dismiss}
          style={{
            width:        20,
            height:       20,
            borderRadius: 6,
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            background:   'var(--bg-tertiary)',
            border:       'none',
            cursor:       'pointer',
            color:        'var(--text-muted)',
            flexShrink:   0,
            transition:   'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
        >
          <X size={10} />
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: 'var(--bg-tertiary)', margin: '0 3px 3px' }}>
        <div
          style={{
            height:      '100%',
            width:       `${100 - progress}%`,
            background:  cfg.progressBg,
            borderRadius: 2,
            transition:  paused ? 'none' : 'width 0.1s linear',
          }}
        />
      </div>
    </div>
  )
}

// ── Toast stack renderer 
function ToastRenderer({ toasts, dismiss }) {
  return (
    <>
      <style>{`
        @keyframes toastIn  { from { opacity:0; transform:translateX(24px) scale(0.95); } to { opacity:1; transform:translateX(0) scale(1); } }
        @keyframes toastOut { from { opacity:1; transform:translateX(0) scale(1);       } to { opacity:0; transform:translateX(24px) scale(0.95); } }
      `}</style>

      <div
        style={{
          position:      'fixed',
          bottom:        24,
          right:         24,
          zIndex:        9999,
          display:       'flex',
          flexDirection: 'column',
          gap:           10,
          pointerEvents: toasts.length ? 'auto' : 'none',
        }}
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </>
  )
}

// ── Provider 
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((type, title, description, action) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [
      ...prev.slice(-(MAX_TOASTS - 1)),
      { id, type, title, description, action },
    ])
  }, [])

  // Convenience methods
  const api = {
    success: (title, desc, action) => toast('success', title, desc, action),
    error:   (title, desc, action) => toast('error',   title, desc, action),
    warning: (title, desc, action) => toast('warning', title, desc, action),
    info:    (title, desc, action) => toast('info',    title, desc, action),
    dismiss,
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastRenderer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

// ── Hook 
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}