import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  DirectionsCar as DirectionsCarIcon,
  NotificationsActive as NotificationsActiveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const BookingStats = ({ tripId }) => {
  const [bookings, setBookings] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/Booking/bookings/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
      setError(null);
      setNotification({ type: "success", message: "Bookings loaded successfully!" });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again later.");
      setNotification({ type: "error", message: "Error loading bookings. Check your connection." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [tripId]);

  const countByType = (type) => bookings.filter((booking) => booking.type === type).length;
  const countByStatus = (status) => bookings.filter((booking) => booking.status === status).length;

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toString() !== "Invalid Date" ? formattedDate.toLocaleString() : "Invalid Date";
  };

  const closeNotification = () => setNotification(null);

  return (
    <div className="booking-stats container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Booking Stats</h2>

      {/* Notification Bar */}
      {notification && (
        <div
          className={`notification mb-4 p-4 rounded-md text-white flex justify-between items-center shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <span className="flex items-center gap-2">
            <NotificationsActiveIcon />
            {notification.message}
          </span>
          <button
            onClick={closeNotification}
            className="text-xl font-bold hover:text-gray-100 focus:outline-none"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center text-lg text-gray-500">Loading bookings...</div>
      ) : error ? (
        <div className="text-center text-red-600 mt-4">{error}</div>
      ) : (
        <>
          {/* Booking Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="stat-card bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FlightIcon /> By Type
              </h3>
              <p>Flights: {countByType("flight")}</p>
              <p>Accommodations: {countByType("accommodation")}</p>
              <p>Transportations: {countByType("transportation")}</p>
            </div>
            <div className="stat-card bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircleIcon /> By Status
              </h3>
              <p>
                <CheckCircleIcon fontSize="small" className="mr-2 text-green-200" />
                Confirmed: {countByStatus("confirmed")}
              </p>
              <p>
                <PendingIcon fontSize="small" className="mr-2 text-yellow-200" />
                Pending: {countByStatus("pending")}
              </p>
              <p>
                <CancelIcon fontSize="small" className="mr-2 text-red-200" />
                Canceled: {countByStatus("canceled")}
              </p>
            </div>
          </div>

          {/* Booking Details */}
          {bookings.length > 0 ? (
            <div className="booking-details">
              <h3 className="text-2xl font-semibold mb-6">Booking Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking, index) => (
                  <div
                    key={index}
                    className="booking-card bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-all border-l-4 border-blue-500"
                  >
                    <h4 className="font-bold text-xl mb-3 text-gray-800 flex items-center gap-2">
                      {booking.type === "flight" && <FlightIcon />}
                      {booking.type === "accommodation" && <HotelIcon />}
                      {booking.type === "transportation" && <DirectionsCarIcon />}
                      {booking.type.toUpperCase()}
                    </h4>
                    <p className="mb-2">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          booking.status === "confirmed"
                            ? "text-green-500"
                            : booking.status === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </p>
                    {booking.type === "flight" && (
                      <div>
                        <p>Flight: {booking.details.flightNumber || "N/A"}</p>
                        <p>Departure: {formatDate(booking.details.departureTime)}</p>
                        <p>Arrival: {formatDate(booking.details.arrivalTime)}</p>
                      </div>
                    )}
                    {booking.type === "accommodation" && (
                      <div>
                        <p>Hotel: {booking.details.hotelName || "N/A"}</p>
                        <p>Check-in: {formatDate(booking.details.checkInDate)}</p>
                        <p>Check-out: {formatDate(booking.details.checkOutDate)}</p>
                      </div>
                    )}
                    {booking.type === "transportation" && (
                      <div>
                        <p>Provider: {booking.details.provider || "N/A"}</p>
                        <p>Pick-up: {booking.details.pickUpLocation || "N/A"}</p>
                        <p>Drop-off: {booking.details.dropOffLocation || "N/A"}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">No bookings available for this trip.</p>
          )}
        </>
      )}
    </div>
  );
};

export default BookingStats;
