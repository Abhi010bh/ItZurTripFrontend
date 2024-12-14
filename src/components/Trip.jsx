import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { QuickAccess } from "./QuickAccess";
import { useAuth } from "../provider/authProvider";
import Overlay from "./Overlay"; 
import axios from "axios";
import {
  FlightTakeoff,
  FlightLand,
  ArrowForward,
  Star,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";

export const Trip = () => {
  const [trips, setTrips] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:8000/Trip/trips/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [token]);

  const handleClick = useCallback(
    (trip) => {
      navigate(`/Trip/View`, { state: { trip } });
    },
    [navigate]
  );

  return (
    <>
      <QuickAccess />
      <Box
        sx={{
          bgcolor: "#edf2f7", // Light gray background for the section
          minHeight: "100vh",
          p: 4,
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/squared-metal.png')",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#2d3748",
            mb: 6,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Your Trips
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          {trips.map((trip, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                backgroundColor: "#ffffff", // Slightly white card background
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                ":hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
                border: "1px solid #e2e8f0", // Soft border for more contrast
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#2d3748",
                      fontSize: "1.25rem",
                    }}
                  >
                    {trip.tripName}
                  </Typography>
                  <Star sx={{ color: "#f6ad55" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                    color: "#4a5568", // Soft text color for readability
                  }}
                >
                  <FlightTakeoff sx={{ color: "#4299e1" }} />
                  <Typography variant="body1" sx={{ color: "#4a5568" }}>
                    From: {trip.source}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#4a5568", // Soft text color for readability
                  }}
                >
                  <FlightLand sx={{ color: "#48bb78" }} />
                  <Typography variant="body1" sx={{ color: "#4a5568" }}>
                    To: {trip.destination}
                  </Typography>
                </Box>
              </CardContent><CardActions>
  <Button
    variant="contained"
    fullWidth
    sx={{
      backgroundColor: "#e66464 !important", // Use !important to enforce the background color
      color: "#ffffff !important",           // Ensure text color is white
      fontWeight: "medium",
      borderRadius: 4,
      textTransform: "none",
      ":hover": { 
        backgroundColor: "#c53030 !important", // Darker red on hover
        boxShadow: 3,                          // Slight shadow effect on hover
      },
      boxShadow: 2,                            // Default box shadow
    }}
    onClick={() => handleClick(trip)}
    startIcon={<ArrowForward />}
  >
    Let’s Go
  </Button>
</CardActions>


            </Card>
          ))}
        </Box>
      </Box>
      <Overlay />
    </>
  );
};
