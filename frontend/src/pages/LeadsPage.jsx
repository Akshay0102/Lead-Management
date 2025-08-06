import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    source: ''
  });

  const navigate = useNavigate();

  // Fetch all leads
  const fetchLeads = async () => {
    try {
      const res = await axios.get('/leads');
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new lead
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/leads', formData);
      setFormData({ name: '', phone: '', source: '' });
      fetchLeads(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Lead</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Add Lead
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">Leads</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Source</th>
              <th className="py-2 px-4 border">Created</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{lead.name}</td>
                <td className="py-2 px-4 border">{lead.phone}</td>
                <td className="py-2 px-4 border">{lead.source}</td>
                <td className="py-2 px-4 border">
                  {new Date(lead.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => navigate(`/followups/${lead._id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Follow Up
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     <div class="flex justify-center mt-6">
  <a href="/leadslist" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300">
    View Leads List
  </a>
</div>


    </div>
  );
};

export default LeadsPage;
