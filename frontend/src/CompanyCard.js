import React from "react";
// import Alert from "./Alert";
import { Link } from "react-router-dom";

// Renders an indivual company detail card.
function CompanyCard({ company, jobs, applyForJob }) {
  return (
    <div>
      <Link to={`companies/${company.handle}`}>
        <h4>{company.name}</h4>
      </Link>
      <p>{company.description}</p>
      <img src={company.logo_url} alt="no image provided" />
      {jobs.includes(company.handle) ? (
        <p>applied</p>
      ) : (
        <button onClick={() => applyForJob(company.handle)}>Apply</button>
      )}
    </div>
  );
}

export default CompanyCard;
