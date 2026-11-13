import { Outlet } from 'react-router'
import NavBar from './NavBar'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Layout() {
    const [theme, setTheme] = useLocalStorage('theme', 'light' )
   
   return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">Online Shop · Assignment 7</footer>
    </div>
  )
}