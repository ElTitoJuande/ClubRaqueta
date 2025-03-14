import React from 'react'
import Button from '../components/Button'
import Image from '../components/Image'

const Home = () => {
  return (
    <>
      <main>
        <section className="relative h-[70vh] sm:h-[80vh] bg-gray-200">
          <div className="bg-[url('/public/images/clases.jpg')] bg-cover bg-no-repeat bg-center absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-green-60 to-lime-700"></div>
          </div>
          <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-xl ml-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Excelencia en cada partido</h1>
              <p className="text-xl text-white mb-8">
                Bienvenido al Club Raqueta Rute - El lugar perfecto para tus partidos. Únase a nuestro exclusivo club de tenis y experimente instalaciones de primer nivel, entrenamiento profesional y una vibrante comunidad de entusiastas de la raqueta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-yellow-700 text-green-200 hover:bg-yellow-900 text-lg px-8 py-6">
                  Únete
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Reserva una pista
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className='py-10 bg-white'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-gray-100 p-4 rounded-lg flex items-center spcace-x-4 transition hover:shadow-md duration-300'>
                <div className='rounded-full bg-lime-700 p-3'>
                  🥎
                </div>
                <div>
                  <h3 className='text-lg font-medium text-lime-700'>Reserva de pistas</h3>
                  <p className="text-gray-400">Reserva tu próximo partido</p>
                </div><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className='bg-gray-100 p-4 rounded-lg flex items-center spcace-x-4 transition hover:shadow-md duration-300'>
                <div className='rounded-full bg-lime-700 p-3'>
                  🎾
                </div>
                <div>
                  <h3 className='text-lg font-medium text-lime-700'>filiación de Miembros</h3>
                  <p className="text-gray-400">Únete a nuestro club exclusivo</p>
                </div><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className='bg-gray-100 p-4 rounded-lg flex items-center spcace-x-4 transition hover:shadow-md duration-300'>
                <div className='rounded-full bg-lime-700 p-3'>
                  🏆
                </div>
                <div>
                  <h3 className='text-lg font-medium text-lime-700'>Torneos</h3>
                  <p className="text-gray-400">Participa en nuestras competiciones</p>
                </div><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-forest-green mb-4">
                Instalaciones de clase mundial
              </h2>
              <p className="text-ash-gray max-w-2xl mx-auto">
                Descubra nuestras instalaciones premium diseñadas para mejorar su experiencia de tenis y brindarle comodidad y conveniencia excepcionales.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Pistas de Tierra Batida",
                  description: "8 pistas de tierra batida premium mantenidas con estándares internacionales, perfectas para un clásico partido de tenis.",
                  image: "/public/images/pista1.jpg"
                },
                {
                  title: "Pistas de Superficie Dura",
                  description: "6 pistas de superficie dura para todo clima con iluminación profesional para jugar de día y de noche.",
                  image: "/public/images/pista1.jpg"
                },
                {
                  title: "Pistas Cubiertas",
                  description: "4 pistas cubiertas con control de temperatura para jugar durante todo el año sin importar las condiciones climáticas.",
                  image: "/public/images/pista1.jpg"
                },
                {
                  title: "Tienda Profesional",
                  description: "Tienda completamente equipada con los últimos equipos, ropa y accesorios para los entusiastas del tenis.",
                  image: "/public/images/pista1.jpg"
                },
                {
                  title: "Restaurante & Bar",
                  description: "Elegante área de comedor y bar que ofrece comidas nutritivas, bebidas refrescantes y espectaculares vistas a las pistas.",
                  image: "/public/images/pista1.jpg"
                },
                {
                  title: "Centro de Fitness",
                  description: "Centro de fitness de última generación con entrenadores personales para mejorar tu juego y condición física.",
                  image: "/public/images/pista1.jpg"
                }
              ].map((facility, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                  <div className="relative h-64">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="object-cover group-hover:scale-105 transition duration-300"
                    // fill
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-forest-green mb-2">{facility.title}</h3>
                    <p className="text-ash-gray">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white">
                View All Facilities
              </Button>
            </div>
          </div>
        </section>
        <section className='py-20 bg-lime-700'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div>
                <h2 className='text-3xl md:text-4xl font-bold mb-6'>Beneficios de ser Socio</h2>
                <p className="text-white/90 mb-8">
                  Únete al <strong>Club Raqueta Rute</strong> y disfruta de instalaciones de primer nivel, eventos exclusivos y una comunidad apasionada por el tenis y el pádel.
                  Nuestra membresía te brinda acceso a una experiencia única en el mundo del deporte.
                </p>
                <ul className='space-y-4 mb-8'>
                  {["Reserva prioritaria en pistas de tenis y pádel", "Acceso a torneos y eventos exclusivos para socios",
                    "Uso gratuito del gimnasio y zona de entrenamiento",
                    "Clases y entrenamientos con entrenadores profesionales",
                    "Acceso a la sala exclusiva para socios y zonas de descanso",
                    "Posibilidad de invitar a amigos con tarifas especiales"].map((benefit, index) => (
                      <li key={index} className='flex items-start'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-naples-yellow mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                </ul>
                <Button className=''>Conoce el proceso de matriculación</Button>
              </div>
              <div className='relative h-[400px] md:h-[500px] rounded-lg overflow-hidden'>
                <Image
                  src="/public/images/socios.jpg"
                  alt="Beneficios de se socio del club"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-forest-green mb-4">
                Próximos Torneos y Eventos
              </h2>
              <p className="text-ash-gray max-w-2xl mx-auto">
                Mantente informado sobre todas las competiciones, entrenamientos y encuentros especiales en <strong>Club Raqueta Rute</strong>.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Torneo Abierto de Pádel",
                  date: "20-25 de Julio, 2024",
                  description: "Competición abierta de pádel para jugadores de todos los niveles. Categorías masculina, femenina y mixta.",
                  image: "/images/torneo-padel.jpg"
                },
                {
                  title: "Clínica de Entrenamiento Juvenil",
                  date: "Todos los sábados, 9AM-12PM",
                  description: "Sesiones semanales de entrenamiento intensivo para jóvenes tenistas que buscan mejorar su técnica.",
                  image: "/images/clinica-juvenil.jpg"
                },
                {
                  title: "Gala Benéfica de Tenis",
                  date: "10 de Agosto, 2024",
                  description: "Evento especial con exhibiciones de jugadores profesionales y actividades de recaudación de fondos.",
                  image: "/images/gala-benefica.jpg"
                }
              ].map((event, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-yellow-600 font-medium mb-2">{event.date}</div>
                    <h3 className="text-xl font-bold text-forest-green mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <Button variant="link" className="text-forest-green hover:text-forest-green/80 p-0 flex items-center">
                      Más información <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button className="bg-forest-green text-white hover:bg-forest-green/90">
                Ver Todos los Eventos
              </Button>
            </div>
          </div>
        </section>
        <section className="py-20 bg-neutral-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                Opiniones de Nuestros Socios
              </h2>
              <p className="text-neutral max-w-2xl mx-auto">
                Descubre lo que dicen nuestros socios sobre su experiencia en <strong>Club Raqueta Rute</strong>.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Las instalaciones son increíbles y los entrenadores me han ayudado a mejorar muchísimo mi nivel. No es solo un club, es una familia.",
                  name: "Lucía Fernández",
                  title: "Socia desde 2019",
                  image: "/images/testimonio1.jpg"
                },
                {
                  quote: "Mi familia y yo disfrutamos de un ambiente acogedor y programas para todas las edades. Además, los eventos sociales son lo mejor del club.",
                  name: "Carlos Martínez",
                  title: "Membresía Familiar",
                  image: "/images/testimonio2.jpg"
                },
                {
                  quote: "Como jugador competitivo, agradezco las pistas de primer nivel y los torneos organizados. Un club realmente profesional.",
                  name: "Elena Gómez",
                  title: "Jugadora de Torneos",
                  image: "/images/testimonio3.jpg"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="flex items-center space-x-1 text-secondary mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-neutral mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-dark">{testimonial.name}</h4>
                      <p className="text-sm text-neutral">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para unirte a nuestra comunidad?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Da el primer paso para disfrutar de nuestras instalaciones de primer nivel, entrenadores expertos y una comunidad apasionada por el tenis y el pádel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-secondary text-primary-dark hover:bg-secondary-dark text-lg px-8">
                Hazte Socio
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Solicitar una Visita
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home