import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HomeIcon from "@mui/icons-material/Home"; // Home icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back icon
import LoginIcon from "@mui/icons-material/Login"; // Login icon
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // SignUp icon
import { useNavigate } from "react-router-dom";

export const QuickAccess = () => {
  const navigator = useNavigate();

  const actions = [
    {
      icon: <HomeIcon />,
      name: "Home",
      click: () => {
        navigator("/"); // Navigate to the Home page
      },
    },
    {
      icon: <ArrowBackIcon />,
      name: "Back",
      click: () => {
        navigator(-1); // Navigate back to the previous page
      },
    },
    {
      icon: <LoginIcon />,
      name: "Login",
      click: () => {
        navigator("/Login"); // Navigate to the Login page
      },
    },
    {
      icon: <PersonAddIcon />,
      name: "Sign Up",
      click: () => {
        navigator("/SignUpForm"); // Navigate to the SignUp page
      },
    },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        "& .MuiSpeedDial-fab": {
          backgroundColor: "#1565c0", // Set background color
          color: "#fff", // Set icon color
          "&:hover": {
            backgroundColor: "#1976d2", // Hover effect for the button
          },
        },
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.click}
        />
      ))}
    </SpeedDial>
  );
};
