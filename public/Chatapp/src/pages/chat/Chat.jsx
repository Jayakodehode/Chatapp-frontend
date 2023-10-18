import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./chat.module.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../../utils/APIRoute";
import Contacts from "../../components/Contacts";
import Welcome from "../../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  /* useEffect(async () => {
    if (!localStorage.getItem("Chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("Chat-app-user")));
    }
  }, []);

  useEffect(async () => {
    if (currentUser)
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
  }, [currentUser]);*/ useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("Chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem("Chat-app-user")));
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

  /* return (
    <div className={style["main"]}>
      <div className={style["conatiner"]}>
        <div className={style["chat-conatiner"]}>
          <Contacts contacts={contacts} currentUser={currentUser} />
          <Welcome />
        </div>
      </div>
    </div>
  );*/
  return (
    <>
      <MainContainer>
        <div className="container">
          <div className="chat-container">
            <Contacts contacts={contacts} currentUser={currentUser} />
            <Welcome />
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
      grid-template-columns: 25% 75%; /* Fix the percentage values */
      background-color: var(--maindarkcolor);
    }
  }
`;
