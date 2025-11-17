import React from 'react';
import WebPhone from './components/WebPhone';
import ErrorBoundary from './components/ErrorBoundary';
import { useMobileFeatures } from './hooks/useMobileFeatures';
import './App.css';

function App() {
  // Initialize mobile features if running on native platform
  useMobileFeatures();

  return (
    <ErrorBoundary>
      <div className="App">
        <WebPhone />
      </div>
    </ErrorBoundary>
  );
}

export default App;
