import React from 'react'
//@ts-ignore
import Latex from 'react-latex'
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
                        Take the first 16 notes, divided into 8 beat phrases of Mary Had a Little Lamb, 1E 1D 1C 1D 1E 1E 2E, 1D 1D 2D 1E 1G 2G. <br/>
                        <Latex displayMode={true}>$$C=\frac 6 8,  D=\frac 1 8, G=\frac 1 8$$</Latex> <br/>
                        The length of the phrase can affect how random the song will sound.
                        The shorter the phrase length, the less the notes will be mixed. 
                        The generated music will sound more like the source with shorter phrase lengths.
                           <br/>
                           <br/>
                        <p>There are four midi files to choose from:</p>
                        
                        <ul>
                            <li>Moonlight Sonata 1st Movement by Beethoven</li>
                                <ul>
                                    <li>Recommend phrase length 8</li>
                                </ul>
                            <li>Gymnopedia No.1 by Erik Satie</li>
                                <ul>
                                    <li>Recommend phrase length 8</li>
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
