import React from "react";

// Renders an indivual company detail card.
function CompanyCard({company}) {
  return (
    <div>
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <img src={company.logo_url} alt="no image provided" />
    </div>
  );
}

export default CompanyCard;