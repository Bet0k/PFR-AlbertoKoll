import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../assets/Menu/menu';
import { FaTrash } from 'react-icons/fa'; 
import './index.css';

const Cart = ({ cart, setCart }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openSuccessModal = () => setSuccessModalOpen(true);
  const closeSuccessModal = () => setSuccessModalOpen(false);

  const validateCardNumber = (number) => {
    const regex = /^[0-9]{16}$/;
    return regex.test(number);
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const [month, year] = date.split('/').map(Number);
    const expiry = new Date(2000 + year, month);
    const now = new Date();
    return regex.test(date) && expiry > now;
  };

  const validateCVC = (cvc) => {
    const regex = /^[0-9]{3,4}$/; 
    return regex.test(cvc);
  };

  const handlePayment = (event) => {
    event.preventDefault();
    setError('');

    if (!validateCardNumber(cardNumber)) {
      setError('Número de tarjeta inválido. Debe tener 16 dígitos.');
      return;
    }
    
    if (!validateExpiryDate(expiryDate)) {
      setError('Fecha de vencimiento inválida. Formato MM/AA.');
      return;
    }

    if (!validateCVC(cvc)) {
      setError('Código de seguridad inválido. Debe tener 3 o 4 dígitos.');
      return;
    }

    setCart([]);
    openSuccessModal();
    closeModal();
  };

  const handleRedirect = () => {
    closeSuccessModal();
    history.push('/');
  };

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay ítems en el carrito.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={images[item.image]} alt={item.name} className="item-detail__image" />
              <div>
                <p>{item.name} - Cantidad: {item.quantity} - Precio: ${item.price * item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <>
          <h3>Total: ${total}</h3>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={openModal}>Finalizar Compra</button>
          </div>
        </>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Formulario de Pago</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handlePayment}>
              <input 
                type="text" 
                placeholder="Número de tarjeta" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)} 
                required 
              />
              <input 
                type="text" 
                placeholder="MM/AA" 
                value={expiryDate} 
                onChange={(e) => setExpiryDate(e.target.value)} 
                required 
              />
              <input 
                type="text" 
                placeholder="CVC" 
                value={cvc} 
                onChange={(e) => setCvc(e.target.value)} 
                required 
              />
              <button type="submit">Finalizar Compra</button>
            </form>
            <button className="close-button" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      {successModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Pago Aceptado!</h2>
            <p>Tu pago ha sido procesado con éxito.</p>
            {<Link to="/" className="close-link">Aceptar</Link>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
