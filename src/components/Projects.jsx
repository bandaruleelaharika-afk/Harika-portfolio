import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectData = [];
        querySnapshot.forEach((doc) => {
          projectData.push({ id: doc.id, ...doc.data() });
        });
        
        // If no projects in Firebase yet, use default from resume
        if (projectData.length === 0) {
          setProjects([{
            id: '1',
            title: 'Crime Detection Using Multi-Layer Perceptron',
            description: 'To Identify and Analyse criminal activities from social media platforms using Multi-Layer Perceptron in Social Media Platforms.',
            imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
          }]);
        } else {
          setProjects(projectData);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section container">
      <h2 className="section-title">My <span className="gradient-text">Projects</span></h2>
      
      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading projects...</div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card glass-panel">
              <img 
                src={project.imageUrl || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop'} 
                alt={project.title} 
                className="project-image"
              />
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
