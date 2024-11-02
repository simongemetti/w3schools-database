import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './CustomerList';
import Categories from './Categories';
import Products from './Products';
import WelcomePage from './WelcomePage'; 
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="navbar-container">
          <nav className="navbar">
            <ul className="navbar-links">
              <li><Link to="/">Willkommen</Link></li>
              <li><Link to="/customers">Kunden</Link></li>
              <li><Link to="/categories">Kategorien</Link></li>
              <li><Link to="/products">Produkte</Link></li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<WelcomePage />} /> {/* Willkommensseite als Startseite */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
