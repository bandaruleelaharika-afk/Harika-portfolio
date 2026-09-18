import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Download, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      const docRef = doc(db, "portfolio_data", "hero");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHeroData(docSnap.data());
      } else {
        // Fallback default if nothing in Firebase yet
        setHeroData({
          name: "Leela Harika Bandaru",
          title: "Full Stack Web Developer",
          description: "A highly motivated individual looking for a responsible role in a reputable organization where I can utilize my skills in Java, Python, and Full Stack Web Development.",
          profileImageUrl: null,
          resumePdfUrl: null
        });
      }
      setLoading(false);
    };
    fetchHeroData();
  }, []);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="hero container">
      <div className="hero-grid">
        
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="gradient-text" style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Hello, I'm
          </motion.p>
          <motion.h1 variants={itemVariants}>
            {heroData.name || "Your Name"}
          </motion.h1>
          <motion.p variants={itemVariants}>
            {heroData.description || "Add a description in the Admin panel."}
          </motion.p>
          <motion.div variants={itemVariants} className="hero-buttons">
            <a href="#contact" className="btn-primary">
              <Mail size={20} /> Contact Me
            </a>
            {heroData.resumePdfUrl ? (
              <a href={heroData.resumePdfUrl} target="_blank" rel="noreferrer" className="btn-outline">
                <Download size={20} /> Download Resume
              </a>
            ) : (
              <span className="btn-outline" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                <Download size={20} /> Resume Not Uploaded
              </span>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <div className="hero-glow-1"></div>
          <div className="hero-glow-2"></div>
          <div className="hero-image-wrapper glass-panel">
            {heroData.profileImageUrl ? (
              <img src={heroData.profileImageUrl} alt={heroData.name} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                Upload an image in Admin Dashboard
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
