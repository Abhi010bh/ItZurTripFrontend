import React, { useState, useEffect } from "react";

const CircleCountdownTimer = ({ targetDate }) => {
  const [daysLeft, setDaysLeft] = useState(calculateDaysLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft(calculateDaysLeft(targetDate));
    }, 1000 * 60 * 60 * 24); // Update once a day

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [targetDate]);

  const totalDays = calculateTotalDays(targetDate); // Total days from now to target
  const progress = Math.max(0, (1 - daysLeft / totalDays) * 100); // Calculate progress

  return (
    <div style={{ textAlign: "center", margin: "20px", fontFamily: "'Open Sans', sans-serif" }}>
      <svg width="150" height="150" viewBox="0 0 36 36">
        {/* Background Circle */}
        <circle
          cx="18"
          cy="18"
          r="15.91549431"
          fill="none"
          stroke="#eee"
          strokeWidth="2"
        />
        {/* Progress Circle */}
        <circle
          cx="18"
          cy="18"
          r="15.91549431"
          fill="none"
          stroke="#4caf50"
          strokeWidth="2"
          strokeDasharray={`${progress}, 100`}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
        {/* Text */}
        <text
          x="18"
          y="18"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="5" // Slightly larger font size
          fontWeight="bold" // Bold font
          fill="#333"
        >
          {daysLeft > 0 ? `${daysLeft} Days` : "Trip Started"}
        </text>
      </svg>
      <div style={{ marginTop: "10px", fontSize: "16px", color: "#555" }}>
        {daysLeft > 0 ? `Hurry up! Only ${daysLeft} days left!` : "Bon voyage!"}
      </div>
    </div>
  );
};

// Utility functions
const calculateDaysLeft = (targetDate) => {
  const now = new Date().getTime();
  const difference = new Date(targetDate).getTime() - now;

  if (difference <= 0) return 0; // Trip has started
  return Math.ceil(difference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

const calculateTotalDays = (targetDate) => {
  const now = new Date();
  const endDate = new Date(targetDate);
  const diffTime = Math.abs(endDate - now);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default CircleCountdownTimer;
