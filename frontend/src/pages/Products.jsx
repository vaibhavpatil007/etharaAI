import { useEffect, useState } from 'react'
import { productsApi } from '../services/api'

const initialForm = { name: '', sku: '', price: '', stock_quantity: '' }

export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingProductId, setEditingProductId] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await productsApi.list()
      setProducts(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const resetForm = () => {
    setForm(initialForm)
    setError('')
    setEditingProductId(null)
  }

  const populateForm = (product) => {
    setEditingProductId(product.id)
    setForm({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock_quantity: product.stock_quantity,
    })
  }

  const saveProduct = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (editingProductId) {
        await productsApi.update(editingProductId, {
          name: form.name,
          sku: form.sku,
          price: Number(form.price),
          stock_quantity: Number(form.stock_quantity),
        })
      } else {
        await productsApi.create({
          name: form.name,
          sku: form.sku,
          price: Number(form.price),
          stock_quantity: Number(form.stock_quantity),
        })
      }
      resetForm()
      await loadProducts()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    await productsApi.remove(id)
    if (editingProductId === id) {
      resetForm()
    }
    await loadProducts()
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/20">
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="mt-2 text-slate-400">Create, view, update, and remove inventory products.</p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="border-b border-slate-700 text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-950/70">
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.sku}</td>
                    <td className="px-4 py-3">${Number(product.price).toFixed(2)}</td>
                    <td className="px-4 py-3">{product.stock_quantity}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => populateForm(product)}
                        className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500"
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
          <h2 className="text-2xl font-semibold">{editingProductId ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={saveProduct} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-950 px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">SKU</label>
              <input
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="w-full bg-slate-950 px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Price</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-slate-950 px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Stock Quantity</label>
              <input
                type="number"
                value={form.stock_quantity}
                onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
                className="w-full bg-slate-950 px-4 py-3"
                required
              />
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-2xl bg-sky-600 px-4 py-3 text-white hover:bg-sky-500"
              >
                {loading ? 'Saving...' : editingProductId ? 'Update Product' : 'Create Product'}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 hover:bg-slate-900"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
