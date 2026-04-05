/**
 * Seed data — used on first load or when localStorage is empty.
 * Covers 3 months so charts and comparisons have something to render.
 */
export const CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Entertainment',
  'Bills', 'Health', 'Salary', 'Other',
]

export const CATEGORY_COLORS = {
  Food:          '#f59e0b',
  Transport:     '#6366f1',
  Shopping:      '#a78bfa',
  Entertainment: '#22d3ee',
  Bills:         '#f43f5e',
  Health:        '#10b981',
  Salary:        '#34d399',
  Other:         '#7a8299',
}

export const DEFAULT_TRANSACTIONS = [
  // April
  { id: 1,  date: '2024-04-01', description: 'Monthly Salary',    amount: 5200, type: 'income',  category: 'Salary' },
  { id: 2,  date: '2024-04-03', description: 'Grocery Store',     amount: 142,  type: 'expense', category: 'Food' },
  { id: 3,  date: '2024-04-05', description: 'Netflix',           amount: 15,   type: 'expense', category: 'Entertainment' },
  { id: 4,  date: '2024-04-07', description: 'Uber Ride',         amount: 28,   type: 'expense', category: 'Transport' },
  { id: 5,  date: '2024-04-09', description: 'Electricity Bill',  amount: 95,   type: 'expense', category: 'Bills' },
  { id: 6,  date: '2024-04-12', description: 'Freelance Project', amount: 1800, type: 'income',  category: 'Other' },
  { id: 7,  date: '2024-04-14', description: 'H&M Shopping',      amount: 210,  type: 'expense', category: 'Shopping' },
  { id: 8,  date: '2024-04-16', description: 'Doctor Visit',      amount: 60,   type: 'expense', category: 'Health' },
  { id: 9,  date: '2024-04-18', description: 'Restaurant Dinner', amount: 85,   type: 'expense', category: 'Food' },
  { id: 10, date: '2024-04-20', description: 'Gym Membership',    amount: 40,   type: 'expense', category: 'Health' },
  { id: 11, date: '2024-04-22', description: 'Amazon Order',      amount: 180,  type: 'expense', category: 'Shopping' },
  { id: 12, date: '2024-04-25', description: 'Consulting Fee',    amount: 1200, type: 'income',  category: 'Other' },

  // March
  { id: 13, date: '2024-03-01', description: 'Monthly Salary',    amount: 5200, type: 'income',  category: 'Salary' },
  { id: 14, date: '2024-03-05', description: 'Grocery Store',     amount: 128,  type: 'expense', category: 'Food' },
  { id: 15, date: '2024-03-10', description: 'Coffee & Cafes',    amount: 55,   type: 'expense', category: 'Food' },
  { id: 16, date: '2024-03-15', description: 'Car Insurance',     amount: 120,  type: 'expense', category: 'Bills' },
  { id: 17, date: '2024-03-20', description: 'Spotify',           amount: 10,   type: 'expense', category: 'Entertainment' },
  { id: 18, date: '2024-03-22', description: 'Part-time Work',    amount: 900,  type: 'income',  category: 'Other' },

  // February
  { id: 19, date: '2024-02-01', description: 'Monthly Salary',    amount: 5000, type: 'income',  category: 'Salary' },
  { id: 20, date: '2024-02-10', description: 'Dentist',           amount: 200,  type: 'expense', category: 'Health' },
  { id: 21, date: '2024-02-14', description: "Valentine's Dinner",amount: 120,  type: 'expense', category: 'Food' },
  { id: 22, date: '2024-02-18', description: 'Clothing Haul',     amount: 300,  type: 'expense', category: 'Shopping' },
  { id: 23, date: '2024-02-24', description: 'Internet Bill',     amount: 50,   type: 'expense', category: 'Bills' },
]
