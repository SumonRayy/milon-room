import { useState, useEffect, useRef } from 'react';
import { useRoom } from '../context/RoomContext';
import { ChatMessage } from '@milon-room/shared';

const Chat = () => {
  const { messages, sendMessage } = useRoom();
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat</h3>
      </div>
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message: ChatMessage) => (
          <div key={message.id} className="message">
            <div className="message-header">
              <span className="sender">{message.sender}</span>
              <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
            </div>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 