import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import CIcon from "@coreui/icons-react";
import Avatar from "react-avatar";
import Icon from "@mui/material/Icon";
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import Button from "@mui/material/Button";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";
import { QuickAccess } from "./QuickAccess";
import SimpleBottomNavigation from "./SimpleBottomNavigation";



function Cover() {
  const navigate=useNavigate();
  
  return (
    
    <>
    
    
      <div className="coverDiv body-custom grid grid-rows-2 md:grid-rows-1 p-0 m-0">
      <QuickAccess />
        <div>
          <div
            style={{ fontFamily: "Roboto" }}
            className="text-5xl text-center text-green-700 font-bold tracking-tighter"
          >
            It's Your Trip
          </div>

          <div
            style={{ fontFamily: "Open Sans " }}
            className="font text-center text-slate-800 "
          >
            Your place to take places
          </div>
        </div>
        

       <button
          
          style={{
            fontFamily: "Open Sans, sans-serif", // Removed !important and adjusted syntax
            
          }}
          className=" text-lg  shadow-xl shadow-gray-200 rounded-3xl mb-10 py-3 font-bold bg-blend-screen tracking-wide bg-[#FA4A0A] text-white"
          onClick={()=>{navigate("/Login")}}
        >
          GET STARTED
  </button>
  <SimpleBottomNavigation />
  
      </div>
    
    </>
  );
}

export default Cover;
