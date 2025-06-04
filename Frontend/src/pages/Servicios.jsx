import React, { useState } from 'react';
import ServicioModal from '../components/servicios/ServicioModal';

// Importamos los componentes creados
import ServicioHero from '../components/servicios/ServicioHero';
import ServiciosList from '../components/servicios/ServiciosList';
import ServicioCTA from '../components/servicios/ServicioCTA';
import { serviciosList, modalesList } from '../components/servicios/ServiciosUtils';

const Servicios = () => {
  // Estado para cada modal
  const [modalIndex, setModalIndex] = useState(null);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <ServicioHero />

      {/* Servicios Section */}
      <ServiciosList 
        servicios={serviciosList} 
        onServicioClick={setModalIndex} 
      />
      
      {/* Call to Action Section */}
      <ServicioCTA />
      {/* Modales de servicios */}
      {modalIndex !== null && (
        <ServicioModal
          open={modalIndex !== null}
          onClose={() => setModalIndex(null)}
          titulo={modalesList[modalIndex].titulo}
          icono={modalesList[modalIndex].icono}
          imagenes={modalesList[modalIndex].imagenes}
          boton={modalesList[modalIndex].boton}
          maxWidth={modalesList[modalIndex].maxWidth}
        >
          {modalesList[modalIndex].contenido}
        </ServicioModal>
      )}
    </main>
  );
};

export default Servicios;
