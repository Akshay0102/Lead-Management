import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // ← Use axios instance
import { Link } from 'react-router-dom';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios.get('/leads') // No need to include full URL
      .then(res => setLeads(res.data))
      .catch(err => console.error('Error fetching leads:', err));
  }, []);

  return (
    <div>
      <h2>All Leads</h2>
      <ul>
        {leads.map(lead => (
          <li key={lead._id}>
            {lead.name} - {lead.email}
            <Link to={`/followups/${lead._id}`}> ➕ Add Follow-Up</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadsList;
