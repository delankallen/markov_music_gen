import React from 'react';
import {stopPlaying, genMusic} from './musicGen';

function App() {
  return (
    <section className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          Markov Music Generation
        </h1>
        <h2 className="subtitle">
          Generating new music from old music with Markov Chains
        </h2>
      </div>
    </div>
  </section>
  );
}

export default App;