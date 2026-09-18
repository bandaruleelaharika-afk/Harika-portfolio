import React from 'react';
import { Code2, Users, Award, Languages } from 'lucide-react';

const Skills = () => {
  return (
    <section id="skills" className="section container">
      <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
      
      <div className="skills-grid">
        <div className="skill-category glass-panel">
          <h3><Code2 /> Technical Skills</h3>
          <div className="skill-list">
            <div className="skill-item">
              <div className="skill-icon">J</div>
              <div>Java</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">P</div>
              <div>Python</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">H</div>
              <div>HTML & CSS</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">M</div>
              <div>MERN Stack</div>
            </div>
          </div>
        </div>

        <div className="skill-category glass-panel">
          <h3><Users /> Behavioural Skills</h3>
          <div className="skill-list">
            <div className="skill-item">
              <div className="skill-icon">C</div>
              <div>Good Communication</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">Q</div>
              <div>Quick Learner</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">T</div>
              <div>Team Worker</div>
            </div>
          </div>
        </div>

        <div className="skill-category glass-panel">
          <h3><Award /> Certifications</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>Employability Skill Programme, Mahindra pride (2023)</li>
            <li>Career orientation program, Ikka Learning (2024)</li>
            <li>HTML basics from Edu Pyramids</li>
            <li>Python basics by Spring Board</li>
          </ul>
        </div>

        <div className="skill-category glass-panel">
          <h3><Languages /> Languages</h3>
          <div className="skill-list">
            <div className="skill-item">
              <div className="skill-icon">E</div>
              <div>English</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">T</div>
              <div>Telugu</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
