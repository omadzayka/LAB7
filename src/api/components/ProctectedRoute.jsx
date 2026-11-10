import{ Navigate, useLocation } from 'react-router '
import { useAuth } from '../context/AuthContext' 

export default function ProtectedRoute({ children }) {
    const { user } = useAuth()
    const location = useLocation() 

    if (!user) {
        //remembers where the user wanted to go
        return <Navigate to="/login" replace state={{from: location.pathname + location.search }} />
    }
    return children
}