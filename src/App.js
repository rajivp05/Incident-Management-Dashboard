import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <div className="app">
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  </div>
);

export default App;
