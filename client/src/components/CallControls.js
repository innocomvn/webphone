import React from 'react';
import './CallControls.css';

const CallControls = ({
  isInCall,
  isCallIncoming,
  isHeld,
  isMuted,
  onCall,
  onAnswer,
  onHangup,
  onToggleHold,
  onToggleMute,
  onTransfer,
  onToggleDialpad,
  onUnregister,
  showDialpad
}) => {
  return (
    <div className="call-controls">
      {isCallIncoming ? (
        // Incoming call controls
        <div className="controls-grid incoming">
          <button className="btn btn-success btn-large" onClick={onAnswer}>
            <span className="icon">📞</span>
            <span>Answer</span>
          </button>
          <button className="btn btn-danger btn-large" onClick={onHangup}>
            <span className="icon">📵</span>
            <span>Reject</span>
          </button>
        </div>
      ) : isInCall ? (
        // Active call controls
        <>
          <div className="controls-grid active">
            <button
              className={`btn ${isMuted ? 'btn-warning' : 'btn-secondary'}`}
              onClick={onToggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              <span className="icon">{isMuted ? '🔇' : '🔊'}</span>
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            <button
              className={`btn ${isHeld ? 'btn-warning' : 'btn-secondary'}`}
              onClick={onToggleHold}
              title={isHeld ? 'Resume' : 'Hold'}
            >
              <span className="icon">{isHeld ? '▶️' : '⏸️'}</span>
              <span>{isHeld ? 'Resume' : 'Hold'}</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={onTransfer}
              title="Transfer Call"
            >
              <span className="icon">↪️</span>
              <span>Transfer</span>
            </button>

            <button
              className={`btn ${showDialpad ? 'btn-info' : 'btn-secondary'}`}
              onClick={onToggleDialpad}
              title="Show Dialpad"
            >
              <span className="icon">🔢</span>
              <span>Keypad</span>
            </button>
          </div>

          <div className="hangup-row">
            <button className="btn btn-danger btn-large" onClick={onHangup}>
              <span className="icon">📵</span>
              <span>Hang Up</span>
            </button>
          </div>
        </>
      ) : (
        // Idle state controls
        <div className="controls-grid idle">
          <button className="btn btn-primary btn-large" onClick={onCall}>
            <span className="icon">📞</span>
            <span>Call</span>
          </button>
          <button className="btn btn-secondary" onClick={onToggleDialpad}>
            <span className="icon">🔢</span>
            <span>Dialpad</span>
          </button>
          <button className="btn btn-danger" onClick={onUnregister}>
            <span className="icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CallControls;
