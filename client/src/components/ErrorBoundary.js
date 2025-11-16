import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            maxWidth: '600px'
          }}>
            <h1 style={{ color: '#f44336', marginBottom: '20px' }}>
              ⚠️ Oops! Something went wrong
            </h1>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '16px' }}>
              The application encountered an error. Please try refreshing the page.
            </p>
            <details style={{
              marginTop: '20px',
              textAlign: 'left',
              backgroundColor: '#f5f5f5',
              padding: '20px',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
                Error Details
              </summary>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#d32f2f',
                marginTop: '10px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </div>
            </details>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '30px',
                padding: '12px 40px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
