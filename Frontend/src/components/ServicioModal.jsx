import React from "react";

const ServicioModal = ({ open, onClose, titulo, icono, children, imagenes = [], boton, maxWidth = "max-w-xl" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`relative bg-lime-900 text-white rounded-2xl shadow-2xl p-8 w-full ${maxWidth} animate-[fadeIn_0.2s_ease-out]`}>
        <button
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="flex items-center gap-3 mb-4">
          {icono && <span className="text-3xl">{icono}</span>}
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300">{titulo}</h2>
        </div>
        <div className="mb-4 space-y-3">
          {children}
        </div>
        {imagenes.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {imagenes.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={titulo + ' imagen ' + (idx + 1)}
                className="rounded-lg object-cover w-full h-32 border border-white/20 shadow"
              />
            ))}
          </div>
        )}
        {boton && (
          <div className="mt-6 flex justify-end">
            {boton}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicioModal;
