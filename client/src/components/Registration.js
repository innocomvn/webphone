import React, { useState, useEffect } from 'react';
import './Registration.css';

const Registration = ({ onRegister, status }) => {
  const [credentials, setCredentials] = useState({
    displayName: '',
    impi: '',
    impu: '',
    password: '',
    realm: '',
    websocketProxyUrl: '',
    outboundProxyUrl: '',
    iceServers: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load saved credentials from localStorage
  useEffect(() => {
    const savedCredentials = {
      displayName: localStorage.getItem('sip.displayName') || '',
      impi: localStorage.getItem('sip.impi') || '',
      impu: localStorage.getItem('sip.impu') || '',
      password: localStorage.getItem('sip.password') || '',
      realm: localStorage.getItem('sip.realm') || '',
      websocketProxyUrl: localStorage.getItem('sip.websocketProxyUrl') || '',
      outboundProxyUrl: localStorage.getItem('sip.outboundProxyUrl') || '',
      iceServers: localStorage.getItem('sip.iceServers') || ''
    };
    setCredentials(savedCredentials);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!credentials.realm || !credentials.impi || !credentials.impu) {
      alert('Please fill in all required fields (marked with *)');
      return;
    }

    // Save credentials to localStorage
    Object.keys(credentials).forEach(key => {
      localStorage.setItem(`sip.${key}`, credentials[key]);
    });

    onRegister(credentials);
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2>SIP Registration</h2>

        {status && (
          <div className={`status-message ${status.includes('Error') || status.includes('Failed') ? 'error' : 'info'}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="displayName">Display Name:</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={credentials.displayName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="impi">
              Private Identity<span className="required">*</span>:
            </label>
            <input
              type="text"
              id="impi"
              name="impi"
              value={credentials.impi}
              onChange={handleChange}
              placeholder="e.g. user123"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="impu">
              Public Identity<span className="required">*</span>:
            </label>
            <input
              type="text"
              id="impu"
              name="impu"
              value={credentials.impu}
              onChange={handleChange}
              placeholder="e.g. sip:user123@domain.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="realm">
              Realm<span className="required">*</span>:
            </label>
            <input
              type="text"
              id="realm"
              name="realm"
              value={credentials.realm}
              onChange={handleChange}
              placeholder="e.g. domain.com"
              required
            />
          </div>

          <div className="advanced-toggle">
            <button
              type="button"
              className="btn-link"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? '▼' : '▶'} Advanced Settings
            </button>
          </div>

          {showAdvanced && (
            <div className="advanced-settings">
              <div className="form-group">
                <label htmlFor="websocketProxyUrl">WebSocket Proxy URL:</label>
                <input
                  type="text"
                  id="websocketProxyUrl"
                  name="websocketProxyUrl"
                  value={credentials.websocketProxyUrl}
                  onChange={handleChange}
                  placeholder="e.g. wss://domain.com:443"
                />
              </div>

              <div className="form-group">
                <label htmlFor="outboundProxyUrl">Outbound Proxy URL:</label>
                <input
                  type="text"
                  id="outboundProxyUrl"
                  name="outboundProxyUrl"
                  value={credentials.outboundProxyUrl}
                  onChange={handleChange}
                  placeholder="e.g. udp://domain.com:5060"
                />
              </div>

              <div className="form-group">
                <label htmlFor="iceServers">ICE Servers (JSON):</label>
                <textarea
                  id="iceServers"
                  name="iceServers"
                  value={credentials.iceServers}
                  onChange={handleChange}
                  placeholder='[{"url":"stun:stun.l.google.com:19302"}]'
                  rows="3"
                />
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>

          <div className="help-text">
            <p><span className="required">*</span> Required fields</p>
            <p className="small-text">
              Need a SIP account? Visit{' '}
              <a href="https://www.antisip.com/" target="_blank" rel="noopener noreferrer">
                antisip.com
              </a>{' '}
              or{' '}
              <a href="https://www.linphone.org/" target="_blank" rel="noopener noreferrer">
                linphone.org
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
