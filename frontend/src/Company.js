import React, { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./JoblyAPI";
import { v4 as uuid } from "uuid";
import LoginToken from "./loginToken";
import { useParams, Redirect, Link } from "react-router-dom";

// Renders an indiviual company's details with its list of jobs.
function Company() {
  const { token } = useContext(LoginToken);
  const handle = useParams().company;
  const [companyAPI, setCompanyAPI] = useState();

  // Get company by handle
  useEffect(() => {
    async function getCompanyAPI() {
      const company = await JoblyApi.getCompany(handle, token);
      setCompanyAPI(company);
    }
    getCompanyAPI();
  }, [handle, token]);

  // If not logged in, redirect to home
  if (!localStorage["token"] && !token) {
    return <Redirect to="/" />;
  }

  let jobsHTML;
  if (companyAPI) {
    jobsHTML = companyAPI.jobs.map((j) => <JobCard key={uuid()} job={j} />);
  } else {
    jobsHTML = null;
  }

  return (
    <div>
      <Link to="/companies">Back</Link>
      <h2>{companyAPI ? companyAPI.name : null}</h2>
      {jobsHTML}
    </div>
  );
}

export default Company;
