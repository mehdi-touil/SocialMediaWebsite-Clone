import GoogleButton from "react-google-button";
import React from "react";
import { signInWithGoogle } from "../Firebase-config";
function Login() {
 return (
  <div className="login">
   <GoogleButton onClick={signInWithGoogle} />
  </div>
 );
}
export default Login;
