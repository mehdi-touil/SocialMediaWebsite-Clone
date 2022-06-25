import { nanoid } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore/lite";
import React from "react";
import { db } from "../Firebase-config";
import * as img from "../images/icons";
export default function Post({ post, del }) {
 const deletePost = async (event) => {
  const bookDoc = doc(db, "posts", event.target.id);
  await deleteDoc(bookDoc);
 };
 return (
  <div className="PostContainer">
   {del && (
    <i
     className="fa fa-trash fa-2x"
     aria-hidden="true"
     id={post.id}
     onClick={deletePost}
    ></i>
   )}
   <div className="PostHeader">
    <img src={img.useri} width="50px" />
    <div className="namejobcontainer">
     <div className="name">{post.poster}</div>
     <div className="job">Web Developer</div>
    </div>
   </div>
   <div className="postcontent">{post.content}</div>
   <div className="postimages">
    <img src={post?.image} />
   </div>
  </div>
 );
}
