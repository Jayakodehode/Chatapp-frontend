import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPickerShowHide = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emoji) => {
    console.log("Emoji clicked:", emoji);
    let message = msg;
    message += event.emoji; // Ensure emoji is defined
    console.log("Updated message:", message);
    setMsg(message);
  };
  const sendMessage = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <>
      <Container>
        <div className="emoji-container">
          <div className="emoji">
            <BsEmojiSmile onClick={handleEmojiPickerShowHide} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form
          className="input-container"
          onSubmit={(e) => {
            sendMessage(e);
          }}
        >
          <input
            type="text"
            placeholder="message here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />

          <button className="send-btn">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
.emoji-container{
  display: flex;
  justify-content: center;
    align-items: center;

  .emoji {
    position:relative;
    
    svg {
      font-size: 1.2rem;
      color: var(--lightchatbg);
      cursor: pointer;
    }
    .EmojiPickerReact{
      position:absolute;
      top:-500px;
      --epr-bg-color: var(--maindarkcolor);
  --epr-category-label-bg-color:var(--maindarkcolor);
  --epr-text-color: var(--lightchatbg);
  --epr-hover-bg-color:var(--lightchatbg);
      border:1px solid var(--mainlightcolor);
      .emoji-scroll-wrapper::-webkit-scrollbar{
        background-color:var(--maindarkcolor);
        width:5px;
        &-thumb{
          background-color:var(--lightchatbg);
        }

      }
      
    }
  }
}
  .input-container {
    background-color: var(--mainlightcolor);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    input {
      width: 90%;
      border: none;
      outline: none;
      padding: 0.8rem;
      background-color: transparent;
      font-size: 1.2rem;
      color: var(--lightchatbg);
    }
    button {
      width:10%
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--lightchatbg);
      outline: none;
      border: none;
      border-radius: 2rem;
      padding:.5rem 1.5rem ;
      svg {
        font-size: 1.2rem;
        color: var(--maindarkcolor);
        cursor: pointer;
      }
    }
  }
`;

/*const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  
    .emoji {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 1.2rem;
        color: var(--lightchatbg);
        cursor: pointer;
      }
    }
    input {
      width: 100%;
      border: none;
      outline: none;
      padding: 0.8rem;
      background-color: transparent;
      font-size: 1.2rem;
      color: var(--lightchatbg);
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--lightchatbg);
      outline: none;
      border: none;
      border-radius: 2rem;
      svg {
        font-size: 1.2rem;
        color: var(--maindarkcolor);
        cursor: pointer;
      }
    }
  }
`;*/
