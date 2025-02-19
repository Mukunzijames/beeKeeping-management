'use client';
import Image from 'next/image';
import about from '@/assets/pexels-pixabay-209083.jpg';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-cyan-200 via-purple-200 to-rose-200">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Pioneering Sustainable Beekeeping</h3>
            <p className="text-gray-700 leading-relaxed">
              With over two decades of experience in apiculture, we're dedicated to promoting 
              sustainable beekeeping practices and protecting these vital pollinators. Our 
              innovative management systems help beekeepers maintain healthy colonies while 
              maximizing productivity.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src={about}
              alt="Beekeeping"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;