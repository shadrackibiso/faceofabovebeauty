import React from "react";
import logo from "../images/logo.jpeg";
// import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <a href="https://faceofabovebeauty.com.ng/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </a>
      </nav>
    </div>
  );
}

export default Navbar;
