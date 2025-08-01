import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Simulator from './pages/Simulator';

// Simple Contact page inline
const Contact = () => (
  <div className="min-h-screen bg-gray-50 py-20">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

// Simple AI Demo inline
const AIDemo = () => (
  <div className="min-h-screen bg-gray-50 py-20">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        AI Demo
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-bold mb-4">Prayer Generator</h3>
        <input type="text" placeholder="Enter a topic..." className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4" />
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
          Generate Prayer
        </button>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700">Generated prayer will appear here...</p>
        </div>
      </div>
    </div>
  </div>
);

// Simple Auth page inline
const Auth = () => (
  <div className="min-h-screen bg-gray-50 py-20">
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Get Started</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-demo" element={<AIDemo />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;