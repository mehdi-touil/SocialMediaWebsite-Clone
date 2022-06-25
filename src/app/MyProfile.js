import { nanoid } from "@reduxjs/toolkit";
import {
 collection,
 query,
 where,
 getDocs,
 onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../Firebase-config";
import { user } from "../images/icons";
import AddPostForm from "../posts/AddPostForm";
import Post from "../posts/Post";
import { loadPosts, selectAllPosts } from "../posts/PostSlice";
import { useUserAuth } from "./UserProvider";
const MyProfile = () => {
 const userId = useUserAuth().uid;
 const dispatch = useDispatch();
 const postsCollectionRef = collection(db, "posts");
 let posts = useSelector(selectAllPosts);

 useEffect(() => {
  function getPosts() {
   const q = query(postsCollectionRef);
   onSnapshot(q, (querySnapshot) => {
    dispatch(
     loadPosts(
      querySnapshot.docs.map((doc) => ({
       id: doc.id,
       ...doc.data(),
      }))
     )
    );
    posts = q;
   });
  }
  getPosts();
 }, []);
 const orderedPosts = posts
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .filter((x) => x.uid == userId);
 return (
  <div className="bigcontainer">
   <AddPostForm />
   <div className="postsContainer">
    {orderedPosts.map((post) => {
     return <Post post={post} key={nanoid()} del={true} />;
    })}
   </div>
  </div>
 );
};
export default MyProfile;
