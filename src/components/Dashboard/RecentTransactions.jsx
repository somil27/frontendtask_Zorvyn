import React from 'react'
import Badge from '../UI/Badge'
import { useStore } from '../../store/useStore'

const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const fmtAmt = (n) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })

/** Shows the 5 most recent transactions — used on the Dashboard overview. */
export default function RecentTransactions() {
  const transactions  = useStore((s) => s.transactions)
  const setActivePage = useStore((s) => s.setActivePage)

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
          Recent Transactions
        </p>
        <button
          onClick={() => setActivePage('transactions')}
          className="text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--accent)' }}
        >
          View all →
        </button>
      </div>

      {recent.length === 0 ? (
        <p className="text-xs text-center py-6" style={{ color: 'var(--text-muted)' }}>
          No transactions yet. Add one to get started.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Date', 'Description', 'Category', 'Amount', 'Type'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-2 py-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((tx) => (
                <tr
                  key={tx.id}
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="px-2 py-2.5 text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                    {fmtDate(tx.date)}
                  </td>
                  <td className="px-2 py-2.5 text-xs font-medium" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>
                    {tx.description}
                  </td>
                  <td className="px-2 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                    <Badge variant="neutral">{tx.category}</Badge>
                  </td>
                  <td
                    className="px-2 py-2.5 text-xs font-semibold tabular-nums"
                    style={{
                      color: tx.type === 'income' ? '#10b981' : '#f43f5e',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {tx.type === 'expense' ? '−' : '+'} {fmtAmt(tx.amount)}
                  </td>
                  <td className="px-2 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                    <Badge variant={tx.type}>{tx.type}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
