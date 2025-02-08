"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import favicon from '@/assets/favicon.png';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import dotenv from 'dotenv';
import { useRouter } from 'next/navigation';

dotenv.config();

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <Image src={favicon} alt="Navfarm Logo" width={30} height={10} />
            </Link>
            <h6 className="text-xl font-bold">Apiculture</h6>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-gray-600">Home</Link>
            <Link href="/explore" className="text-gray-900 hover:text-gray-600">Explore</Link>
            <Link href="/features" className="text-gray-900 hover:text-gray-600">Features</Link>
            <div className="relative group">
              <button className="text-gray-900 hover:text-gray-600 inline-flex items-center">
                Industries
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <Link href="/pricing" className="text-gray-900 hover:text-gray-600">Pricing</Link>
            <Link href="/contact" className="text-gray-900 hover:text-gray-600">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-900 hover:text-gray-600">Login</Link>
            <button
              onClick={() => router.push('/signup')}
              className="bg-[#D86F55] text-white px-4 py-2 rounded-md hover:bg-[#C45E44]"
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900"
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
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-900">Home</Link>
            <Link href="/explore" className="block px-3 py-2 text-gray-900">Explore</Link>
            <Link href="/features" className="block px-3 py-2 text-gray-900">Features</Link>
            <Link href="/industries" className="block px-3 py-2 text-gray-900">Industries</Link>
            <Link href="/pricing" className="block px-3 py-2 text-gray-900">Pricing</Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-900">Contact</Link>
            <Link href="/login" className="block px-3 py-2 text-gray-900">Login</Link>
            <button
              onClick={() => router.push('/signup')}
              className="block w-full text-left px-3 py-2 text-white bg-[#D86F55] rounded-md"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
