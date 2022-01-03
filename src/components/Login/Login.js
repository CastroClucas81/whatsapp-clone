import React from "react";
import "./Login.css";
import Api from "./../../Api";

export default function Login({ onReceive }) {
  async function handleFacebookLogin() {
    let result = await Api.fbPopup();

    if (result) {
      onReceive(result.user);
    } else {
      alert("Error");
    }
  }

  return (
    <div className="login">
      <button onClick={handleFacebookLogin}>Logar com o Google</button>
    </div>
  );
}
