import { Link, useNavigate, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { fetchProduct } from '../api/productsApi'
import { useCartStore } from '../store/cartStore'

export default function ProductDetail() {
  const { id } = useParams() // always a string
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem) // select only the action

  