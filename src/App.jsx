import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './components/Admin';

const Portfolio = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      <footer style={{ textAlign: 'center', padding: '2rem 0', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} Leela Harika Bandaru. Built with React & Firebase.
        </p>
      </footer>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
