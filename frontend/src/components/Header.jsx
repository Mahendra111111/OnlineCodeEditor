import { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='flex justify-between items-center p-6 bg-black text-white bg-opacity-100 shadow-lg sticky top-0 z-50'>
      <h1 className='text-3xl font-extrabold tracking-wide'>
        ez-Snippits
      </h1>
      <button 
        className='three-lines md:hidden text-white focus:outline-none' 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✖' : '☰'}
      </button>
      <nav>
        <ul className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 w-full bg-black md:bg-transparent p-6 md:p-0 md:w-auto md:flex-row flex-col items-center`}>          
          <li>
            <a href='#home' className='hover:text-purple-500 block py-2'>
              Home
            </a>
          </li>
          <li>
            <a href='#about' className='hover:text-purple-500 block py-2'>
              About
            </a>
          </li>
          <li>
            <a href='#services' className='hover:text-purple-500 block py-2'>
              Services
            </a>
          </li>
          <li>
            <a href='#contact' className='hover:text-purple-500 block py-2'>
              Contact
            </a>
          </li>
          <Link to="/login"><button className='block py-2'>Login</button></Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
