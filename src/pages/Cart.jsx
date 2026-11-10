import { Link } from 'react-router'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)

  // Derived, never stored.
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Back to products</Link>
      </>
    )
  }

  return (
    <>
      <h1>Your cart</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.title} (${item.price.toFixed(2)})</span>
            <button onClick={() => setQuantity(item.id, item.quantity - 1)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
      <button onClick={clear}>Clear cart</button>
    </>
  )
}
