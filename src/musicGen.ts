//@ts-ignore
import Chain from 'markov-chains';
import * as Tone from "tone";
import {
    parseMidi,
    Song
} from "./parseMidi"
import {
    NoteJSON
} from '@tonejs/midi/dist/Note';
import {
    Sampler
} from 'tone';

const COMMA = ',';

export const genMusic = async () => {
    Tone.setContext(new Tone.Context({ latencyHint : "interactive" }))
    const song = await parseMidi("");
    const parsedNotes = quantizeNotes(song)
    playNotes(parsedNotes, song)
}

function quantizeNotes(song: Song) {
    const notes: NoteJSON[] = song.tracks[0].notes;
    if (song.tracks[1]) {
        notes.push.apply(notes, song.tracks[1].notes);
    }

    const quantizedNotes = [];

    for (let i = 0; i <= song.length; i += song.noteInterval) {
        const names = notes.filter(
                note => i <= note.time && note.time < i + song.noteInterval
            ).map(({ name }) => name)
            .sort();

        quantizedNotes.push(names.join(COMMA));
    }

    const phrases = [];

    const enCopy = quantizedNotes.slice(0);
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

let sampler:Sampler;

const buildPhrase = (parsedNotes: string[][], song: Song) => {
    const chain = new Chain(parsedNotes);
    let totalWaitTime = 0;
    let tempWaitTime = 0;
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

        totalWaitTime = tempWaitTime + song.noteInterval + 1;
    }
}

let phraseBuilder = () => {};

function playNotes(parsedNotes: string[][], song: Song) {
    Tone.Transport.PPQ = song.ppq;
    if (sampler) {
        stopPlaying();
    }
    sampler = new Tone.Sampler({
            urls: {
                "C1": "C1.mp3",
                "C4": "C4.mp3",
                "C6": "C6.mp3",
                "D#1": "Ds1.mp3",
                "D#4": "Ds4.mp3",
                "D#6": "Ds6.mp3",
                "F#1": "Fs1.mp3",
                "F#4": "Fs4.mp3",
                "F#6": "Fs6.mp3",
                "A1": "A1.mp3",
                "A4": "A4.mp3",
                "A6": "A6.mp3"
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        });
    sampler.volume.value = -10;
    sampler.toDestination();

    phraseBuilder = () => buildPhrase(parsedNotes, song);

    Tone.loaded().then(() => {
        Tone.Transport.scheduleOnce(
            phraseBuilder,
            song.phraseLength * song.noteInterval
        )

        Tone.Transport.start("+0.1");
        Tone.start();
    })
}

export function stopPlaying() {
    Tone.Transport.cancel();
    Tone.Transport.stop();
    sampler.dispose();
}

export default genMusic;