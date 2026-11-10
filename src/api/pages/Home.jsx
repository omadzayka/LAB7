import { Link } from 'react-router'

export default function Home() {
    return (
        <>
      <h1>Welcome to the shop</h1>
      <p>Browse the catalogue, filter it, and share the link.</p>
      <Link to="/products">Browse products</Link>
    </>
    )
}