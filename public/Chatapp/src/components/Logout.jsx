import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Axios } from "axios";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Button>
        <h3 onClick={handleClick}>Logout</h3>
      </Button>
    </>
  );
}
const Button = styled.div`
  h3 {
    color: var(--lightchatbg);
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
