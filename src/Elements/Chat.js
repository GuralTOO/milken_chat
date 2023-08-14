import React, { useState, useEffect, useRef } from "react";
import Chatbox from "./Chatbox";
import { Card, CardContent, Link, Typography, Divider } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const PageLink = ({ link, summary }) => {
  return (
    <Card
      variant="outlined"
      style={{
        marginTop: "10px",
        backgroundColor: "#f4f4f4",
        color: "black",
        // borderRadius: "20px",
        marginRight: "10px",
        width: "45%",
        height: "100%",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <CardContent
        style={{
          paddingBottom: "50px", // Added padding-bottom to prevent overlap with the link
        }}
      >
        <Typography fontSize={"small"}>{summary}</Typography>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          display="block"
          style={{ marginTop: "10px", position: "absolute", bottom: "10px" }}
        >
          <LaunchIcon style={{ color: "#d54407" }} />
        </Link>
      </CardContent>
    </Card>
  );
};

const LinkRenderer = ({ links }) => {
  return links && links.length > 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {links.map((link, index) => {
          return (
            <PageLink key={index} link={link.url} summary={link.summary} />
          );
        })}
      </div>
      <Divider style={{ backgroundColor: "#f4f4f4", marginTop: "10px" }} />{" "}
    </div>
  ) : null;
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentBotMessage, setCurrentBotMessage] = useState(
    "Hi, how can I help you?"
  );
  const [currentSources, setCurrentSources] = useState([]);

  const userMessaged = (message) => {
    if (currentBotMessage !== "") {
      // add the previous message to the messages array
      setMessages((prev) => [
        ...prev,
        {
          source: "bot",
          text: currentBotMessage,
          links: currentSources,
        },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        source: "user",
        text: message,
      },
    ]);
  };

  const divRef = useRef(null);
  useEffect(() => {
    if (!divRef.current) return;
    console.log("observing");
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log(`Height changed to ${entry.contentRect.height}`);
        // scroll to bottom
        divRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
    resizeObserver.observe(divRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <div
      style={{
        // if the device is mobile, set the width to 100%
        // if the device is not mobile, set the width to 65% if the device is a monitor, or 85% if the device is a laptop
        width:
          window.innerWidth < 600
            ? "100%"
            : window.innerWidth < "2000"
            ? "80%"
            : "65%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <div
        style={{
          color: "black",
          flexDirection: "column",
          display: "flex",
          alignContent: "flex-end",
        }}
      >
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                maxWidth: "75%",
                marginTop: "1vh",
                marginBottom: "2vh",
                padding: 0,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 20,
                alignSelf:
                  message.source === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  message.source === "user" ? "#2e2e34" : "#0066cc",
                color: message.source === "user" ? "white" : "#f4f4f4",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex" }}>
                <LinkRenderer links={message.links} />
              </div>
              <p>{message.text}</p>
            </div>
          );
        })}

        <div
          style={{
            display: "flex",
            maxWidth: "75%",
            marginTop: "1vh",
            marginBottom: "2vh",
            padding: 0,
            paddingLeft: 20,
            paddingRight: 20,
            // backgroundColor: "#0066cc", milken blue
            backgroundColor: "#0066cc",
            color: "#f4f4f4",
            borderRadius: 20,
            flexDirection: "column",
          }}
          ref={divRef}
        >
          <div style={{ display: "flex" }}>
            <LinkRenderer links={currentSources} />
          </div>
          <p>{currentBotMessage}</p>
        </div>
      </div>
      <div style={{ bottom: 0, width: "100%", position: "sticky" }}>
        <Chatbox
          userMessaged={userMessaged}
          setOutputMessage={setCurrentBotMessage}
          setSources={setCurrentSources}
        />
      </div>
    </div>
  );
};

export default Chat;
