import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ParticlesBg from "particles-bg";
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and style
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import Cover from "./components/Cover";
import { StyledEngineProvider } from "@mui/material";
import Animate from "./components/Animation";
import LoginForm from "./components/LoginForm";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { QuickAccess } from "./components/QuickAccess";
import SignUpForm from "./components/SignUpForm";
import SimpleBottomNavigation from "./components/SimpleBottomNavigation";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
      
        <QuickAccess />
        
        
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Animate" element={<Animate />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          
        </Routes>
        
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;
