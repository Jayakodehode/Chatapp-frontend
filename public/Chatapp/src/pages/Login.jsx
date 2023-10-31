import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"; // to style
import { ToastContainer, toast } from "react-toastify"; //Toastify uses to show the errors
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; //axios uses to call the apis
import { loginRoute } from "../utils/APIRoute";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  //here we are specifying how error will shown up
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
        const { password, username } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem("Chat-app-user", JSON.stringify(data.user));
          console.log(data.user);
          navigate("/Chatapp-frontend/"); // Navigate after successful login
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // function to validate the details given in the form registration
  const handleValidation = () => {
    const { password, username } = values;
    if (password == "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("username and password is required ", toastOptions);
      return false;
    }
    return true;
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
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Don't have an account, register here{" "}
            <Link to="/Chatapp-frontend/register">Signup</Link>
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
