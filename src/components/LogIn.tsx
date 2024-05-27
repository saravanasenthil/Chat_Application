import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";


const Login: React.FC = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => console.error(error));
  };

  return (
    
    <div className="loginContainer">
        
        <div className="loginBox">
        <h2>CHAT APPLICATION</h2>
         
         <button className="loginButton" onClick={signInWithGoogle}>Login with Google</button>
         </div>
    </div>
  );
};

export default Login;
