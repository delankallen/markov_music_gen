import Chain from 'markov-chains';
import * as Tone from "tone";
import {
    parseMidi, Song
} from "./parseMidi"
import { NoteJSON } from '@tonejs/midi/dist/Note';

const COMMA = ',';
let toneContext = Tone.getContext();

export const genMusic = async () => {
    const song = await parseMidi("");
    const parsedNotes = parseNotes(song)
    playNotes(parsedNotes, song)
}

function parseNotes(song:Song) {
    // const song = parseMidi(" ");
    const notes: NoteJSON[] = song.tracks[0].notes;
    if (song.tracks[1]) {
        notes.push.apply(notes, song.tracks[1].notes);
    }

    const sixteenthNotes = [];

    for (let time = 0; time <= song.length; time += song.noteInterval) {
        const names = notes.filter(
                note => time <= note.time && note.time < time + song.noteInterval
            ).map(({
                name
            }) => name)
            .sort();

        sixteenthNotes.push(names.join(COMMA));
    }

    const phrases = [];

    const enCopy = sixteenthNotes.slice(0);
    while (enCopy.length > 0) {
        phrases.push(enCopy.splice(0, song.phraseLength));
    }

    const phrasesIndexed = phrases.map(phrase =>
        phrase.map((names, i) =>
            names.length === 0 ? `${i}` : `${i}${COMMA}${names}`
        )
    );

    return phrasesIndexed;
}

function playNotes(parsedNotes:string[][], song:Song) {
    Tone.start();
    toneContext.transport.PPQ = song.ppq;
    let totalWaitTime = 0;
    let tempWaitTime = 0;
    const chain = new Chain(parsedNotes);
    // const sampler = new Tone.Sampler({
    //     urls: {
    //         A1: "A1.mp3",
    //         A2: "A2.mp3",
    //     },
    //     baseUrl: "https://tonejs.github.io/audio/casio/"
    // }).toDestination();
    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    sampler.volume.value = -10;
    sampler.toDestination();
    let schedulePhrase;

    Tone.loaded().then(() => {
        schedulePhrase = () => {
            while (totalWaitTime <= song.length) {
                var walker = chain.walk();
                walker.forEach((noteName: String) => {
                    const [t, ...names] = noteName.split(COMMA);
                    const parsedT = Number.parseInt(t, 10);
                    names.forEach(name => {
                        const waitTime = parsedT * song.noteInterval + totalWaitTime;
                        tempWaitTime = waitTime;
                        sampler.triggerAttack(
                            name,
                            `+${waitTime+1+Math.random()*0.05-0.025}`
                        )
                    });
                });

                totalWaitTime = tempWaitTime + 1;
            }
        }
        
        toneContext.transport.scheduleRepeat(
            schedulePhrase,
            song.phraseLength * song.noteInterval
        )

        toneContext.transport.start();
    })
}

export function stopPlaying() {
    Tone.Transport.stop(0);
    toneContext.transport.stop(0);
}

export default genMusic;