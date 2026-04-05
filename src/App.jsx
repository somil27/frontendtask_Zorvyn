import React, { useState, useEffect } from 'react'
import Sidebar from './components/UI/Sidebar'
import Topbar from './components/UI/Topbar'
import AddTransactionModal from './components/Transactions/AddTransactionModal'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'
import { ToastProvider, useToast } from './components/UI/Toast'
import { useStore } from './store/useStore'

// ── Page map 
const PAGES = {
  dashboard:    DashboardPage,
  transactions: TransactionsPage,
  insights:     InsightsPage,
}

// ── Inner shell (needs ToastProvider to already be mounted) 
function AppShell() {
  const activePage    = useStore((s) => s.activePage)
  const theme         = useStore((s) => s.theme)
  const role          = useStore((s) => s.role)
  const addTransaction = useStore((s) => s.addTransaction)

  const [modalOpen, setModalOpen] = useState(false)
  const toast = useToast()

  // ── Sync theme class on <html> 
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    document.documentElement.classList.toggle('dark',  theme !== 'light')
  }, [theme])

  // ── Toast on page navigation 
  const prevPage = React.useRef(activePage)
  useEffect(() => {
    if (prevPage.current === activePage) return
    prevPage.current = activePage
    const labels = { dashboard: 'Dashboard', transactions: 'Transactions', insights: 'Insights' }
    toast.info(`Navigated to ${labels[activePage]}`)
  }, [activePage])

  // ── Toast on theme change 
  const prevTheme = React.useRef(theme)
  useEffect(() => {
    if (prevTheme.current === theme) return
    prevTheme.current = theme
    toast.info(
      theme === 'dark' ? 'Dark mode on' : 'Light mode on',
    )
  }, [theme])

  // ── Toast on role switch 
  const prevRole = React.useRef(role)
  useEffect(() => {
    if (prevRole.current === role) return
    prevRole.current = role
    if (role === 'admin') {
      toast.success('Admin access granted', 'You can now add and delete transactions.')
    } else {
      toast.warning('Switched to Viewer', 'Add/delete actions are disabled.')
    }
  }, [role])

  // ── Wrap addTransaction to fire a toast 
  const handleAddTransaction = (tx) => {
    addTransaction(tx)
    toast.success(
      'Transaction added',
      `${tx.type === 'income' ? '+' : '−'}$${Number(tx.amount).toLocaleString()} · ${tx.category}`,
    )
  }

  const PageComponent = PAGES[activePage] ?? DashboardPage

  return (
    <div
      className={`flex h-screen overflow-hidden ${theme === 'light' ? 'light' : ''}`}
      style={{ background: 'var(--bg-primary)' }}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onAddClick={() => setModalOpen(true)} />

        <main
          className="flex-1 overflow-y-auto p-5"
          style={{ background: 'var(--bg-primary)' }}
        >
          <PageComponent />
        </main>
      </div>

      {/* Modal — passes wrapped addTransaction so we get the toast */}
      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  )
}

// ── Root export: ToastProvider wraps everything
export default function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  )
}