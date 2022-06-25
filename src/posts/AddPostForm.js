import { addDoc, collection } from "firebase/firestore/lite";
import React, { useState } from "react";
import { db } from "../Firebase-config";
import {
 getStorage,
 ref,
 uploadBytesResumable,
 getDownloadURL,
} from "firebase/storage";
import { useUserAuth } from "../app/UserProvider";
export default function AddPostForm() {
 const storage = getStorage();
 const [postContent, setPostContent] = useState("");
 const [postImagefile, setPostImagefile] = useState(null);
 const [postImageurl, setPostImageurl] = useState("");
 const [uploadProgress, setUploadProgress] = useState(0);
 const user = useUserAuth();
 const handleUpload = () => {
  const imageRef = ref(storage, postImagefile.name);
  const uploadTask = uploadBytesResumable(imageRef, postImagefile);

  uploadTask.on(
   "state_changed",
   (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
   },
   (error) => {
    // Handle unsuccessful uploads
   },
   () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     setPostImageurl(downloadURL);
    });
   }
  );
 };
 const onAddPostClicked = async () => {
  await addDoc(collection(db, "posts"), {
   content: postContent,
   image: postImageurl,
   date: new Date().toISOString(),
   uid: user.uid,
   poster: user.name,
  });
 };

 return (
  <div className="addform">
   <input
    type="text"
    placeholder="Add a Post"
    onChange={(e) => {
     setPostContent(e.target.value);
    }}
   />
   <div className="uploadpart">
    <label htmlFor="imageinput">Add image</label>
    <input
     id="imageinput"
     type="file"
     onChange={(e) => {
      setPostImagefile(e.target.files[0]);
     }}
    />
    <button onClick={handleUpload}>upload</button>
   </div>
   <div className="uploadbar" style={{ width: uploadProgress + "%" }}>
    <p>{uploadProgress + "%"}</p>
   </div>
   <button id="addpost" onClick={onAddPostClicked}>
    Post <i className="fa fa-send-o"></i>
   </button>
  </div>
 );
}
