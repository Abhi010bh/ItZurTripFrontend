import { useState, useEffect } from "react";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import RenderMap from "../MapComponents/RenderMap";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import { Avatar, Button, Icon } from "@mui/material";
import {
  LocationCity,
  LocationCityOutlined,
  LocationDisabledOutlined,
  LocationOn,
  LocationOnOutlined,
} from "@mui/icons-material";
import ExpenseChart from "./ExpenseChart";
import CircleCountdownTimer from "./CircleCountdownTimer";
import TodoList from "./TodoList";
const Avatar1 = "/images/FaceAvatar.jpg";

const EditTrip = (trip, navigate) => {
  try {
    console.log(trip);
    console.log("Edit Trip called");
    navigate(`/Trip/EditTrip`, { state: { trip } });
  } catch (error) {
    console.log(error);
  }
};

export const TripPage = () => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [currentCity, setCurrentCity] = useState();
  const [breakdown, setBreakdown] = useState(null);
  const { token, userName } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        console.log("Location state:", location.state);
        const tripId = location.state?.trip?._id;
        if (!tripId) {
          console.error("Trip ID not found in location state.");
          return;
        }

        const tripResponse = await axios.get(
          `http://localhost:8000/Trip/trips/${tripId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const analyticsResponse = await axios.get(
          `http://localhost:8000/Trip/${tripId}/analytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Analytical Reports:", analyticsResponse.data);
        setBreakdown(analyticsResponse.data);

        setTrip(tripResponse.data);

        setLoading(false); // Stop loading once the data is fetched
        const Dates = {
          startDate: tripResponse.data.startDate,
          endDate: tripResponse.data.endDate,
        };
        setDates(Dates);
      } catch (error) {
        console.error("Error fetching trip:", error);
        setLoading(false);
      }
    };

    fetchTrip();
  }, [location.state, token]);

  const formatStartDate = (startDate) => {
    return new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  useEffect(() => {
    if (dates && dates.startDate && dates.endDate) {
      const startDate = dayjs(dates.startDate);
      const endDate = dayjs(dates.endDate);

      let tempDates = [];
      let currentDate = startDate;

      while (
        currentDate.isBefore(endDate) ||
        currentDate.isSame(endDate, "day")
      ) {
        tempDates.push(currentDate.format("YYYY-MM-DD")); // Store as formatted string
        currentDate = currentDate.add(1, "day");
      }

      console.log("Generated highlightedDates:", tempDates);
      setHighlightedDates(tempDates); // Store formatted dates
      console.log(userName);
    }
  }, [dates]);

  // Only run this effect when `dates` changes

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = dayjs(date).format("YYYY-MM-DD");

      if (highlightedDates.includes(dateStr)) {
        if (dateStr === highlightedDates[0]) {
          return "start-date"; // Start date
        } else if (dateStr === highlightedDates[highlightedDates.length - 1]) {
          return "end-date"; // End date
        }
        return "highlighted"; // Normal highlighted dates
      }
    }
    return null;
  };

  const handleClick = () => {
    navigate(`/Trip/Expense`, { state: { trip } });
  };

  if (loading) {
    return <div>Loading trip details...</div>; // Show loading message while fetching
  }

  return (
    <>
      <div
        className="full-screen-background p-2"
        style={{ fontFamily: "Open Sans" }}
      >
        <div className="grid grid-cols-2 ">
          <div className="col-span-1">
            {trip && (
              <div
                className="text-black m-10 mt-11 p-10 max-h-sm rounded-2xl overflow-hidden shadow-lg  bg-[#fafafa]"
                style={{ fontFamily: "Roboto" }}
              >
                <div className="flex flex-col ">
                  <div className="flex flex-row items-center justify-start">
                    <Avatar
                      alt="Remy Sharp"
                      src={Avatar1}
                      style={{ minHeight: "64px", minWidth: "64px" }}
                    />

                    <div className="ml-2 text-center  text-3xl font-semibold p-5 ">
                      Welcome, {userName}!
                    </div>
                  </div>
                  <div className="flex items-center text-[#3f3f46]">
                    <Icon className="text-6xl ml-5 ">
                      <LocationOnOutlined className="w-10 h-12" />
                    </Icon>
                    <span className="pt-3 pl-0">
                      You are currently in,
                      <span className="font-bold">{currentCity}</span>
                    </span>
                  </div>
                  <span className="pt-5 pb-4">So far it's been</span>
                  <div className="flex items-center space-x-2">
                    <CircleCountdownTimer targetDate={dates.startDate} />
                    <ExpenseChart
                      expenses={breakdown.ExpenseBreakdown}
                      totalExpense={breakdown.totalExpenses}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mt-8 px-10 overflow-hidden rounded-2xl">
              <RenderMap trip={trip} setCity={setCurrentCity} />
            </div>
          </div>
          <div className="col-span-1 pt-6">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": { m: 0, width: 720, height: 600 },
              }}
            >
              <div className="grid grid-cols-2   justify-center gap-5 h-full w-full pt-4">
                <div className="col-span-2 row-span-1 flex justify-center ">
                  <div
                    style={{
                      backgroundColor: "#e5e7eb !important",
                      borderRadius: "16px",
                      display: "inline-block", // Prevents extra width
                      margin: "0 auto", // Centers the box
                    }}
                  >
                    <Calendar
                      className="col-span-1 bg-cyan-400"
                      onChange={() => {}} // No selection logic needed
                      value={new Date(trip.startDate)} // Set initial view date
                      tileClassName={tileClassName} // Highlight logic applied here
                      tileDisabled={() => false} // Ensure all dates are active for display
                    />
                  </div>
                </div>
                <div className="col-span-2 row-span-1 bg-[#d1fa9a] p-3 m-0 rounded-2xl h-[200px] shadow-lg overflow-hidden">
                  <TodoList tripId={trip._id} />
                </div>
              </div>
            </Box>
            <div className="p-5 flex flex-col justify-center items-center">
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "no-wrap",
                  gap: 5,
                  "& > :not(style)": { m: 0, width: 96, height: 96 },
                }}
              >
                <Paper
                  elevation={3}
                  className="mx-5 text-white font-bold bg-red-500 flex flex-col justify-center items-center"
                >
                  Bookings
                </Paper>
                <Paper
                  elevation={3}
                  onClick={handleClick}
                  className="text-white font-bold bg-green-400 flex flex-col justify-center items-center"
                >
                  Expenses
                </Paper>
                <Paper
                  elevation={3}
                  className="text-white font-bold bg-orange-500 flex flex-col justify-center items-center"
                >
                  Gallery
                </Paper>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
