"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import favicon from '@/assets/favicon.png';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-cyan-200/80 to-purple-200/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={favicon} alt="Logo" width={40} height={40} className="mr-2" />
            <div className="text-2xl font-bold">ApiCulture</div>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-amber-600 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-amber-600">
              About Us
            </button>
            <button onClick={() => scrollToSection('management')} className="text-gray-600 hover:text-amber-600">
              Bee Management
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-amber-600">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('footer')} className="text-gray-600 hover:text-amber-600">
              Contact Us
            </button>
          </div>

          {/* Get Started Button - Desktop */}
          <button 
            onClick={() => router.push('/signup')}
            className="hidden md:block px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-600 hover:text-amber-600 py-2"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('management')} 
              className="text-gray-600 hover:text-amber-600 py-2"
            >
              Bee Management
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-600 hover:text-amber-600 py-2"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('footer')} 
              className="text-gray-600 hover:text-amber-600 py-2"
            >
              Contact Us
            </button>
            <button 
              onClick={() => router.push('/signup')}
              className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors w-full"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
