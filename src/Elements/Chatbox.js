import { TextField, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import useSocket from "../useSocket";

// Theme
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

const Chatbox = ({ userMessaged, setOutputMessage, setSources }) => {
  // const serverUrl = "http://127.0.0.1:5001";
  // const socket = useSocket("https://206.189.199.72:8001");
  const socket = useSocket("https://milken.visionproje.com");
  // const socket = useSocket("http://10.0.0.134:8000");

  const [message, setMessage] = useState("");
  // const [outputMessage, setOutputMessage] = useState("");
  const [buffer, setBuffer] = useState(""); // Add this line
  const [shouldStartDraining, setShouldStartDraining] = useState(false);

  // Update the output message from the buffer at a steady rate
  useEffect(() => {
    if (buffer.length > 10) {
      // Wait until there are at least 10 characters in the buffer
      setShouldStartDraining(true);
    }

    const intervalId = setInterval(() => {
      if (shouldStartDraining && buffer.length > 0) {
        setOutputMessage((prev) => prev + buffer.charAt(0));
        setBuffer((prev) => prev.slice(1));
      }
    }, 10); // Adjust this value to control the speed

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [buffer, shouldStartDraining]);

  // stream version
  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        console.log("Received message: ", msg);
        setBuffer((prev) => prev + msg);
      });
      // detect when the message is done streaming
      socket.on("end", () => {
        console.log("end of message");
        setShouldStartDraining(false);
      });
    }
  }, [socket]);

  const handleSendStream = async (event) => {
    console.log("I be sending streamin");
    // send the user message to parent component chat
    userMessaged(message);
    event.preventDefault(); // Add this line
    setOutputMessage("");
    setSources([]);

    // make api call to get current sources
    const response = await fetch(
      `https://milken.visionproje.com/search/${encodeURIComponent(message)}`
      // `http://10.0.0.134:8000/search/${encodeURIComponent(message)}`
    );

    const data = await response.json();
    console.log("the data is: ", data);
    setSources(data["results"]);
    if (socket && socket.connected) {
      socket.emit("message", message);
      console.log("sent a message");
    } else {
      console.error("Socket is not connected");
    }
  };

  return (
    <div
      style={{
        // paddingBottom: "0vh",
        backgroundColor: "white",
      }}
    >
      {/* center the text */}
      <form onSubmit={handleSendStream}>
        <Box display="flex" color={"black"}>
          <CustomTextField
            type="text"
            variant="outlined"
            placeholder="Tell me about x..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ marginRight: 8, color: "black" }}
            InputProps={{
              // Target the input element
              style: { color: "black" },
              className: "outlined-input",
            }}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#d54407" }}
          >
            Send
          </Button>
        </Box>
      </form>
      <p style={{ textAlign: "center", margin: "0px", paddingBottom: "1vh" }}>
        This Chatbot is in beta stage development and has access to a limited
        amount of information.{" "}
      </p>
    </div>
  );
};

export default Chatbox;
