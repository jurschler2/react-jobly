import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Companies from "./Companies";
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
  // function renderHandle(props) {
  //   const { handle } = props.match.params;
  //   return <Company {...props} handle={handle} />;
  // }

  const [login, setLogin] = useState();
  const [token, setToken] = useState("");
  console.log("login", login);
  console.log("token", token);

  // Get auth / login token by login state (username, password)
  useEffect(() => {
    async function getTokenAPI() {
      if (login) {
        const token = await JoblyApi.login(login.username, login.password);
        setToken(token);
      }
    }
    getTokenAPI();
    console.log("token", token);
  }, [login]);

  // Set login credentials state from Login component
  const addLogin = (data) => {
    let newLogin = { ...data, id: uuid() };
    setLogin((login) => {
      return newLogin;
    });
  };

  return (
    <LoginToken.Provider value={token}>
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
          <Login addLogin={addLogin} />
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
