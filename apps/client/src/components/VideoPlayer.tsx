import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  stream: MediaStream;
  username: string;
  muted?: boolean;
}

const VideoPlayer = ({ stream, username, muted = false }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(error => {
              console.error('Error playing video:', error);
            });
          }
        }}
      />
      <div className="username-label">{username}</div>
    </div>
  );
};

export default VideoPlayer; 