import React from 'react'
import Button from '../components/Button'
import Image from '../components/Image'

const Home = () => {
  return (
    <>
      <div>
        <section className="relative h-[70vh] sm:h-[80vh] bg-gray-200">
          <div className="bg-[url(../assets/images/tenisinterior.jpg)] bg-cover bg-no-repeat bg-center absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-green-60 to-lime-700"></div>
          </div>
          <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Excelencia en cada partido</h1>
              <p className="text-xl text-white/90 mb-8">
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
                </div>
                <p>▶</p>
              </div>

              <div className='bg-gray-100 p-4 rounded-lg flex items-center spcace-x-4 transition hover:shadow-md duration-300'>
                <div className='rounded-full bg-lime-700 p-3'>
                  🎾
                </div>
                <div>
                  <h3 className='text-lg font-medium text-lime-700'>filiación de Miembros</h3>
                  <p className="text-gray-400">Únete a nuestro club exclusivo</p>
                </div>
                <p>▶</p>
              </div>

              <div className='bg-gray-100 p-4 rounded-lg flex items-center spcace-x-4 transition hover:shadow-md duration-300'>
                <div className='rounded-full bg-lime-700 p-3'>
                  🏆
                </div>
                <div>
                  <h3 className='text-lg font-medium text-lime-700'>Torneos</h3>
                  <p className="text-gray-400">Participa en nuestras competiciones</p>
                </div>
                <p>▶</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-ash-gray/5">
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
      </div>
    </>
  )
}

export default Home