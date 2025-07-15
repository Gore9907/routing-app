import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OptimizerPage from './components/OptimizerPage';
import LoginPage from './components/LoginPage';
import HistoryPage from './components/HistoryPage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import React from 'react';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
            !user ? <Navigate to="/login" /> : <OptimizerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/history"
          element={
            user && !user.isAnonymous ? <HistoryPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;