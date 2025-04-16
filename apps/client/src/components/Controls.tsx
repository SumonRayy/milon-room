import { useRoom } from '../context/RoomContext';

const Controls = () => {
  const { toggleAudio, toggleVideo, leaveRoom, isAudioEnabled, isVideoEnabled } = useRoom();

  return (
    <div className="controls-container">
      <button
        className={`control-button ${isAudioEnabled ? 'active' : 'muted'}`}
        onClick={toggleAudio}
      >
        {isAudioEnabled ? '🎤' : '🔇'}
        <span>{isAudioEnabled ? 'Mute' : 'Unmute'}</span>
      </button>
      <button
        className={`control-button ${isVideoEnabled ? 'active' : 'disabled'}`}
        onClick={toggleVideo}
      >
        {isVideoEnabled ? '📹' : '🚫'}
        <span>{isVideoEnabled ? 'Stop Video' : 'Start Video'}</span>
      </button>
      <button className="control-button leave" onClick={leaveRoom}>
        ❌
        <span>Leave</span>
      </button>
    </div>
  );
};

export default Controls; 