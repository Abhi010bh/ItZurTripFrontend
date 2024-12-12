import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; 
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { FormControl } from '@mui/material';
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../provider/authProvider";

export const FormComponent = ()=>{


  const navigate = useNavigate()

  const [User,setUser]=useState({
    emailID:"",
    password:""
  })

  const {setToken,setUserName,setUserID}= useAuth()
  
  
  const handleLogin=async (event)=>{
    event.preventDefault();
    try{
      const resp=await axios.post("http://localhost:8000/User/login",User);
      console.log(resp.data);
      if (resp.status === 200) {
        alert("Login successful");
        setToken(resp.data.token)
        console.log(resp.data.userName);
        
        setUserName(resp.data.userName)
        setUserID(resp.data.userID)
        navigate("/ProfileInterface");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred. Please try again.");
      }

  }
}

  const handleChange=(event)=>{
    event.preventDefault()

    setUser({
      ...User,
      [event.target.name]:event.target.value,
    })

    console.log(User);
  }
    
return (
<>

<div style={{fontFamily:'Open Sans',}} className="form bg-gray-100  mx-auto w-full h-full max-w-xs  outline-none">
  <form class="border-2   rounded px-8 pt-6 pb-8 " onSubmit={handleLogin}>
    <div class="mb-4 ">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
        Email
      </label>
      <input class=" bg-transparent border-b-2 border-grey-500 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
       type="email" placeholder="Email" aria-label="Full name" name="emailID"
       value={User.emailID} onChange={handleChange}/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class=" bg-transparent border-b-2 border-grey-500 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
      type="text" placeholder="Password" aria-label="Full name" name="password"
      value={User.password} onChange={handleChange}/>
      <p class="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div class="grid grid-rows-2  place-content-center">
      <button class="my-2 outline-none border-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>

      <button class="my-2 py-0 outline-none border-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
        onClick={()=>{navigate("/SignUpForm")}}>
        Sign Up
      </button>
     
      
    </div>
  </form>
  
</div>
</>
)
}

export default FormComponent;
