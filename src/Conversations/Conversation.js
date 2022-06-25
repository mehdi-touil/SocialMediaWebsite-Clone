import { addDoc, collection, doc, getDoc } from "firebase/firestore/lite";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { db } from "../Firebase-config";
import { useUserAuth } from "../app/UserProvider";
import Contactitem from "./Contactitem";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
import { nanoid } from "@reduxjs/toolkit";
const Conversationcontainer = styled.div`
 display: flex;
 flex-direction: column;
 background-color: #395060;
 height: 95%;
 border-radius: 15px;
 width: 70%;
 margin: 20px;
`;
const Conversationbody = styled.div`
 height: 80%;
 background-image: linear-gradient(to right, #526b8a, #4d5583);
 overflow-y: scroll;
 overflow-x: hidden;
`;
const Input = styled.input`
 padding: 0.5em;
 margin: 0.5em;
 border: none;
 width: calc(100% - 2em);
 border-radius: 10px;
 font-size: 20px;
 background-color: #7b89b9;
 padding: 20px;
 margin: 10px;
`;
const Button = styled.button`
 padding: 0.5em;
 margin: 0.5em;
 border: none;
 width: 20%;
 border-radius: 10px;
 background-color: #7b89b9;
 padding: 0px;
 margin: 10px;
 &:hover {
  background-color: #253362;
 }
`;
const Conversationtyping = styled.div`
 display: flex;
`;
export default function Conversation({ messages, otherUser }) {
 const myuser = useUserAuth();
 const addConversation = async (SenderId, ReceiverId, msg) => {
  await addDoc(collection(db, "messages"), {
   SenderId,
   ReceiverId,
   content: msg,
   date: new Date().toLocaleString("en-US", { hour12: false }),
  });
 };

 const [msg, setMsg] = useState("");
 const submitmessage = () => {
  addConversation(myuser.uid, otherUser.uid, msg);
 };
 return (
  <Conversationcontainer>
   <Contactitem user={otherUser} />
   <Conversationbody>
    {messages.map((message) => {
     return message.SenderId == myuser.uid ? (
      <MessageRight msg={message} key={nanoid()} image={myuser.photoURL} />
     ) : (
      <MessageLeft msg={message} key={nanoid()} image={otherUser.photoURL} />
     );
    })}
   </Conversationbody>
   <Conversationtyping>
    <Input
     placeholder="Type Your message"
     onChange={(e) => {
      setMsg(e.target.value);
     }}
    />
    <Button onClick={submitmessage}>
     <i className="fa fa-send-o" style={{ fontSize: "24px" }}></i>
    </Button>
   </Conversationtyping>
  </Conversationcontainer>
 );
}
