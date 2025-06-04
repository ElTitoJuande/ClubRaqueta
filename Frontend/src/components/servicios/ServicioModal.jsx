import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ServicioModal = ({ open, onClose, titulo, icono, children, imagenes = [], boton, maxWidth = "max-w-4xl" }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div 
          className={`relative bg-gradient-to-br from-lime-800 to-lime-900 text-white rounded-3xl shadow-2xl w-full ${maxWidth} mx-4 overflow-hidden`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Botón de cerrar */}
          <button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none z-10"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header con icono y título */}
          <div className="p-8 pb-0">
            <div className="flex items-center gap-4 mb-6">
              {icono && (
                <div className="text-4xl bg-white/10 p-3 rounded-2xl text-yellow-300">
                  {icono}
                </div>
              )}
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                {titulo}
              </h2>
            </div>

            {/* Contenido principal */}
            <div className="prose prose-lg prose-invert max-w-none">
              {children}
            </div>
          </div>

          {/* Galería de imágenes */}
          {imagenes.length > 0 && (
            <div className="p-8 pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagenes.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-video cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={titulo + ' imagen ' + (idx + 1)}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Botón opcional */}
          {boton && (
            <div className="p-8 pt-0 flex justify-end">
              {boton}
            </div>
          )}
        </motion.div>

        {/* Vista ampliada de imagen */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Vista ampliada"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ServicioModal;
