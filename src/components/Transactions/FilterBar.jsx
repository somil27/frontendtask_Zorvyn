import React from 'react'
import { Search, X } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { CATEGORIES } from '../../data/transactions'

const inputStyle = {
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '7px 10px',
  fontSize: 12,
  color: 'var(--text-primary)',
  outline: 'none',
}

export default function FilterBar() {
  const filters      = useStore((s) => s.filters)
  const setFilter    = useStore((s) => s.setFilter)
  const resetFilters = useStore((s) => s.resetFilters)

  const isDirty = filters.search || filters.type || filters.category || filters.sort !== 'date-desc'

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Search */}
      <div className="relative flex-1 min-w-40">
        <Search
          size={12}
          style={{
            position: 'absolute', left: 9, top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none',
          }}
        />
        <input
          style={{ ...inputStyle, width: '100%', paddingLeft: 28 }}
          placeholder="Search transactions…"
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
        />
      </div>

      {/* Type */}
      <select
        style={inputStyle}
        value={filters.type}
        onChange={(e) => setFilter('type', e.target.value)}
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category */}
      <select
        style={inputStyle}
        value={filters.category}
        onChange={(e) => setFilter('category', e.target.value)}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>

      {/* Sort */}
      <select
        style={inputStyle}
        value={filters.sort}
        onChange={(e) => setFilter('sort', e.target.value)}
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Highest amount</option>
        <option value="amount-asc">Lowest amount</option>
      </select>

      {/* Clear */}
      {isDirty && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
          style={{ color: 'var(--text-muted)', borderColor: 'var(--border)', background: 'var(--bg-tertiary)' }}
        >
          <X size={11} /> Clear
        </button>
      )}
    </div>
  )
}
