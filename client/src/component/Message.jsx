import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
//Chat code using Peerjs in react?
const Message = () => {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
		const peerRef=useRef(null)
  useEffect(() => {
    const myPeer = new Peer(); // Create a new Peer instance
    myPeer.on('open', (id) => {
      setPeer(myPeer);
      setPeerId(id);
						console.log(myPeer);
    });
				peerRef.current=myPeer
  }, []);

  const connectToPeer = (peerId) => {
    const conn = peerRef.current.connect(peerId); // Connect to another Peer
    conn.on('open', () => {
      // Connection opened
						console.log('opened');
      conn.send('Hello from me!');
    });

    conn.on('data', (data) => {
      // Data received
						console.log('Data received');
      setMessages((prevMessages) => [...prevMessages, { text: data, type: 'received' }]);
    });
  };

  const sendMessage = (message) => {
    const conn = peerRef.current.connect(peerId);
    conn.send(message);
    setMessages((prevMessages) => [...prevMessages, { text: message, type: 'sent' }]);
    setMessage('');
  };

  return (
    <div>
      <h1>PeerJS Chat App</h1>
      <div>
        <p>Your ID: {peerId}</p>
        <input
          type="text"
          placeholder="Enter peer ID"
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
        />
        <button onClick={() => connectToPeer(peerId)}>Connect</button>
      </div>
      <div>
        <div>
          {messages.map((msg, index) => (
            <div key={index} className={msg.type}>
              {msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={()=>sendMessage(message)}>Send</button>
      </div>
    </div>
  );
};

export default Message;
