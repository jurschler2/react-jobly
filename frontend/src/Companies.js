import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./JoblyAPI";
import { v4 as uuid } from "uuid";
import LoginToken from "./loginToken";

// Renders a list of companies; shows a search bar and each company card
function Companies() {
  // const {token} = useContext(LoginToken);
  const [companiesAPI, setCompaniesAPI] = useState([]);
  const [query, setQuery] = useState("");

  // Get companies by search query (default query is "" for all companies!)
  useEffect(() => {
    async function getCompaniesAPI() {
      const companies = await JoblyApi.getCompanies(query);
      setCompaniesAPI(companies);
    }
    getCompaniesAPI();
  }, [query]);

  // Set query state from Search component
  // Andrei: Try to disable feature of autoformat ()
  const addQuery = (query) => {
    setQuery(query);
  };

  let companyCardList = companiesAPI.map((c) => (
    <CompanyCard key={uuid()} company={c} />
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
