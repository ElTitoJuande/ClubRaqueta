import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <>
      <div>
        <section className="relative h-[70vh] sm:h-[80vh] bg-gray-200">
          <div className="bg-[url(./assets/tenisinterior.jpg)] bg-cover bg-no-repeat bg-center absolute inset-0">
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
        <section className='py-20 bg-gray-100'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-lime-700 text-center mb-8'>Nuestros Servicios</h2>
              <p className='text-gray-500 max-w-2xl mx-auto'>Descubre nuestros servicios premium diseñados para mejorar la experiencia del deporte y proporcionar comodidad y convivencia para nuestros miembros. </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-ash-gray">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-ash-gray">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-ash-gray">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-ash-gray">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-ash-gray">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-ash-gray">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home