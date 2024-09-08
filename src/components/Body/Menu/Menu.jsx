import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { images } from '../../../assets/Menu/menu';
import data from '../../../assets/Menu/dishes.json';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setDishes(data);
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
    ? Object.keys(groupedDishes)
    : [selectedCategory];

  return (
    <section className="menu">
      <h2 className='routeTitle'>Menú</h2>
      <div className="menu__category-buttons">
        <button 
          className={`menu__category-button ${selectedCategory === 'All' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('All')}
        >
          Todos
        </button>
        {Object.keys(groupedDishes).map((category) => (
          <button 
            key={category} 
            className={`menu__category-button ${selectedCategory === category ? 'active' : ''}`} 
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {categoriesToDisplay.map((category) => (
        <div key={category} className="menu__category">
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
                  <img src={images[dish.image]} alt={dish.name} className="menu__card-image" />
                  <h4 className="menu__card-title">{dish.name}</h4>
                  <p className="menu__card-description">{dish.description}</p>
                  <span className="menu__card-price">{dish.price}</span>
                </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Menu;
