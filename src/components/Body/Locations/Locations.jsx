import React from 'react';
import './Locations.css';
import { images } from '../../../assets/Locations/locations';

const Locations = () => {
  return (
    <section className="locations">
      <h2 className='routeTitle'>Sucursales</h2>
      <div className="location__cards">
        <div className="location__card">
          <h3 className="location__card-title">Lomas</h3>
          <p className="location__card-address">Calle recontra falsa 123</p>
          <img src={images.lomasImage} alt="Mapa de Lomas de Zamora" className="location__card-image" />
        </div>
        <div className="location__card">
          <h3 className="location__card-title">Adrogué</h3>
          <p className="location__card-address">Avenida Inchequeable 456</p>
          <img src={images.adrogueImage} alt="Mapa de Adrogué" className="location__card-image" />
        </div>
      </div>
    </section>
  );
};

export default Locations;
