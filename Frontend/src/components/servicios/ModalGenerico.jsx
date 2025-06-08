import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import Button from '../Button';
import ImageCarousel from '../ImageCarousel'; 

const ModalGenerico = ({ data, onClose }) => {
  const { 
    titulo, 
    icono, 
    cuerpoMd, 
    imagenes = [], 
    cta = null, 
    maxWidth = 'max-w-lg' 
  } = data;

  return (
    <div className={`bg-lime-700 text-white p-6 rounded-lg shadow-xl ${maxWidth} mx-auto relative`}>
      {/* Botón cerrar */}
      <button 
        onClick={onClose}
        className="absolute right-3 top-3 text-white hover:text-yellow-300 text-xl"
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Cabecera */}
      <div className="flex items-center gap-3 mb-4 border-b border-lime-600 pb-3">
        <span className="text-3xl">{icono}</span>
        <h2 className="text-xl md:text-2xl font-bold text-yellow-400">{titulo}</h2>
      </div>

      {/* Contenido en Markdown */}
      <div className="prose prose-invert prose-yellow max-w-none mb-4">
        <ReactMarkdown>{cuerpoMd}</ReactMarkdown>
      </div>

      {/* Carrusel de imágenes */}
      {imagenes.length > 0 && (
        <div className="mt-4 mb-4">
          <ImageCarousel images={imagenes} />
        </div>
      )}

      {/* Botón CTA si existe */}
      {cta && (
        <div className="mt-4 text-center">
          {cta.esInterno ? (
            <Link to={cta.url}>
              <Button 
                className={`${cta.estilo || 'bg-yellow-500 text-lime-900 hover:bg-yellow-400 hover:text-lime-600 px-4 py-2 rounded-lg font-semibold'}`}
              >
                {cta.texto}
              </Button>
            </Link>
          ) : (
            <Button 
              className={`${cta.estilo || 'bg-yellow-500 text-lime-900 hover:bg-yellow-400 hover:text-lime-600 px-4 py-2 rounded-lg font-semibold'}`}
              onClick={() => window.location.href = cta.url}
            >
              {cta.texto}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ModalGenerico;
