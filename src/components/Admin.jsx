import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Upload, Plus, Check, FileText, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  // Hero Data
  const [heroData, setHeroData] = useState({ name: '', title: '', description: '', profileImageUrl: '', resumePdfUrl: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [resumePdf, setResumePdf] = useState(null);
  const [heroStatus, setHeroStatus] = useState('');
  const [heroProgress, setHeroProgress] = useState('');

  // Project Data
  const [projectData, setProjectData] = useState({ title: '', description: '', githubUrl: '', liveUrl: '' });
  const [projectImage, setProjectImage] = useState(null);
  const [projectStatus, setProjectStatus] = useState('');
  const [projectProgress, setProjectProgress] = useState('');

  useEffect(() => {
    // Fetch existing Hero data
    const fetchHeroData = async () => {
      const docRef = doc(db, "portfolio_data", "hero");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHeroData(docSnap.data());
      }
    };
    fetchHeroData();
  }, []);

  const handleFileChange = (e, setter) => {
    if (e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'portfolio'); // User's preset
    data.append('cloud_name', 'sj81e3pe'); // User's cloud name

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/sj81e3pe/auto/upload', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setHeroStatus('uploading');
    
    try {
      let currentProfileUrl = heroData.profileImageUrl;
      let currentResumeUrl = heroData.resumePdfUrl;

      if (profileImage) {
        setHeroProgress('Uploading Profile Image to Cloudinary...');
        currentProfileUrl = await uploadToCloudinary(profileImage);
      }
      
      if (resumePdf) {
        setHeroProgress('Uploading Resume PDF to Cloudinary...');
        currentResumeUrl = await uploadToCloudinary(resumePdf);
      }
      
      setHeroProgress('Saving to Firebase...');
      const newHeroData = {
        ...heroData,
        profileImageUrl: currentProfileUrl,
        resumePdfUrl: currentResumeUrl
      };
      
      await setDoc(doc(db, "portfolio_data", "hero"), newHeroData);

      setHeroStatus('success');
      setHeroData(newHeroData);
      setProfileImage(null);
      setResumePdf(null);
      setTimeout(() => {
        setHeroStatus('');
        setHeroProgress('');
      }, 3000);

    } catch (error) {
      console.error("Error updating hero:", error);
      setHeroStatus('error');
      setHeroProgress('Error occurred during upload.');
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectImage) {
      alert("Please select a project image first");
      return;
    }

    setProjectStatus('uploading');
    setProjectProgress('Uploading project image to Cloudinary...');

    try {
      const imageUrl = await uploadToCloudinary(projectImage);
      
      setProjectProgress('Saving project to Firebase...');
      await addDoc(collection(db, "projects"), {
        ...projectData,
        imageUrl: imageUrl,
        createdAt: new Date()
      });

      setProjectStatus('success');
      setProjectData({ title: '', description: '', githubUrl: '', liveUrl: '' });
      setProjectImage(null);
      setTimeout(() => {
        setProjectStatus('');
        setProjectProgress('');
      }, 3000);

    } catch (error) {
      console.error("Error in upload process:", error);
      setProjectStatus('error');
      setProjectProgress('Error occurred during upload.');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="admin-header">
        <h2 className="section-title" style={{ margin: 0 }}><span className="gradient-text">Admin</span> Dashboard</h2>
        <Link to="/" className="btn-outline">View Portfolio</Link>
      </div>

      <div className="admin-grid">
        
        {/* HERO SECTION UPDATER */}
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '700' }}>Update Profile & Resume</h3>
          
          <form onSubmit={handleHeroSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-control" 
                value={heroData.name} onChange={(e) => setHeroData({...heroData, name: e.target.value})} 
              />
            </div>
            
            <div className="form-group">
              <label>Professional Title</label>
              <input type="text" className="form-control" 
                value={heroData.title} onChange={(e) => setHeroData({...heroData, title: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Hero Description</label>
              <textarea className="form-control" rows="4"
                value={heroData.description} onChange={(e) => setHeroData({...heroData, description: e.target.value})} 
              ></textarea>
            </div>

            <div className="form-group">
              <label>Profile Image (Cloudinary)</label>
              <div style={{ border: '2px dashed var(--border-color)', padding: '1.5rem', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', transition: 'border-color 0.3s' }}
                   onClick={() => document.getElementById('profileUpload').click()}>
                <input type="file" id="profileUpload" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFileChange(e, setProfileImage)} />
                {profileImage ? (
                  <p style={{ color: 'var(--accent-primary)' }}>{profileImage.name}</p>
                ) : heroData.profileImageUrl ? (
                  <p style={{ color: 'var(--text-secondary)' }}>Current image saved. Click to replace.</p>
                ) : (
                  <>
                    <ImageIcon size={32} style={{ margin: '0 auto 1rem', color: 'var(--text-secondary)' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>Upload Profile Image</p>
                  </>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Resume PDF (Cloudinary)</label>
              <div style={{ border: '2px dashed var(--border-color)', padding: '1.5rem', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', transition: 'border-color 0.3s' }}
                   onClick={() => document.getElementById('resumeUpload').click()}>
                <input type="file" id="resumeUpload" style={{ display: 'none' }} accept=".pdf" onChange={(e) => handleFileChange(e, setResumePdf)} />
                {resumePdf ? (
                  <p style={{ color: 'var(--accent-secondary)' }}>{resumePdf.name}</p>
                ) : heroData.resumePdfUrl ? (
                  <p style={{ color: 'var(--text-secondary)' }}>Current Resume saved. Click to replace.</p>
                ) : (
                  <>
                    <FileText size={32} style={{ margin: '0 auto 1rem', color: 'var(--text-secondary)' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>Upload Resume PDF</p>
                  </>
                )}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={heroStatus === 'uploading'}>
              {heroStatus === 'uploading' ? heroProgress : 'Save Profile & Resume'}
            </button>

            {heroStatus === 'success' && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={20} /> Profile updated successfully!
              </div>
            )}
            {heroStatus === 'error' && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', color: '#f87171', borderRadius: '8px' }}>
                {heroProgress}
              </div>
            )}
          </form>
        </div>


        {/* PROJECTS SECTION UPDATER */}
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '700' }}>Add New Project</h3>
          
          <form onSubmit={handleProjectSubmit}>
            <div className="form-group">
              <label>Project Title</label>
              <input type="text" className="form-control" required 
                value={projectData.title} onChange={(e) => setProjectData({...projectData, title: e.target.value})} 
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" required rows="4"
                value={projectData.description} onChange={(e) => setProjectData({...projectData, description: e.target.value})} 
              ></textarea>
            </div>

            <div className="form-group">
              <label>GitHub URL (Optional)</label>
              <input type="url" className="form-control" 
                value={projectData.githubUrl} onChange={(e) => setProjectData({...projectData, githubUrl: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Live URL (Optional)</label>
              <input type="url" className="form-control" 
                value={projectData.liveUrl} onChange={(e) => setProjectData({...projectData, liveUrl: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Project Image (Cloudinary)</label>
              <div style={{ border: '2px dashed var(--border-color)', padding: '1.5rem', textAlign: 'center', borderRadius: '12px', cursor: 'pointer' }}
                   onClick={() => document.getElementById('projectImageUpload').click()}>
                <input type="file" id="projectImageUpload" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFileChange(e, setProjectImage)} />
                {projectImage ? (
                  <p style={{ color: 'var(--accent-primary)' }}>{projectImage.name}</p>
                ) : (
                  <>
                    <Upload size={32} style={{ margin: '0 auto 1rem', color: 'var(--text-secondary)' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>Upload Project Image</p>
                  </>
                )}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={projectStatus === 'uploading'}>
              {projectStatus === 'uploading' ? projectProgress : <><Plus size={20} /> Add Project</>}
            </button>

            {projectStatus === 'success' && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={20} /> Project added successfully!
              </div>
            )}
            {projectStatus === 'error' && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', color: '#f87171', borderRadius: '8px' }}>
                {projectProgress}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Admin;
