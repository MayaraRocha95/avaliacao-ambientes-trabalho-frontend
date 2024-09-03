import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEvaluationPage from './pages/CreateEvaluationPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-evaluation" element={<CreateEvaluationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
