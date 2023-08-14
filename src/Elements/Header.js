import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../assets/milken_logo.png";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
      {/* #e9ecef */}
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
            href="https://milkeninstitute.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: "absolute", left: "12px", top: "4px" }}
          >
            <img src={logo} alt="logo" style={{ height: "56px" }} />
          </a>
          <Typography
            variant="h6"
            component="div"
            style={{ color: "#2e2e34", fontWeight: "normal" }}
          >
            Milken Institute Chat by GN-Works
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
