import React, { useState } from 'react';

/**
 * Componente de carrusel de imágenes
 * @param {Object} props
 * @param {string[]} props.images - Array con las rutas de las imágenes
 */
const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si no hay imágenes, no renderizamos nada
  if (!images.length) return null;

  // Si solo hay una imagen, la mostramos sin controles de navegación
  if (images.length === 1) {
    return (
      <div className="w-full rounded-lg overflow-hidden">
        <img 
          src={images[0]} 
          alt="Imagen" 
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  // Función para navegar a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para navegar a la imagen anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full">
      {/* Imagen actual */}
      <div className="w-full rounded-lg overflow-hidden">
        <img 
          src={images[currentIndex]} 
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-64 object-cover transition-opacity duration-300"
        />
      </div>
      
      {/* Botones de navegación */}
      <button 
        onClick={prevImage} 
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        aria-label="Imagen anterior"
      >
        ←
      </button>
      <button 
        onClick={nextImage} 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        aria-label="Imagen siguiente"
      >
        →
      </button>
      
      {/* Indicadores de imagen */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
