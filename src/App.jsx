import { useEffect, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import logo from './assets/B/logo.png'
import './App.css'

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      document.querySelectorAll('[data-parallax]').forEach((node) => {
        const speed = Number(node.getAttribute('data-parallax') || 0.1)
        node.style.transform = `translate3d(0, ${Math.round(y * speed)}px, 0)`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="Pali Studio logo" width="120" height="70" loading="eager" fetchPriority="high" />
        </NavLink>

        <button
          className={`menu-button ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="sidebar-nav"
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="sidebar-nav" className={`sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          <NavLink to="/" end className="nav-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/portfolio" className="nav-link" onClick={closeMenu}>Portfolio</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</NavLink>
        </nav>
      </header>

      <div className={`sidebar-backdrop ${menuOpen ? 'is-open' : ''}`} onClick={closeMenu} aria-hidden="true" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
