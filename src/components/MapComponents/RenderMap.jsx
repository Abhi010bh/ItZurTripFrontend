import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer from "react-dom/server"; // Required for rendering Material-UI icons to HTML
import { LocationOn } from "@mui/icons-material";

const CustomHomeIcon = L.divIcon({
  html: ReactDOMServer.renderToStaticMarkup(
    <LocationOn style={{ color: "red", fontSize: "30px" }} />
  ),
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Component to dynamically update map center
function UpdateMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

function RenderMap({ trip, setCity }) {
  const defaultCenter = { lat: 15.852792, lng: 74.498703 };

  const [center, setCenter] = useState(null);
  const [newMarkers, setNewMarkers] = useState([]);

  // Parse trip waypoints into markers
  useEffect(() => {
    if (trip && trip.waypoints) {
      const markers = trip.waypoints.map((waypoint) => {
        const cityCoordinate = waypoint.cityCoordinates.split(",");
        return cityCoordinate.map(Number); // Convert strings to numbers
      });

      setNewMarkers(markers);
    } else {
      console.log("trip or trip.waypoints is null or undefined");
    }
  }, [trip]);

  const FetchPlaceName = async (coords, setCity) => {
    const apiKey = "ZJr5BnGpHmzmMeoZ2Js6UCeHHaKd8fS20bL2uYv6";
    const requestId = "6fe02102-f6d5-4826-ab3b-10513fc9c207";
    try {
      console.log(coords);
      const response = await fetch(
        `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${coords.lat},${coords.lng}&api_key=${apiKey}`,
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
      console.log(data.results[0].address_components[2].long_name);
      setCity(data.results[0].address_components[2].long_name);
    } catch (error) {
      console.error("Failed to fetch location:", error);
    }
  };

  // Fetch user's current location
  useEffect(() => {
    const fetchCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported by your browser"));
        } else {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      });
    };

    const fetchLocation = async () => {
      try {
        const position = await fetchCurrentLocation();

        const { latitude: lat, longitude: lng } = position.coords;
        
        setCenter({ lat, lng });
        console.log("Current Location:", { lat, lng });
        console.log(center);
        FetchPlaceName(center, setCity);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div
      style={{ height: "350px", width: "680px" }}
      className="border rounded-xl shadow-md"
    >
      <MapContainer
        center={defaultCenter}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <UpdateMapCenter center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render markers */}
        {newMarkers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}

        {/* Render custom marker for user's location */}
        {center && <Marker position={center} icon={CustomHomeIcon} />}

        {/* Render polyline */}
        <Polyline
          positions={newMarkers}
          color="blue"
          weight={3}
          opacity={0.6}
          dashArray="10, 5"
          lineCap="round"
          lineJoin="round"
        />
      </MapContainer>
    </div>
  );
}

export default RenderMap;
