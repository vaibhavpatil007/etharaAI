import { useEffect, useState } from 'react'
import { customersApi } from '../services/api'

const initialForm = { full_name: '', email: '', phone_number: '' }

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      const response = await customersApi.list()
      setCustomers(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const createCustomer = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await customersApi.create(form)
      setForm(initialForm)
      await loadCustomers()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create customer')
    } finally {
      setLoading(false)
    }
  }

  const deleteCustomer = async (id) => {
    await customersApi.remove(id)
    await loadCustomers()
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
          <h2 className="text-2xl font-semibold">Customers</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="border-b border-slate-700 text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-800 hover:bg-slate-950/70">
                    <td className="px-4 py-3">{customer.full_name}</td>
                    <td className="px-4 py-3">{customer.email}</td>
                    <td className="px-4 py-3">{customer.phone_number || '-'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteCustomer(customer.id)}
                        className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
          <h2 className="text-2xl font-semibold">Add Customer</h2>
          <form onSubmit={createCustomer} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Full Name</label>
              <input
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full bg-slate-950 px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-950 px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Phone</label>
              <input
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                className="w-full bg-slate-950 px-4 py-3"
              />
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-white hover:bg-sky-500"
            >
              {loading ? 'Saving...' : 'Create Customer'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
