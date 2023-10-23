import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./chat.module.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../../utils/APIRoute";
import Contacts from "../../components/Contacts";
import Welcome from "../../components/Welcome";
import ChatContainer from "../../components/ChatContainer";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("Chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem("Chat-app-user")));
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        console.log(currentUser);
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(
              `${allUsersRoute}/${currentUser._id}`
            );
            setContacts(response.data);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fetchContacts();
  }, [currentUser, navigate]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <MainContainer>
        <div className="container">
          <div className="chat-container">
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />

            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
              />
            )}
          </div>
        </div>
      </MainContainer>
    </>
  );
}
const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dbcfa9;
    .chat-container {
      height: 85vh;
      width: 85vw;
      display: grid;
      grid-template-columns: 25% 75%;
      background-color: var(--maindarkcolor);
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1050px) {
    .container {
      .chat-container {
        grid-template-columns: 35% 65%;
      }
    }
  }
`;
