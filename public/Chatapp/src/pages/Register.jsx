import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoute";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    theme: "light",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { password, confirmPassword, username, email } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem("Chat-app-user", JSON.stringify(data.user));
          navigate("/"); // Navigate after successful registration
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    /* if (handleValidation()) {
      const { password, confirmPassword, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
    }
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem("Chat-app-user", JSON.stringify(data.user));
    }
    navigate("/");*/
  };

  // function to validate the details given in the form registration
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password != confirmPassword) {
      toast.error("Password and confrim password should be same", toastOptions);
    } else if (password.length < 8) {
      toast.error("Password should contain atleast 8 letters", toastOptions);
      return false;
    } else if (username.length < 4) {
      toast.error("Username should contain atleast 4 letters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Enter your emailid", toastOptions);
      return false;
    } else return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="logo">
            <h1>Chatapp</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder=" Confirm Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
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
