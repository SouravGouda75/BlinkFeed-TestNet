// ChatComponent.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './video.css'
// const socket = io('http://localhost:3000'); // Replace with your server's URL

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    message:'',
    receivable:false
  });

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', ({message,receivable}) => {
      setMessages((prevMessages) => [...prevMessages, {message:message,receivable:receivable}]);
      setMessages.splice(1, 1)
    });
  }, [setMessages]);
  
  const sendMessage = ({message,receivable}) => {
    if (message.trim() !== '') {
      
      setMessages((prevMessages) => [...prevMessages, {message:message,receivable:receivable}]);
      socket.emit('message', {message:message,receivable:false});
      setNewMessage({message:'',receivable:false});
    }
  };

  return (
    <div className='container'>
      <h1>Chat</h1>
      <div className='box'>
        {messages.map(({message,receivable}, index) => (
          
            receivable ? <div className='chat-left' key={index}>{message}</div> :<div className='chat-right' key={index}>{message}</div> 
          
        ))}
      </div>
      <div className="sendContainer">
        
      <input
        type="text"
        value={newMessage.message}
        onChange={(e) => setNewMessage({message:e.target.value,receivable:false})}
        />
      <button className='sendbtn' onClick={()=>sendMessage(newMessage)}>Send</button>
        </div>
    </div>
  );
}

export default ChatComponent;
