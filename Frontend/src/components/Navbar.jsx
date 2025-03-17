import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", text: "Inicio" },
    { to: "/servicios", text: "Servicios" },
    { to: "/reservas", text: "Reservas" },
    { to: "/eventos", text: "Eventos" },
    { to: "/contacto", text: "Contacto" }
  ];

  return (
    <nav className="relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white hover:text-yellow-400 transition-colors"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="px-4 py-2 text-white hover:text-yellow-400 transition-colors relative group"
          >
            {link.text}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
        ))}
      </div>

      {/* Mobile navigation */}
      <div
        className={`absolute top-full right-0 w-48 py-2 mt-2 bg-lime-800 rounded-lg shadow-xl md:hidden transition-all duration-300 transform ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block px-4 py-2 text-white hover:bg-lime-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;