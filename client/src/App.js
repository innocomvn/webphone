import React from 'react';
import WebPhone from './components/WebPhone';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <WebPhone />
      </div>
    </ErrorBoundary>
  );
}

export default App;
