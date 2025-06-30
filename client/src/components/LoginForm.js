// Updated LoginForm.js
import React, { useState } from 'react';
import API from '../api';
import './ModalForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ close, switchToSignup }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close-btn" onClick={close}>&times;</button>
        <div className="text-center mb-4">
          <h4 className="fw-bold text-dark">Login</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input name="email" type="email" className="form-control" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="form-group mb-2">
            <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleChange} required />
          </div>
          {error && <div className="text-danger small mb-3">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <span className="small">Don't have an account? <button onClick={switchToSignup} className="btn btn-link p-0">Sign Up</button></span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;