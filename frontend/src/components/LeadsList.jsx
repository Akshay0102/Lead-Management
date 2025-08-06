import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios.get('/leads')
      .then(res => setLeads(res.data))
      .catch(err => console.error('Error fetching leads:', err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">All Leads</h2>

      <ul className="space-y-4">
        {leads.map(lead => (
          <li
            key={lead._id}
            className="bg-gray-100 shadow-lg rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <p className="text-lg font-semibold text-gray-700">{lead.name}</p>
              <p className="text-sm text-gray-500">{lead.email}</p>
            </div>
            <Link
              to={`/followups/${lead._id}`}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
            >
              ➕ Add Follow-Up
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadsList;
