'use client';

import React from 'react';
import Image from 'next/image';
import headerImage from '@/assets/pexels-glazun0v-4247181.jpg';

const Header: React.FC = () => {
  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[70px] py-12 sm:py-20 lg:pt-[150px] flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-0 bg-gradient-to-br from-teal-200 via-purple-200 to-rose-200">
      <div className="max-w-2xl text-center lg:text-left">
        <h1 className="text-[35px] sm:text-[45px] lg:text-[55px] leading-tight font-bold text-[#2D3748] mb-6 ">
          Manage bee farms
          <span className="block text-[25px] sm:text-[30px] lg:text-[35px] font-semibold pt-[20px]">the professional way</span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-[460px] mx-auto lg:mx-0">
          Traditional beehive management methods are cumbersome and lead to the loss 
          of valuable information of your colonies in the process. You need the right 
          Beehive Management Software.
        </p>

        <button 
          className="px-6 sm:px-8 py-3 rounded-full border-2 border-gray-200
                     hover:border-gray-300 transition-colors
                     text-gray-800 font-medium"
        >
          Start your Free Trial
        </button>
      </div>

      <div className="flex items-center justify-center lg:items-start">
        <Image 
          src={headerImage} 
          alt="Header Image" 
          width={530} 
          height={530}
          className="w-full max-w-[400px] lg:max-w-[530px] h-auto"
        />
      </div>
    </header>
  );
};

export default Header;
