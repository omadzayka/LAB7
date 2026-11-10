import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { login } from '../api/authApi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  