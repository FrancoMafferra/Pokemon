import React from "react";
import { Link } from "react-router-dom";
import "./button.css"
import "./landing.css"

function LandingPage() {
  return (
    <div className="main_container">
    {/* <div className="titel">Welcome To Adventure!</div> */}
        <Link to="/home">
            <button className="button_home">Completa tu Pokedex</button>
        </Link>
    </div>
  );
}

export default LandingPage;