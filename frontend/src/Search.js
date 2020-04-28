import React, { useState } from "react";

// Renders a search bar that enables a user to search.
function Search({ addQuery }) {
  const [formData, setFormData] = useState({
    query: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    addQuery(formData.query);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="query">Search:</label>
      <input name="query" onChange={handleChange} value={formData.query} />
      <button>Submit</button>
    </form>
  );
}

export default Search;
