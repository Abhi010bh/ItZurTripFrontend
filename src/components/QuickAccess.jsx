import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import LoginIcon from '@mui/icons-material/Login';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { Home, ArrowBack, List, Login, LoginTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export const QuickAccess=()=>{
    const navigator = useNavigate();
    const actions = [
        {
          icon: <Home />,
          name: "Home",
          click: () => {
            navigator("/");
          },
        },
        {
          icon: <ArrowBack />,
          name: "Back",
          click: () => {
            navigator("/");
          },
        },
        {
          icon: <LoginTwoTone />,
          name: "Login",
          click: () => {
            navigator("/Login");
          },
        },
        {
          icon: <ShareIcon />,
          name: "SignUp",
          click: () => {navigator("/SignUp")},
        },
      ];
    
    return (
        <SpeedDial
    ariaLabel="SpeedDial basic example"
    sx={{ position: "fixed", bottom: 16, right: 16 }}
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
    )
}