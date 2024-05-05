import React from "react";
import "../App.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";


const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : "Good evening";

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4 white-text">{greeting}!</h1>
        <h3 className="white-text">Welcome {user ? user.name : null}</h3>
        <hr className="my-4" />
      </div>
    </>
  );
};

export default Home;

// className="col-lg-4 col-md-6 mb-4" is setting the class names for the div element. It is using Bootstrap's grid system classes to define the layout of the buttons.

// Here's what each class means:

// col-lg-4: This class sets the width of the column to 4 out of 12 columns for large screens (screens with a width greater than or equal to 992 pixels).
// col-md-6: This class sets the width of the column to 6 out of 12 columns for medium screens (screens with a width greater than or equal to 768 pixels and less than 992 pixels).
// mb-4: This class adds a margin bottom of 4 units to the div element.
