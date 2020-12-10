import { Midi, TrackJSON } from '@tonejs/midi'
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
    let lamb = await Midi.fromUrl(`./${midiFile ? midiFile.value : "./moonlight_sonata.mid"}`)

    let newSong:Song = {
        name: lamb.header.name,
        bpm: Math.ceil(lamb.header.tempos[0].bpm),
        notesInBeat: 0,
        noteInterval: 0,
        length: Math.ceil(lamb.duration),
        phraseLength: 0,
        tracks: lamb.tracks,
        ppq: lamb.header.ppq
    }

    if (notesInBeat && +notesInBeat.value !== 0) {
        newSong.notesInBeat = +notesInBeat.value;
    } else {
        newSong.notesInBeat = getNotesInBeat(Math.min(...lamb.tracks[0].notes.map(x => x.duration)))
    }

    newSong.phraseLength = phraseLength ? +phraseLength.value : 8;
    newSong.noteInterval = SECONDS_PER_MINUTE / (newSong.notesInBeat*newSong.bpm);

    return newSong;
}