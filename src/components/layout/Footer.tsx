"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 overflow-hidden ">
      <div className="mx-auto max-w-[88%] xl:max-w-[90%] px-3 sm:px-4">
        {/* Top section with logo */}
        <div className="mb-12 sm:mb-16 w-full">
          <Link href="/" className="inline-block">
            <div className="flex items-center">
              <div className="h-10 w-10 sm:h-12 sm:w-12 relative">
                <Image
                  src="/images/locationIconBW.png" 
                  alt="LetsXplore Logo"
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                />
              </div>
              <span className="text-white text-xl sm:text-2xl font-bold ml-2 sm:ml-3">LetsXplore</span>
            </div>
          </Link>
        </div>

        {/* Separator line */}
        <div className="h-px bg-gray-800 w-full mb-8 sm:mb-10"></div>

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-12 lg:gap-16">
          {/* Social links - on the left */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <h3 className="text-base font-normal mb-6">Follow us on</h3>
            <div className="flex gap-6">
              <Link href="https://linkedin.com" target="_blank" className="hover:text-gray-300 transition-colors">
                <FaLinkedin size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-gray-300 transition-colors">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-gray-300 transition-colors">
                <FaXTwitter size={24} />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="hover:text-gray-300 transition-colors">
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>

          {/* Navigation sections - on the right */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col sm:flex-row justify-start md:justify-end gap-12 sm:gap-16 lg:gap-24 xl:gap-32">
            {/* Explore links */}
            <div>
              <h3 className="text-base font-normal mb-6">Explore</h3>
              <div className="grid grid-cols-1 gap-y-3">
                <Link href="/" className="text-sm hover:text-gray-300 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-sm hover:text-gray-300 transition-colors">
                  About us
                </Link>
                <Link href="/contact" className="text-sm hover:text-gray-300 transition-colors">
                  Contact us
                </Link>
              </div>
            </div>

            {/* Locations links */}
            <div>
              <h3 className="text-base font-normal mb-6">Locations</h3>
              <div className="grid grid-cols-1 gap-y-5">
                {/* First row: Ibadan, Lagos, Abeokuta */}
                <div className="flex flex-wrap gap-5 md:gap-6 lg:gap-8">
                  <Link href="/locations/ibadan" className="text-sm hover:text-gray-300 transition-colors">
                    Ibadan
                  </Link>
                  <Link href="/locations/lagos" className="text-sm hover:text-gray-300 transition-colors">
                    Lagos
                  </Link>
                  <Link href="/locations/abokuta" className="text-sm hover:text-gray-300 transition-colors">
                    Abeokuta
                  </Link>
                </div>
                
                {/* Second row: Ekiti, Osun, Ogun */}
                <div className="flex flex-wrap gap-5 md:gap-6 lg:gap-8">
                  <Link href="/locations/ekiti" className="text-sm hover:text-gray-300 transition-colors">
                    Ekiti
                  </Link>
                  <Link href="/locations/osun" className="text-sm hover:text-gray-300 transition-colors">
                    Osun
                  </Link>
                  <Link href="/locations/ogun" className="text-sm hover:text-gray-300 transition-colors">
                    Ogun
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 sm:mt-16 pb-2 text-sm text-gray-400 w-full">
          ©LetsXplore 2025 - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
