'use client';
const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-cyan-200 via-purple-200 to-rose-200">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-amber-500 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">
                "The bee management system has revolutionized our apiary operations. 
                The support and guidance we've received has been invaluable."
              </p>
              <div className="font-semibold">Professional Beekeeper</div>
              <div className="text-gray-500">Commercial Apiary Owner</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;