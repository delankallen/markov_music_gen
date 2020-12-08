import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SelectSong from './components/SelectSong'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <SelectSong />
  </React.StrictMode>,
  document.getElementById('root')
);