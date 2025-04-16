import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';
import VideoPlayer from '../components/VideoPlayer';
import Controls from '../components/Controls';
import Chat from '../components/Chat';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const {
    username,
    setRoomId,
    streams,
    users,
    isConnected,
    localStream
  } = useRoom();

  // Set room ID from URL params and redirect if no username
  useEffect(() => {
    if (!username) {
      navigate('/');
      return;
    }

    if (roomId) {
      setRoomId(roomId);
    }
  }, [roomId, username, setRoomId, navigate]);

  // If not connected, show connecting state
  if (!isConnected || !localStream) {
    return (
      <div className="connecting-container">
        <h2>Connecting to Room...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="room-container">
      <div className="room-header">
        <h2>Room: {roomId}</h2>
        <p>Copy this room ID to invite others</p>
        <div className="participants-count">
          {users.length} {users.length === 1 ? 'participant' : 'participants'}
        </div>
      </div>

      <div className="room-content">
        <div className="videos-grid">
          {streams.map((stream) => (
            <VideoPlayer
              key={stream.userId}
              stream={stream.stream}
              username={stream.username}
              muted={stream.userId === useRoom().userId}
            />
          ))}
        </div>

        <div className="side-panel">
          <Chat />
        </div>
      </div>

      <div className="room-footer">
        <Controls />
      </div>
    </div>
  );
};

export default Room; 