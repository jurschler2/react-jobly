import React from "react";
import Search from "./Search";
import CompanyCard from "./CompanyCard";

// Renders a list of companies; shows a search bar and each company card
function Companies({companies}) {

  console.log(companies)
  let companiesHTML = companies.map(c => <CompanyCard company={c}/>)
  return (
    <div>
      Companies
      <Search />
      {companiesHTML}
    </div>
  )

}

export default Companies;