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

const BeekeepingManagement: React.FC = () => {
  const features = [
    {
      title: "Expenses/Day Book",
      description: "With NAVFarm beekeeping software, you can create handy expenses and day books to keep track of your daily expenses. ",
      icon: <FaBook />
    },
    {
      title: "Record Keeping",
      description: "Record keeping is the first and foremost requirement for the smooth functioning of apiculture. With NAVFarm, record keeping becomes as smooth as butter for apiculturists of all levels, beginner to experts.",
      icon: <MdLocationOn />
    },
    {
      title: "Alerts & Notifications",
      description: "Stay abreast about your agribusiness! With NAVFarm you can get all the necessary alerts and notifications related to your business, from the market price to the total payment, feeds to flock.",
      icon: <BsBellFill />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">The Easiest</h1>
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Beekeeping Management <span className="font-normal">App</span>
      </h2>
      <p className="text-gray-600 text-center mb-16 max-w-4xl mx-auto">
        Transform your valuable information into extensive knowledge with our Beehive Management Software. With NAVFarm, you can have absolute control over your apiary.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
      <p className="text-gray-600 text-center mt-16 max-w-4xl mx-auto">
        Beekeeping management is not easy, especially when you have different varieties of bees with disparate dispositions. It is best to have a beekeeping management application that can help you deal with your apiary's day-to-day tasks. NAVFarm apiary management software not only allows you to track records of your apiary but also helps you manage your business efficiently.
      </p>
    </div>
  );
};

export default BeekeepingManagement;
