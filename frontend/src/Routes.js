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
// import GlobalUser from "./globalUser";

// Routes for the Jobly frontend
function Routes() {
  const [loginInfo, setLoginInfo] = useState();
  const [registrationInfo, setRegistrationInfo] = useState();
  const [editProfileInfo, setEditProfileInfo] = useState();

  const [token, setToken] = useState("");
  const [username, setUsername] = useState();

  // Get auth / login token by login state (username, password)
  // Set the login token to local storage on successful login, else set state
  // 'token' to existing local storage token value.
  useEffect(() => {
    async function getTokenAPI() {
      let currentUserToken;
      let currentUsername;

      // To remove the localStorage key name 'token' and place in a config file and rename
      // with a more consistent and obvious name. An example of defensive programming

      // If login attempt made and we have loginInfo (username, password) from form
      if (loginInfo) {
        currentUserToken = await JoblyApi.login(
          loginInfo.username,
          loginInfo.password
        );

        if (currentUserToken) currentUsername = loginInfo.username;

        setToken(currentUserToken);
        setUsername(currentUsername);
        localStorage.setItem("token", currentUserToken);
        localStorage.setItem("username", currentUsername);

        // If just loading a page/route, rather than logging in
      } else {
        // If we have a token in localStorage (logged in in localStorage)
        if (localStorage["token"]) {
          setToken(localStorage["token"]);
          console.log("LOCALSTORAGE TOKEN IS", localStorage["token"]);
        }
        // If we have user in localStorage
        if (localStorage["username"]) {
          setUsername(localStorage["username"]);
        }
        // If register attempt made and we have registrationInfo (username, password, ...) from form
        if (registrationInfo) {
          currentUserToken = await JoblyApi.register(registrationInfo);

          if (currentUserToken) currentUsername = loginInfo.username;

          setToken(currentUserToken);
          setUsername(currentUsername);
          localStorage.setItem("token", currentUserToken);
          localStorage.setItem("username", currentUsername);
        }
      }
      return <Redirect to="/" />;
    }
    getTokenAPI();
  }, [loginInfo, registrationInfo]);

  useEffect(() => {
    async function updateProfile() {
      let currentUsername;
      if (editProfileInfo) {
        let res = await JoblyApi.updateUser(
          editProfileInfo.username,
          editProfileInfo,
          token
        );
        currentUsername = res.username;
        setUsername(currentUsername);
        localStorage.setItem("username", currentUsername);
      }
      return <Redirect to="/" />;
    }
    updateProfile();
  }, [editProfileInfo]);

  // Set token/user in localStorage and context to "" and null
  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user", null);
    setToken("");
    setUsername("");
  };

  // Set loginInfo credentials state from Login component
  const addLogin = (data) => {
    let newLogin = { ...data, id: uuid() };
    setLoginInfo(newLogin);
  };

  // Set registrationInfo credentials state from Login component
  const addRegistration = (data) => {
    let newRegistration = { ...data, id: uuid() };
    setRegistrationInfo(newRegistration);
  };

  // Set editProfileInfo credentials state from Profile component
  const addEditProfileInfo = (data) => {
    let newEdit = { ...data, id: uuid() };
    setEditProfileInfo(newEdit);
  };

  return (
    <LoginToken.Provider value={{ token, username, logOut }}>
      {/* <GlobalUser.Provider value={{ user }}> */}
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
          <Login addLogin={addLogin} addRegistration={addRegistration} />
        </Route>
        {/* <Route exact path="/login">
          <PrivateRoute />
        </Route> */}
        <Route exact path="/profile">
          <Profile addEditProfileInfo={addEditProfileInfo} />
        </Route>
        <Redirect to="/" />
      </Switch>
      {/* <JoblyApi /> */}
      {/* </GlobalUser.Provider> */}
    </LoginToken.Provider>
  );
}

export default Routes;
