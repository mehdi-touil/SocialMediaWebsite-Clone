import React from "react";
import Contactitem from "./Contactitem";
import Searchbar from "./Searchbar";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";

const Contactscontainer = styled.div`
 display: flex;
 flex-direction: column;
 width: 30%;
 background-image: linear-gradient(to right, #558189, #4f6c86);
 height: 95%;
 border-radius: 15px;
 margin: 20px;
 overflow-x: hidden;
 margin-bottom: 10px;
`;
export default function Contacts({ users, getConversations, setOtherUser }) {
 return (
  <Contactscontainer>
   <Searchbar />
   {users.map((x) => {
    return (
     <Contactitem
      key={nanoid()}
      user={x}
      getConversations={getConversations}
      setOtherUser={setOtherUser}
     />
    );
   })}
  </Contactscontainer>
 );
}
