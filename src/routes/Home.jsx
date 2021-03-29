import React from "react";
import "../css/home.css";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Prizes from "../components/Prizes";
import Eligibility from "../components/Eligibility";
// import Partners from "../components/Partners";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <Banner />
      <Prizes />
      <Eligibility />
      {/* <Partners /> */}
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
