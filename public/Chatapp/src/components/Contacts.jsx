import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrenrUserImage] = useState(undefined);
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrenrUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelectedChat(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="logo">
            <h1>Chatapp</h1>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelectedChat ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow:hidden;
  background-color: var(--maindarkcolor);
  .logo{
    display:flex;
    justify-content:center;
    align-items:center;
    color:var(--lightchatbg);
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap:0.8rem;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
    .contact {
      background-color:var(--mainlightcolor);
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
     
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: var(--maindarkcolor);
      border:3px solid var(--mainlightcolor);
      border-radius:1rem;
    }
  }

  .current-user {
    background-color:var(--maindarkcolor);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width:720px)and(max-width:1050px){
     .contacts{
      .contact{
        gap:.5rem;
        .avatar {
          img {
            height: 1rem;
          }
        }
        .username {
          h3 {
           font-size:1rem;
          }
        }
      }
     }
    }
`;
