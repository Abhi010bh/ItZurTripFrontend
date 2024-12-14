import React, { useEffect, useState } from 'react';
import BookingStats from './BookingStats';
import BookingForm from './BookingForm';
import Overlay from '../Overlay';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../provider/authProvider";

const BookingApp = () => {
  const [isAdding, setIsAdding] = useState(false); // Toggle between stats and add form
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const location = useLocation();
  const tripId = location.state?.trip?._id;

  useEffect(() => {
    console.log(`In Booking App ${tripId}`);
  }, [tripId]);

  const toggleForm = () => {
    setIsLoading(true);
    setIsAdding(!isAdding);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading state transition
  };

  return (
    <>
    <div className="booking-app p-6 rounded-lg shadow-lg">
    <h1 className="text-4xl font-extrabold text-[white] mb-6 text-center"
  style={{ fontWeight: 700 }}>
        {isAdding ? 'New Booking' : 'Your Booking Stats'}
      </h1>

      {/* Adjusted button container */}
      <div className="flex justify-between items-center mb-6">
        <div className="w-full">
          <button
            onClick={toggleForm}
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg focus:outline-none w-full sm:w-auto mx-auto"
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              `${isAdding ? 'View Stats' : 'Add Booking'}`
            )}
          </button>
        </div>
      </div>

      {/* Conditionally render based on isAdding state */}
      {isAdding ? (
        <BookingForm tripId={tripId} onClose={() => setIsAdding(false)} />
      ) : (
        <BookingStats tripId={tripId} />
      )}
    </div>
    <Overlay />
    </>
  );
};

export default BookingApp;
