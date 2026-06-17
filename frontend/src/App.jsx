import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Customers from './pages/Customers'
import Orders from './pages/Orders'

const navClass = ({ isActive }) =>
  isActive
    ? 'text-white bg-sky-600 px-3 py-2 rounded-md'
    : 'text-slate-200 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-slate-400">Manage products, customers, and orders with confidence.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <input
                type="search"
                placeholder="Search products, customers..."
                className="w-64 px-3 py-2 bg-slate-800/60 placeholder:text-slate-400"
              />
            </div>

            <nav className="flex flex-wrap gap-2">
              <NavLink to="/" className={navClass} end>
                Dashboard
              </NavLink>
              <NavLink to="/products" className={navClass}>
                Products
              </NavLink>
              <NavLink to="/customers" className={navClass}>
                Customers
              </NavLink>
              <NavLink to="/orders" className={navClass}>
                Orders
              </NavLink>
            </nav>

            <div className="ml-3 flex items-center">
              <button className="flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-2 hover:bg-slate-800">
                <span className="inline-block h-8 w-8 rounded-full bg-sky-500 text-slate-900 font-semibold flex items-center justify-center">A</span>
                <span className="hidden sm:inline text-slate-200">Admin</span>
              </button>
            </div>
          </div>
        </header>

        <main className="rounded-2xl bg-slate-900/70 p-6 shadow-2xl shadow-black/60">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
