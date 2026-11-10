import { useSearchParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { fetchProducts } from '../api/productsApi'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''

  const { loading, error, data: products } = useFetch((signal) => fetchProducts(signal), [])
