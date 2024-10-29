import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import Cover from "./components/Cover";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import PrivateRoute from "./components/PrivateRoute";
import ProfileInterface from "./components/ProfileInterface";
import {AddTrip} from "./components/TripsRoutes/AddTrip";
import { Trip } from "./components/Trip";
import { TripPage } from "./components/TripsRoutes/TripPage";
import { Expenses } from "./components/TripsRoutes/Expense";
import Map from "./components/MapComponents/Map";
import { EditTrip } from "./components/TripsRoutes/EditTrip";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/EditTrip" element={<EditTrip />} />
          
          {/* Secure Routes */}
          <Route path="/ProfileInterface" element={<PrivateRoute element={ProfileInterface} />} />
          <Route path="/Trip" element={<PrivateRoute element={AddTrip} />} />
          <Route path="/TripProfile" element={<PrivateRoute element={Trip} />} />
          <Route path="/Trip/View/" element={<PrivateRoute element={TripPage} />} />
          <Route path="/Trip/Expense" element={<PrivateRoute element={Expenses} />} />
         
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;
