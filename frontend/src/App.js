import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeadsList from './components/LeadsList';
import Followup from './components/FollowUps';


const App = () => {
  return (
    <Router>
      <div>
        <h1>Lead Management System</h1>
        <Routes>
          <Route path="/" element={<LeadsList />} />
          <Route path="/followups/:leadId" element={<Followup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
