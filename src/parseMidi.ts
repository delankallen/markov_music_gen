import { Midi, TrackJSON } from '@tonejs/midi'
import { getImportedMidi } from './components/SelectSong'

export interface Song {
    name: string;
    bpm: number;
    notesInBeat: number;
    noteInterval: number;
    length: number;
    phraseLength: number;
    tracks: TrackJSON[];
    ppq: number;
}

const SECONDS_PER_MINUTE = 60;

function getNotesInBeat(minDuration:number) {
    if (minDuration <= 0.3) {
        return 4;
    }
    if (minDuration <= 0.6) {
        return 2;
    }

    return 1;
}

export async function parseMidi(midiJson:string) {
    let midiFile = document.querySelector('#songSelect') as HTMLSelectElement;
    let phraseLength = document.querySelector('#phraseSelect') as HTMLSelectElement;
    let notesInBeat = document.querySelector('#notesInBeatSelect') as HTMLSelectElement;
    let jMidi: Midi;
    if(getImportedMidi()) {
        jMidi = getImportedMidi() as Midi;
    }else {
        jMidi = await Midi.fromUrl(`./${midiFile ? midiFile.value : "./gymno.mid"}`);
    }

    let newSong:Song = {
        name: jMidi.header.name,
        bpm: Math.ceil(jMidi.header.tempos[0].bpm),
        notesInBeat: 0,
        noteInterval: 0,
        length: Math.ceil(jMidi.duration),
        phraseLength: 0,
        tracks: jMidi.tracks,
        ppq: jMidi.header.ppq
    }

    if (notesInBeat && +notesInBeat.value !== 0) {
        newSong.notesInBeat = +notesInBeat.value;
    } else {
        newSong.notesInBeat = getNotesInBeat(Math.min(...jMidi.tracks[0].notes.map(x => x.duration)))
    }

    newSong.phraseLength = phraseLength ? +phraseLength.value : 8;
    newSong.noteInterval = SECONDS_PER_MINUTE / (newSong.notesInBeat*newSong.bpm);

    return newSong;
}