'use client';

import React from 'react';
import { FaBook } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { BsBellFill } from 'react-icons/bs';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="bg-white rounded-lg p-8 shadow-md text-center">
    <div className="flex justify-center mb-6">
      <div className="text-red-600 text-4xl">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const BeekeepingManagement = () => {
  return (
    <section id="management" className="py-20 bg-gradient-to-b from-amber-50 to-blue-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Apiculture System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Smart Bee Management</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our comprehensive bee management system combines traditional wisdom with 
              cutting-edge technology. We help beekeepers monitor hive health, track colony 
              development, and optimize honey production through sustainable practices.
            </p>
            <button className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 
              transition-colors">
              Get Started
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Hive Monitoring</h4>
              <p className="text-gray-600">Real-time tracking of hive conditions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeekeepingManagement;
