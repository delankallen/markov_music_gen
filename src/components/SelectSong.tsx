import React from 'react'
import { Midi } from '@tonejs/midi';
import { genMusic, stopPlaying } from '../musicGen'
import {displayStats} from '../stats'
import * as Tone from "tone";

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
                    <select defaultValue="gymno.mid" id="songSelect" onChange={() => {
                        clearImportedMidi();
                        displayStats();
                    }} onLoad={displayStats}>
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
        <div className="field ">
            <label className="label" htmlFor="phraseSelect">Select a phrase length</label>
            <div className="control ">
                <div className="select">
                    <select defaultValue="16" id="phraseSelect">
                        <option value="1">1</option>
                        <option value="2">2</option>
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
        <div className="field ">
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

let importedMidi:Midi | null;

export const getImportedMidi = () => {
    return importedMidi;
}

const setImportedMidi = (midiIn:Midi) => {
    importedMidi = midiIn;
}

const clearImportedMidi = () => {
    (document.querySelector("#importMidi") as HTMLInputElement).value = "";
    importedMidi = null;
}

const ImportFile = () => {
    const parseFile = (file: Blob) => {
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            if (e.target){
                const res = e.target.result as ArrayBuffer;
                const midi = new Midi(res);
                setImportedMidi(midi);
                displayStats();
            }
        }
        fileReader.readAsArrayBuffer(file);
    }

    return (
        <div className="field">
            <label className="label" htmlFor="importMidi">Upload a midi file:</label>
            <div className="control">
                <input type="file"
                id="importMidi"
                className="input"
                accept='.mid'
                onChange={e => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        const file = files[0];
                        parseFile(file);
                    }
                }} />
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
                    <div className="columns">
                        <div className="column">
                            <SelectSong />
                            <SelectPhrase />
                        </div>
                        <div className="column">
                            <ImportFile />
                            <SelectNotesInBeat/>
                        </div>
                    </div>
                    
                    <p>
                        Note: Music may take a minute to start playing. <br/>
                        If the audio starts to sound bad, refresh the page. <br/>
                        Some minor static and popping is normal</p>
                </div>
            </div>
            <footer className="card-footer">
                <a  className="card-footer-item has-text-link-dark" onClick={()=>{
                    Tone.start();
                    genMusic();
                    }}>Play</a>
                <a  className="card-footer-item has-text-link-dark" onClick={stopPlaying}>Stop</a>
            </footer>
        </div>
        </div>
    )
}

export default MusicControls
