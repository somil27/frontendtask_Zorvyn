import React, { useState } from 'react'
import Modal from '../UI/Modal'
import { useStore } from '../../store/useStore'
import { CATEGORIES } from '../../data/transactions'

const TODAY = new Date().toISOString().split('T')[0]

const EMPTY_FORM = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: TODAY,
}

/**
 * Modal form for adding a new transaction.
 * Only rendered / accessible when role === 'admin'.
 */
export default function AddTransactionModal({ isOpen, onClose, onAdd }) {
  const addTransactionStore = useStore((s) => s.addTransaction)
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = () => {
    if (!form.description.trim()) return setError('Description is required.')
    const amt = parseFloat(form.amount)
    if (!amt || amt <= 0)        return setError('Enter a valid amount.')

    const tx = { ...form, amount: amt }
    // If parent passed onAdd (for toast), use it; otherwise fall back to store directly
    if (onAdd) { onAdd(tx) } else { addTransactionStore(tx) }
    setForm(EMPTY_FORM)
    setError('')
    onClose()
  }

  const inputStyle = {
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '8px 10px',
    fontSize: 12,
    color: 'var(--text-primary)',
    width: '100%',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
    marginBottom: 5,
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
      {/* Row: Amount + Type */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label style={labelStyle}>Amount ($)</label>
          <input
            style={inputStyle}
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => set('amount', e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Type</label>
          <select style={inputStyle} value={form.type} onChange={(e) => set('type', e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label style={labelStyle}>Description</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="e.g. Grocery shopping"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </div>

      {/* Row: Category + Date */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label style={labelStyle}>Category</label>
          <select style={inputStyle} value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input
            style={inputStyle}
            type="date"
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs mb-3" style={{ color: '#f43f5e' }}>{error}</p>
      )}

      {/* Footer */}
      <div className="flex gap-2 justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-lg text-xs font-medium border transition-all"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          Add Transaction
        </button>
      </div>
    </Modal>
  )
}