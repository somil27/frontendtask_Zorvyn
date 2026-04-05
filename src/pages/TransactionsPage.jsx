import React from 'react'
import Card from '../components/UI/Card'
import FilterBar from '../components/Transactions/FilterBar'
import TransactionTable from '../components/Transactions/TransactionTable'
import { useStore } from '../store/useStore'
import { Download } from 'lucide-react'

export default function TransactionsPage() {
  const transactions = useStore((s) => s.transactions)

  
  const handleExportCSV = () => {
    if (!transactions.length) return

    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']

    const rows = transactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount,
    ])

    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(','))
        .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'transactions.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="animate-fade-in">

      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        
        
        <div className="flex gap-3 flex-wrap">
          {[
            { label: 'Total', value: transactions.length, suffix: ' transactions' },
            { label: 'Income', value: transactions.filter(t => t.type === 'income').length, suffix: ' entries' },
            { label: 'Expenses', value: transactions.filter(t => t.type === 'expense').length, suffix: ' entries' },
          ].map(({ label, value, suffix }) => (
            <div
              key={label}
              className="px-4 py-2.5 rounded-xl border text-xs bg-slate-900 border-slate-800 text-gray-400"
            >
              {label}:{' '}
              <span className="font-semibold text-white">
                {value}
              </span>
              {suffix}
            </div>
          ))}
        </div>

        
        <button
          onClick={handleExportCSV}
          className="
            flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
            bg-blue-600 text-white
            hover:bg-blue-500
            transition-all duration-300
            hover:scale-[1.03] hover:shadow-md
          "
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      
      <Card className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
        <FilterBar />
        <TransactionTable />
      </Card>
    </div>
  )
}