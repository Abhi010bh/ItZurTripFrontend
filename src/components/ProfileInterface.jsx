import React from "react";
import { QuickAccess } from "./QuickAccess";
import { useNavigate } from "react-router-dom";

function ProfileInterface() {

  
  const navigate=useNavigate()
  
  return (
    <>
      <QuickAccess />
      <div className="h-screen PI backdrop-blur-sm">
        <div className="blurry rounded-bl-3xl md:ml-48 h-screen items-center justify-center grid grid-rows-3 gap-y-8">
          <div className="flex flex-col items-start">
            <a className="no-underline text-white" onClick={()=>{navigate('/Trip')}}>
              <h1 style={{ fontFamily: "Helvetica" }} className="font-semibold md:text-7xl text-4xl">
                PLAN A NEW TRIP
              </h1>
              <span style={{ fontFamily: "Roboto" }} className="text-3xl font-light">
                Plan Your next trip with us
              </span>
            </a>
            <hr className="w-full border-t border-gray-300 my-4" />
          </div>

          <div className="flex flex-col items-start">
            <a className="no-underline text-white" onClick={()=>{navigate('/TripProfile')}}>
              <h1 style={{ fontFamily: "Helvetica" }} className="md:text-7xl text-5xl">
                DIVE INTO EXISTING
              </h1>
              <span style={{ fontFamily: "Roboto" }} className="text-3xl font-light">
                Have one already?
              </span>
            </a>
            <hr className="w-full border-t border-gray-300 my-4" />
          </div>

          <div className="flex flex-col items-center">
            <a className="no-underline text-white" href="#">
              <h1 style={{ fontFamily: "Helvetica" }} className="md:text-7xl text-5xl">
                VISIT YOUR PROFILE
              </h1>
              <span style={{ fontFamily: "Roboto" }} className="text-3xl font-light">
                Know About you
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileInterface;
