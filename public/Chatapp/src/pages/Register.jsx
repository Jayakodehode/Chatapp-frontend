import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Register() {
  const { values, setValues } = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password != confirmPassword) {
      toast.error("password and confirm password should be same", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="logo">
          <h1>Chatapp</h1>
        </div>
        <input
          type="text"
          name="Username"
          id=""
          placeholder="Username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          name="Email"
          id=""
          placeholder="Email ID"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="Password"
          id=""
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="Password"
          id=""
          placeholder=" Confirm Password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </FormContainer>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #1d190c;
    padding: 5rem;
    border-radius: 1rem;
    input {
      background-color: transparent;
      padding: 1rem;
      font-size: 1rem;
      outline: none;
      border-radius: 1rem;
      border: 2px solid #483e1e;
      color: var(--whitetext);
    }
    button {
      font-size: 1rem;
      padding: 1rem;
      border-radius: 1rem;
      outline: none;
      background: none;
      color: rgba(255, 255, 255, 0.87);
      border: 2px solid #483e1e;
      cursor: pointer;
      transition: 0.5s ease-in-out;
    }
    button:hover {
      background-color: #483e1e;
    }
  }
`;
