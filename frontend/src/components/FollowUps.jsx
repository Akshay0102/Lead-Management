import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios'; // Custom axios

const Followup = () => {
  const { leadId } = useParams();
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [followUps, setFollowUps] = useState([]);

  const fetchFollowUps = async () => {
    try {
      const res = await axios.get(`/followups/${leadId}`);
      setFollowUps(res.data);
    } catch (error) {
      console.error('Error fetching follow-ups:', error);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, [leadId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/followups`, {
        lead: leadId,
        note,
        date,
      });

      setMessage('Follow-up added successfully!');
      setNote('');
      setDate('');
      fetchFollowUps(); // Refresh the list
    } catch (error) {
      console.error('Error adding follow-up:', error);
      setMessage('Failed to add follow-up.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/followups/${id}`);
      fetchFollowUps();
    } catch (error) {
      console.error('Error deleting follow-up:', error);
    }
  };

  return (
    <div>
      <h2>Add Follow-Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Note:</label><br />
          <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label><br />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">Add Follow-Up</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Follow-up History</h3>
      <ul>
        {followUps.map((fu) => (
          <li key={fu._id}>
            <strong>{fu.date}</strong>: {fu.note}
            <button onClick={() => handleDelete(fu._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followup;
