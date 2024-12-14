import React from "react";
import { QuickAccess } from "./QuickAccess";
import { useNavigate } from "react-router-dom";

function ProfileInterface() {
  const navigate = useNavigate();

  return (
    <div 
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/IUTBackgrnd.jpg')" }}  // Add the image path here
    >
      {/* Blurry Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-20 z-0 backdrop-blur-lg"></div>

      {/* Quick Access Component */}
      <QuickAccess />

      {/* Main Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-16 px-6">
        {/* Plan A New Trip */}
        <div
          className="bg-white bg-opacity-80 hover:bg-opacity-90 transition-all rounded-3xl p-10 w-full max-w-lg cursor-pointer text-center shadow-2xl"
          onClick={() => navigate("/Trip")}
        >
          <h2 className="text-5xl font-semibold text-[#008C44] mb-4 font-sans tracking-wide">PLAN A NEW TRIP</h2>
          <p className="text-xl text-gray-800 font-light mb-4">Plan your next adventure with us</p>
          <hr className="border-t border-gray-300 opacity-30 w-1/3 mx-auto my-4" />
        </div>

        {/* Dive Into Existing Trip */}
        <div
          className="bg-white bg-opacity-80 hover:bg-opacity-90 transition-all rounded-3xl p-10 w-full max-w-lg cursor-pointer text-center shadow-2xl"
          onClick={() => navigate("/TripProfile")}
        >
          <h2 className="text-5xl font-semibold text-[#008C44] mb-4 font-sans tracking-wide">DIVE INTO EXISTING</h2>
          <p className="text-xl text-gray-800 font-light mb-4">Already have a trip planned?</p>
          <hr className="border-t border-gray-300 opacity-30 w-1/3 mx-auto my-4" />
        </div>

        {/* Visit Your Profile */}
        <div
          className="bg-white bg-opacity-80 hover:bg-opacity-90 transition-all rounded-3xl p-10 w-full max-w-lg cursor-pointer text-center shadow-2xl"
          onClick={() => navigate("/Profile")}
        >
          <h2 className="text-5xl font-semibold text-[#008C44] mb-4 font-sans tracking-wide">VISIT YOUR PROFILE</h2>
          <p className="text-xl text-gray-800 font-light mb-4">Discover more about yourself</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInterface;
