import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { images } from '../../assets/Menu/menu';

const ItemDetail = () => {
  const { id } = useParams();  // id de Firebase
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemDoc = doc(db, 'items', id); // Consulta al documento en Firestore usando el id de Firebase
        const itemSnapshot = await getDoc(itemDoc);

        if (itemSnapshot.exists()) {
          setItem(itemSnapshot.data());
        } else {
          console.log('No such document!');
          setItem(null);
        }
      } catch (error) {
        console.error('Error fetching item: ', error);
        setItem(null);
      }
    };

    fetchItem();
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
      <span className="item-detail__price">${item.price}</span>
    </section>
  );
};

export default ItemDetail;
