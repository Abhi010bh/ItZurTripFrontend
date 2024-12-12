import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvent,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Avatar, Button } from "@mui/material";
import L from "leaflet";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";


const Avatar1 = "/images/FaceAvatar.jpg";

function TextOverlay() {
  return (
    <div
      style={{
        fontFamily: "Roboto",
        position: "absolute",
        top: "90%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Centers the overlay
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

const calculateDistance = (marker1, marker2) => {
  const latLng1 = L.latLng(marker1[0], marker1[1]);
  const latLng2 = L.latLng(marker2[0], marker2[1]);

  return latLng1.distanceTo(latLng2);
};

const CalculateTotalDistance = (markers) => {
  let totalDistance = 0;
  for (let i = 1; i < markers.length; i++) {
    totalDistance += calculateDistance(markers[i - 1], markers[i]);
  }
  return totalDistance;
};

const confirmButtonClick = async (totalDistance, trips, formData, token,navigate) => {
  
  const JourneyDetails = {
    tripArray: { trips },
    totalDistance: `${totalDistance}`,
  };

  const trip = {
    ...JourneyDetails,
    ...formData,
  };
  console.log(trip);

  alert(`confirm submission, Estimated distance ${totalDistance}`);

  try {
    const response = await axios.post(
      "http://localhost:8000/Trip/addTrip",
      trip,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response.data.tripId);

    alert(`Trip added successfully ${response.data.tripId}`);
    navigate("/ProfileInterface");
  } catch (error) {
    console.error(error);

    alert("Error adding trip");
  }
};

function MapDashboard({ positions, totalDistance, formData, token ,navigate}) {
  return (
    <div
      style={{
        position: "absolute",
        right: "10%",
        top: "10%",
        zIndex: 1000,
        padding: "10px 20px",
        backgroundColor: "rgba(255, 255, 255,0.6)",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <div className="flex flex-row items-center">
        <Avatar alt="Remy Sharp" src={Avatar1} />
        <div className="ml-2 text-center  text-xl p-5">John Doe</div>
      </div>
      <div className="flex flex-col items-start pb-2">
        <span className="font-bold text-orange-400">Locations selected:</span>
        {positions.map((position, index) => (
          <div className="text-brown-800">
            {position.cityDetails.formattedAddress}
          </div>
        ))}
      </div>
      <span className="items-start font-bold text-red-600">
        Estimated Distance:
      </span>
      <span>{(totalDistance / 1000).toFixed(2)} km</span>
      <div>
        <Button
          className="text-white font-bold  mt-2 p-2"
          style={{ backgroundColor: "rgb(49,196,141)" }}
          icon={CheckIcon}
          onClick={() =>
            confirmButtonClick(
              (totalDistance / 1000).toFixed(2),
              positions,
              formData,
              token,navigate
            )
          }
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

const FetchPlaceName = async (newMarker, apiKey, requestId, setTrip) => {
  try {
    const response = await fetch(
      `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${newMarker[0]},${newMarker[1]}&api_key=${apiKey}`,
      {
        headers: {
          "X-Request-Id": requestId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data.results[0]);

    const newTripElement = {
      cityDetails: {
        formattedAddress: `${data.results[0].formatted_address}`,
        place_ID: `${data.results[0].place_id}`,
      },
      cityCoordinates: `${newMarker}`,
    };
    setTrip((trips) => [...trips, newTripElement]);
  } catch (error) {
    console.error("Failed to fetch location:", error);
  }
};

//Adding markers on click
const AddMarkersOnClick = ({ setMarkers, setTrip }) => {
  const apiKey = "ZJr5BnGpHmzmMeoZ2Js6UCeHHaKd8fS20bL2uYv6";
  const requestId = "6fe02102-f6d5-4826-ab3b-10513fc9c207";

  useMapEvent("click", async (event) => {
    const newMarker = [event.latlng.lat, event.latlng.lng];
    FetchPlaceName(newMarker, apiKey, requestId, setTrip);
    setMarkers((markers) => [...markers, newMarker]);
    
  });
};

function Map({ formData }) {
  const [markers, setMarkers] = useState([]);
  const [cities, setCities] = useState([]);
  const [trip, setTrip] = useState([]);
  const [center,setCenter] = useState({lat: 15.852792,lng: 74.498703,});
  const { token } = useAuth();
  const { setTripID } = useAuth();
  const navigate = useNavigate();

  const totalDistance = CalculateTotalDistance(markers);

 

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const {latitude:lat,longitude:lng} = position.coords;
          setCenter({lat,lng});
        
        }
      )
    }
    else{
      alert(`Geo location not supported!`);
      
    }

  },[])

  return (
    <>
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

          <AddMarkersOnClick setMarkers={setMarkers} setTrip={setTrip} />
          

          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}

          <Polyline
            positions={markers}
            color="blue"
            weight={3}
            opacity={0.6}
            dashArray="10, 5"
            lineCap="round"
            lineJoin="round"
          />
        </MapContainer>
      </div>
      <TextOverlay />
      <MapDashboard
        positions={trip}
        totalDistance={totalDistance}
        formData={formData}
        token={token}
        navigate={navigate}
      />
    </>
  );
}

export default Map;
