import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Menu from './components/Body/Menu/Menu';
import Locations from './components/Body/Locations/Locations';
import Contact from './components/Body/Contact/Contact';
import ItemDetail from './components/ItemDetail/index';
import Cart from './components/Cart/index'
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
