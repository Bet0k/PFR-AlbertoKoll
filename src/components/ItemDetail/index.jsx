import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { images } from '../../assets/Menu/menu';
import ClipLoader from 'react-spinners/ClipLoader';
import './index.css';

const ItemDetail = ({ setCart }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(1);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemDoc = doc(db, 'items', id);
        const itemSnapshot = await getDoc(itemDoc);

        if (itemSnapshot.exists()) {
          setItem({ id: itemSnapshot.id, ...itemSnapshot.data() });
        } else {
          console.log('No such document!');
          setItem(null);
        }
      } catch (error) {
        console.error('Error fetching item: ', error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!item) return;
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
    setModalQuantity(quantity);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader loading={loading} size={50} />
        <p>Cargando...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div>
        <h3>Item no encontrado</h3>
        <img src={images.notFound} alt="Item no encontrado" />
      </div>
    );
  }

  return (
    <section className="item-detail">
      <img src={images[item.image]} alt={item.name} className="item-detail__image" />
      <p>{item.description}</p>
      <span className="item-detail__price">${item.price}</span>

      <div className="item-detail__quantity-controls">
        <button onClick={handleDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <button className="item-detail__add-to-cart" onClick={handleAddToCart}>
        Agregar al carrito
      </button>

      {isModalOpen && (
        <div className={`modal-overlay ${isModalOpen ? 'show' : ''}`}>
          <div className="modal-content">
            <h2 className='modalTitle'>{`¡Elemento añadido con éxito!`}</h2>
            <h3 className='modalSubtitle'>{item.name}</h3>
            <p className='modalText'>Cantidad: {modalQuantity}</p>
            <img src={images[item.image]} alt="Item" className="modal-image" />
            <button onClick={handleCloseModal}>Aceptar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ItemDetail;
