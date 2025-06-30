import React, { useState } from 'react';
import './LandingPage.css';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaShieldAlt, FaGlobe } from 'react-icons/fa';

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleFakeClick = () => setShowLogin(true);

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div className="landing-container">
      <header className="landing-header d-flex justify-content-between align-items-center px-4 py-3">
        <h2 className="text-white fw-bold">📁 Share Pod</h2>
        <div>
          <button className="btn btn-outline-light me-2" onClick={openLogin}>Login</button>
          <button className="btn btn-warning" onClick={openSignup}>Sign Up</button>
        </div>
      </header>

      <section className="hero text-center text-light py-5">
        <h1 className="display-4 fw-bold">Simplified File Sharing for Everyone</h1>
        <p className="lead">Upload, share, and access files instantly</p>
        <button className="btn btn-warning btn-lg mt-3" onClick={handleFakeClick}>Get Started</button>
      </section>

      <section className="features container text-center py-5">
        <h2 className="mb-4 fw-bold">What makes Share Pod special?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <FaCloudUploadAlt className="feature-icon mb-3" />
            <h5 className="fw-semibold">Easy File Uploads</h5>
            <p>Drag and drop or browse files. It's that simple.</p>
          </div>
          <div className="col-md-4">
            <FaShieldAlt className="feature-icon mb-3" />
            <h5 className="fw-semibold">Secure Sharing</h5>
            <p>Your files are encrypted and expire after 24h.</p>
          </div>
          <div className="col-md-4">
            <FaGlobe className="feature-icon mb-3" />
            <h5 className="fw-semibold">Access Anywhere</h5>
            <p>Links work globally — share with anyone, anytime.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold">How It Works</h2>
          <p className="mt-2">1. Upload your file → 2. Copy the link → 3. Share</p>
          <button className="btn btn-primary mt-3" onClick={handleFakeClick}>Upload Your First File</button>
        </div>
      </section>

      <footer className="bg-dark text-center text-light py-4 mt-auto">
        <p className="mb-0">© 2025 Share Pod. Built with ❤️ using MERN Stack</p>
      </footer>

      {showLogin && <LoginForm close={() => setShowLogin(false)} switchToSignup={openSignup} />}
      {showSignup && <SignupForm close={() => setShowSignup(false)} switchToLogin={openLogin} />}
    </div>
  );
}

export default LandingPage;
