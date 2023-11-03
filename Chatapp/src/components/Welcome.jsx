import React from "react";
import styled from "styled-components";
export default function Welcome({ currentUser }) {
  return (
    <Container>
      <h1>
        Welcome <span>{currentUser.username}</span>
      </h1>
      <h3>Please select a chat to send a message</h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  padding-left: 3rem;
  h1 {
    font-size: 5rem;
    span {
      color: var(--mainlightcolor);
    }
  }
  h3 {
    font-size: 2rem;
    color: var(--mainlightcolor);
  }
  @media screen and (min-width: 720px) and (max-width: 1050px) {
    h1 {
      font-size: 3rem;
    }
    h3 {
      font-size: 1.5rem;
    }
  }
`;
