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
          <div className="topbar-inner">
            <NavLink to="/" className="brand">Pali <span>Photography</span></NavLink>
            <nav className="main-nav" aria-label="Primary">
              <NavLink to="/" end className="nav-link">Home</NavLink>
              <NavLink to="/portfolio" className="nav-link">Portfolio</NavLink>
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </nav>
            <NavLink to="/contact" className="button button-primary topbar-cta">Book Now</NavLink>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="footer">
          <div>
            <p className="footer-brand">Pali Photography</p>
            <p>Elegant wedding and portrait storytelling across India.</p>
          </div>
          <p>© {new Date().getFullYear()} Pali Photography. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
