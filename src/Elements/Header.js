import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../assets/the-economic-club.png";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#e9ecef" }}>
      <Toolbar>
        <div
          style={{
            width: `${65}%`,
            display: "flex",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <a
            href="https://economicclub.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt="logo" style={{ margin: "20px" }} />
          </a>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
