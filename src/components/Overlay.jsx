import React from "react";

const Overlay = () => {
  return (
    <div
      style={{
        fontFamily: "Roboto",
        position: "fixed",
        top: "90%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Centers the overlay
        zIndex: 1000,
        padding: "10px 20px",
        backgroundColor: "rgba(219,225,227,0.8)", // Increased translucency
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <div
        style={{ fontFamily: "Roboto" }}
        className="text-5xl text-center text-green-600 font-bold tracking-tighter"
      >
        It's Your Trip
      </div>

      <div
        style={{ fontFamily: "Open Sans" }}
        className="font text-center text-slate-400"
      >
        Your place to take places
      </div>
    </div>
  );
};

export default Overlay;
