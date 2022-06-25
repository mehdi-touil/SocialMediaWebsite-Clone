import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase-config";
import {
 collection,
 onSnapshot,
 query,
} from "firebase/firestore/lite";
import Post from "./Post";
import { loadPosts, selectAllPosts } from "./PostSlice";
import { nanoid } from "@reduxjs/toolkit";
export default function PostsList() {
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
  .sort((a, b) => b.date.localeCompare(a.date));

 return (
  <div className="postsContainer">
   {orderedPosts.map((post) => {
    return <Post post={post} key={nanoid()} del={false} />;
   })}
  </div>
 );
}
