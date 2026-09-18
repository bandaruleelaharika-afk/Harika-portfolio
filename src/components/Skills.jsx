import React from 'react';
import { Code2, Users, Award, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="section container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        My <span className="gradient-text">Skills</span>
      </motion.h2>
      
      <motion.div 
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        <motion.div variants={cardVariants} className="skill-category glass-panel">
          <h3><Code2 className="gradient-text" /> Technical Skills</h3>
          <div className="skill-list">
            <div className="skill-item">
              <div className="skill-icon">J</div>
              <div style={{ fontWeight: 500 }}>Java</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">P</div>
              <div style={{ fontWeight: 500 }}>Python</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">H</div>
              <div style={{ fontWeight: 500 }}>HTML & CSS</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">M</div>
              <div style={{ fontWeight: 500 }}>MERN Stack</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="skill-category glass-panel">
          <h3><Users className="gradient-text" /> Behavioural Skills</h3>
          <div className="skill-list">
            <div className="skill-item">
              <div className="skill-icon">C</div>
              <div style={{ fontWeight: 500 }}>Good Communication</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">Q</div>
              <div style={{ fontWeight: 500 }}>Quick Learner</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon">T</div>
              <div style={{ fontWeight: 500 }}>Team Worker</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="skill-category glass-panel">
          <h3><Award className="gradient-text" /> Certifications</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-secondary)' }}>
            <li><strong style={{ color: 'white' }}>Employability Skill Programme</strong> - Mahindra pride (2023)</li>
            <li><strong style={{ color: 'white' }}>Career orientation program</strong> - Ikka Learning (2024)</li>
            <li><strong style={{ color: 'white' }}>HTML basics</strong> - Edu Pyramids</li>
            <li><strong style={{ color: 'white' }}>Python basics</strong> - Spring Board</li>
          </ul>
        </motion.div>

        <motion.div variants={cardVariants} className="skill-category glass-panel">
          <h3><Languages className="gradient-text" /> Languages</h3>
          <div className="skill-list">
            <div className="skill-item">
              <div className="skill-icon" style={{ background: 'rgba(112, 0, 255, 0.1)', color: 'var(--accent-secondary)' }}>E</div>
              <div style={{ fontWeight: 500 }}>English</div>
            </div>
            <div className="skill-item">
              <div className="skill-icon" style={{ background: 'rgba(112, 0, 255, 0.1)', color: 'var(--accent-secondary)' }}>T</div>
              <div style={{ fontWeight: 500 }}>Telugu</div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Skills;
