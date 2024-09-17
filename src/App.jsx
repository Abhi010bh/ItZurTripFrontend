import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import Cover from "./components/Cover";
import Animate from "./components/Animation";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import PrivateRoute from "./components/PrivateRoute";
import ProfileInterface from "./components/ProfileInterface";
import AddTrip from "./components/TripsRoutes/AddTrip";
import {Trip} from "./components/Trip";
import {AnimatePresence} from "framer-motion";
import {TripPage} from "./components/TripsRoutes/TripPage";
import {Expenses} from "./components/TripsRoutes/Expense";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/ProfileInterface" element={<ProfileInterface />} />
          <Route path="/Trip" element={<AddTrip />}  />
          <Route path="/TripProfile" element={<Trip />}  />
          <Route path="/Trip/View/" element={<TripPage />} />
          <Route path="/Trip/Expense" element={<Expenses />  } />

        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;
      