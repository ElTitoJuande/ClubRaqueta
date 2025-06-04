import React from 'react';

const ServicioHero = () => {
  return (
    <section className='relative min-h-[60vh] bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 overflow-hidden'>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-300 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Tennis ball pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("/images/pattern.png")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}>
      </div>

      <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full py-20'>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-[fadeIn_1s_ease-out_forwards]">
            Nuestros <span className="text-yellow-400">Servicios</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto animate-[fadeIn_1s_ease-out_0.3s_forwards]">
            Descubre todo lo que Club Raqueta Rute tiene para ofrecerte.
            Desde clases personalizadas hasta torneos emocionantes,
            tenemos todo lo que necesitas para mejorar tu juego.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicioHero;
