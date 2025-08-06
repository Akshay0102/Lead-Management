import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeadsList from './components/LeadsList';
import Followup from './components/FollowUps';
import LeadsPage from './pages/LeadsPage';




const App = () => {
  return (
    <Router>
      <div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-red-700 my-6">
  Lead Management System
</h1>

        <Routes>
          <Route path="/" element={<LeadsPage />} />
          <Route path="/followups/:leadId" element={<Followup />} />
          <Route path="/leadslist" element={<LeadsList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
