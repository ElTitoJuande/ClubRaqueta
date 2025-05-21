import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram, FaClock } from 'react-icons/fa';

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
        privacidad: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario
        console.log('Formulario enviado:', formData);
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            asunto: '',
            mensaje: '',
            privacidad: false,
        });
    };

    const isFormValid = () => {
        return (
            formData.nombre &&
            formData.email &&
            formData.asunto &&
            formData.mensaje &&
            formData.privacidad
        );
    };

    // Coordenadas para el mapa
    const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.123456789012!2d-4.357972!3d37.335917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDIwJzA5LjMiTiA0wrAyMScyOC43Ilc!5e0!3m2!1ses!2ses!4v1623456789012!5m2!1ses!2s';

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Container principal */}
            <div className="relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado */}
                <div className="text-center mb-12 mt-10">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Contáctanos
                    </h1>
                    <p className="mt-4 max-w-2xl text-xl text-white mx-auto">
                        ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.
                    </p>
                </div>

                {/* Grid de contacto */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Formulario de contacto */}
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="px-6 py-8 sm:p-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Correo electrónico *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="asunto" className="block text-sm font-medium text-gray-700">
                                        Asunto *
                                    </label>
                                    <input
                                        type="text"
                                        id="asunto"
                                        name="asunto"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                                        Mensaje *
                                    </label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        rows={5}
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="privacidad"
                                            name="privacidad"
                                            type="checkbox"
                                            checked={formData.privacidad}
                                            onChange={handleChange}
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="privacidad" className="font-medium text-gray-700">
                                            Acepto la{' '}
                                            <a href="/politica-privacidad" className="text-lime-600 hover:text-lime-500">
                                                política de privacidad
                                            </a>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={!isFormValid()}
                                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isFormValid() ? 'bg-lime-600 hover:bg-lime-700' : 'bg-lime-300 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
                                    >
                                        Enviar mensaje
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Información de contacto */}
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden h-full">
                        <div className="px-6 py-8 sm:p-10 h-full flex flex-col">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h2>
                            <p className="text-gray-600 mb-8">Estamos disponibles para atenderte en los siguientes canales:</p>
                            
                            <div className="space-y-6 flex-grow">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FaMapMarkerAlt className="h-6 w-6 text-lime-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Dirección</h3>
                                        <p className="mt-1 text-gray-600">C/ Emilia Pardo Bazán, 123, 14960 Rute, Córdoba</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FaPhoneAlt className="h-6 w-6 text-lime-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Teléfono</h3>
                                        <p className="mt-1 text-gray-600">+34 615 895 895</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FaEnvelope className="h-6 w-6 text-lime-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Correo electrónico</h3>
                                        <p className="mt-1 text-gray-600">info@clubraquetarute.com</p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Síguenos en redes sociales</h3>
                                    <div className="flex space-x-4">
                                        <a 
                                            href="https://wa.me/34615895895" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors"
                                        >
                                            <FaWhatsapp className="h-6 w-6" />
                                        </a>
                                        <a 
                                            href="https://facebook.com/clubraquetarute" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
                                        >
                                            <FaFacebookF className="h-6 w-6" />
                                        </a>
                                        <a 
                                            href="https://instagram.com/clubraquetarute" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full text-white hover:opacity-90 transition-opacity"
                                        >
                                            <FaInstagram className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>

                                <div className="pt-4 mt-auto">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <FaClock className="h-6 w-6 text-lime-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">Horario de atención</h3>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-gray-600">Lunes a Viernes: 9:00 - 22:00</p>
                                                <p className="text-gray-600">Sábados: 10:00 - 14:00 / 16:00 - 20:00</p>
                                                <p className="text-gray-600">Domingos: Cerrado</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mapa */}
                <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-12">
                    <div className="px-6 py-8 sm:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Dónde estamos?</h2>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                            <iframe
                                src={mapSrc}
                                className="w-full h-[450px] border-0"
                                allowFullScreen
                                loading="lazy"
                                title="Ubicación de Club Raqueta Rute"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Contacto;
