import React from 'react';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeatureCards />
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our amazing students who are transforming their lives through technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emmanuel Okafor",
                role: "AI Developer",
                image: "👨‍💻",
                quote: "KYABA transformed my understanding of AI. Now I'm building solutions that impact my community!"
              },
              {
                name: "Grace Adebayo",
                role: "Blockchain Engineer",
                image: "👩‍💻",
                quote: "The faith-based approach made learning blockchain concepts so much more meaningful and purposeful."
              },
              {
                name: "David Uche",
                role: "Full-Stack Developer",
                image: "👨‍🎓",
                quote: "From zero to hero! KYABA's practical approach helped me land my dream job in tech."
              }
            ].map((testimonial, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="text-6xl mb-4">{testimonial.image}</div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-primary-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Kingdom youth who are already building their tech careers with purpose and faith.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/courses" className="btn-primary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-100">
              Start Learning Today
            </a>
            <a href="/contact" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white/10">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;