import React, { useState } from 'react'
import {
  LayoutDashboard, ArrowLeftRight, BarChart2,
  User, Layers, ShieldCheck, Eye,
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import logo from '../../assets/logo.png'

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights',     label: 'Insights',     icon: BarChart2 },
]


function NavItem({ id, label, Icon, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  const highlighted = isActive || hovered

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative w-full flex items-center gap-2 px-4 py-2 rounded-lg
        transition-all duration-200 text-xs font-medium text-left
        ${isActive
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
          : 'hover:bg-slate-700 text-slate-400 hover:text-white'
        }
      `}
    >
      
      {isActive && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-white opacity-80"
          style={{ left: -1 }}
        />
      )}

      
      <Icon
        size={15}
        style={{
          transform:  isActive ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          flexShrink: 0,
        }}
      />
      {label}

      
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-60" />
      )}
    </button>
  )
}

export default function Sidebar() {
  const activePage    = useStore((s) => s.activePage)
  const setActivePage = useStore((s) => s.setActivePage)
  const role          = useStore((s) => s.role)
  const toggleRole    = useStore((s) => s.toggleRole)
  const isAdmin       = role === 'admin'

  return (
    <aside
      className="h-screen bg-slate-900 border-r border-slate-700 flex flex-col flex-shrink-0"
      style={{ width: 'var(--sidebar-width)' }}
    >
      
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-slate-700/60">
      <img
      src={logo}
      alt="logo"
      className="w-8 h-8 rounded-lg object-cover shadow-md"
      />
        <div>
          <p className="text-sm font-bold tracking-tight text-white leading-none">FinTrack</p>
          <p className="text-[10px] text-slate-500 leading-none mt-0.5">Finance Dashboard</p>
        </div>
      </div>

      
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-2 mb-2">
          Main
        </p>

        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <NavItem
            key={id}
            id={id}
            label={label}
            Icon={Icon}
            isActive={activePage === id}
            onClick={() => setActivePage(id)}
          />
        ))}

        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-2 mt-5 mb-2">
          Account
        </p>

        <button
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150
                     text-xs font-medium text-left text-slate-400 hover:bg-slate-700 hover:text-white"
        >
          <User size={15} /> Profile
        </button>
      </nav>

      
      <div className="p-3 border-t border-slate-700/60">
        
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2"
          style={{ background: isAdmin ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.04)' }}
        >
          {isAdmin
            ? <ShieldCheck size={13} className="text-indigo-400 flex-shrink-0" />
            : <Eye         size={13} className="text-slate-400 flex-shrink-0" />
          }
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-slate-500 leading-none">Current role</p>
            <p className={`text-xs font-semibold mt-0.5 leading-none ${isAdmin ? 'text-indigo-400' : 'text-slate-300'}`}>
              {isAdmin ? 'Administrator' : 'Viewer'}
            </p>
          </div>
        </div>

        <button
          onClick={toggleRole}
          className="w-full rounded-lg px-3 py-1.5 text-xs font-medium border transition-all
                     hover:opacity-80 active:scale-95"
          style={{
            background:  'transparent',
            color:       isAdmin ? '#818cf8' : '#94a3b8',
            borderColor: isAdmin ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.08)',
          }}
        >
          Switch to {isAdmin ? 'Viewer' : 'Admin'}
        </button>
      </div>
    </aside>
  )
}