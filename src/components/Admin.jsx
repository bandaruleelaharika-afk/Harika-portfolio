import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Upload, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [projectData, setProjectData] = useState({ title: '', description: '', githubUrl: '', liveUrl: '' });
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'portfolio'); // User's preset
    data.append('cloud_name', 'sj81e3pe'); // User's cloud name

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/sj81e3pe/image/upload', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image first");
      return;
    }

    setStatus('uploading');
    setUploadProgress('Uploading image to Cloudinary...');

    try {
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary();
      
      setUploadProgress('Saving project to Firebase...');
      
      // 2. Save to Firebase
      await addDoc(collection(db, "projects"), {
        ...projectData,
        imageUrl: imageUrl,
        createdAt: new Date()
      });

      setStatus('success');
      setProjectData({ title: '', description: '', githubUrl: '', liveUrl: '' });
      setImage(null);
      setTimeout(() => {
        setStatus('');
        setUploadProgress('');
      }, 3000);

    } catch (error) {
      console.error("Error in upload process:", error);
      setStatus('error');
      setUploadProgress('Error occurred during upload.');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2>Admin <span className="gradient-text">Dashboard</span></h2>
        <Link to="/" className="btn-outline">Back to Portfolio</Link>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ marginBottom: '2rem' }}>Add New Project</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Title</label>
            <input type="text" className="form-control" required 
              value={projectData.title} onChange={(e) => setProjectData({...projectData, title: e.target.value})} 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" required rows="3"
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
            <label>Project Image</label>
            <div style={{ border: '2px dashed var(--border-color)', padding: '2rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer' }}
                 onClick={() => document.getElementById('imageUpload').click()}>
              <input type="file" id="imageUpload" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
              {image ? (
                <p style={{ color: 'var(--accent-primary)' }}>{image.name}</p>
              ) : (
                <>
                  <Upload size={32} style={{ margin: '0 auto 1rem', color: 'var(--text-secondary)' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>Click to select an image for Cloudinary</p>
                </>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={status === 'uploading'}>
            {status === 'uploading' ? uploadProgress : <><Plus size={20} /> Add Project</>}
          </button>

          {status === 'success' && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={20} /> Project added successfully!
            </div>
          )}
          {status === 'error' && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', color: '#f87171', borderRadius: '8px' }}>
              {uploadProgress}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Admin;
