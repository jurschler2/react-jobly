import React, { useState, useContext, useEffect } from "react";
import Alert from "./Alert";
import LoginToken from "./loginToken";
import { Redirect } from "react-router-dom";
import JoblyApi from "./JoblyAPI";

// Renders a specific user's profile with the ability to update that user's information.
function Profile({ addEditProfileInfo }) {
  const { token, username } = useContext(LoginToken);
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({ ...user, password: "" });

  useEffect(() => {
    async function getUserAPI() {
      let currentUser = await JoblyApi.getUser(username, token);
      setUser(currentUser);
      setFormData({ ...currentUser, password: "" });
      console.log("user is", currentUser);
    }
    getUserAPI();
  }, []);

  // If not logged in, redirect to home
  if (!token) return <Redirect to="/" />;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    addEditProfileInfo(formData);
  }

  const renderEditProfileHTML = () => {
    return (
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <label htmlFor="first_name">First Name:</label>
        <input
          name="first_name"
          onChange={handleChange}
          value={formData.first_name}
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
        />
        <label htmlFor="email">Email:</label>
        <input name="email" onChange={handleChange} value={formData.email} />
        <label htmlFor="photo_url">Photo URL:</label>
        <input
          name="photo_url"
          onChange={handleChange}
          value={formData.photo_url}
        />
        <label htmlFor="password">Re-enter Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button>Save Changes</button>
      </form>
    );
  };

  return (
    <div>
      {renderEditProfileHTML()}
      <Alert />
    </div>
  );
}

export default Profile;
