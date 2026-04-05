import React from 'react'
import { Trash2, ArrowUpDown } from 'lucide-react'
import Badge from '../UI/Badge'
import EmptyState from '../UI/EmptyState'
import { useStore } from '../../store/useStore'

/** Format a yyyy-mm-dd date string to "Apr 3" */
const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

/** Format a number as $1,234 */
const fmtAmt = (n) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

const TH = ({ children, className = '' }) => (
  <th
    className={`text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wider ${className}`}
    style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
  >
    {children}
  </th>
)

const TD = ({ children, className = '', style }) => (
  <td
    className={`px-3 py-2.5 ${className}`}
    style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', ...style }}
  >
    {children}
  </td>
)

export default function TransactionTable() {
  const transactions    = useStore((s) => s.getFilteredTransactions())
  const deleteTransaction = useStore((s) => s.deleteTransaction)
  const role            = useStore((s) => s.role)
  const isAdmin         = role === 'admin'

  if (!transactions.length) {
    return <EmptyState title="No transactions found" message="Try adjusting your search or filters." />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <TH>Date</TH>
            <TH>Description</TH>
            <TH>Category</TH>
            <TH>Type</TH>
            <TH className="text-right">Amount</TH>
            {isAdmin && <TH className="w-10"></TH>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <TD style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {fmtDate(tx.date)}
              </TD>
              <TD className="font-medium">{tx.description}</TD>
              <TD>
                <Badge variant="neutral">{tx.category}</Badge>
              </TD>
              <TD>
                <Badge variant={tx.type}>{tx.type}</Badge>
              </TD>
              <TD
                className="text-right font-semibold tabular-nums"
                style={{ color: tx.type === 'income' ? '#10b981' : '#f43f5e' }}
              >
                {tx.type === 'expense' ? '−' : '+'} {fmtAmt(tx.amount)}
              </TD>
              {isAdmin && (
                <TD>
                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="p-1 rounded transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f43f5e')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </TD>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
