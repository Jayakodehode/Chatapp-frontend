import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import loader from "../assets/Spinner-3.gif";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoute";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    theme: "light",
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Chat-app-user"));
    if (user && user.isAvatarImageSet) {
      navigate("/Chat-app/");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      let data;
      try {
        const user = JSON.parse(localStorage.getItem("Chat-app-user"));
        console.log(user);

        if (user) {
          // Check if user is defined
          ({ data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar],
          }));
        }
        console.log("Received data:", data);
        if (data && data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("Chat-app-user", JSON.stringify(user));
          navigate("/Chat-app/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      } catch (error) {
        // Handle any axios or other errors here
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.", toastOptions);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
            //it will generate random numbers with will get different images
          );
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          if (error.response && error.response.status === 429) {
            // If you receive a 429 error, wait for some time and retry
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
          // Handle other errors as needed
        }
      }
      setAvatars(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: var(--mainlightcolor);
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid var(--maindarkcolor);
    }
  }
  .submit-btn {
    font-size: 2rem;
    background-color: var(--maindarkcolor);
    color: white;
    padding: 1rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    &:hover {
      border: 2px solid var(--maindarkcolor);
      background: none;
    }
  }
`;
