import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { Button } from "@mui/material";
import { QuickAccess } from "../QuickAccess";
import Animate from "../Animation"; // Assuming Animation is the component that handles date selection
import { Avatar } from "@mui/material";
const Avatar1 = "/images/FaceAvatar.jpg";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvent,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Map from "../MapComponents/Map";

function TripForm({setMapRouting,setFormData}) {
  const [trip, setTrip] = useState({
    tripName: "",
    users: [""],
    startDate: null,
    endDate: null,
  });

  const [message, setMessage] = useState("");

  const handleStartDateChange = (selectedDate) => {
    setTrip({ ...trip, startDate: selectedDate });
  };

  const handleEndDateChange = (selectedDate) => {
    setTrip({ ...trip, endDate: selectedDate });
  };

  const { token,userName } = useAuth();
  const { setTripID } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleUserChange = (index, value) => {
    const newUsers = [...trip.users];
    newUsers[index] = value;
    setTrip({ ...trip, users: newUsers });
  };

  const addUserField = () => {
    setTrip({ ...trip, users: [...trip.users, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData(trip)

    
   setMapRouting(false)

  };

  useEffect(() => {
    console.log(trip);
  }, [trip]);

  return (
    <>
      <div
        className="relative blurry pb-5 mt-5"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centers the overlay
          zIndex: 1000,
          backgroundColor: "rgb(255,255,255,0.5)",
          borderRadius: "8px",
          minWidth: "30rem",
        }}
      >
        <div style={{ fontFamily: "Open Sans" }}>
          <form className=" rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
            <span className="text-gray-500 mb-2 text-md">Welcome</span>
            {message && <div className="mb-4 text-center">{message}</div>}
            <div className="flex flex-row items-center">
              <Avatar
                alt="Remy Sharp"
                src={Avatar1}
                style={{ minHeight: "48px", minWidth: "48px" }}
              />
              
              <div className="ml-2 text-center  text-3xl font-semibold p-5  text-red-400" >
                {userName}
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-lg font-semibold text-[#1c1917] mb-2 "
                htmlFor="TripName"
              >
                Name Your Trip
              </label>
              <input
                className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                name="tripName"
                value={trip.tripName}
                onChange={handleChange}
                placeholder="Trip Name"
                style={{ boxShadow: "none" }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-lg py-1 font-semibold text-[#1c1917] mb-2"
                htmlFor="startDate"
              >
                Start Date
              </label>
              <Animate onChangeDate={handleStartDateChange} />
              <label
                className="block text-lg py-1 font-semibold text-[#1c1917] mb-2"
                htmlFor="endDate"
              >
                End Date
              </label>
              <Animate onChangeDate={handleEndDateChange} />
            </div>
            <span className="text-gray-500 mb-1">Companions</span>
            {trip.users.map((user, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-lg font-semibold text-[#1c1917] mb-2">
                  User{index + 1} Email
                </label>
                <input
                  className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="email"
                  value={user}
                  onChange={(e) => handleUserChange(index, e.target.value)}
                  placeholder="User Email"
                  style={{ boxShadow: "none" }}
                />
              </div>
            ))}
            <div className="flex content-evenly justify-center items-center flex-row space-x-4">
              <Button
                color="success"
                onClick={addUserField}
                size="lg"
                type="button"
                className="w-40 mx-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white py-2 px-6"
              >
                Add User
              </Button>
              <Button
                color="success"
                size="lg"
                className="w-40 mx-2 rounded-md bg-green-400 hover:bg-green-500 text-white py-2 px-6"
                onClick={handleSubmit}
              >
                Routes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function TextOverlay() {
  return (
    <div
      style={{
        fontFamily: "Roboto",
        position: "absolute",
        top: "90%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        padding: "10px 20px",
        backgroundColor: "rgba(219,225,227,0.5)",
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
        style={{ fontFamily: "Open Sans " }}
        className="font text-center text-slate-400 "
      >
        Your place to take places
      </div>
    </div>
  );
}

export const AddTrip = () => {

  const [mapRouting,setMapRouting]=useState(true)
  const [formData,setFormData]=useState()
  const center = {
    lat: 15.852792,
    lng: 74.498703,
  };

  return (
    <>
      {mapRouting?(<><QuickAccess />
      <div className="">
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: "100vh", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      <TextOverlay />
      <TripForm setMapRouting={setMapRouting} setFormData={setFormData}/></>):(<>
      <Map formData={formData}/></>)}
    </>
  );
};
