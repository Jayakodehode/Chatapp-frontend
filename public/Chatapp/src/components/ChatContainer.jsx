import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";

import axios from "axios";
import { sendMessageRoute } from "../utils/APIRoute";
import { getAllMessagesRoute } from "../utils/APIRoute";
export default function ChatContainer({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      if (currentUser && currentUser._id && currentChat) {
        try {
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.log("errormessage:", error);
          // Handle any errors, e.g., log or show an error message
        }
      }
    }

    fetchMessages();
  }, [currentUser, currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
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
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div
                  key={message._id}
                  className={`message ${
                    message.fromself ? "sended" : "received"
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  padding: 2rem;
  overflow: hidden;
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
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;

        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: var(--maindarkcolor);
      }
    }
    .sended {
      justify-content: flex-end;
    }
    .received {
      justify-content: flex-start;
    }
    .sended .content {
      background-color: var(--lightchatbg);
      color: var(--maindarkcolor);
    }

    .received .content {
      background-color: var(--mainlightcolor);
      color: var(--lightchatbg);
    }
  }
`;
