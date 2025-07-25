import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

function Login({ setUser }) {
  // Form input states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login button click
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      setUser(res.data.user);        // Store user in parent
      navigate('/typing');           // Go to typing test on success
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
