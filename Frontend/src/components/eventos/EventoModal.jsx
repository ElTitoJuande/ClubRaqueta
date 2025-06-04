import React, { useEffect } from 'react';
import { CalendarIcon, MapPinIcon, TagIcon, CheckCircleIcon, XCircleIcon, UserGroupIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const EventoModal = ({ 
  evento, 
  onClose, 
  formatearFecha, 
  inscrito, 
  inscribiendo, 
  inscripcionExitosa, 
  onInscripcion, 
  onCancelarInscripcion 
}) => {
  useEffect(() => {
    // Prevent scrolling on modal open
    document.body.style.overflow = 'hidden';
    
    // Restore scrolling on modal close
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!evento) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out_forwards]">
      <div 
        className="bg-gradient-to-br from-lime-900 to-lime-800 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden relative animate-[scaleIn_0.3s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10"
        >
          ×
        </button>
        
        <div className="md:flex">
          {/* Left side - Image */}
          <div className="md:w-1/2 relative">
            <div className="relative h-64 md:h-full">
              <img 
                src={evento.imagen} 
                alt={evento.titulo} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lime-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-yellow-500 text-lime-900 text-xs font-bold uppercase px-3 py-1 rounded-lg capitalize flex items-center">
                  <TagIcon className="w-3 h-3 mr-1" />
                  {evento.tipo_evento}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="md:w-1/2 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{evento.titulo}</h3>
            
            {/* Dates */}
            <div className="flex flex-wrap items-center text-white/70 text-sm mb-4">
              <div className="flex items-center mr-4 mb-2">
                <CalendarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                <span>Inicio: {formatearFecha(evento.fecha_inicio, evento.hora_inicio)}</span>
              </div>
              {evento.fecha_fin && (
                <div className="flex items-center mb-2">
                  <CalendarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                  <span>Fin: {formatearFecha(evento.fecha_fin, evento.hora_fin)}</span>
                </div>
              )}
            </div>
            
            {/* Location */}
            <div className="flex items-center text-white/70 text-sm mb-4">
              <MapPinIcon className="h-4 w-4 mr-1 text-yellow-400" />
              <span>{evento.ubicacion}</span>
            </div>
            
            {/* Description */}
            <p className="text-white/90 mb-6">{evento.descripcion_completa || evento.descripcion}</p>
            
            {/* Optional information */}
            {evento.instructor && (
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <UserGroupIcon className="w-4 h-4 mr-1 text-yellow-400" />
                  ¿Quién imparte el evento?
                </h4>
                <p className="text-white/80 text-sm">{evento.instructor}</p>
              </div>
            )}
            
            {evento.material && (
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <h4 className="text-white font-medium mb-2">¿Qué traer?</h4>
                <p className="text-white/80 text-sm">{evento.material}</p>
              </div>
            )}
            
            {/* Available spots */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium flex items-center">
                  <UserGroupIcon className="w-4 h-4 mr-1 text-yellow-400" />
                  Plazas disponibles:
                </span>
                <span className={`font-bold ${evento.plazas > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {evento.plazas}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`${evento.plazas > 0 ? 'bg-yellow-500' : 'bg-red-500'} h-2 rounded-full`}
                  style={{ width: `${Math.min(100, (1 - evento.plazas / 100) * 100)}%` }}
                ></div>
              </div>
              
              {evento.plazas === 0 && (
                <div className="mt-2 text-center text-red-400 text-xs font-medium animate-pulse">
                  EVENTO COMPLETO
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            {evento.plazas > 0 ? (
              inscrito ? (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={onCancelarInscripcion}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${inscribiendo ? 'bg-white/20 text-white cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                    disabled={inscribiendo}
                  >
                    {inscribiendo ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-5 w-5 mr-2" />
                        Cancelar inscripción
                      </>
                    )}
                  </button>
                  <button 
                    className="w-full bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center mt-2"
                    onClick={onClose}
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Volver a eventos
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={onInscripcion}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${inscribiendo ? 'bg-white/20 text-white cursor-not-allowed' : inscripcionExitosa ? 'bg-green-500 text-white' : 'bg-yellow-500 text-lime-900 hover:bg-yellow-400'}`}
                    disabled={inscribiendo}
                  >
                    {inscribiendo ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando inscripción...
                      </>
                    ) : inscripcionExitosa ? (
                      <>
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        ¡Inscripción completada!
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Inscribirse al evento
                      </>
                    )}
                  </button>
                  <button 
                    className="w-full bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center mt-2"
                    onClick={onClose}
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Volver a eventos
                  </button>
                </div>
              )
            ) : (
              <div className="flex flex-col gap-2">
                <button 
                  className="w-full bg-white/20 text-white/50 py-3 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                  disabled
                >
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  Evento completo
                </button>
                <button 
                  className="w-full bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center mt-2"
                  onClick={onClose}
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Volver a eventos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventoModal;
