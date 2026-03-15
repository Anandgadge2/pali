import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import './App.css'

function Layout() {
  return (
    <div className="site-shell">
      <header className="top-nav">
        <p className="brand">Pali Photographer</p>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
