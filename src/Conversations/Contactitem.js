import React, { useContext, useEffect } from "react";
import userimg from "../images/user.png";
import styled from "styled-components";
import { useUserAuth } from "../app/UserProvider";

const Contactcontainer = styled.div`
 display: flex;
 align-items: center;
 color: white;
 &:hover {
  background-color: #395060;
 }
`;
const Imgcontainer = styled.div``;
const Infocontainer = styled.div`
 display: flex;
 flex-direction: column;
`;
const Img = styled.img`
 border-radius: 50%;
 max-width: 100%;
 width: 50px;
 margin: 5px;
`;
const Userstatus = styled.p`
 font-size: small;
`;

export default function Contactitem(props) {
 const myuser = useUserAuth();
 return (
  <Contactcontainer
   onClick={() => {
    props.setOtherUser(props.user);
    props.getConversations(myuser.uid, props.user.uid);
   }}
   style={{ display: props.user.uid === myuser?.uid ? "none" : "" }}
  >
   <Imgcontainer>
    <Img src={props.user.photoURL} width="100%" />
   </Imgcontainer>
   <Infocontainer>
    <h3>{props.user.name}</h3>
    <Userstatus>{props.user.status}</Userstatus>
   </Infocontainer>
  </Contactcontainer>
 );
}
