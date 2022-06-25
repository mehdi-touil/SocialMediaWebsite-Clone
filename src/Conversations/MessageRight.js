import { deleteDoc, doc } from "firebase/firestore/lite";
import React from "react";
import styled from "styled-components";
import { db } from "../Firebase-config";
import usericon from "../images/user.png";

const Messagecontainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: end;
 margin-top: 20px;
`;
const Img = styled.img`
 width: 50px;
 border-radius: 50%;
 margin-right: 30px;
`;
const Messagetext = styled.div`
 position: relative;
`;
const Messagecontent = styled.div`
 background-color: #78e08f;
 padding: 10px;
 border-radius: 20px;
 max-width: 100%;
 font-family: "Space Mono";
`;
const Messagedatetime = styled.div`
 font-size: small;
 position: absolute;
 color: white;
 width: 200px;
`;
export default function MessageRight({ msg, image }) {
 const deleteConversation = async (event) => {
  const convDoc = doc(db, "messages", event.target.id);
  await deleteDoc(convDoc);
 };
 return (
  <Messagecontainer>
   <i
    class="fa fa-trash fa-lg"
    aria-hidden="true"
    id={msg.id}
    onClick={deleteConversation}
   ></i>
   <Messagetext>
    <Messagecontent>{msg.content}</Messagecontent>
    <Messagedatetime>{msg.date}</Messagedatetime>
   </Messagetext>
   <Img src={image} />
  </Messagecontainer>
 );
}
