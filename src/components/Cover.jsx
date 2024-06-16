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
    
      <div className="coverDiv grid grid-rows-2 md:grid-rows-1 p-0 m-0">
      
        <div>
          <div
            style={{ fontFamily: "Roboto" }}
            className="text-5xl text-green-700 font-bold tracking-tighter"
          >
            It's Your Trip
          </div>

          <div
            style={{ fontFamily: "Open Sans " }}
            className="font text-slate-800 "
          >
            Your place to take places
          </div>
        </div>
        

       <Button
          endIcon={<ArrowCircleRightIcon />}
          variant="text"
          style={{ fontFamily: "Open Sans", color: "#FA4A0C" }}
          className=" text-xl mb-10 font-bold border-2"
          onClick={()=>{navigate("/Login")}}
        >
          Get Started
  </Button>
  <SimpleBottomNavigation />
  
      </div>
    
    </>
  );
}

export default Cover;
