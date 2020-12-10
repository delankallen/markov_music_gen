import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MusicControls from './components/SelectSong';
import Info, { SongStats } from './components/Info';

ReactDOM.render(
  <React.StrictMode>
    <div className="has-background-grey-dark">
    <App />
      <div className="container">
        <div className="columns">
          <div className="column">
            <MusicControls />
            <SongStats />
          </div>
          <div className="column">
            <Info />
          </div>
        </div>
      </div>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);