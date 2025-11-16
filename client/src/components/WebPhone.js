import React, { useState } from 'react';
import useSIP from '../hooks/useSIP';
import Registration from './Registration';
import CallControls from './CallControls';
import VideoDisplay from './VideoDisplay';
import Dialpad from './Dialpad';
import './WebPhone.css';

const WebPhone = () => {
  const [showDialpad, setShowDialpad] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [withVideo, setWithVideo] = useState(true);

  const sip = useSIP();

  const handleRegister = (credentials) => {
    sip.register(credentials);
  };

  const handleUnregister = () => {
    sip.unregister();
  };

  const handleCall = () => {
    if (phoneNumber.trim()) {
      sip.call(phoneNumber, withVideo);
    }
  };

  const handleAnswer = () => {
    sip.answer(withVideo);
  };

  const handleHangup = () => {
    sip.hangup();
  };

  const handleToggleHold = () => {
    sip.toggleHold();
  };

  const handleToggleMute = () => {
    sip.toggleMute();
  };

  const handleDTMF = (digit) => {
    sip.sendDTMF(digit);
    setPhoneNumber(prev => prev + digit);
  };

  const handleTransfer = () => {
    const destination = prompt('Enter transfer destination:');
    if (destination) {
      sip.transfer(destination);
    }
  };

  const handleDialpadToggle = () => {
    setShowDialpad(!showDialpad);
  };

  const handleClearNumber = () => {
    setPhoneNumber('');
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  return (
    <div className="webphone-container">
      <div className="webphone-header">
        <h1>WebPhone</h1>
        <div className="status-indicator">
          <div className={`status-dot ${sip.isRegistered ? 'registered' : 'unregistered'}`}></div>
          <span>{sip.isRegistered ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      <div className="webphone-content">
        {!sip.isRegistered && !sip.isRegistering ? (
          <Registration onRegister={handleRegister} status={sip.registrationStatus} />
        ) : (
          <>
            <div className="connection-status">
              {sip.registrationStatus && (
                <div className="status-message info">
                  {sip.registrationStatus}
                </div>
              )}
            </div>

            {/* Video Display */}
            <VideoDisplay
              videoLocalRef={sip.videoLocalRef}
              videoRemoteRef={sip.videoRemoteRef}
              audioRemoteRef={sip.audioRemoteRef}
              isInCall={sip.isInCall}
              isCallIncoming={sip.isCallIncoming}
              remoteIdentity={sip.remoteIdentity}
            />

            {/* Call Status */}
            {sip.callStatus && (
              <div className="call-status">
                {sip.callStatus}
              </div>
            )}

            {/* Phone Number Input */}
            {!sip.isInCall && !sip.isCallIncoming && (
              <div className="phone-input-container">
                <div className="phone-input-wrapper">
                  <input
                    type="text"
                    className="phone-input"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCall();
                      }
                    }}
                  />
                  {phoneNumber && (
                    <button className="btn-clear" onClick={handleClearNumber}>
                      ✕
                    </button>
                  )}
                </div>
                <div className="video-toggle">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={withVideo}
                      onChange={(e) => setWithVideo(e.target.checked)}
                    />
                    <span>Video Call</span>
                  </label>
                </div>
              </div>
            )}

            {/* Call Controls */}
            <CallControls
              isInCall={sip.isInCall}
              isCallIncoming={sip.isCallIncoming}
              isHeld={sip.isHeld}
              isMuted={sip.isMuted}
              onCall={handleCall}
              onAnswer={handleAnswer}
              onHangup={handleHangup}
              onToggleHold={handleToggleHold}
              onToggleMute={handleToggleMute}
              onTransfer={handleTransfer}
              onToggleDialpad={handleDialpadToggle}
              onUnregister={handleUnregister}
              showDialpad={showDialpad}
            />

            {/* Dialpad */}
            {showDialpad && (
              <Dialpad
                onDigit={handleDTMF}
                onClose={handleDialpadToggle}
              />
            )}
          </>
        )}
      </div>

      {/* Hidden audio elements for ringtones */}
      <audio id="ringtone" loop>
        <source src="/sounds/ringtone.wav" type="audio/wav" />
      </audio>
      <audio id="ringbacktone" loop>
        <source src="/sounds/ringbacktone.wav" type="audio/wav" />
      </audio>
      <audio id="dtmfTone">
        <source src="/sounds/dtmf.wav" type="audio/wav" />
      </audio>
    </div>
  );
};

export default WebPhone;
