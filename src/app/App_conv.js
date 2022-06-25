import React, { createContext, useEffect, useState } from "react";
import { db } from "../Firebase-config";
import {
 collection,
 addDoc,
 doc,
 onSnapshot,
 orderBy,
 query,
} from "firebase/firestore/lite";
import Contacts from "../Conversations/Contacts";
import Conversation from "../Conversations/Conversation";
import { Chatcontainer, GlobalStyle } from "../Conversations/Globalstyle";
import { useUserAuth } from "./UserProvider";
function App_conv() {
 const [otherUser, setOtherUser] = useState({});
 const [users, setUsers] = useState([]);
 const [messages, setMessages] = useState([]);
 const messagesCollectionRef = collection(db, "messages");
 const getConversations = (SenderId, ReceiverId) => {
  const q1 = query(messagesCollectionRef);
  onSnapshot(q1, (querySnapshot) => {
   setMessages(
    querySnapshot.docs
     .map((doc) => ({
      id: doc.id,
      ...doc.data(),
     }))
     .filter(
      (x) =>
       (x.ReceiverId == ReceiverId && x.SenderId == SenderId) ||
       (x.ReceiverId == SenderId && x.SenderId == ReceiverId)
     )
     .slice()
     .sort((a, b) => a.date.localeCompare(b.date))
   );
  });
 };
 const getUsers = () => {
  const q = query(collection(db, "users"), orderBy("name", "desc"));
  onSnapshot(q, (querySnapshot) => {
   setUsers(
    querySnapshot.docs.map((doc) => ({
     id: doc.id,
     ...doc.data(),
    }))
   );
  });
 };

 useEffect(() => {
  getUsers();
 }, []);
 return (
  <Chatcontainer>
   <GlobalStyle />
   <Contacts
    users={users}
    getConversations={getConversations}
    setOtherUser={setOtherUser}
   />
   <Conversation messages={messages} otherUser={otherUser} />
  </Chatcontainer>
 );
}

export default App_conv;
