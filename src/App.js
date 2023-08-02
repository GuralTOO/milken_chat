import React, { useEffect, useState } from "react";
// import useSocket from "./useSocket";
import "./App.css";
import Chat from "./Elements/Chat";
import Header from "./Elements/Header";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  // const socket = useSocket("https://visionproje.com");
  // const socket = useSocket("http://206.189.199.72:8001");

  return (
    <div className="App">
      <Header />
      <Chat />
    </div>
  );
};

export default App;
