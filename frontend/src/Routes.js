import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Companies from "./Companies";
import Navigation from "./Navigation";
import Company from "./Company";
import Home from "./Home";
import Jobs from "./Jobs";
import Login from "./Login";
import Profile from "./Profile";
import { v4 as uuid } from "uuid";
import JoblyApi from "./JoblyAPI";
import LoginToken from "./loginToken";

// Routes for the Jobly frontend
function Routes() {

  const [loginInfo, setLoginInfo] = useState();
  const [registrationInfo, setRegistrationInfo] = useState();
  const [token, setToken] = useState("");

  // Get auth / login token by login state (username, password)
  // Set the login token to local storage on successful login, else set state
  // 'token' to existing local storage token value.
  useEffect(() => {
    async function getTokenAPI() {
      let currentUserToken;
      
      // To remove the localStorage key name 'token' and place in a config file and rename
      // with a more consistent and obvious name. An example of defensive programming

      // To add commentary above each of the if statements below
      if (loginInfo) {
        currentUserToken = await JoblyApi.login(loginInfo.username, loginInfo.password);
        setToken(currentUserToken);
        localStorage.setItem("token", currentUserToken);
      } else if (localStorage["token"]) {
        setToken(localStorage["token"]);
      } else if (registrationInfo) {
        currentUserToken = await JoblyApi.register(registrationInfo);
        setToken(currentUserToken);
        localStorage.setItem("token", currentUserToken);
      }
      return <Redirect to="/"/>
    }
    getTokenAPI();
    
  }, [loginInfo, registrationInfo]);

  // To add a more detailed explanation for the logout function and its consequences
  const logOut = () => {
    localStorage.setItem("token", "");
    setToken("");
  }

  // Set login credentials state from Login component
  const addLogin = (data) => {
    let newLogin = { ...data, id: uuid() };
    setLoginInfo(newLogin);
  };

  // Set login credentials state from Login component
  const addRegistration = (data) => {
    let newRegistration = { ...data, id: uuid() };
    setRegistrationInfo(newRegistration);
  };

  return (
    <LoginToken.Provider value={{token, logOut}}>
      <Navigation />
      <Switch>
        <Route exact path="/companies">
          <Companies />
        </Route>
        <Route exact path="/companies/:company">
          <Company />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/jobs">
          <Jobs />
        </Route>
        <Route exact path="/login">
          <Login addLogin={addLogin} addRegistration={addRegistration}/>
        </Route>
        {/* <Route exact path="/login">
          <PrivateRoute />
        </Route> */}
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Redirect to="/" />
      </Switch>
    </LoginToken.Provider>
  );
}

export default Routes;
