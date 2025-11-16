import React from 'react';
import './Dialpad.css';

const Dialpad = ({ onDigit, onClose }) => {
  const digits = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  const handleDigitClick = (digit) => {
    onDigit(digit);
    // Play DTMF tone
    const audio = document.getElementById('dtmfTone');
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('DTMF play failed:', e));
    }
  };

  return (
    <div className="dialpad-overlay" onClick={onClose}>
      <div className="dialpad-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialpad-header">
          <h3>Dialpad</h3>
          <button className="btn-close-dialpad" onClick={onClose}>✕</button>
        </div>
        <div className="dialpad-grid">
          {digits.map((row, rowIndex) => (
            <div key={rowIndex} className="dialpad-row">
              {row.map((digit) => (
                <button
                  key={digit}
                  className="dialpad-btn"
                  onClick={() => handleDigitClick(digit)}
                >
                  {digit}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="dialpad-footer">
          <button className="btn btn-secondary btn-full" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialpad;
