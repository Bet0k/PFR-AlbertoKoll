import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { images } from '../../../assets/Menu/menu';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase.config';
import ClipLoader from 'react-spinners/ClipLoader';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const dishesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDishes(dishesArray);
      } catch (error) {
        console.error('Error fetching dishes: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const groupedDishes = dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredDishes = selectedCategory === 'All'
    ? dishes
    : dishes.filter(dish => dish.category === selectedCategory);

  const categoriesToDisplay = selectedCategory === 'All'
    ? Object.keys(groupedDishes).filter(category => category !== 'Postres').concat('Postres')
    : [selectedCategory];

  return (
    <section className="menu">
      <h2 className='routeTitle'>Menú</h2>
      {loading && (
        <div className="spinner-container">
          <ClipLoader loading={loading} size={50} />
          <p>Cargando...</p>
        </div>
      )}
      {!loading && (
        <>
          <div className="menu__category-buttons">
            <button 
              className={`menu__category-button ${selectedCategory === 'All' ? 'active' : ''}`} 
              onClick={() => handleCategoryClick('All')}
            >
              Todos
            </button>
            {Object.keys(groupedDishes).map((category) => (
              <button 
                key={`category-${category}`}
                className={`menu__category-button ${selectedCategory === category ? 'active' : ''}`} 
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {categoriesToDisplay.map((category) => (
            <div key={`category-container-${category}`} className="menu__category">
              <h3 className="menu__category-title">{category}</h3>
              <div className="menu__cards">
                {filteredDishes
                  .filter(dish => dish.category === category)
                  .map((dish) => (
                    <Link 
                      to={`/item/${dish.id}`} 
                      key={dish.id}
                      className="menu__card"
                    >
                      <img 
                        src={images[dish.image]}          
                        alt={dish.name} 
                        className="menu__card-image" 
                      />
                      <h4 className="menu__card-title">{dish.name}</h4>
                      <p className="menu__card-description">{dish.description}</p>
                      <span className="menu__card-price">${dish.price}</span>
                    </Link>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default Menu;
