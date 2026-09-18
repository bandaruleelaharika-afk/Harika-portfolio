import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

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

  return (
    <section id="contact" className="section container">
      <h2 className="section-title">Get in <span className="gradient-text">Touch</span></h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Contact Information</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <Mail />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Email</p>
                <p style={{ fontWeight: 500 }}>leelaharika85@gmail.com</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <Phone />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Phone</p>
                <p style={{ fontWeight: 500 }}>8309436254</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <MapPin />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Location</p>
                <p style={{ fontWeight: 500 }}>Turangi, Kakinada</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem' }}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required className="form-control"></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : <><Send size={20} /> Send Message</>}
          </button>
          
          {status === 'success' && <p style={{ color: '#4ade80', marginTop: '1rem', textAlign: 'center' }}>Message sent successfully!</p>}
          {status === 'error' && <p style={{ color: '#f87171', marginTop: '1rem', textAlign: 'center' }}>Error sending message.</p>}
        </form>

      </div>
    </section>
  );
};

export default Contact;
