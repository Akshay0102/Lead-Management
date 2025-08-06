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
      fetchFollowUps();
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Follow-Up</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">Note</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
            rows="3"
          />
        </div>

        {/* <div>
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Follow-Up
        </button>

        {message && (
          <p className="text-center text-green-600 font-medium mt-2">{message}</p>
        )}
      </form>

      <h3 className="text-xl font-semibold mb-4 text-center">Follow-up History</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Folow Up Date</th>
              <th className="py-2 px-4 border-b">Note</th>
              
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((fu) => (
              <tr key={fu._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-sm text-gray-500">
                  {new Date(fu.createdAt).toLocaleDateString()}
                </td>
                
                <td className="py-2 px-4 border-b">{fu.note}</td>
                
                
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(fu._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {followUps.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No follow-ups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Followup;
