import React from 'react';
import ServicioCard from './ServicioCard';

const ServiciosList = ({ servicios, onServicioClick }) => {
  return (
    <section className='py-16 bg-gradient-to-b from-lime-900 to-lime-800'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {servicios.map((servicio, index) => (
            <ServicioCard
              key={index}
              servicio={servicio}
              index={index}
              onClick={onServicioClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiciosList;
