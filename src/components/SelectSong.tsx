import React from 'react'
import { genMusic, stopPlaying } from '../musicGen'
import {displayStats} from '../stats'

const FirstLoad = () => {
    if(!document.querySelector("#noteStat1")) {
        displayStats().then();
    }
    return (
        <div></div>
    )
}

export const SelectSong = () => {
    return (
        <div className="field">
            <label className="label" htmlFor="songSelect">Select a song to chain:</label>
            <div className="control ">
                <div className="select">
                    <select defaultValue="moonlight_sonata.mid" id="songSelect" onChange={displayStats} onLoad={displayStats}>
                        <option value="moonlight_sonata.mid">Moonlight Sonata 1st Mvt</option>
                        <option value="bach_846.mid">Bach 846</option>
                        <option value="gymno.mid">Gymnopedia No.1</option>
                        <option value="lamb.mid">Mary Had a Little Lamb</option>
                    </select>
                    
                    <FirstLoad />
                </div>
            </div>
        </div>
    )
}

export const SelectPhrase = () => {
    return (
        <div className="field column">
            <label className="label" htmlFor="phraseSelect">Select a phrase length</label>
            <div className="control ">
                <div className="select">
                    <select defaultValue="8" id="phraseSelect">
                        <option value="1">1</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="16">16</option>
                        <option value="32">32</option>
                        <option value="64">64</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export const SelectNotesInBeat = () => {
    return (
        <div className="field column">
            <label className="label" htmlFor="phraseSelect">Select notes in beat</label>
            <div className="control ">
                <div className="select">
                    <select defaultValue="0" id="notesInBeatSelect">
                        <option value="0">Auto</option>
                        <option value="1">1</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="16">16</option>
                        <option value="32">32</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export const MusicControls = () => {
    return (
        <div className="column">
            <div className="card has-background-grey-light">
            <header className="card-header">
                <p className="card-header-title">
                    MusicGen
                </p>
            </header>
            <div className="card-content">
                <div className="content">
                    <SelectSong />
                    <div className="columns">
                        <SelectPhrase />
                        <SelectNotesInBeat/>
                    </div>
                    
                    <p>Note: Music may take a minute to start playing.</p>
                </div>
            </div>
            <footer className="card-footer">
                <a className="card-footer-item has-text-link-dark" onClick={genMusic}>Play</a>
                <a className="card-footer-item has-text-link-dark" onClick={stopPlaying}>Stop</a>
            </footer>
        </div>
        </div>
    )
}

export default MusicControls
