import React, { useState } from "react";
import Alert from "./Alert";

// Renders a login page for the user to login or signup.
function Login({ addLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    addLogin(formData);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        name="username"
        onChange={handleChange}
        value={formData.username}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />
      <button>Submit</button>
    </form>
  );
}

export default Login;
