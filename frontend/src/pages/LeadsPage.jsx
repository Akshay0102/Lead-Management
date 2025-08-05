import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    source: ''
  });

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
    <div style={{ padding: '20px' }}>
      <h2>Add New Lead</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        &nbsp;
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        &nbsp;
        <input
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
        />
        &nbsp;
        <button type="submit">Add Lead</button>
      </form>

      <h2 style={{ marginTop: '30px' }}>Leads</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.source}</td>
              <td>{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsPage;
