import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRoom } from '../context/RoomContext';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setRoomId: setContextRoomId, setUsername: setContextUsername } = useRoom();

  const createRoom = async () => {
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    try {
      const response = await axios.get('/api/room/create');
      const { roomId } = response.data;
      
      setContextUsername(username);
      setContextRoomId(roomId);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
      setError('Failed to create room. Please try again.');
    }
  };

  const joinRoom = async () => {
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!roomId.trim()) {
      setError('Please enter a room ID');
      return;
    }

    setJoining(true);
    setError('');

    try {
      const response = await axios.get(`/api/room/${roomId}`);
      if (response.data.exists) {
        setContextUsername(username);
        setContextRoomId(roomId);
        navigate(`/room/${roomId}`);
      } else {
        setError('Room not found');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      setError('Failed to join room. Please check the room ID and try again.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Milon Room</h1>
        <p>Video conferencing made simple</p>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="buttons-container">
          <button className="create-button" onClick={createRoom} disabled={joining}>
            Create New Meeting
          </button>
          
          <div className="divider">OR</div>
          
          <div className="form-group">
            <label htmlFor="roomId">Join with a code</label>
            <div className="join-input-container">
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter meeting code"
              />
              <button className="join-button" onClick={joinRoom} disabled={joining}>
                {joining ? 'Joining...' : 'Join'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 