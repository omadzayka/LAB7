import { NavLink } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useCartStore } from '../store/cartStore'

const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

export default function NavBar({ theme, onToggleTheme }) {
  const { user, dispatch } = useAuth()
  // Selector returns a primitive, so the bar only re-renders when the count changes.
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))

  return (
    <nav className="navbar">
      <NavLink to="/" end className={linkClass}>Home</NavLink>
      <NavLink to="/products" className={linkClass}>Products</NavLink>
      <NavLink to="/cart" className={linkClass}>Cart ({count})</NavLink>

      <span className="spacer" />

      <button onClick={onToggleTheme}>{theme === 'light' ? 'Dark mode' : 'Light mode'}</button>
      {user ? (
        <>
          <span>{user.username}</span>
          <button onClick={() => dispatch({ type: 'LOGGED_OUT' })}>Logout</button>
        </>
      ) : (
        <NavLink to="/login" className={linkClass}>Login</NavLink>
      )}
    </nav>
  )
}
