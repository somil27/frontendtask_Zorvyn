import { useMemo } from 'react'
import { useStore } from '../store/useStore'

/**
 * Returns total income, expenses, and net balance from all transactions.
 */
export function useTotals() {
  const transactions = useStore((s) => s.transactions)

  return useMemo(() => {
    const income   = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return { income, expenses, balance: income - expenses }
  }, [transactions])
}

/**
 * Returns totals grouped by spending category (expenses only).
 * Returns: [{ category, amount, percentage }]
 */
export function useCategoryBreakdown() {
  const transactions = useStore((s) => s.transactions)

  return useMemo(() => {
    const map = {}
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount })

    const total = Object.values(map).reduce((s, v) => s + v, 0)
    return Object.entries(map)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])
}

/**
 * Returns income vs expense per month for the given yyyy-mm months.
 */
export function useMonthlyComparison(monthKeys) {
  const transactions = useStore((s) => s.transactions)

  return useMemo(() =>
    monthKeys.map((key) => {
      const monthly = transactions.filter((t) => t.date.startsWith(key))
      return {
        month: key,
        income:   monthly.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
        expenses: monthly.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
      }
    }),
    [transactions, monthKeys]
  )
}

/**
 * Computes a few plain-English insight strings from transaction data.
 */
export function useSmartInsights() {
  const transactions = useStore((s) => s.transactions)
  const { income, expenses } = useTotals()
  const catBreakdown = useCategoryBreakdown()

  return useMemo(() => {
    const insights = []
    const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0
    const topCat = catBreakdown[0]

    if (topCat) {
      insights.push({
        type: 'warning',
        text: `${topCat.category} is your biggest expense at $${topCat.amount.toLocaleString()} (${topCat.percentage}% of spending).`,
      })
    }

    if (savingsRate >= 30) {
      insights.push({ type: 'success', text: `Excellent! You're saving ${savingsRate}% of your income this period.` })
    } else if (savingsRate > 0) {
      insights.push({ type: 'info', text: `Your savings rate is ${savingsRate}%. Financial advisors recommend 20%+.` })
    } else {
      insights.push({ type: 'danger', text: `You're spending more than you earn. Review your expenses.` })
    }

    const foodAmt = catBreakdown.find((c) => c.category === 'Food')?.amount || 0
    if (foodAmt > 0) {
      insights.push({ type: 'info', text: `You spent $${foodAmt.toLocaleString()} on Food. Consider meal prepping to cut costs.` })
    }

    const subAmt = catBreakdown.find((c) => c.category === 'Entertainment')?.amount || 0
    if (subAmt > 0) {
      insights.push({ type: 'info', text: `$${subAmt.toLocaleString()} on Entertainment — check for unused subscriptions.` })
    }

    return insights
  }, [transactions, income, expenses, catBreakdown])
}
