import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <>
    
    <header className='bg-blue-500 p-4 text-white flex items-center justify-between'>
        <div>
            <img src="{logo}" alt="Club de Tenis" className='h-16 m-4' />
        </div>
        <Navbar/>
    </header>
    
    </>
  )
}

export default Header