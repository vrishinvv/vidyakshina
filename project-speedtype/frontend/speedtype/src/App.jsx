import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TypingTest from './components/SpeedType/SpeedType';
import StatsPage from './components/Stats/StatsPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* Protected Routes */}
        <Route
          path="/typing"
          element={user ? <TypingTest user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/stats"
          element={user ? <StatsPage user={user} /> : <Navigate to="/login" />}
        />

        {/* Default & Catch-all */}
        <Route path="/" element={<Navigate to={user ? "/typing" : "/login"} />} />
        <Route path="*" element={<Navigate to={user ? "/typing" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
