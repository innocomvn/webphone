import { useState, useEffect, useCallback, useRef } from 'react';

export const useSIP = () => {
  const [sipStack, setSipStack] = useState(null);
  const [sipSessionRegister, setSipSessionRegister] = useState(null);
  const [sipSessionCall, setSipSessionCall] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [isCallIncoming, setIsCallIncoming] = useState(false);
  const [remoteIdentity, setRemoteIdentity] = useState('');
  const [isHeld, setIsHeld] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const videoLocalRef = useRef(null);
  const videoRemoteRef = useRef(null);
  const audioRemoteRef = useRef(null);
  const configCallRef = useRef(null);

  // Initialize SIPml5
  useEffect(() => {
    if (window.SIPml && !initialized) {
      window.SIPml.init(
        () => {
          console.log('SIPml5 initialized successfully');
          setInitialized(true);

          if (!window.SIPml.isWebRtcSupported()) {
            console.warn('WebRTC not fully supported');
          }

          if (!window.SIPml.isWebSocketSupported()) {
            console.error('WebSocket not supported');
          }
        },
        (e) => {
          console.error('Failed to initialize SIPml5:', e);
        }
      );

      // Set debug level
      window.SIPml.setDebugLevel('info');
    }
  }, [initialized]);

  // SIP Stack event handler
  const onSipEventStack = useCallback((e) => {
    console.log('Stack event:', e.type);

    switch (e.type) {
      case 'started':
        // Create registration session
        if (sipStack) {
          const registerSession = sipStack.newSession('register', {
            expires: 200,
            events_listener: { events: '*', listener: onSipEventSession },
            sip_caps: [
              { name: '+g.oma.sip-im', value: null },
              { name: '+audio', value: null },
              { name: 'language', value: '"en"' }
            ]
          });
          setSipSessionRegister(registerSession);
          registerSession.register();
        }
        break;

      case 'stopping':
      case 'stopped':
      case 'failed_to_start':
      case 'failed_to_stop':
        setIsRegistered(false);
        setIsRegistering(false);
        setSipStack(null);
        setSipSessionRegister(null);
        setSipSessionCall(null);
        setRegistrationStatus(e.description || 'Disconnected');
        break;

      case 'i_new_call':
        // Incoming call
        if (sipSessionCall) {
          // Already in a call, reject
          e.newSession.hangup();
        } else {
          const newCallSession = e.newSession;
          setSipSessionCall(newCallSession);
          newCallSession.setConfiguration(configCallRef.current);

          setIsCallIncoming(true);
          setIsInCall(false);
          const remoteName = newCallSession.getRemoteFriendlyName() || 'Unknown';
          setRemoteIdentity(remoteName);
          setCallStatus(`Incoming call from ${remoteName}`);

          // Play ringtone
          playRingtone();
        }
        break;

      case 'm_permission_requested':
        setCallStatus('Requesting media permissions...');
        break;

      case 'm_permission_accepted':
        setCallStatus('Media permissions granted');
        break;

      case 'm_permission_refused':
        setCallStatus('Media permissions denied');
        terminateCall('Media permission denied');
        break;

      default:
        break;
    }
  }, [sipStack, sipSessionCall]);

  // SIP Session event handler
  const onSipEventSession = useCallback((e) => {
    console.log('Session event:', e.type);

    switch (e.type) {
      case 'connecting':
        if (e.session === sipSessionRegister) {
          setIsRegistering(true);
          setRegistrationStatus('Connecting...');
        } else if (e.session === sipSessionCall) {
          setCallStatus('Connecting...');
        }
        break;

      case 'connected':
        if (e.session === sipSessionRegister) {
          setIsRegistered(true);
          setIsRegistering(false);
          setRegistrationStatus('Registered');
        } else if (e.session === sipSessionCall) {
          setIsInCall(true);
          setIsCallIncoming(false);
          setCallStatus('Call connected');
          stopRingtone();
          stopRingbackTone();
        }
        break;

      case 'terminating':
      case 'terminated':
        if (e.session === sipSessionRegister) {
          setIsRegistered(false);
          setIsRegistering(false);
          setSipSessionRegister(null);
          setRegistrationStatus(e.description || 'Disconnected');
        } else if (e.session === sipSessionCall) {
          terminateCall(e.description || 'Call ended');
        }
        break;

      case 'i_ao_request':
        if (e.session === sipSessionCall) {
          const sipResponseCode = e.getSipResponseCode();
          if (sipResponseCode === 180 || sipResponseCode === 183) {
            playRingbackTone();
            setCallStatus('Ringing...');
          }
        }
        break;

      case 'm_early_media':
        if (e.session === sipSessionCall) {
          stopRingbackTone();
          setCallStatus('Early media');
        }
        break;

      case 'm_local_hold_ok':
        if (e.session === sipSessionCall) {
          setIsHeld(true);
          setCallStatus('Call on hold');
        }
        break;

      case 'm_local_resume_ok':
        if (e.session === sipSessionCall) {
          setIsHeld(false);
          setCallStatus('Call resumed');
        }
        break;

      case 'm_stream_video_local_added':
      case 'm_stream_video_remote_added':
      case 'm_stream_audio_local_added':
      case 'm_stream_audio_remote_added':
        console.log('Media stream added:', e.type);
        break;

      default:
        break;
    }
  }, [sipSessionRegister, sipSessionCall]);

  // Helper functions for audio
  const playRingtone = () => {
    const audio = document.getElementById('ringtone');
    if (audio) audio.play().catch(e => console.log('Ringtone play failed:', e));
  };

  const stopRingtone = () => {
    const audio = document.getElementById('ringtone');
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const playRingbackTone = () => {
    const audio = document.getElementById('ringbacktone');
    if (audio) audio.play().catch(e => console.log('Ringback play failed:', e));
  };

  const stopRingbackTone = () => {
    const audio = document.getElementById('ringbacktone');
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const terminateCall = (description) => {
    setSipSessionCall(null);
    setIsInCall(false);
    setIsCallIncoming(false);
    setRemoteIdentity('');
    setIsHeld(false);
    setIsMuted(false);
    setCallStatus(description || '');
    stopRingtone();
    stopRingbackTone();

    // Clear status after 3 seconds
    setTimeout(() => {
      if (!sipSessionCall) setCallStatus('');
    }, 3000);
  };

  // Register to SIP server
  const register = useCallback((credentials) => {
    if (!initialized || !window.SIPml) {
      console.error('SIPml5 not initialized');
      return false;
    }

    try {
      setIsRegistering(true);

      // Create call configuration
      configCallRef.current = {
        audio_remote: audioRemoteRef.current,
        video_local: videoLocalRef.current,
        video_remote: videoRemoteRef.current,
        bandwidth: { audio: undefined, video: undefined },
        video_size: { minWidth: undefined, minHeight: undefined, maxWidth: undefined, maxHeight: undefined },
        events_listener: { events: '*', listener: onSipEventSession },
        sip_caps: [
          { name: '+g.oma.sip-im' },
          { name: 'language', value: '"en"' }
        ]
      };

      // Create SIP stack
      const stack = new window.SIPml.Stack({
        realm: credentials.realm,
        impi: credentials.impi,
        impu: credentials.impu,
        password: credentials.password,
        display_name: credentials.displayName,
        websocket_proxy_url: credentials.websocketProxyUrl || null,
        outbound_proxy_url: credentials.outboundProxyUrl || null,
        ice_servers: credentials.iceServers || null,
        enable_rtcweb_breaker: false,
        events_listener: { events: '*', listener: onSipEventStack },
        enable_early_ims: true,
        enable_media_stream_cache: false,
        sip_headers: [
          { name: 'User-Agent', value: 'WebPhone/1.0.0' },
          { name: 'Organization', value: 'WebPhone' }
        ]
      });

      setSipStack(stack);

      if (stack.start() !== 0) {
        setRegistrationStatus('Failed to start SIP stack');
        setIsRegistering(false);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationStatus(`Error: ${error.message}`);
      setIsRegistering(false);
      return false;
    }
  }, [initialized, onSipEventStack, onSipEventSession]);

  // Unregister from SIP server
  const unregister = useCallback(() => {
    if (sipStack) {
      sipStack.stop();
    }
  }, [sipStack]);

  // Make a call
  const call = useCallback((phoneNumber, withVideo = true) => {
    if (!sipStack || !sipSessionRegister || !isRegistered) {
      setCallStatus('Not registered');
      return false;
    }

    if (sipSessionCall) {
      setCallStatus('Already in a call');
      return false;
    }

    if (!phoneNumber || phoneNumber.trim() === '') {
      setCallStatus('Please enter a phone number');
      return false;
    }

    try {
      const sessionType = withVideo ? 'call-audiovideo' : 'call-audio';
      const callSession = sipStack.newSession(sessionType, configCallRef.current);

      if (callSession.call(phoneNumber) !== 0) {
        setCallStatus('Failed to make call');
        return false;
      }

      setSipSessionCall(callSession);
      setCallStatus('Calling...');
      return true;
    } catch (error) {
      console.error('Call error:', error);
      setCallStatus(`Error: ${error.message}`);
      return false;
    }
  }, [sipStack, sipSessionRegister, isRegistered, sipSessionCall]);

  // Answer incoming call
  const answer = useCallback((withVideo = true) => {
    if (!sipSessionCall || !isCallIncoming) {
      return false;
    }

    try {
      const sessionType = withVideo ? 'call-audiovideo' : 'call-audio';
      configCallRef.current.video_local = withVideo ? videoLocalRef.current : null;

      if (sipSessionCall.accept(configCallRef.current) !== 0) {
        setCallStatus('Failed to answer call');
        return false;
      }

      stopRingtone();
      setCallStatus('Answering...');
      return true;
    } catch (error) {
      console.error('Answer error:', error);
      setCallStatus(`Error: ${error.message}`);
      return false;
    }
  }, [sipSessionCall, isCallIncoming]);

  // Hangup call
  const hangup = useCallback(() => {
    if (sipSessionCall) {
      sipSessionCall.hangup({ events_listener: { events: '*', listener: onSipEventSession } });
      setCallStatus('Ending call...');
      return true;
    }
    return false;
  }, [sipSessionCall, onSipEventSession]);

  // Hold/Resume call
  const toggleHold = useCallback(() => {
    if (!sipSessionCall || !isInCall) {
      return false;
    }

    try {
      const result = isHeld ? sipSessionCall.resume() : sipSessionCall.hold();
      if (result !== 0) {
        setCallStatus('Hold/Resume failed');
        return false;
      }
      setCallStatus(isHeld ? 'Resuming...' : 'Holding...');
      return true;
    } catch (error) {
      console.error('Hold/Resume error:', error);
      return false;
    }
  }, [sipSessionCall, isInCall, isHeld]);

  // Mute/Unmute call
  const toggleMute = useCallback(() => {
    if (!sipSessionCall || !isInCall) {
      return false;
    }

    try {
      const newMuteState = !isMuted;
      const result = sipSessionCall.mute('audio', newMuteState);
      if (result !== 0) {
        setCallStatus('Mute/Unmute failed');
        return false;
      }
      setIsMuted(newMuteState);
      setCallStatus(newMuteState ? 'Muted' : 'Unmuted');
      setTimeout(() => setCallStatus('Call connected'), 1500);
      return true;
    } catch (error) {
      console.error('Mute error:', error);
      return false;
    }
  }, [sipSessionCall, isInCall, isMuted]);

  // Send DTMF
  const sendDTMF = useCallback((digit) => {
    if (sipSessionCall && isInCall) {
      return sipSessionCall.dtmf(digit) === 0;
    }
    return false;
  }, [sipSessionCall, isInCall]);

  // Transfer call
  const transfer = useCallback((destination) => {
    if (!sipSessionCall || !isInCall) {
      return false;
    }

    if (!destination || destination.trim() === '') {
      return false;
    }

    try {
      if (sipSessionCall.transfer(destination) !== 0) {
        setCallStatus('Transfer failed');
        return false;
      }
      setCallStatus('Transferring...');
      return true;
    } catch (error) {
      console.error('Transfer error:', error);
      return false;
    }
  }, [sipSessionCall, isInCall]);

  return {
    // State
    initialized,
    isRegistered,
    isRegistering,
    registrationStatus,
    callStatus,
    isInCall,
    isCallIncoming,
    remoteIdentity,
    isHeld,
    isMuted,

    // Refs for media elements
    videoLocalRef,
    videoRemoteRef,
    audioRemoteRef,

    // Actions
    register,
    unregister,
    call,
    answer,
    hangup,
    toggleHold,
    toggleMute,
    sendDTMF,
    transfer
  };
};

export default useSIP;
