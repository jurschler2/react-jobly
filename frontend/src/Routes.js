import React, {useState, useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Companies from "./Companies";
import Company from "./Company";
import Home from "./Home";
import Jobs from "./Jobs";
import Login from "./Login";
import Profile from "./Profile";
import JoblyApi from "./JoblyAPI";


// Routes for the Jobly frontend
function Routes() {

  const [companiesAPI, setCompaniesAPI] = useState([]);

  useEffect(() => {
    async function getCompaniesAPI() {
      const companies = await JoblyApi.getCompanies();
      setCompaniesAPI(companies);
    }
    getCompaniesAPI();
  }, [setCompaniesAPI]);

  return (
      <Switch>
        <Route exact path="/companies">
          <Companies companies={companiesAPI}/>
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
        <Redirect to="/"/>
      </Switch>
  )

}

export default Routes;