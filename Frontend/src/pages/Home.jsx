import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/animations.css';

const Home = () => {
  return (
    <>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className='relative min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 overflow-hidden'>
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

          <div className='relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-20'>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-[fadeIn_1s_ease-out_forwards]">
                  Club <span className="text-yellow-400">Raqueta</span> Rute
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed animate-[fadeIn_1s_ease-out_0.3s_forwards]">
                  Bienvenido al Club Raqueta Rute - El lugar perfecto para tus partidos. 
                  Únase a nuestro exclusivo club de tenis y experimente instalaciones de primer nivel, 
                  entrenamiento profesional y una vibrante comunidad de entusiastas de la raqueta.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                  <Link to="/contacto">
                    <Button className="bg-yellow-500 text-lime-900 hover:bg-yellow-400 hover:text-lime-600 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
                      Únete Ahora
                    </Button>
                  </Link>
                  <Link to="/reservas">
                    <Button className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
                      Reserva una pista
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-2xl transform hover:rotate-3 transition-transform duration-500">
                  <img
                    src="/src/assets/images/clases.jpg"
                    alt="Club Raqueta Rute"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full opacity-20 animate-[float_6s_ease-in-out_infinite]"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-lime-300 rounded-full opacity-20 animate-[float_6s_ease-in-out_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className='py-16 bg-gradient-to-b from-lime-900 to-lime-800'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <Link to="/reservas" className="group">
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl flex items-center space-x-5 transition-all hover:bg-white/20 hover:shadow-xl hover:scale-105 duration-300 border border-white/20">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 shadow-lg group-hover:scale-110 transition-transform">
                    🥎
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-1">Reserva de pistas</h3>
                    <p className="text-white/80">Reserva tu próximo partido</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link to="/contacto" className="group">
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl flex items-center space-x-5 transition-all hover:bg-white/20 hover:shadow-xl hover:scale-105 duration-300 border border-white/20">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 shadow-lg group-hover:scale-110 transition-transform">
                    🎾
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-1">Afiliación de Miembros</h3>
                    <p className="text-white/80">Únete a nuestro club exclusivo</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link to="/eventos" className="group">
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl flex items-center space-x-5 transition-all hover:bg-white/20 hover:shadow-xl hover:scale-105 duration-300 border border-white/20">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 shadow-lg group-hover:scale-110 transition-transform">
                    🏆
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-1">Torneos</h3>
                    <p className="text-white/80">Participa en nuestras competiciones</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-lime-900 mb-4">
                Instalaciones de <span className="text-yellow-500">Clase Mundial</span>
              </h2>
              <p className="text-lg text-lime-800/80 max-w-2xl mx-auto">
                Descubre nuestras instalaciones premium diseñadas para mejorar tu experiencia de tenis y brindarte comodidad y conveniencia excepcionales.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Pistas de Tierra Batida",
                  description: "Pistas de tierra batida premium mantenidas con estándares internacionales.",
                  image: "/src/assets/images/ClubRaquete_tierra.jpg",
                  icon: "🎾"
                },
                {
                  title: "Pistas de Superficie Dura",
                  description: "Pistas de superficie dura para todo clima con iluminación profesional.",
                  image: "/src/assets/images/pista1.jpg",
                  icon: "🏸"
                },
                {
                  title: "Pistas Cubiertas",
                  description: "Pistas cubiertas con control de temperatura para jugar todo el año.",
                  image: "/src/assets/images/ClubRaqueta_techado.jpg",
                  icon: "🏟️"
                },
                {
                  title: "Tienda Profesional",
                  description: "Equipada con los últimos equipos, ropa y accesorios para tenis.",
                  image: "/src/assets/images/CLubRaqueta_tienda.jpg",
                  icon: "🛍️"
                },
                {
                  title: "Restaurante & Bar",
                  description: "Elegante área de comedor con vistas espectaculares a las pistas.",
                  image: "/src/assets/images/ClubRaqueta_restaurante.jpeg",
                  icon: "🍽️"
                },
                {
                  title: "Centro de Fitness",
                  description: "Centro de fitness de última generación con entrenadores personales.",
                  image: "/src/assets/images/ClubRaqueta_gimnasio.jpg",
                  icon: "💪"
                }
              ].map((facility, index) => (
                <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                      {facility.icon}
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-lime-50 to-white">
                    <h3 className="text-xl font-bold text-lime-900 mb-2">{facility.title}</h3>
                    <p className="text-lime-700/80">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-lime-800 to-lime-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-300 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-6">
                  Beneficios de ser <span className="text-yellow-400">Socio</span>
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  Únete al <strong>Club Raqueta Rute</strong> y disfruta de instalaciones de primer nivel, eventos exclusivos y una comunidad apasionada por el tenis y el pádel.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Reserva prioritaria en pistas de tenis y pádel",
                    "Acceso a torneos y eventos exclusivos para socios",
                    "Uso gratuito del gimnasio y zona de entrenamiento",
                    "Clases y entrenamientos con entrenadores profesionales",
                    "Acceso a la sala exclusiva para socios",
                    "Tarifas especiales para invitados"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-lime-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contacto">
                  <Button className="bg-yellow-500 text-lime-900  hover:text-lime-600 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
                    Conoce el proceso de matriculación
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/src/assets/images/socios.jpg"
                    alt="Beneficios de ser socio del club"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lime-900/50 to-transparent"></div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full opacity-20 animate-[float_6s_ease-in-out_infinite]"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-lime-300 rounded-full opacity-20 animate-[float_6s_ease-in-out_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-lime-900 mb-4">
                Lo que dicen nuestros <span className="text-yellow-500">Socios</span>
              </h2>
              <p className="text-lg text-lime-800/80 max-w-2xl mx-auto">
                Descubre lo que opinan nuestros socios sobre su experiencia en Club Raqueta Rute.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Las instalaciones son increíbles y los entrenadores me han ayudado a mejorar muchísimo mi nivel. No es solo un club, es una familia.",
                  name: "Lucía Fernández",
                  title: "Socia desde 2019",
                  image: "/src/assets/images/maite.png"
                },
                {
                  quote: "Mi familia y yo disfrutamos de un ambiente acogedor y programas para todas las edades. Los eventos sociales son lo mejor del club.",
                  name: "Carlos Martínez",
                  title: "Membresía Familiar",
                  image: "/src/assets/images/pacho.png"
                },
                {
                  quote: "Como jugadora competitiva, agradezco las pistas de primer nivel y los torneos organizados. Un club realmente profesional.",
                  name: "Elena Gómez",
                  title: "Jugadora de Torneos",
                  image: "/src/assets/images/eli.png"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-lime-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-1 text-yellow-500 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lime-800 mb-6 text-lg italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 border-2 border-yellow-500">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lime-900 text-lg">{testimonial.name}</h4>
                      <p className="text-lime-700">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20 bg-gradient-to-br from-lime-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-lime-900 mb-4">
                Próximos <span className="text-yellow-500">Eventos</span>
              </h2>
              <p className="text-lg text-lime-800/80 max-w-2xl mx-auto">
                Mantente informado sobre todas las competiciones, entrenamientos y encuentros especiales en Club Raqueta Rute.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Torneo Abierto de Tenis",
                  date: "20-25 de Julio, 2024",
                  description: "Competición abierta de tenis para jugadores de todos los niveles. Categorías masculina, femenina y mixta.",
                  image: "/src/assets/images/ClubRaqueta_torneo.jpg",
                  icon: "🏆"
                },
                {
                  title: "Clínica de Entrenamiento Juvenil",
                  date: "Todos los sábados, 9AM-12PM",
                  description: "Sesiones semanales de entrenamiento intensivo para jóvenes tenistas que buscan mejorar su técnica.",
                  image: "/src/assets/images/ClubRaqueta_clinic.webp",
                  icon: "🎾"
                },
                {
                  title: "Gala Benéfica de Tenis",
                  date: "10 de Agosto, 2024",
                  description: "Evento especial con exhibiciones de jugadores profesionales y actividades de recaudación de fondos.",
                  image: "/src/assets/images/recogebolas.jpg",
                  icon: "✨"
                }
              ].map((event, index) => (
                <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-lime-900/90 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xl">
                          {event.icon}
                        </div>
                        <span className="font-medium">{event.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-lime-50 to-white">
                    <h3 className="text-xl font-bold text-lime-900 mb-2">{event.title}</h3>
                    <p className="text-lime-700/80 mb-4">{event.description}</p>
                    <Link 
                      to="/eventos" 
                      className="inline-flex items-center text-yellow-500 font-semibold hover:text-yellow-600 transition-colors group"
                    >
                      Más información
                      <svg 
                        className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/eventos">
                <Button className="bg-lime-900 text-white hover:bg-lime-800 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
                  Ver Todos los Eventos
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-lime-800 to-lime-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-300 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                ¿Listo para unirte a nuestra <span className="text-yellow-400">comunidad</span>?
              </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Da el primer paso para disfrutar de nuestras instalaciones de primer nivel, entrenadores expertos y una comunidad apasionada por el tenis y el pádel.
              Nuestra membresía te brinda acceso a una experiencia única en el mundo del deporte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contacto">
                  <Button className="bg-yellow-500 text-lime-900 hover:bg-yellow-400 hover:text-lime-600 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
                    Hazte Socio
                  </Button>
                </Link>
                <Link to="/reservas">
                  <Button className="bg-white/10 backdrop-blur text-white hover:bg-white/20 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
                    Reserva una Prueba
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;