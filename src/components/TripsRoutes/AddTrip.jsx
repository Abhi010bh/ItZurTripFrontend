import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { Button } from "@mui/material";
import { QuickAccess } from "../QuickAccess";
import Animate from "../Animation"; // Assuming Animation is the component that handles date selection

const AddTrip = () => {
  const [trip, setTrip] = useState({
    tripName: "",
    source: "",
    destination: "",
    users: [""],
    startDate: null,
    endDate: null
  });

  const [message, setMessage] = useState("");
  

  const handleStartDateChange = (selectedDate) => {
    setTrip({ ...trip, startDate: selectedDate });
  };

  const handleEndDateChange = (selectedDate) => {
    setTrip({ ...trip, endDate: selectedDate });
  };

  const { token } = useAuth();
  const {setTripID}= useAuth()
  
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
    try {
      const response = await axios.post("http://localhost:8000/Trip/addTrip", trip, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTripID(response.data.tripId);
      console.log(response.data.tripId);
      setMessage("Trip added successfully");
      alert(`Trip added successfully ${response.data.tripId}`);
      navigate("/ProfileInterface");
    } catch (error) {
      console.error(error);
      setMessage("Error adding trip");
      alert("Error adding trip");
    }
  };

  const placeSuggestions = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
  ];

  useEffect(() => {
    console.log(trip);
  }, [trip]);

  return (
    <>
      <QuickAccess />
      <div className="relative blurry pb-5 row-span-2 md:col-span-2 mb-0 pt-10 mt-0">
        <div style={{ fontFamily: 'Open Sans' }} className="form outline rounded-lg bg-white items-center justify-center my-auto mx-auto max-w-lg outline-none">
          <form className="border-2 rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
            <span className="text-gray-500 mb-2 text-sm">Welcome</span>
            {message && <div className="mb-4 text-center">{message}</div>}
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="TripName">
                Name Your Trip
              </label>
              <input className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                name="tripName"
                value={trip.tripName}
                onChange={handleChange}
                placeholder="Trip Name" />
            </div>
            <datalist id="sourceSuggestions">
              {placeSuggestions.map((place, index) => (
                <option key={index} value={place} />
              ))}
            </datalist>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="source">
                Where From?
              </label>
              <input className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                name="source"
                list="sourceSuggestions"
                value={trip.source}
                onChange={handleChange}
                placeholder="Source" />
              <datalist id="sourceSuggestions">
                {placeSuggestions.map((place, index) => (
                  <option key={index} value={place} />
                ))}
              </datalist>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="destination">
                Where To?
              </label>
              <input className="w-full bg-transparent border-0 py-2 leading-tight focus:outline-none"
                type="text"
                name="destination"
                list="destinationSuggestions"
                value={trip.destination}
                onChange={handleChange}
                placeholder="Destination" />
              <datalist id="destinationSuggestions">
                {placeSuggestions.map((place, index) => (
                  <option key={index} value={place} />
                ))}
              </datalist>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="startDate">
                Start Date
              </label>
              <Animate onChangeDate={handleStartDateChange} />
              <label className="block text-lg font-bold mb-2" htmlFor="endDate">
                End Date
              </label>
              <Animate onChangeDate={handleEndDateChange} />
            </div>
            <span className="text-gray-500 mb-1">Companions</span>
            {trip.users.map((user, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-lg font-bold mb-2">
                  User{index + 1} Email
                </label>
                <input className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="email"
                  value={user}
                  onChange={(e) => handleUserChange(index, e.target.value)}
                  placeholder="User Email" />
              </div>
            ))}
            <div className="flex content-evenly items-center flex-col flex-nowrap">
              <Button
                color="success"
                size="lg"
                type="submit"
                className="my-2 rounded-2xl bg-green-400 min-w-full hover:bg-green-600 text-white"
              >Add Trip</Button>
              <Button
                color="success"
                onClick={addUserField}
                size="lg"
                type="button"
                className="my-2 rounded-2xl bg-green-400 min-w-full text-white"
              >Add User</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTrip;
