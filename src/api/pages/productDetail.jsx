import { Link, useNavigate, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { fetchProduct } from '../api/productsApi'
import { useCartStore } from '../store/cartStore'

export default function ProductDetail() {
  const { id } = useParams() // always a string
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem) // select only the action

const { loading, error, data: product } = useFetch((signal) => fetchProduct(id, signal), [id])

  const nextId = Number(id) + 1 // string -> number before doing arithmetic

  return (
    <>
      <button onClick={() => navigate('/products')}>Back</button>{' '}
      <Link to={`/products/${nextId}`}>Next product</Link>

      {loading && <p>Loading product…</p>}
      {error && (
        <p role="alert">
          {error.status === 404 ? 'Product not found.' : `Could not load product: ${error.message}`}
        </p>
      )}
      {product && (
        <article className="detail">
          <img src={product.thumbnail} alt={product.title} width="240" height="240" />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p><strong>${product.price.toFixed(2)}</strong></p>
          <small>{product.category}</small>
          <div>
            <button onClick={() => addItem(product)}>Add to cart</button>
          </div>
        </article>
      )}
    </>
  )
}
