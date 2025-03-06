import React from 'react';
import Navbar from './Navbar';
import logo from '../assets/ClubRaqueta.png'

const Header = () => {
  return (
    <>
    
    <header className='bg-lime-700 p-2 text-white flex items-center justify-between mx-auto'>
        <div>
            <img src={logo} alt="Club Raqueta Rute" className='h-30 m-1' />
        </div>
        <Navbar/>
    </header>
    
    </>
  )
}

export default Header