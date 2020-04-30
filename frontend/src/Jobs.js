import React, { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import Search from "./Search";
import JoblyApi from "./JoblyAPI";
import { v4 as uuid } from "uuid";
import LoginToken from "./loginToken";
import { Redirect } from "react-router-dom";

function Jobs({ user }) {
  const { token } = useContext(LoginToken);
  const [jobsAPI, setJobsAPI] = useState([]);
  // TODO: use something like this to prevent redirect from happening before rerender
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [appliedJobsIds, setAppliedJobsIds] = useState([]);

  // TODO: name all useEffect functions

  // Get jobs by search query (default query is "" for all jobs!)
  useEffect(() => {
    async function getJobsAPI() {
      if (token) {
        const jobs = await JoblyApi.getJobs(query, token);
        setJobsAPI(jobs);
      }
    }
    getJobsAPI();
  }, [query, token]);

  // Get jobs user has applied for on page load
  useEffect(() => {
    async function getUserAPI() {
      if (token && user) {
        let jobIds = [];
        user.jobs.map((job) => jobIds.push(job.id));
        setAppliedJobsIds(jobIds);
      }
    }
    getUserAPI();
  }, [token, user]);

  // POST TO JOBS/ID/APPLY to APPLY FOR JOB after clicking apply
  useEffect(() => {
    async function applyJobApi() {
      if (token && user && appliedJobsIds.length) {
        // JANKY SOLUTION ASK ABOUT THIS
        await JoblyApi.apply(appliedJobsIds[appliedJobsIds.length - 1], token);
      }
    }
    applyJobApi();
  }, [token, user, appliedJobsIds]);

  // Set loginInfo credentials state from Login component
  const applyForJob = (id) => {
    setAppliedJobsIds((oldJobs) => [...appliedJobsIds, id]);
  };

  // TODO: find a way to not check localStorage and not redirect
  // If not logged in, redirect to home
  if (!localStorage["token"] && !token) {
    return <Redirect to="/" />;
  }

  // Set query state from Search component
  const addQuery = (query) => {
    setQuery(query);
  };

  let jobsHTML = jobsAPI.map((j, idx) => (
    <JobCard
      key={idx}
      job={j}
      jobs={appliedJobsIds}
      applyForJob={applyForJob}
    />
  ));
  return (
    <div>
      Jobs
      <Search addQuery={addQuery} />
      {jobsHTML}
    </div>
  );
}

export default Jobs;
