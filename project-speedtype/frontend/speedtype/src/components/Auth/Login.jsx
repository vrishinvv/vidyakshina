import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

function Login({ setUser }) {
  // Input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Called when user clicks the Login button
  async function handleLogin() {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username: username,
        password: password
      });

      // Save user data in parent component
      setUser(response.data.user);

      // Go to typing test page
      navigate('/typing');
    } catch (error) {
      // Show error message from backend or fallback
      const msg = error.response?.data?.error || 'Login failed';
      alert(msg);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

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

        <button onClick={handleLogin}>Login</button>

        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

