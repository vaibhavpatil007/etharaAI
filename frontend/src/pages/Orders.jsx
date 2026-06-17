import { Fragment, useEffect, useState } from 'react'
import { customersApi, ordersApi, productsApi } from '../services/api'

const initialForm = { customer_id: '', items: [{ product_id: '', quantity: '' }] }

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    const [productRes, customerRes, orderRes] = await Promise.all([
      productsApi.list(),
      customersApi.list(),
      ordersApi.list(),
    ])
    setProducts(productRes.data)
    setCustomers(customerRes.data)
    setOrders(orderRes.data)
  }

  const addLine = () => {
    setForm({ ...form, items: [...form.items, { product_id: '', quantity: '' }] })
  }

  const updateLine = (index, field, value) => {
    const newItems = [...form.items]
    newItems[index][field] = value
    setForm({ ...form, items: newItems })
  }

  const createOrder = async (event) => {
    event.preventDefault()
    setError('')
    try {
      await ordersApi.create({
        customer_id: Number(form.customer_id),
        items: form.items.map((item) => ({
          product_id: Number(item.product_id),
          quantity: Number(item.quantity),
        })),
      })
      setForm(initialForm)
      await loadAll()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create order')
    }
  }

  const deleteOrder = async (id) => {
    await ordersApi.remove(id)
    if (expandedOrder === id) {
      setExpandedOrder(null)
    }
    await loadAll()
  }

  const toggleDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const customerMap = Object.fromEntries(customers.map((customer) => [customer.id, customer.full_name]))
  const productMap = Object.fromEntries(products.map((product) => [product.id, product.name]))

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Orders</h2>
            <p className="mt-2 text-slate-400">Create an order and view order history.</p>
          </div>
          <button onClick={addLine} className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-500">
            Add Item
          </button>
        </div>

        <form onSubmit={createOrder} className="mt-6 space-y-6">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Customer</label>
            <select
              value={form.customer_id}
              onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
              className="w-full bg-slate-950 px-4 py-3"
              required
            >
              <option value="">Select a customer</option>
              {customers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.full_name}
                </option>
              ))}
            </select>
          </div>
          {form.items.map((item, index) => (
            <div key={index} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Product</label>
                <select
                  value={item.product_id}
                  onChange={(e) => updateLine(index, 'product_id', e.target.value)}
                  className="w-full bg-slate-950 px-4 py-3"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateLine(index, 'quantity', e.target.value)}
                  className="w-full bg-slate-950 px-4 py-3"
                  required
                />
              </div>
            </div>
          ))}
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button className="rounded-2xl bg-sky-600 px-6 py-3 text-white hover:bg-sky-500" type="submit">
            Create Order
          </button>
        </form>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
        <h3 className="text-xl font-semibold">Order List</h3>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="border-b border-slate-700 text-slate-400">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <Fragment key={order.id}>
                  <tr key={order.id} className="border-b border-slate-800 hover:bg-slate-950/70">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{customerMap[order.customer_id] || order.customer_id}</td>
                    <td className="px-4 py-3">${Number(order.total_amount).toFixed(2)}</td>
                    <td className="px-4 py-3">{order.items.length}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => toggleDetails(order.id)}
                        className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-500"
                      >
                        {expandedOrder === order.id ? 'Hide' : 'Details'}
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr className="bg-slate-950/90">
                      <td colSpan="5" className="px-4 py-4">
                        <div className="space-y-4">
                          <div className="rounded-2xl bg-slate-900 p-4">
                            <h4 className="text-lg font-semibold">Order Items</h4>
                            <div className="mt-3 space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="grid gap-4 md:grid-cols-3 rounded-2xl border border-slate-800 bg-slate-950 p-3">
                                  <div>
                                    <p className="text-slate-400 text-sm">Product</p>
                                    <p className="text-white">{productMap[item.product_id] || item.product_id}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400 text-sm">Quantity</p>
                                    <p className="text-white">{item.quantity}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400 text-sm">Unit Price</p>
                                    <p className="text-white">${Number(item.unit_price).toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
