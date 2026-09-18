import React from 'react';
import { BookOpen, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section container">
      <h2 className="section-title"><span className="gradient-text">About</span> & Experience</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '1.5rem' }}>
            <BookOpen className="gradient-text" /> Education
          </h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">2024 - 2026</span>
                <h4 className="timeline-title">Master of Computer Applications (MCA)</h4>
                <p className="timeline-subtitle">Aditya University, Surampalem</p>
                <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>Percentage: 95%</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">2021 - 2024</span>
                <h4 className="timeline-title">BSC (MECS)</h4>
                <p className="timeline-subtitle">V.S. Lakshmi Degree College, Kakinada</p>
                <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>Percentage: 80%</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">2019 - 2021</span>
                <h4 className="timeline-title">Intermediate (MPC)</h4>
                <p className="timeline-subtitle">Sri Chaitanya Junior College, Kakinada</p>
                <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>Percentage: 85%</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '1.5rem' }}>
            <Briefcase className="gradient-text" /> Experience
          </h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">2025</span>
                <h4 className="timeline-title">Internship</h4>
                <p className="timeline-subtitle">Blackbuck Engineers Pvt.Ltd., Hyderabad</p>
                <p style={{ marginTop: '0.5rem' }}>Gained Proficiency In FULL STACK WEB DEVELOPMENT WITH MERN.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
