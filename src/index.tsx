import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SelectSong from './components/SelectSong';
import SelectPhrase from './components/SelectPhrase'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <SelectSong />
    <SelectPhrase />
  </React.StrictMode>,
  document.getElementById('root')
);