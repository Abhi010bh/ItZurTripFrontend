import { useState, useEffect } from "react";
import axios from "axios";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useLocation } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// Define predefined location data with descriptions
const predefinedLocations = {
  'New York': { name: 'New York', description: 'The bustling metropolis known for its iconic skyline and vibrant culture.' },
  'Los Angeles': { name: 'Los Angeles', description: 'The entertainment capital of the world, famous for Hollywood and sunny beaches.' },
  'Chicago': { name: 'Chicago', description: 'A city renowned for its architecture, deep-dish pizza, and rich history.' },
  'Houston': { name: 'Houston', description: 'America\'s fourth-largest city, known for its space center and Southern hospitality.' },
  'Phoenix': { name: 'Phoenix', description: 'The desert city offering year-round sunshine and stunning natural landscapes.' },
  'Philadelphia': { name: 'Philadelphia', description: 'The birthplace of American independence, home to iconic landmarks and cheesesteaks.' },
  'San Antonio': { name: 'San Antonio', description: 'Famous for the Alamo and River Walk, blending history with modern attractions.' },
  'San Diego': { name: 'San Diego', description: 'Known for its perfect weather, beautiful beaches, and vibrant arts scene.' },
  'Dallas': { name: 'Dallas', description: 'A dynamic city known for its business prowess, Tex-Mex cuisine, and cultural diversity.' },
  'San Jose': { name: 'San Jose', description: 'The heart of Silicon Valley, where innovation meets California\'s laid-back lifestyle.' },
};

export const TripPage = () => {
    const [trip, setTrip] = useState(null);
    const [sourceInfo, setSourceInfo] = useState(null);
    const [destinationInfo, setDestinationInfo] = useState(null);
    const { token } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const tripId = location.state?.trip?._id;
                if (!tripId) {
                    console.error("Trip ID not found in location state.");
                    return;
                }

                const response = await axios.get(`http://localhost:8000/Trip/trips/${tripId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTrip(response.data);
                console.log("Fetched trip data:", response.data);

                // Match and set source and destination info from predefined data
                if (response.data.source && predefinedLocations[response.data.source]) {
                  setSourceInfo(predefinedLocations[response.data.source]);
                }
                if (response.data.destination && predefinedLocations[response.data.destination]) {
                  setDestinationInfo(predefinedLocations[response.data.destination]);
                }
            } catch (error) {
                console.error("Error fetching trip:", error);
            }
        };

        fetchTrip();
    }, [location.state, token]);

    // Function to format ISO date to a readable format
    const formatStartDate = (startDate) => {
        const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formattedDate;
    };

    // Function to generate a catchy caption based on source and destination
    const generateCaption = (source, destination) => {
        if (!source || !destination) return '';
        return `From the ${source.name}'s ${source.description.toLowerCase()} to the ${destination.name}'s ${destination.description.toLowerCase()}, this trip promises adventure and unforgettable moments.`;
    };

    return (
        <>
            {/* Render your QuickAccess component */}
            <div className="travel p-2 h-screen" style={{ fontFamily: 'Open Sans' }}>
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-1">
                        {trip && <div className="text-white m-14 mt-24 max-w-sm rounded overflow-hidden shadow-lg bg-cyan-500">
                            <img className="w-full" src="../../../public/images/Barcelona.jpg" alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{trip.tripName}</div>
                                <p className="text-white italic mb-2">{sourceInfo && destinationInfo && generateCaption(sourceInfo, destinationInfo)}</p>
                                
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Add Users</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Edit Trip</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Delete Trip</span>
                            </div>
                        </div>}
                    </div>
                    <div className="col-span-2 p-24 pl-48">
                        <div><Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 0,
                                    width: 1024,
                                    height: 512,
                                },
                            }}
                        >
                            <Paper elevation={3}>
                                <div className="grid grid-cols-2 grid-rows-3 gap-5 h-full w-full p-4">
                                    <div className="col-span-1 row-span-1 flex flex-col justify-center items-center px-6 p-4 h-full">
                                        <CalendarMonthIcon fontSize="large" className="rounded-3xl p-2 shadow-lg shadow-cyan-500/50 drop-shadow-2xl" />
                                        <span className="font-bold pt-1 text-gray-600">Starting Date</span>
                                        <span className="font pt-1 text-gray-600">{trip && formatStartDate(trip.startDate)}</span>
                                    </div>
                                    <div className="col-span-1 row-span-1 flex flex-col justify-center items-center px-6 p-4 h-full">
                                        <CalendarMonthIcon fontSize="large" className="rounded-3xl p-2 shadow-lg shadow-cyan-500/50 drop-shadow-2xl"/>
                                        <span className="font-bold pt-1 text-gray-600">Ending Date</span>
                                        <span className="font pt-1 text-gray-600">{trip && formatStartDate(trip.endDate)}</span>
                                    </div>
                                    <div className="col-span-1 row-span-1 flex flex-col justify-center items-center px-8 p-4 h-full">
                                        <CalendarMonthIcon fontSize="large" className="rounded-3xl p-2 shadow-lg shadow-cyan-500/50 drop-shadow-2xl"/>
                                        <span className="font-bold pt-1 text-gray-600">Source</span>
                                        <span className="font pt-1 text-gray-600">{sourceInfo ? sourceInfo.description : 'Loading...'}</span>
                                    </div>
                                    <div className="col-span-1 row-span-1 flex flex-col justify-center items-center p-4 px-8 h-full">
                                        <CalendarMonthIcon fontSize="large" className="rounded-3xl p-2 shadow-lg shadow-cyan-500/50 drop-shadow-2xl"/>
                                        <span className="font-bold pt-1 text-gray-600">Destination</span>
                                        <span className="font pt-1 text-gray-600">{destinationInfo ? destinationInfo.description : 'Loading...'}</span>
                                    </div>
                                </div>
                            </Paper>
                        </Box></div>
                        <div className="p-5 flex flex-col justify-center items-center">
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'no-wrap',
                                gap:5,
                                '& > :not(style)': {
                                    m: 0,
                                    width: 104,
                                    height: 96,
                                },
                            }}
                        ><Paper elevation={3} className="mx-5 text-white font-bold bg-red-500 flex flex-col justify-center items-center">
                            Bookings</Paper> 
                        <Paper elevation={3} className="text-white font-bold bg-green-400 flex flex-col justify-center items-center">
                            Expenses
                        </Paper>
                        <Paper elevation={3} className="text-white font-bold bg-orange-500 flex flex-col justify-center items-center">
                            Gallery</Paper> </Box>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};
