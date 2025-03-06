import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>

            <nav className='space-x-4 p-4 text-white'>
                <Link to="/" className='enlace'>Inicio</Link>
                <Link to="/servicios" className='enlace'>Servicios</Link>
                <Link to="/reservas" className='enlace'>Reservas</Link>
                <Link to="/eventos" className='enlace'>Eventos</Link>
                <Link to="/contacto" className='enlace'>Contacto</Link>
                <Link to="/login" className='enlace'>Inciar Sesión</Link>
            </nav>

        </>
    );
};

export default Navbar;