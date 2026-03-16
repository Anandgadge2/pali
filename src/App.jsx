import { useEffect } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import './App.css'

function App() {
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      document.querySelectorAll('.parallax').forEach((node) => {
        const speed = Number(node.getAttribute('data-speed') || 0.1)
        node.style.transform = `translate3d(0, ${Math.round(y * speed)}px, 0)`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Router>
      <div className="site-shell">
        <header className="topbar">
          <NavLink to="/" className="brand">Pali<span>Studio</span></NavLink>
          <nav className="main-nav" aria-label="Primary">
            <NavLink to="/" end className="nav-link">Home</NavLink>
            <NavLink to="/portfolio" className="nav-link">Portfolio</NavLink>
            <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
