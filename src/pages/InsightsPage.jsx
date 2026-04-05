import React from 'react'
import { Award, PiggyBank, Activity } from 'lucide-react'
import Card from '../components/UI/Card'
import MonthlyChart from '../components/Insights/MonthlyChart'
import CategoryBreakdown from '../components/Insights/CategoryBreakdown'
import SmartInsights from '../components/Insights/SmartInsights'
import { useTotals, useCategoryBreakdown } from '../hooks/useFinance'
import { useStore } from '../store/useStore'

const fmtAmt = (n) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })

export default function InsightsPage() {
  const { income, expenses } = useTotals()
  const transactions   = useStore((s) => s.transactions)
  const breakdown      = useCategoryBreakdown()
  const topCategory    = breakdown[0]
  const savingsRate    = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0
  const avgAmount      = transactions.length
    ? Math.round(transactions.reduce((s, t) => s + t.amount, 0) / transactions.length)
    : 0

  return (
    <div className="animate-fade-in">
      {/* ── Top KPI row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* Biggest spender */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(244,63,94,0.1)' }}>
              <Award size={14} color="#f43f5e" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Top Expense
            </p>
          </div>
          <p className="text-lg font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
            {topCategory?.category || '—'}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {topCategory ? `${fmtAmt(topCategory.amount)} total spent` : 'No data'}
          </p>
        </Card>

        {/* Savings rate */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}>
              <PiggyBank size={14} color="#10b981" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Savings Rate
            </p>
          </div>
          <p className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {savingsRate}%
          </p>
          {/* Mini progress */}
          <div className="w-full rounded-full overflow-hidden" style={{ height: 4, background: 'var(--bg-tertiary)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(savingsRate, 100)}%`, background: '#10b981' }}
            />
          </div>
        </Card>

        {/* Avg transaction */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.1)' }}>
              <Activity size={14} color="#6366f1" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Avg Transaction
            </p>
          </div>
          <p className="text-lg font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
            {fmtAmt(avgAmount)}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            across {transactions.length} transactions
          </p>
        </Card>
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        <Card className="p-4">
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Monthly Comparison
          </p>
          <MonthlyChart />
        </Card>

        <Card className="p-4">
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Smart Insights
          </p>
          <SmartInsights />
        </Card>
      </div>

      {/* ── Category breakdown ── */}
      <Card className="p-4">
        <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Category Breakdown
        </p>
        <CategoryBreakdown />
      </Card>
    </div>
  )
}
