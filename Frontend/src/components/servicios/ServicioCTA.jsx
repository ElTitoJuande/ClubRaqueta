import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const ServicioCTA = () => {
  return (
    <section className='py-16 bg-gradient-to-b from-lime-800 to-lime-900'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          ¿Listo para empezar?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Únete a nuestra comunidad y comienza a disfrutar de todos nuestros servicios premium.
        </p>
        <Link to="/contacto">
          <Button className="bg-yellow-500 text-lime-900 hover:bg-yellow-400 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
            Contacta con nosotros
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ServicioCTA;
