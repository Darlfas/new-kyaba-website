import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '5000+', label: 'Students Trained', icon: '🎓' },
    { number: '50+', label: 'Expert Instructors', icon: '👨‍🏫' },
    { number: '95%', label: 'Job Placement Rate', icon: '💼' },
    { number: '25+', label: 'Countries Reached', icon: '🌍' }
  ];

  const values = [
    {
      icon: '✝️',
      title: 'Faith-Centered Learning',
      description: 'Integrating Christian values with cutting-edge technology education'
    },
    {
      icon: '🎯',
      title: 'Excellence in Education',
      description: 'Providing world-class training in AI and Blockchain technologies'
    },
    {
      icon: '🤝',
      title: 'Community Impact',
      description: 'Empowering students to create positive change in their communities'
    },
    {
      icon: '🛡️',
      title: 'Integrity & Ethics',
      description: 'Teaching responsible use of technology with moral foundations'
    }
  ];

  const team = [
    {
      name: "Pastor John Adebayo",
      role: "Founder & CEO",
      image: "👨‍💼",
      bio: "Visionary leader with 15+ years in tech ministry and youth development. PhD in Computer Science.",
      specialties: ["Leadership", "AI Ethics", "Youth Ministry"]
    },
    {
      name: "Dr. Sarah Okonkwo",
      role: "Head of AI Programs",
      image: "👩‍🏫",
      bio: "PhD in Machine Learning from MIT with extensive experience in AI education and research.",
      specialties: ["Machine Learning", "Neural Networks", "Data Science"]
    },
    {
      name: "Engr. Michael Uche",
      role: "Blockchain Director",
      image: "👨‍💻",
      bio: "Blockchain architect and smart contract developer with 10+ years experience at top tech companies.",
      specialties: ["Smart Contracts", "DeFi", "Web3 Development"]
    },
    {
      name: "Dr. Grace Adebayo",
      role: "Research Director",
      image: "👩‍🔬",
      bio: "Leading researcher in AI applications for social good with 20+ published papers.",
      specialties: ["AI Research", "Social Impact", "Innovation"]
    }
  ];

  const milestones = [
    { year: '2020', event: 'KYABA Founded', description: 'Started with a vision to transform tech education' },
    { year: '2021', event: 'First 100 Students', description: 'Reached our first major milestone' },
    { year: '2022', event: 'International Expansion', description: 'Extended programs to 10+ countries' },
    { year: '2023', event: '5000+ Graduates', description: 'Celebrated 5000 successful graduates' },
    { year: '2024', event: 'AI Research Lab', description: 'Launched cutting-edge research facility' }
  ];

  const tabContent = {
    mission: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          Kingdom Youth AI & Blockchain Academy (KYABA) exists to bridge the gap between 
          cutting-edge technology and Kingdom values. We believe that young people equipped 
          with both technical skills and spiritual foundation can transform their communities 
          and nations.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our faith-based approach ensures that students not only master AI and Blockchain 
          technologies but also understand how to use these tools for Kingdom impact and 
          positive change in society.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{value.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ),
    team: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Leadership Team</h3>
        <p className="text-gray-600 mb-8">
          Meet the experienced professionals committed to youth empowerment through technology
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                  <p className="text-purple-600 font-semibold mb-3">{member.role}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ),
    history: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Our Journey</h3>
        <p className="text-gray-600 mb-8">
          From humble beginnings to becoming a leading tech education platform
        </p>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-600 font-bold px-3 py-1 rounded-full text-sm">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{milestone.event}</h4>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">About KYABA</h1>
          <p className="text-xl opacity-90 mb-8">
            Empowering Kingdom Youth through Technology Education with Faith and Purpose
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-2 shadow-lg">
              {Object.keys(tabContent).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab)}
                  className="mx-1 capitalize"
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {tabContent[activeTab]}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of students who are already transforming their futures with KYABA
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              View Courses
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;