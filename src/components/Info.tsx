import React from 'react'
import { displayStats } from '../stats'

const Info = () => {
    return (
        <div className="">
            <div className="card has-background-grey-light mt-3">
            <header className="card-header">
                <p className="card-header-title">
                How it Works
                </p>
            </header>
            <div className="card-content">
                <div className="content has-text-black-bis">
                    <p>
                        This program will play generated music from a midi file.
                        The midi file is converted to a JS friendly JSON format. 
                        The note names and their duration are read from the JSON file.
                        The duration of each note is normalized to a discrete fraction of a whole note; Eighth notes, sixteenth notes.
                        Once the notes are quantized they are broken into phrases. <br/>
                        The phrases are built into a Markov Chain, which then arranges the phrases into a new melody. <br/>
                        Longer phrases will retain more of the original musical intention.
                           <br/>
                           <br/>
                        <p>There are four midi files to choose from. 
                            I have included recommendations, but play around with phrases and notes to find interesting combinations:
                        </p>
                        
                        <ul>
                            <li>Moonlight Sonata 1st Movement by Beethoven</li>
                                <ul>
                                    <li>Recommend phrase length 8</li>
                                </ul>
                            <li>Gymnopedia No.1 by Erik Satie</li>
                                <ul>
                                    <li>Recommend phrase length 16</li>
                                </ul>
                            <li>Prelude in C major (Bach BWV 846) by Bach</li>
                                <ul>
                                    <li>Recommend phrase length 32</li>
                                </ul>
                            <li>Mary Had a Little Lamb</li>
                                <ul>
                                    <li>Recommend phrase length 4</li>
                                </ul>
                        </ul>
                    </p>

                </div>
            </div>
        </div>
        </div>
    )
}



export const SongStats = () => {
    return (
        <div className="column">
            <div className="card has-background-grey-light">
            <header className="card-header">
                <p className="card-header-title">
                    Note Transition Table
                </p>
            </header>
            <div className="card-content">
                <div id="songInfo" className="content" onLoad={displayStats}>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Info
