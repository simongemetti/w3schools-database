// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './CustomerList';
import Categories from './Categories';
import Products from './Products';

function App() {
  return (
    <Router>
      <div className="navbar-container">
        <nav className="navbar">
          <ul className="navbar-links">
            <li><Link to="/">Customers</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
