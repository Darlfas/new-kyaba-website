import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">KYABA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">About</Link>
            <Link to="/courses" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Courses</Link>
            <Link to="/ai-demo" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">AI Demo</Link>
            <Link to="/simulator" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Simulator</Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Contact</Link>
            
            {loading ? (
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {profile?.full_name || user.email}</span>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">Get Started</Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">About</Link>
              <Link to="/courses" className="text-gray-700 hover:text-purple-600 font-medium">Courses</Link>
              <Link to="/ai-demo" className="text-gray-700 hover:text-purple-600 font-medium">AI Demo</Link>
              <Link to="/simulator" className="text-gray-700 hover:text-purple-600 font-medium">Simulator</Link>
              <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium">Contact</Link>
              
              {user ? (
                <div className="space-y-2">
                  <div className="text-gray-700">Welcome, {profile?.full_name || user.email}</div>
                  <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all inline-block text-center">Get Started</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;