import React from 'react';

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Kingdom Youth AI & Blockchain Academy
        </h1>
        <p className="text-xl mb-8">
          Empowering Kingdom Youth with AI & Blockchain Skills
        </p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Start Learning
        </button>
      </div>
    </section>
  );
};

export default Hero;