import React from 'react';

const FeatureCards = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4">AI Learning</h3>
            <p>Master artificial intelligence with hands-on projects</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4">Blockchain</h3>
            <p>Build decentralized applications and smart contracts</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4">Community</h3>
            <p>Join a faith-based community of tech innovators</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;