import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Companies from "./Companies";
import Company from "./Company";
import Home from "./Home";
import Jobs from "./Jobs";
import Login from "./Login";
import Profile from "./Profile";

// Routes for the Jobly frontend
function Routes() {
  // function renderHandle(props) {
  //   const { handle } = props.match.params;
  //   return <Company {...props} handle={handle} />;
  // }

  return (
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
        <Login />
      </Route>
      {/* <Route exact path="/login">
          <PrivateRoute />
        </Route> */}
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
