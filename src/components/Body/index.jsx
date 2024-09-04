import React from 'react';
import Menu from './Menu/Menu';
import Locations from './Locations/Locations';
import Contact from './Contact/Contact';

const Body = () => {
  return (
    <div className="body">
      <section id="menu">
        <Menu />
      </section>
      <section id="locations">
        <Locations />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Body;
