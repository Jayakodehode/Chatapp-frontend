import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./chat.module.css";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../../utils/APIRoute";
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

  return (
    <div className={style["main"]}>
      <div className={style["conatiner"]}>
        <div className={style["chat-conatiner"]}>chat</div>
      </div>
    </div>
  );
}
