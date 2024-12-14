import React, { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../provider/authProvider";
import { CheckCircle, Error, Close } from "@mui/icons-material"; // Added Close icon

export const FormComponent = () => {
  const navigate = useNavigate();

  const [User, setUser] = useState({
    emailID: "",
    password: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const { setToken, setUserName, setUserID } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.post("http://localhost:8000/User/login", User);
      if (resp.status === 200) {
        setNotification({
          message: "Login successful! Redirecting...",
          type: "success",
        });
        setToken(resp.data.token);
        setUserName(resp.data.userName);
        setUserID(resp.data.userID);
        setTimeout(() => {
          navigate("/ProfileInterface");
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setNotification({
          message: error.response.data.error,
          type: "error",
        });
      } else {
        setNotification({
          message: "An error occurred. Please try again.",
          type: "error",
        });
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setUser({
      ...User,
      [event.target.name]: event.target.value,
    });
  };

  // Dismiss notification function
  const dismissNotification = () => {
    setNotification({
      message: "",
      type: "",
    });
  };

  // Disable Sign In if fields are empty
  const isFormValid = User.emailID && User.password;

  return (
    <>
      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-10 right-0 transform translate-x-4 p-4 mr-10 w-72 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          } flex items-center justify-between space-x-2`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === "success" ? (
              <CheckCircle className="text-xl" />
            ) : (
              <Error className="text-xl" />
            )}
            <p className="text-sm font-semibold">{notification.message}</p>
          </div>

          {/* Dismiss Button (X) */}
          <button
            onClick={dismissNotification}
            className="text-white text-lg hover:text-gray-300"
          >
            <Close />
          </button>
        </div>
      )}

      {/* Form */}
      <div className="form bg-gray-100 mx-auto w-full h-full max-w-xs outline-none">
        <form className="border-2 rounded px-8 pt-6 pb-8" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailID">
              Email
            </label>
            <input
              className="bg-transparent border-b-2 border-grey-500 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Email"
              aria-label="Email"
              id="emailID"
              name="emailID"
              value={User.emailID}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="bg-transparent border-b-2 border-grey-500 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="Password"
              aria-label="Password"
              id="password"
              name="password"
              value={User.password}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-rows-2 place-content-center">
            <button
              className="my-2 outline-none border-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!isFormValid} // Disable if form is invalid
            >
              Sign In
            </button>

            <button
              className="my-2 py-0 outline-none border-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                navigate("/SignUpForm");
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormComponent;
