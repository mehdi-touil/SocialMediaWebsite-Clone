import React, { useEffect } from "react";
import { logout } from "../Firebase-config";
const Logout = () => {
 useEffect(() => {
  logout();
 });
 return <div></div>;
};

export default Logout;
