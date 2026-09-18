import React from 'react';
import { BookOpen, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="section container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <span className="gradient-text">About</span> & Experience
      </motion.h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', fontSize: '1.8rem', fontWeight: 700 }}>
            <BookOpen className="gradient-text" size={32} /> Education
          </h3>
          <div className="timeline">
            
            <motion.div variants={itemVariants} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">2024 - 2026</span>
                <h4 className="timeline-title">Master of Computer Applications (MCA)</h4>
                <p className="timeline-subtitle">Aditya University, Surampalem</p>
                <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'rgba(0,240,255,0.1)', display: 'inline-block', borderRadius: '8px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  Percentage: 95%
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">2021 - 2024</span>
                <h4 className="timeline-title">BSC (MECS)</h4>
                <p className="timeline-subtitle">V.S. Lakshmi Degree College, Kakinada</p>
                <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'rgba(0,240,255,0.1)', display: 'inline-block', borderRadius: '8px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  Percentage: 80%
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">2019 - 2021</span>
                <h4 className="timeline-title">Intermediate (MPC)</h4>
                <p className="timeline-subtitle">Sri Chaitanya Junior College, Kakinada</p>
                <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'rgba(0,240,255,0.1)', display: 'inline-block', borderRadius: '8px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  Percentage: 85%
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', fontSize: '1.8rem', fontWeight: 700 }}>
            <Briefcase className="gradient-text" size={32} /> Experience
          </h3>
          <div className="timeline">
            
            <motion.div variants={itemVariants} className="timeline-item">
              <div className="timeline-dot" style={{ background: 'var(--accent-secondary)', boxShadow: '0 0 20px var(--accent-secondary)' }}></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date" style={{ color: 'var(--accent-secondary)' }}>2025</span>
                <h4 className="timeline-title">Internship</h4>
                <p className="timeline-subtitle" style={{ marginBottom: '1rem' }}>Blackbuck Engineers Pvt.Ltd., Hyderabad</p>
                <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  Gained Proficiency In <span style={{ color: 'white', fontWeight: 600 }}>FULL STACK WEB DEVELOPMENT WITH MERN</span>.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
