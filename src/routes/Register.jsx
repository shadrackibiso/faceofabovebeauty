import React from "react";
import "../css/register.css";
import "../css/home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  return (
    <>
      <div className="registerForm">
        <Navbar />
        <div className="section registerSection">
          {/* <!-- label --> */}
          <div className="label">Register</div>
          <div className="labelLine"></div>
          {/*  */}
          <a
            className="mainBtn registerPayBtn"
            href="https://paystack.com/pay/missbellezanigeria2021"
          >
            Pay Now/Register
          </a>
          {/*  */}
          <div className="registerTerms">
            <ul>
              <li>Registration costs N3000</li>
              <li>
                You must be between the age of 18-30 to register for this
                competition
              </li>
              <li>
                You will be able to create your profile and upload an image for
                the contest after payment has been successfully made
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
