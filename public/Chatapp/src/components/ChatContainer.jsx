import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIRoute";
export default function ChatContainer({ currentChat }) {
  const handleSendMsg = async (msg) => {
    alert(msg);
  };
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="user-image">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <ChatMessages />
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  padding: 2rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .user-image {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: var(--lightchatbg);
        }
      }
    }
  }
`;
