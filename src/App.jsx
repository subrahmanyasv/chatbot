import React, { useState, useEffect, useRef } from 'react';
import Inputs from './Components/Inputs';
import Message from './Components/Message';
import Header from './components/Header';

//Function to fetch the data from the server and return the response as a string.

const WebSocketURL = "ws://chatbot-backend-1i8i.onrender.com"

const App = () => {

  //Necessary states and refrences.
  const [messages, setMessages] = useState([{ query: 'Hello', response: 'Hi' }]); //Store the chats.
  const [inputValue, setInputValue] = useState("");  //Get the current query.
  const [loading, setLoading] = useState(false);  //To implement loading spinner.
  const msgContainerRef = useRef(null);   //Refrence to msgContainer to make it scroll down.
  

  useEffect(() => {
    if (!inputValue) return; // Prevent empty messages from triggering WebSocket

    const socket = new WebSocket(WebSocketURL);

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(inputValue); // Send user input when socket is open
    };

    socket.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessages((prev) => [...prev, { query: inputValue, response: event.data }]); // Append new response
      setInputValue(""); // Clear input after receiving a response
      socket.close(); // Close WebSocket after getting response
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };


    return() => {
      socket.close();
      console.log("WebSocket disconnected");
    }
  }, [inputValue]);


  //Hook to scroll down the msgContainer.
  useEffect(() => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, [messages]);



  return (
    <div className="App flex flex-col h-screen">
      <Header />
      <div ref={msgContainerRef} className="msgContainer flex justify-center align-center flex-grow bg-gray-700 overflow-auto">
        <div className="w-9/12 text-white">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center bg-gray-700 flex-none">
        <Inputs inputValue={inputValue} setInputValue={setInputValue} />
      </div>
    </div>
  );
};

export default App;
