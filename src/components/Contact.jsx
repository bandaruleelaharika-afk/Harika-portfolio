import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: new Date()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="section container">
      <motion.h2 
        className="section-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        Get in <span className="gradient-text">Touch</span>
      </motion.h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 700 }}>Let's build something <span className="gradient-text">amazing</span> together.</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <Mail size={24} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Email</p>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>leelaharika85@gmail.com</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(112, 0, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)', border: '1px solid rgba(112, 0, 255, 0.2)' }}>
                <Phone size={24} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Phone</p>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>8309436254</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(255, 0, 85, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-tertiary)', border: '1px solid rgba(255, 0, 85, 0.2)' }}>
                <MapPin size={24} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Location</p>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Turangi, Kakinada</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="glass-panel" 
          style={{ padding: '3rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
          }}
        >
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required className="form-control" placeholder="Your message here..."></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.1rem' }} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : <><Send size={20} /> Send Message</>}
          </button>
          
          {status === 'success' && <p style={{ color: '#4ade80', marginTop: '1.5rem', textAlign: 'center', background: 'rgba(74, 222, 128, 0.1)', padding: '1rem', borderRadius: '8px' }}>Message sent successfully!</p>}
          {status === 'error' && <p style={{ color: '#f87171', marginTop: '1.5rem', textAlign: 'center', background: 'rgba(248, 113, 113, 0.1)', padding: '1rem', borderRadius: '8px' }}>Error sending message.</p>}
        </motion.form>

      </div>
    </section>
  );
};

export default Contact;
