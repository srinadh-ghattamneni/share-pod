import React, { useState } from 'react';
import API from '../api';
import './ModalForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ close }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
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
          <div className="form-group mb-3">
            <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
