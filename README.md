# FinTrack — Finance Dashboard

A modern, production-grade finance dashboard built with React + Vite + Tailwind CSS.

## Tech Stack

| Layer          | Library               |
|----------------|-----------------------|
| Framework      | React 18 + Vite 5     |
| Styling        | Tailwind CSS v3       |
| Charts         | Recharts              |
| State          | Zustand (persisted)   |
| Icons          | lucide-react          |
| Persistence    | localStorage          |

---

## Folder Structure

```
src/
├── components/
│   ├── Dashboard/          # BalanceChart, SpendingPie, RecentTransactions
│   ├── Transactions/       # FilterBar, TransactionTable, AddTransactionModal
│   ├── Insights/           # MonthlyChart, CategoryBreakdown, SmartInsights
│   └── UI/                 # Card, Badge, StatCard, Modal, EmptyState, Sidebar, Topbar
├── pages/                  # DashboardPage, TransactionsPage, InsightsPage
├── store/
│   └── useStore.js         # Zustand store (transactions, role, theme, filters)
├── data/
│   └── transactions.js     # Seed data, category colours
├── hooks/
│   └── useFinance.js       # Derived selectors: useTotals, useCategoryBreakdown, etc.
├── App.jsx                 # Root layout + routing
├── main.jsx                # ReactDOM entry
└── index.css               # Tailwind directives + CSS variables (theme tokens)
```

---

## Getting Started (VS Code)

### Prerequisites
- Node.js 18+ installed — check with `node -v`
- VS Code with the **ESLint** and **Tailwind CSS IntelliSense** extensions recommended

### Step-by-step

# 1. Install all dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then visit **http://localhost:5173** in your browser.

### Build for production
```bash
npm run build    # outputs to /dist
npm run preview  # locally preview the production build
```

---

## Features

- **Dashboard** — summary stat cards, 6-month balance area chart, spending doughnut, recent transactions
- **Transactions** — full table with search, filter by type/category, sort, delete (Admin only)
- **Insights** — savings rate, top expense category, monthly bar comparison, smart text insights, category progress bars
- **Role-Based UI** — Admin (add/delete transactions) vs Viewer (read-only); toggle in sidebar
- **Dark / Light Mode** — toggle in top bar; preference persisted to localStorage
- **Persistent State** — all transactions and settings survive page refresh via Zustand + localStorage
- **Responsive** — works on mobile, tablet, and desktop

---

## All Dependencies

```json
"dependencies": {
  "lucide-react": "^0.383.0",
  "recharts": "^2.12.7",
  "zustand": "^4.5.2",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.3.1",
  "autoprefixer": "^10.4.19",
  "postcss": "^8.4.38",
  "tailwindcss": "^3.4.4",
  "vite": "^5.3.1"
}
```
