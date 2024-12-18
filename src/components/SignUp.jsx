import React, { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { FormControl } from "@mui/material";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { Snackbar } from "@mui/material"; // Import Snackbar component
import MuiAlert from "@mui/material/Alert"; // Import Alert for styled Snackbar

export const SignUp = () => {
  const navigate = useNavigate();

  const [User, setUser] = useState({
    username: "",
    emailID: "",
    password: "",
    confirmPassword: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" or "error"

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (User.password !== User.confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const resp = await axios.post("http://localhost:8000/User/register", {
        emailID: User.emailID,
        UserName: User.username,
        password: User.password,
      });

      console.log(resp.data);

      setSnackbarMessage("Registration successful! Redirecting to login...");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Delay to show the success message before navigating
    } catch (e) {
      console.log(e);
      setSnackbarMessage("An error occurred during registration. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    setUser({
      ...User,
      [event.target.name]: event.target.value,
    });

    console.log(User);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div
      style={{ fontFamily: "Open Sans" }}
      className="form bg-gray-100 mx-auto w-full h-full max-w-xs outline-none"
    >
      <form className="border-2 rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="bg-transparent border-b-2 border-grey-500 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Username"
            aria-label="Username"
            name="username"
            value={User.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="emailID"
          >
            Email
          </label>
          <input
            className="bg-transparent border-b-2 border-grey-500 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="Email"
            aria-label="Email"
            name="emailID"
            value={User.emailID}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="bg-transparent border-b-2 border-grey-500 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="password"
            placeholder="Password"
            aria-label="Password"
            name="password"
            value={User.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="bg-transparent border-b-2 border-grey-500 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="password"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            name="confirmPassword"
            value={User.confirmPassword}
            onChange={handleChange}
          />
          <p className="text-red-500 text-xs italic">
            Please confirm your password.
          </p>
        </div>
        <div className="grid grid-rows-2 place-content-center">
          <button
            className="my-2 outline-none border-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <button
            className="my-2 outline-none border-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back to Login
          </button>
        </div>
      </form>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
