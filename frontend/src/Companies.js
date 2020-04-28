import React, { useState, useEffect } from "react";
import Search from "./Search";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./JoblyAPI";
import { v4 as uuid } from "uuid";

// Renders a list of companies; shows a search bar and each company card
function Companies() {
  const [companiesAPI, setCompaniesAPI] = useState([]);
  const [query, setQuery] = useState("");

  // Get companies by search query (default query is "" for all companies!)
  useEffect(() => {
    async function getCompaniesAPI() {
      const companies = await JoblyApi.getCompanies(query);
      setCompaniesAPI(companies);
    }
    getCompaniesAPI();
  }, [query, setCompaniesAPI]);

  // Set query state from Search component
  const addQuery = (query) => {
    setQuery(query);
  };

  let companiesHTML = companiesAPI.map((c) => (
    <CompanyCard key={uuid()} company={c} />
  ));
  return (
    <div>
      Companies
      <Search addQuery={addQuery} />
      {companiesHTML}
    </div>
  );
}

export default Companies;
