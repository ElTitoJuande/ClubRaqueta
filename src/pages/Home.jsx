import React from 'react'
import Button from '../components/Button'

const Home = () => {
  return (
    <>
      <div>
        <section className="relative h-[70vh] sm:h-[80vh] bg-gray-200">
          <div className="bg-[url(../assets/iamges/tenisinterior.jpg)] bg-cover bg-no-repeat bg-center absolute inset-0">
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
        {/* <section className='py-20 bg-gray-100'>
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
                  <p class="text-gray-500">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-gray-500">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-gray-500">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-gray-500">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-gray-500">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-64">
                 <img src="..\assets\tenisinterior.jpg" alt="Pista de tenis" />
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-forest-green mb-2">Clay Courts</h3>
                  <p class="text-gray-500">8 premium clay courts maintained to international standards, perfect for a classic game of tennis.</p>
                </div>
              </div>
              
            </div>
          </div>
        </section> */}
        <section className="py-20 bg-ash-gray/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-forest-green mb-4">
                World-Class Facilities
              </h2>
              <p className="text-ash-gray max-w-2xl mx-auto">
                Discover our premium facilities designed to enhance your tennis experience and provide exceptional comfort and convenience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Clay Courts",
                  description: "8 premium clay courts maintained to international standards, perfect for a classic game of tennis.",
                  image: "/placeholder.svg?height=300&width=400&text=Clay+Courts"
                },
                {
                  title: "Hard Courts",
                  description: "6 all-weather hard courts with professional lighting for day and night play.",
                  image: "/placeholder.svg?height=300&width=400&text=Hard+Courts"
                },
                {
                  title: "Indoor Courts",
                  description: "4 indoor courts with climate control for year-round play regardless of weather conditions.",
                  image: "/placeholder.svg?height=300&width=400&text=Indoor+Courts"
                },
                {
                  title: "Pro Shop",
                  description: "Fully stocked pro shop with the latest equipment, apparel, and accessories for tennis enthusiasts.",
                  image: "/placeholder.svg?height=300&width=400&text=Pro+Shop"
                },
                {
                  title: "Restaurant & Bar",
                  description: "Elegant dining area and bar offering nutritious meals, refreshing drinks, and spectacular court views.",
                  image: "/placeholder.svg?height=300&width=400&text=Restaurant"
                },
                {
                  title: "Fitness Center",
                  description: "State-of-the-art fitness center with personal trainers to help improve your game and overall fitness.",
                  image: "/placeholder.svg?height=300&width=400&text=Fitness+Center"
                }
              ].map((facility, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                  <div className="relative h-64">
                    {/* <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      className="object-cover group-hover:scale-105 transition duration-300"
                      fill
                    /> */}
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
      </div>
    </>
  )
}

export default Home