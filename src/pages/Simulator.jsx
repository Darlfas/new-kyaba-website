import React from 'react';
import BlockchainSimulator from '@/components/BlockchainSimulator';

const Simulator = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Learning Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience blockchain technology firsthand with our interactive simulator. 
            Learn by doing and see how blocks are created and linked together.
          </p>
        </div>
        
        <BlockchainSimulator />
        
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold text-purple-600">1. Add Data</h3>
                <p className="text-gray-600">Enter any data you want to store in a new block</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600">2. Mining Process</h3>
                <p className="text-gray-600">Watch as the system "mines" your block with a unique hash</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-green-600">3. Chain Formation</h3>
                <p className="text-gray-600">See how each block links to the previous one, forming a chain</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;