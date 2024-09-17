import { useState,useEffect,useCallback  } from "react";
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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useAuth} from "../provider/authProvider";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import axios from "axios";




export const Trip=()=>{
  const [trips, setTrips] = useState([]);

  const {token,tripId}=useAuth()
  const navigate=useNavigate()
  

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        
       /* const response = await axios.get(`http://localhost:8000/Trip/trips/${tripId}`,{
          headers: { Authorization: `Bearer ${token}` }
        });*/
        const response = await axios.get(`http://localhost:8000/Trip/trips/`,{
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrips(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleClick = useCallback((trip) => {

    console.log(`trip object in Trips handleClick ${trip}`);
    navigate(`/Trip/View`, { state: { trip } });
  }, [navigate]);


    return(
        <> 
        <QuickAccess />
        <div className="travel p-2">
          <h1 className="text-8xl  font-bolder subpixel-antialiased tracking-tighter"
              style={{fontFamily:'Open Sans',color:'#0c0a09'}}>your trips</h1>
<div style={{height:'100vh'}} className="mt-0 travelGlass rounded-xl   grid grid-cols-1 md:grid-cols-4 gap-2">
{trips.map((trip, index) => (
  <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-84">
  <div class="p-6">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      class="w-12 h-12 mb-4 text-gray-900">
      <path fill-rule="evenodd"
        d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
        clip-rule="evenodd"></path>
      <path
        d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z">
      </path>
    </svg>
    <div class="flex flex-row justify-between">
    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {trip.tripName}
    </h5>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="-mt-0.5 h-5 w-5 text-yellow-700">
          <path fill-rule="evenodd" class="text-yellow-300"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clip-rule="evenodd"></path>
        </svg></div>
    <li class="flex items-center justify-between gap-4">
        
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
          {trip.source}
        </p>
      
       
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
         {trip.destination}
        </p>
      </li>
  </div>
  <div class="p-6 pt-0 ">
    <a href="#" class="inline-block">
      <button
        class="outline-0 border-0 underline-none flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
        type="button"
        onClick={()=>{handleClick(trip)}}>
        Let's Go
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
          stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
        </svg>
      </button>
    </a>
  </div>
</div> ))}
 </div>
</div>
    
      </>);

}
