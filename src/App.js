import React, { useEffect, useState } from "react";
import useSocket from "./useSocket";
import "./App.css";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const socket = useSocket("http://localhost:5000");

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        console.log("Received message: ", msg);
        setServerResponse((prev) => prev + msg);
      });
    }
  }, [socket]);

  const sendTextToServer = () => {
    setServerResponse("");
    if (socket && socket.connected) {
      socket.emit("message", inputText);
    } else {
      console.error("Socket is not connected");
    }
  };

  return (
    <div className="App">
      <h1 className="title">Economic Club Chat</h1>
      <div className="content">
        <input
          className="input-text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          placeholder="Enter your text here"
        />
        <button className="button" onClick={sendTextToServer}>
          Send
        </button>
        <div className="response-container">
          <p>{serverResponse}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
