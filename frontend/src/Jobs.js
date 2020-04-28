import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Search from "./Search";
import JoblyApi from "./JoblyAPI";
import { v4 as uuid } from "uuid";

function Jobs() {
  const [jobsAPI, setJobsAPI] = useState([]);
  const [query, setQuery] = useState("");

  // Get jobs by search query (default query is "" for all jobs!)
  useEffect(() => {
    async function getJobsAPI() {
      const jobs = await JoblyApi.getJobs(query);
      setJobsAPI(jobs);
    }
    getJobsAPI();
  }, [query, setJobsAPI]);

  // Set query state from Search component
  const addQuery = (query) => {
    setQuery(query);
  };

  let jobsHTML = jobsAPI.map((j) => <JobCard key={uuid()} job={j} />);
  return (
    <div>
      Jobs
      <Search addQuery={addQuery} />
      {jobsHTML}
    </div>
  );
}

export default Jobs;
