import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../provider/authProvider";
import { useLocation } from 'react-router-dom';

const BookingForm = ({ tripId, editBooking, onClose }) => {
  const [type, setType] = useState(editBooking?.type || '');
  const [details, setDetails] = useState(editBooking?.details || {});
  const [status, setStatus] = useState(editBooking?.status || 'confirmed');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleDetailsChange = (field, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [type]: { ...prevDetails[type], [field]: value },
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = { tripId, type, details: details[type], status };
      if (editBooking) {
        await axios.put(`http://localhost:8000/Booking/bookings/${editBooking._id}`, payload, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:8000/Booking/bookings', payload, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
      }
      alert('Booking saved successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving booking:', error);
      setError('Failed to save booking. Please try again.');
    }
  };

  const renderDetailsFields = () => {
    if (type === 'flight') {
      return (
        <>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Flight Number</label>
            <input
              type="text"
              value={details[type]?.flightNumber || ''}
              onChange={(e) => handleDetailsChange('flightNumber', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Airline</label>
            <input
              type="text"
              value={details[type]?.airline || ''}
              onChange={(e) => handleDetailsChange('airline', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Departure Time</label>
            <input
              type="datetime-local"
              value={details[type]?.departureTime || ''}
              onChange={(e) => handleDetailsChange('departureTime', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Arrival Time</label>
            <input
              type="datetime-local"
              value={details[type]?.arrivalTime || ''}
              onChange={(e) => handleDetailsChange('arrivalTime', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </>
      );
    } else if (type === 'accommodation') {
      return (
        <>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Hotel Name</label>
            <input
              type="text"
              value={details[type]?.hotelName || ''}
              onChange={(e) => handleDetailsChange('hotelName', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Check-In Date</label>
            <input
              type="date"
              value={details[type]?.checkInDate || ''}
              onChange={(e) => handleDetailsChange('checkInDate', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Check-Out Date</label>
            <input
              type="date"
              value={details[type]?.checkOutDate || ''}
              onChange={(e) => handleDetailsChange('checkOutDate', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Room Type</label>
            <input
              type="text"
              value={details[type]?.roomType || ''}
              onChange={(e) => handleDetailsChange('roomType', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </>
      );
    } else if (type === 'transportation') {
      return (
        <>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Provider</label>
            <input
              type="text"
              value={details[type]?.provider || ''}
              onChange={(e) => handleDetailsChange('provider', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Pick-Up Location</label>
            <input
              type="text"
              value={details[type]?.pickUpLocation || ''}
              onChange={(e) => handleDetailsChange('pickUpLocation', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Drop-Off Location</label>
            <input
              type="text"
              value={details[type]?.dropOffLocation || ''}
              onChange={(e) => handleDetailsChange('dropOffLocation', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800">Transport Type</label>
            <input
              type="text"
              value={details[type]?.transportType || ''}
              onChange={(e) => handleDetailsChange('transportType', e.target.value)}
              className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </>
      );
    }
    return <p className="text-gray-500 text-lg">Select a booking type to enter details.</p>;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">{editBooking ? 'Edit Booking' : 'Add Booking'}</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-800">Booking Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Type</option>
          <option value="flight">Flight</option>
          <option value="accommodation">Accommodation</option>
          <option value="transportation">Transportation</option>
        </select>
      </div>

      {renderDetailsFields()}

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-6 py-2 rounded-md transition duration-300 transform hover:scale-105"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md transition duration-300 transform hover:scale-105"
        >
          {editBooking ? 'Update Booking' : 'Save Booking'}
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
