import React from "react";
import "./ChatIntro.css";
import IntroConnection from "./../../assets/intro-connection.jpg";

export default function ChatIntro() {
  return (
    <div className="chatIntro">
      <img src={IntroConnection} alt=""/>
      <h1>Mantenha seu celular conectado.</h1>
      <h2>
        Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi
      </h2>
    </div>
  );
}
