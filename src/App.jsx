import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Menu from './components/Body/Menu/Menu';
import Locations from './components/Body/Locations/Locations';
import Contact from './components/Body/Contact/Contact';
import ItemDetail from './components/ItemDetail/index';
import Cart from './components/Cart/index';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Navbar totalQuantity={totalQuantity} />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/item/:id" element={<ItemDetail setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
