import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { images } from '../../assets/Menu/menu';
import data from '../../assets/Menu/dishes.json';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const foundItem = data.find(dish => dish.id === parseInt(id));
    setItem(foundItem);
  }, [id]);

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
      <span className="item-detail__price">{item.price}</span>
    </section>
  );
};

export default ItemDetail;
