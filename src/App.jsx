import React, { useState, useEffect, useRef } from 'react';
import Inputs from './Components/Inputs';
import Message from './Components/Message';
import Header from './Components/Header';


//Web socket url
const WebSocketURL = "wss://chatbot-backend-1i8i.onrender.com"

const App = () => {
  //Necessary states and refrences.
  const [messages, setMessages] = useState([]); //Store the chats.
  const [loading, setLoading] = useState(false);  //To implement loading spinner.
  const msgContainerRef = useRef(null);   //Refrence to msgContainer to make it scroll down.
  

  useEffect(() => {
    if (messages.length === 0 || messages[messages.length - 1].response !== '') return;

    const socket = new WebSocket(WebSocketURL); //Create new websocket.

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(messages[messages.length - 1].query); // Send user input when socket is open
      setLoading(true); // Set loading to true
    };

    socket.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessages((prev) => {
        const localMessage = prev;
        localMessage[localMessage.length - 1].response = event.data; // Update last message with response
        return [...localMessage];
      }); // Append new response
      setLoading(false); // Set loading to false
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setLoading(false);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      setLoading(false);
    };

    return()=>{
        socket.close();
    }
  }, [messages]);


  //Hook to scroll down the msgContainer.
  useEffect(() => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, [messages]);



  return (
    <div className="App flex flex-col h-[100dvh]">
      <Header setMessages={ setMessages } />
      <div ref={msgContainerRef} className="msgContainer flex justify-center align-center flex-grow bg-gray-900 overflow-auto">
        <div className="w-full p-2 text-xs sm:text-sm sm:w-9/12 text-white">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center bg-gray-900 flex-none">
        <Inputs setMessages={ setMessages } loading={ loading }/>
      </div>
    </div>
  );
};

export default App;
