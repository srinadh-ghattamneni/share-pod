import React, { useState } from 'react';
import './LandingPage.css';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleFakeClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="landing-container">
      <header className="landing-header d-flex justify-content-between align-items-center px-4 py-3">
        <h2 className="text-light">Share Pod</h2>
        <div>
          <button className="btn btn-outline-light me-2" onClick={() => setShowLogin(true)}>Login</button>
          <button className="btn btn-warning" onClick={() => setShowSignup(true)}>Sign Up</button>
        </div>
      </header>

      <section className="hero bg-dark text-light text-center py-5">
        <h1 className="display-5">Simplified File Sharing for Everyone</h1>
        <p className="lead">Upload, share, and access files with ease</p>
        <button className="btn btn-warning btn-lg mt-3" onClick={handleFakeClick}>Get Started</button>
      </section>

      <section className="features container text-center py-5">
        <h2>What makes Share Pod special?</h2>
        <div className="row mt-4">
          <div className="col-md-4"><i className="fas fa-upload fa-2x mb-2"></i><h5>Easy File Uploads</h5><p>Upload your files quickly and easily.</p></div>
          <div className="col-md-4"><i className="fas fa-shield-alt fa-2x mb-2"></i><h5>Secure Sharing</h5><p>Share files securely with anyone.</p></div>
          <div className="col-md-4"><i className="fas fa-globe fa-2x mb-2"></i><h5>Quick Access</h5><p>Access your files from anywhere.</p></div>
        </div>
      </section>

      <section className="how-it-works bg-light py-5">
        <div className="container text-center">
          <h2>How Share Pod works</h2>
          <p>Upload your file → Get your shareable link → Share with anyone</p>
          <button className="btn btn-primary mt-3" onClick={handleFakeClick}>Upload Your First File</button>
        </div>
      </section>

      <footer className="bg-dark text-center text-light py-4 mt-5">
        <p>© 2024 Share Pod. All rights reserved.</p>
      </footer>

     {showLogin && <LoginForm close={() => setShowLogin(false)} />}
{showSignup && <SignupForm close={() => setShowSignup(false)} />}

    </div>
  );
}

export default LandingPage;
