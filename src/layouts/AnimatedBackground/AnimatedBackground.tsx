import React, { useState, useEffect, useRef } from 'react';
import './AnimatedBackground.scss';
import loadingVideo from '../../assets/videos/loading.mp4';
import mainVideo from '../../assets/videos/main.mp4';

const AnimatedBackground: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isLoading && videoRef.current) {
      videoRef.current.play();
    }
  }, [isLoading]);

  const handleVideoEnd = () => {
    setIsLoading(false);
  };

  return (
    <div className="video-container">
      {isLoading ? (
        <video
          autoPlay 
          muted 
          className="video" 
          onEnded={handleVideoEnd}
        >
          <source src={loadingVideo} type="video/mp4" />
        </video>
      ) : (
        <video ref={videoRef} autoPlay loop muted className="video">
          <source src={mainVideo} type="video/mp4" />
        </video>
      )}
      <div className="video-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;