import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_TRANSACTIONS } from '../data/transactions'

/**
 * Central Zustand store.
 * Persisted to localStorage so state survives page refreshes.
 */
export const useStore = create(
  persist(
    (set, get) => ({
      // ── State ────────────────────────────────────────
      transactions: DEFAULT_TRANSACTIONS,
      role: 'admin',           // 'admin' | 'viewer'
      theme: 'dark',           // 'dark' | 'light'
      activePage: 'dashboard', // 'dashboard' | 'transactions' | 'insights'
      filters: {
        search: '',
        type: '',
        category: '',
        sort: 'date-desc',
      },

      // ── Role ─────────────────────────────────────────
      toggleRole: () =>
        set((s) => ({ role: s.role === 'admin' ? 'viewer' : 'admin' })),

      // ── Theme ────────────────────────────────────────
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      // ── Navigation ───────────────────────────────────
      setActivePage: (page) => set({ activePage: page }),

      // ── Transactions ─────────────────────────────────
      addTransaction: (tx) =>
        set((s) => ({
          transactions: [
            { ...tx, id: Date.now() },
            ...s.transactions,
          ],
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      // ── Filters ──────────────────────────────────────
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),

      resetFilters: () =>
        set({ filters: { search: '', type: '', category: '', sort: 'date-desc' } }),

      // ── Derived: filtered + sorted transactions ───────
      getFilteredTransactions: () => {
        const { transactions, filters } = get()
        let result = [...transactions]

        if (filters.search) {
          const q = filters.search.toLowerCase()
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          )
        }
        if (filters.type)     result = result.filter((t) => t.type === filters.type)
        if (filters.category) result = result.filter((t) => t.category === filters.category)

        result.sort((a, b) => {
          switch (filters.sort) {
            case 'date-asc':    return a.date.localeCompare(b.date)
            case 'date-desc':   return b.date.localeCompare(a.date)
            case 'amount-asc':  return a.amount - b.amount
            case 'amount-desc': return b.amount - a.amount
            default:            return 0
          }
        })

        return result
      },
    }),
    {
      name: 'finflow-storage',
      partialize: (s) => ({
        transactions: s.transactions,
        role: s.role,
        theme: s.theme,
      }),
    }
  )
)
