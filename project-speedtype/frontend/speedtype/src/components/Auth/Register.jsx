import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

function Register({ setUser }) {
  // Form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Runs when the Register button is clicked
  async function handleRegister() {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username: username,
        password: password
      });

      // Save logged-in user data
      setUser(response.data.user);

      // Redirect to typing page
      navigate('/typing');
    } catch (error) {
      const msg = error.response?.data?.error || 'Registration failed';
      alert(msg);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
