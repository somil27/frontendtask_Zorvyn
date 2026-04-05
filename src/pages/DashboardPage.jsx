import React, { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, Plus, X, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import StatCard from '../components/UI/StatCard'
import Card from '../components/UI/Card'
import BalanceChart from '../components/Dashboard/BalanceChart'
import SpendingPie from '../components/Dashboard/SpendingPie'
import RecentTransactions from '../components/Dashboard/RecentTransactions'
import AddTransactionModal from '../components/Transactions/AddTransactionModal'
import { useTotals } from '../hooks/useFinance'
import { useStore } from '../store/useStore'

const fmtAmt = (n) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })


function FloatingActionButton({ onAdd }) {
  const [open, setOpen]     = useState(false)
  const [hovered, setHovered] = useState(false)
  const role = useStore((s) => s.role)

  
  if (role !== 'admin') return null

  const ACTIONS = [
    { label: 'Add Income',  icon: ArrowUpCircle,   color: '#10b981', bg: 'rgba(16,185,129,0.15)',  type: 'income'  },
    { label: 'Add Expense', icon: ArrowDownCircle,  color: '#f43f5e', bg: 'rgba(244,63,94,0.15)',   type: 'expense' },
  ]

  return (
    <>
      
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        
        <div
          className="flex flex-col items-end gap-2"
          style={{
            opacity:    open ? 1 : 0,
            transform:  open ? 'translateY(0)' : 'translateY(12px)',
            pointerEvents: open ? 'auto' : 'none',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {ACTIONS.map(({ label, icon: Icon, color, bg }, i) => (
            <button
              key={label}
              onClick={() => { setOpen(false); onAdd() }}
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all hover:scale-105 active:scale-95"
              style={{
                background:  bg,
                borderColor: color + '40',
                color,
                boxShadow:   `0 4px 16px ${color}30`,
                // Stagger each sub-button
                transitionDelay: open ? `${i * 0.04}s` : '0s',
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        
        <button
          onClick={() => setOpen((o) => !o)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
          style={{
            background:  'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow:   hovered
              ? '0 0 0 4px rgba(99,102,241,0.25), 0 8px 24px rgba(99,102,241,0.5)'
              : '0 4px 16px rgba(99,102,241,0.4)',
            transform:   hovered ? 'scale(1.08)' : 'scale(1)',
          }}
          title="Add transaction"
        >
          
          <span
            style={{
              display:    'flex',
              transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              transform:  open ? 'rotate(45deg)' : 'rotate(0deg)',
              color:      '#fff',
            }}
          >
            <Plus size={20} strokeWidth={2.5} />
          </span>
        </button>
      </div>
    </>
  )
}

//Page 
export default function DashboardPage() {
  const { income, expenses, balance } = useTotals()
  const [modalOpen, setModalOpen]     = useState(false)

  return (
    // Use relative so the FAB is positioned inside the scrollable page
    <div className="animate-fade-in relative">

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <StatCard
          label="Total Balance"
          value={fmtAmt(balance)}
          change="+8.2% this month"
          trend="up"
          icon={<Wallet size={16} color="#6366f1" />}
          iconBg="rgba(99,102,241,0.12)"
          glowColor="rgba(99,102,241,0.45)"
          className="stagger-1"
        />
        <StatCard
          label="Total Income"
          value={fmtAmt(income)}
          change="+12.5% vs last month"
          trend="up"
          icon={<TrendingUp size={16} color="#10b981" />}
          iconBg="rgba(16,185,129,0.12)"
          glowColor="rgba(16,185,129,0.4)"
          className="stagger-2"
        />
        <StatCard
          label="Total Expenses"
          value={fmtAmt(expenses)}
          change="+4.1% vs last month"
          trend="down"
          icon={<TrendingDown size={16} color="#f43f5e" />}
          iconBg="rgba(244,63,94,0.12)"
          glowColor="rgba(244,63,94,0.4)"
          className="stagger-3"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-4">
        
        <Card className="lg:col-span-3 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              Balance Trend
            </p>
            <div className="flex gap-1">
              {['6M', '1Y'].map((label, i) => (
                <span
                  key={label}
                  className="text-xs px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                  style={{
                    background: i === 0 ? 'var(--accent)' : 'var(--bg-tertiary)',
                    color:      i === 0 ? '#fff' : 'var(--text-muted)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <BalanceChart />
        </Card>

        
        <Card className="lg:col-span-2 p-4">
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Spending Categories
          </p>
          <SpendingPie />
        </Card>
      </div>

      
      <Card className="p-4">
        <RecentTransactions />
      </Card>

      
      <FloatingActionButton onAdd={() => setModalOpen(true)} />

      
      <AddTransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}