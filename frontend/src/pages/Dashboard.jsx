import { useEffect, useState } from 'react'
import { dashboardApi, productsApi } from '../services/api'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

function metric(title, value, description, accent = 'bg-sky-500') {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-6 shadow-md">
      <div className={`absolute -left-6 -top-6 h-28 w-28 rounded-full opacity-10 ${accent}`} />
      <p className="text-sm uppercase tracking-[0.12em] text-slate-400">{title}</p>
      <h2 className="mt-3 text-3xl font-bold text-white">{value.toLocaleString?.() ?? value}</h2>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0,
  })
  const [products, setProducts] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, pRes] = await Promise.all([dashboardApi.stats(), productsApi.list()])
        setStats(sRes.data)
        setProducts(pRes.data)
      } catch (error) {
        console.error(error)
      }
    }
    load()
  }, [])

  const pieData = {
    labels: ['Products', 'Customers', 'Orders'],
    datasets: [
      {
        data: [stats.total_products, stats.total_customers, stats.total_orders],
        backgroundColor: ['#06b6d4', '#60a5fa', '#f97316'],
        hoverBackgroundColor: ['#0891b2', '#3b82f6', '#fb923c'],
      },
    ],
  }

  // Bar chart for low stock products (show up to 8 lowest stock)
  const lowStock = [...products]
    .sort((a, b) => a.stock_quantity - b.stock_quantity)
    .slice(0, 8)

  const barData = {
    labels: lowStock.map((p) => p.name || p.sku),
    datasets: [
      {
        label: 'Stock Quantity',
        data: lowStock.map((p) => p.stock_quantity),
        backgroundColor: '#fb7185',
      },
    ],
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-4"> 
        {metric('Products', stats.total_products, 'Total inventory products', 'bg-cyan-400')}
        {metric('Customers', stats.total_customers, 'Registered customers', 'bg-indigo-400')}
        {metric('Orders', stats.total_orders, 'Completed orders', 'bg-orange-400')}
        {metric('Low stock', stats.low_stock_products, 'Products with low inventory', 'bg-pink-400')}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl bg-slate-900/70 p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Overview</h3>
            <div className="text-sm text-slate-400">Totals snapshot</div>
          </div>
          <div className="h-64">
            <Pie data={pieData} />
          </div>
        </section>

        <section className="rounded-2xl bg-slate-900/70 p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Low Stock Products</h3>
            <div className="text-sm text-slate-400">Top shortages</div>
          </div>
          <div className="h-64">{lowStock.length ? <Bar data={barData} /> : <p className="text-slate-400">No products available</p>}</div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="mt-3 text-slate-400">
          Use the navigation links to manage products, customers, and orders. This dashboard reads backend statistics directly from the API.
        </p>
      </section>
    </div>
  )
}
