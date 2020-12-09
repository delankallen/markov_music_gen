import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MusicControls from './components/SelectSong';
import Info from './components/Info';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <div className="container">
      <div className="columns">
        <MusicControls />
        <Info />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);