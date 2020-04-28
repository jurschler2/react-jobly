import React from "react";
import {NavLink} from "react-router-dom";
import JobCard from "./JobCard";
// import JoblyApi from "./JoblyAPI";

let loggedIn = true;



// Renders a navigation bar which is dependent on whether a user is logged in.
function Navigation() {

  return (
    <nav>
      {loggedIn ? (
        <ul>
          <li>
            <NavLink to="/">Jobly</NavLink>
          </li>
          <li>
            <NavLink to="/companies">Companies</NavLink>
          </li>
          <li>
            <NavLink to="/jobs">Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/">Logout</NavLink>
          </li>
        </ul>
      ) : (
        <ul>
            <li>
            <NavLink to="/">Jobly</NavLink>
          </li>
          <li>
            <NavLink to="/login">login</NavLink>
          </li>
          </ul>
        )}
    </nav>
  )
}

export default Navigation;