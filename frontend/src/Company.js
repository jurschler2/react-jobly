import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./JoblyAPI";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";

// Renders an indiviual company's details with its list of jobs.
function Company() {
  const handle = useParams().company;
  const [companyAPI, setCompanyAPI] = useState();

  // Get company by handle
  useEffect(() => {
    async function getCompanyAPI() {
      const company = await JoblyApi.getCompany(handle);
      setCompanyAPI(company);
    }
    getCompanyAPI();
  }, [handle, setCompanyAPI]);

  let jobsHTML;
  if (companyAPI) {
    jobsHTML = companyAPI.jobs.map((j) => <JobCard key={uuid()} job={j} />);
  } else {
    jobsHTML = null;
  }

  return (
    <div>
      <h2>{companyAPI ? companyAPI.name : null}</h2>
      {jobsHTML}
    </div>
  );
}

export default Company;
