import { createContext, useContext, useMemo, useReducer } from 'react'

const AuthContext = createContext(null)

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return { user: action.user }
    case 'LOGGED_OUT':
      return { user: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null })
  const value = useMemo(() => ({ user: state.user, dispatch }), [state.user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used inside an <AuthProvider>')
  }
  return context
}
