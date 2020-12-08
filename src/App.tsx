import React from 'react';
import {stopPlaying, genMusic} from './musicGen';

function App() {
  return (
    <div className="App">
      <header><h1>Markov Music Generation</h1></header>
      <button id='button' onClick={genMusic}>Play Music</button>
      <input type="button" value="Stop" onClick={stopPlaying}/>
    </div>
  );
}

export default App;