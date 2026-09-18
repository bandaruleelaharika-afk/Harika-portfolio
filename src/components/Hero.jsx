import React from 'react';
import { Download, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero container">
      <div className="hero-grid">
        <div className="hero-content animate-fade-in">
          <p className="gradient-text" style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 500 }}>
            Hello, I'm
          </p>
          <h1>Leela Harika Bandaru</h1>
          <p>
            A highly motivated individual looking for a responsible role in a reputable organization where I can utilize my skills in Java, Python, and Full Stack Web Development.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              <Mail size={20} /> Contact Me
            </a>
            <a href="#" className="btn-outline">
              <Download size={20} /> Resume
            </a>
          </div>
        </div>
        <div className="hero-image-container animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="glow-effect"></div>
          <div className="hero-image-wrapper">
            <img 
              src="https://res.cloudinary.com/sj81e3pe/image/upload/v1715000000/portfolio/profile.jpg" 
              alt="Leela Harika Bandaru" 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
