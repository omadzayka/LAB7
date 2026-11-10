import { useSearchParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { fetchProducts } from '../api/productsApi'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''

  const { loading, error, data: products } = useFetch((signal) => fetchProducts(signal), [])

  // Change one parameter, keep the others. Empty values are removed from the URL.
  function updateParam(key, value) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true }
    )
  }

  if (loading) return <p>Loading products…</p>
  if (error) return <p role="alert">Could not load products: {error.message}</p>

  // Derived during render: no state, no effect.
  const categories = [...new Set(products.map((p) => p.category))].sort()
  const visible = products.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) && (!category || p.category === category)
  )

  return (
    <>
      <h1>Products</h1>
      <div className="filters">
        <input
          type="search"
          placeholder="Search by title"
          value={q}
          onChange={(e) => updateParam('q', e.target.value)}
        />
        <select value={category} onChange={(e) => updateParam('category', e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <div className="grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  )
}
