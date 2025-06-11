"use client";

import React, { useState } from 'react';
import NextLink from 'next/link';
import { FiSearch, FiChevronDown, FiUser } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
       <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 sm:px-6 lg:px-8  ">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex items-center   py-2 px-4 text-white  shadow-sm">
                <div className="w-8 h-8 bg-white/70 backdrop-blur-2xl rounded-full flex items-center justify-center mr-2">
                  <svg className="w-5 h-5 text-blue-800" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-bold">Ibadan</span>
                <FiChevronDown className="ml-2" />
              </div>

              <div className="hidden md:flex flex-1 max-w-md">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for where to explore"
                    className="w-full py-2 pl-4 pr-10 bg-transparent border border-white text-white placeholder-white/75 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <FiSearch className="h-5 w-5 text-white/75" />
                  </div>
                </div>
              </div>
            </div> 
           
            <div className="flex items-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-white transition-colors flex items-center border border-white/20 shadow-sm">
                <FiUser className="h-5 w-5 text-blue-800" />
                <FiChevronDown className="h-4 w-4 text-blue-800 ml-1" />
              </div>
            </div>
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-gray-200 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200 border border-white/20"
                aria-label="Toggle Navigation"
              >
                <svg
                  className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
            <div className="px-2 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-lg rounded-2xl mt-2 border border-white/20 shadow-lg">
              <NavLinks isMobile />
              <div className="pt-4">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <div className="px-2 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-sm">
            <NavLinks isMobile />
            <div className="pt-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const baseClasses = "font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group";
  const desktopClasses = "hover:after:scale-x-100 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:left-0 after:-bottom-1 after:scale-x-0 after:transition-transform after:duration-300";
  const mobileClasses = "block px-3 py-2 rounded-md hover:bg-gray-50";

  const linkClass = isMobile ? `${baseClasses} ${mobileClasses}` : `${baseClasses} ${desktopClasses}`;

  const links = [
    { href: '/destinations', label: 'Destinations' },
    { href: '/tours', label: 'Tours' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  if (isMobile) {
    return (
      <div className="space-y-1">
        {links.map((link) => (
          <NextLink key={link.href} href={link.href} className={linkClass}>
            {link.label}
          </NextLink>
        ))}
      </div>
    );
  }

  return (
    <>
      {links.map((link) => (
        <NextLink key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </NextLink>
      ))}
    </>
  );
};

export default Header;