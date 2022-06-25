// import { nanoid } from "@reduxjs/toolkit";
// import React, { useState, useEffect, createContext, useContext } from "react";
// import { auth } from "../Firebase-config";
// import { adduser, addUserIfNotExist } from "./UsersProcess";
// import { signOut } from "firebase/auth";

// export const UserContext = createContext({ user: null });
// function UserProvider(props) {
//  const [user, setuser] = useState(null);
//  useEffect(() => {
//   auth.onAuthStateChanged((user) => {
//    const { displayName, email, photoURL, uid } = user;
//    setuser({
//     name: displayName,
//     email,
//     photoURL,
//     uid: uid,
//     status: "online",
//    });
//   });
//  }, []);
//  return (
//   <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
//  );
// }
// export default UserProvider;
// export function useUserAuth() {
//  return useContext(UserContext);
// }
import { useContext, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase-config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
 const [user, setUser] = useState({});

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
   if (!currentUser) setUser(null);
   else {
    setUser({
     name: currentUser?.displayName,
     email: currentUser?.email,
     photoURL: currentUser?.photoURL,
     uid: currentUser?.uid,
     status: "online",
    });
   }
  });
  return () => {
   unsubscribe();
  };
 }, []);

 return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useUserAuth = () => {
 return useContext(AuthContext);
};
