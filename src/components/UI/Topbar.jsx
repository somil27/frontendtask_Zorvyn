import React, { useState, useEffect } from 'react'
import { Moon, Sun, Plus, Search, Bell, ChevronRight, X } from 'lucide-react'
import { useStore } from '../../store/useStore'

// Page metadata
const PAGE_META = {
  dashboard:    { title: 'Dashboard',    sub: 'Overview of your finances'      },
  transactions: { title: 'Transactions', sub: 'All income and expense records'  },
  insights:     { title: 'Insights',     sub: 'Trends, patterns and smart tips' },
}

// Live clock 
function LiveClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

//Notification dot
function NotificationBell() {
  const [open, setOpen]   = useState(false)
  const [count, setCount] = useState(2)

  const notes = [
    { id: 1, text: 'Your balance crossed $24k 🎉',   time: '2m ago',  color: '#10b981' },
    { id: 2, text: 'Food spending up 12% this month', time: '1h ago',  color: '#f59e0b' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen((o) => !o); setCount(0) }}
        className="relative w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:scale-105 active:scale-95"
        style={{
          background:  'rgba(255,255,255,0.06)',
          borderColor: 'rgba(255,255,255,0.1)',
          color:       'var(--text-muted)',
          backdropFilter: 'blur(8px)',
        }}
        title="Notifications"
      >
        <Bell size={13} />
        {count > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-white flex items-center justify-center"
            style={{ background: '#f43f5e', fontSize: 8, fontWeight: 700, lineHeight: 1 }}
          >
            {count}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-10 z-50 rounded-xl border overflow-hidden"
            style={{
              width:       260,
              background:  'var(--card-bg)',
              borderColor: 'var(--border)',
              boxShadow:   '0 16px 40px rgba(0,0,0,0.35)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between px-3 py-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications</p>
              <button onClick={() => setOpen(false)}>
                <X size={12} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>
            {notes.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-2.5 px-3 py-2.5 transition-colors"
                style={{ borderBottom: '1px solid var(--border)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-snug" style={{ color: 'var(--text-primary)' }}>{n.text}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{n.time}</p>
                </div>
              </div>
            ))}
            <div className="px-3 py-2 text-center">
              <span className="text-xs" style={{ color: 'var(--accent)', cursor: 'pointer' }}>View all</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ── Search bar
function SearchBar() {
  const [focused, setFocused] = useState(false)
  const [val, setVal]         = useState('')

  return (
    <div
      className="relative flex items-center transition-all duration-200"
      style={{ width: focused ? 200 : 150 }}
    >
      <Search
        size={12}
        style={{
          position:      'absolute',
          left:          9,
          color:         'var(--text-muted)',
          pointerEvents: 'none',
          flexShrink:    0,
        }}
      />
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search…"
        className="w-full rounded-lg text-xs transition-all"
        style={{
          height:      32,
          paddingLeft: 28,
          paddingRight: 10,
          background:  focused ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
          border:      `1px solid ${focused ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
          color:       'var(--text-primary)',
          outline:     'none',
          backdropFilter: 'blur(8px)',
          boxShadow:   focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
        }}
      />
    </div>
  )
}

// Avatar 
function Avatar({ role }) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-all hover:opacity-80"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', fontSize: 10 }}
      >
        SG
      </div>
      <div className="hidden sm:block">
        <p className="text-xs font-medium leading-none" style={{ color: 'var(--text-primary)' }}>Somil S.G</p>
        <p className="text-[9px] leading-none mt-0.5 capitalize" style={{ color: 'var(--text-muted)' }}>{role}</p>
      </div>
    </div>
  )
}

// Main Topbar 
export default function Topbar({ onAddClick }) {
  const activePage  = useStore((s) => s.activePage)
  const theme       = useStore((s) => s.theme)
  const toggleTheme = useStore((s) => s.toggleTheme)
  const role        = useStore((s) => s.role)

  const meta    = PAGE_META[activePage] || PAGE_META.dashboard
  const isDark  = theme === 'dark'

  return (
    <header
      className="flex items-center gap-3 px-5 border-b flex-shrink-0 relative overflow-hidden"
      style={{
        height:      56,
        // Glass morphism core
        background:  isDark
          ? 'rgba(22, 27, 39, 0.7)'
          : 'rgba(238, 240, 247, 0.75)',
        backdropFilter:         'blur(20px) saturate(180%)',
        WebkitBackdropFilter:   'blur(20px) saturate(180%)',
        borderColor:            isDark
          ? 'rgba(255,255,255,0.07)'
          : 'rgba(0,0,0,0.07)',
        // Subtle top shimmer line
        boxShadow: isDark
          ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(0,0,0,0.2)'
          : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 0 rgba(0,0,0,0.06)',
      }}
    >
      {/* Frosted glass noise texture overlay */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: isDark
            ? 'linear-gradient(90deg, rgba(99,102,241,0.03) 0%, transparent 60%)'
            : 'linear-gradient(90deg, rgba(99,102,241,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Left: breadcrumb + subtitle */}
      <div className="flex-1 min-w-0 relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>FinFlow</span>
          <ChevronRight size={9} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <span
            className="text-[10px] font-medium"
            style={{ color: isDark ? 'rgba(99,102,241,0.9)' : '#6366f1' }}
          >
            {meta.title}
          </span>
        </div>
        {/* Main title */}
        <h1 className="text-sm font-bold leading-none truncate" style={{ color: 'var(--text-primary)' }}>
          {meta.title}
          <span
            className="ml-2 hidden sm:inline text-xs font-normal"
            style={{ color: 'var(--text-muted)' }}
          >
            — {meta.sub}
          </span>
        </h1>
      </div>

      {/* ── Right: controls ── */}
      <div className="flex items-center gap-2 relative">
        <LiveClock />

        <div className="w-px h-4 mx-0.5" style={{ background: 'var(--border)' }} />

        <SearchBar />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:scale-105 active:scale-95"
          style={{
            background:     'rgba(255,255,255,0.06)',
            borderColor:    'rgba(255,255,255,0.1)',
            color:          'var(--text-muted)',
            backdropFilter: 'blur(8px)',
          }}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark
            ? <Sun  size={13} style={{ color: '#f59e0b' }} />
            : <Moon size={13} style={{ color: '#6366f1' }} />
          }
        </button>

        <NotificationBell />

        {/* Add button — Admin only */}
        {role === 'admin' && (
          <button
            onClick={onAddClick}
            className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{
              background:  'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color:       '#fff',
              boxShadow:   '0 2px 8px rgba(99,102,241,0.4)',
              border:      '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Plus size={12} strokeWidth={2.5} />
            Add
          </button>
        )}

        <div className="w-px h-4 mx-0.5" style={{ background: 'var(--border)' }} />

        <Avatar role={role} />
      </div>
    </header>
  )
}