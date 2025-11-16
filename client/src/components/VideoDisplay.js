import React from 'react';
import './VideoDisplay.css';

const VideoDisplay = ({
  videoLocalRef,
  videoRemoteRef,
  audioRemoteRef,
  isInCall,
  isCallIncoming,
  remoteIdentity
}) => {
  const showVideo = isInCall || isCallIncoming;

  return (
    <>
      <div className={`video-container ${showVideo ? 'active' : ''}`}>
        {/* Remote Video */}
        <div className="video-remote-wrapper">
          <video
            ref={videoRemoteRef}
            id="video_remote"
            className="video-remote"
            autoPlay
            playsInline
          />
          {showVideo && (
            <div className="video-overlay">
              <div className="remote-identity">{remoteIdentity || 'Unknown'}</div>
            </div>
          )}
          {!showVideo && (
            <div className="video-placeholder">
              <div className="placeholder-icon">📹</div>
              <div className="placeholder-text">No active call</div>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        {showVideo && (
          <div className="video-local-wrapper">
            <video
              ref={videoLocalRef}
              id="video_local"
              className="video-local"
              autoPlay
              playsInline
              muted
            />
            <div className="local-label">You</div>
          </div>
        )}
      </div>

      {/* Audio element for remote audio */}
      <audio
        ref={audioRemoteRef}
        id="audio_remote"
        autoPlay
        playsInline
      />
    </>
  );
};

export default VideoDisplay;
