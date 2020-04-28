import React from "react";

// Renders an individual job detail card.
function JobCard({ job }) {
  return (
    <div>
      <h4>{job.title}</h4>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
    </div>
  );
}

export default JobCard;
