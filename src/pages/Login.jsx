import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { login } from '../api/AuthApi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

   const { dispatch } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from ?? '/'

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const user = await login(username, password)
      dispatch({ type: 'LOGGED_IN', user })
      navigate(from, { replace: true }) // replace: login page leaves no history entry
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>Sign in</button>
        {loading && <p>Signing in…</p>}
        {error && <p role="alert">{error}</p>}
      </form>
    </>
  )
}
