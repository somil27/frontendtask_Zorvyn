import React, { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Generic modal with backdrop.
 * Closes on Escape key and backdrop click.
 */
export default function Modal({ isOpen, onClose, title, children, width = 360 }) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl border p-5 animate-fade-in"
        style={{
          background: 'var(--card-bg)',
          borderColor: 'var(--border)',
          width,
          maxWidth: 'calc(100vw - 32px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)', background: 'var(--bg-tertiary)' }}
          >
            <X size={13} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
