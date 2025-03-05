import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>

            <nav className='space-x-4 bg-blue-500 p-4 text-white'>
                <Link to="/" className='enlace'>Inicio</Link>
                <Link to="/resrevas" className='enlace'>Reservas</Link>
                <Link to="/eventos" className='enlace'>Eventos</Link>
                <Link to="/contacto" className='enlace'>Contacto</Link>
                <Link to="/login" className='enlace'>Inciar Sesión</Link>
            </nav>

        </>
    );
};

export default Navbar;