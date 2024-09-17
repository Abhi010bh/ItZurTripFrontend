import React, { useState } from "react";
import { FormComponent } from "./FormComponent";
import { useNavigate } from "react-router-dom";
import { QuickAccess } from "./QuickAccess";
import SignUp from "./SignUp";



function SignUpForm() {

  


  return (
    <>
    <QuickAccess />
    
<div className=" w-screen h-screen grid grid-rows-3 md:grid-cols-3 loginDiv  lg:bg-white bg-slate-200">
        <div className="md:h-screen  flex flex-row rounded-b-3xl shadow-2xl loginUpper  items-center justify-center">
          <div>
            <div
              style={{ fontFamily: "Roboto" }}
              className="text-5xl text-emerald-700 font-bold tracking-tighter"
            >
              
              It's Your Trip
            </div>
          </div>
        </div>
        <div className="relative  row-span-2 md:col-span-2 mt-0 md:mt-20">
        <SignUp />
       </div>
              

              
      </div>
    </>
  );
}

export default SignUpForm;
