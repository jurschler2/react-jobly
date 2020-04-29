import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./JoblyAPI";
import { v4 as uuid } from "uuid";
import LoginToken from "./loginToken";
import { Redirect } from "react-router-dom";

// Renders a list of companies; shows a search bar and each company card
function Companies() {
  const { username, token } = useContext(LoginToken);

  const [companiesAPI, setCompaniesAPI] = useState([]);
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  console.log("jobs outside", jobs);

  // Get companies by search query (default query is "" for all companies!)
  useEffect(() => {
    async function getCompaniesAPI() {
      if (token) {
        const companies = await JoblyApi.getCompanies(query, token);
        setCompaniesAPI(companies);
      }
    }
    getCompaniesAPI();
  }, [query, token]);

  // Get jobs user has applied for on page load
  useEffect(() => {
    async function getUserAPI() {
      if (token) {
        let currentUser = await JoblyApi.getUser(username, token);
        setJobs(currentUser.jobs);
        console.log("jobs are", currentUser.jobs);
      }
    }
    getUserAPI();
  }, [token]);

  // PATCH jobs after applying for a job
  useEffect(() => {
    async function patchJobsApi() {
      if (username && jobs) {
        await JoblyApi.updateUser(username, { jobs }, token);
      }
    }
    patchJobsApi();
  }, [jobs]);

  // Set loginInfo credentials state from Login component
  const applyForJob = (handle) => {
    let newJobs = [...jobs, handle];
    setJobs(newJobs);
  };

  // If not logged in, redirect to home
  if (!localStorage["token"] && !token) {
    return <Redirect to="/" />;
  }

  // Set query state from Search component
  // Andrei: Try to disable feature of autoformat ()
  const addQuery = (query) => {
    setQuery(query);
  };

  let companyCardList = companiesAPI.map((c) => (
    <CompanyCard
      key={uuid()}
      company={c}
      jobs={jobs}
      applyForJob={applyForJob}
    />
  ));
  return (
    <div>
      Companies
      <Search addQuery={addQuery} />
      {companyCardList}
    </div>
  );
}

export default Companies;
