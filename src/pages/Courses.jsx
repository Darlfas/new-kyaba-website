import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import PaymentModal from '@/components/PaymentModal';
import { supabase } from '@/lib/supabase';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ category: 'All', level: 'All' });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Static course data as fallback
  const staticCourses = [
    {
      id: 1,
      title: "AI Fundamentals for Kingdom Impact",
      description: "Learn the basics of artificial intelligence through a faith-based lens, exploring how AI can be used for positive change in communities.",
      category: "AI",
      level: "Beginner",
      price: 299,
      duration: "8 weeks",
      instructor: "Dr. Sarah Okonkwo",
      modules: 12,
      students: 1250
    },
    {
      id: 2,
      title: "Blockchain Development Mastery",
      description: "Master blockchain technology and smart contract development while understanding the ethical implications of decentralized systems.",
      category: "Blockchain",
      level: "Intermediate",
      price: 499,
      duration: "12 weeks",
      instructor: "Engr. Michael Uche",
      modules: 18,
      students: 890
    },
    {
      id: 3,
      title: "Machine Learning for Social Good",
      description: "Apply machine learning algorithms to solve real-world problems in your community, with practical projects and case studies.",
      category: "AI",
      level: "Advanced",
      price: 699,
      duration: "16 weeks",
      instructor: "Prof. Grace Adebayo",
      modules: 24,
      students: 567
    },
    {
      id: 4,
      title: "Cryptocurrency & Digital Finance",
      description: "Understand digital currencies, DeFi protocols, and how blockchain is revolutionizing financial systems globally.",
      category: "Blockchain",
      level: "Beginner",
      price: 399,
      duration: "10 weeks",
      instructor: "Engr. Michael Uche",
      modules: 15,
      students: 2100
    }
  ];

  useEffect(() => {
    // Filter courses based on selected filters
    let filteredCourses = staticCourses;
    
    if (filter.category !== 'All') {
      filteredCourses = filteredCourses.filter(course => course.category === filter.category);
    }
    
    if (filter.level !== 'All') {
      filteredCourses = filteredCourses.filter(course => course.level === filter.level);
    }
    
    setCourses(filteredCourses);
  }, [filter]);

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      setEnrolledCourses(data.map(enrollment => enrollment.course_id));
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const handleEnroll = (course) => {
    if (!user) {
      alert('Please sign in to enroll in courses');
      return;
    }

    if (enrolledCourses.includes(course.id)) {
      alert('You are already enrolled in this course');
      return;
    }

    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSelectedCourse(null);
    fetchEnrolledCourses(); // Refresh enrolled courses
    alert('Payment successful! You are now enrolled in the course.');
  };

  const categories = ['All', 'AI', 'Blockchain'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Our Courses</h1>
          <p className="text-xl opacity-90">
            Comprehensive programs designed to transform you into a tech leader
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-semibold text-gray-700">Category:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter.category === category ? "default" : "outline"}
                  onClick={() => setFilter(prev => ({ ...prev, category }))}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-semibold text-gray-700">Level:</span>
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={filter.level === level ? "default" : "outline"}
                  onClick={() => setFilter(prev => ({ ...prev, level }))}
                  className="text-sm"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.id);
              return (
                <Card key={course.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={course.category === 'AI' ? 'default' : 'secondary'}>
                        {course.category}
                      </Badge>
                      <span className="text-2xl font-bold text-purple-600">
                        ${course.price}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Level: {course.level}</span>
                        <span>Duration: {course.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{course.modules} Modules</span>
                        <span>{course.students} Students</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <strong>Instructor:</strong> {course.instructor}
                      </p>
                    </div>
                    
                    {isEnrolled ? (
                      <Button className="w-full" variant="secondary" disabled>
                        Already Enrolled
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        onClick={() => handleEnroll(course)}
                      >
                        Enroll Now - ${course.price}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        course={selectedCourse}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Courses;