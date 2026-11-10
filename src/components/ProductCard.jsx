import  { Link } from 'react-router'

export default function ProductCard({ product }) {
    return (
    <article className="card">
      <img src={product.thumbnail} alt={product.title} width="120" height="120" />
      <h3>
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </h3>
      <p>${product.price.toFixed(2)}</p>
      <small>{product.category}</small>
    </article>
  )
}
