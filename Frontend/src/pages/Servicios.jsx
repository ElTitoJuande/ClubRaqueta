import React, { useState } from 'react';
import ModalGenerico from '../components/servicios/ModalGenerico';

// Importamos los componentes creados
import ServicioHero from '../components/servicios/ServicioHero';
import ServiciosList from '../components/servicios/ServiciosList';
import ServicioCTA from '../components/servicios/ServicioCTA';
import { serviciosList, modalesList } from '../components/servicios/ServiciosUtils';

const Servicios = () => {
  // Estado para el modal actual
  const [modalActual, setModalActual] = useState(null);
  
  // Función para encontrar el modal por ID de servicio
  const encontrarModalPorId = (id) => {
    return modalesList.find(modal => modal.id === id);
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <ServicioHero />

      {/* Servicios Section */}
      <ServiciosList 
        servicios={serviciosList} 
        onServicioClick={(index) => {
          // Obtenemos el ID del servicio seleccionado
          const servicioId = serviciosList[index].id;
          // Buscamos el modal correspondiente por ID
          const modal = encontrarModalPorId(servicioId);
          // Actualizamos el estado
          setModalActual(modal);
        }} 
      />
      
      {/* Call to Action Section */}
      <ServicioCTA />
      {/* Modales de servicios - Nuevo componente genérico */}
      {modalActual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <ModalGenerico 
            data={modalActual}
            onClose={() => setModalActual(null)}
          />
        </div>
      )}
    </main>
  );
};

export default Servicios;
