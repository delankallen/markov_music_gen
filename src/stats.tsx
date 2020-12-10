import React from 'react'
import 'katex/dist/katex.min.css';
//@ts-ignore
import katex from 'katex';
import ReactDOM from 'react-dom';
import { parseMidi, Song } from "./parseMidi";

export const displayStats = async () => {
    const song = await parseMidi("");
    let songStats = getStats(song);
    ReactDOM.render(
        buildStats(songStats), 
        document.querySelector("#songInfo")
    )
    let i = 0;
    songStats.forEach(noteTrans => {
        let statEle = document.querySelector(`#noteStat${i++}`);
        katex.render(noteTrans, statEle, {
            throwOnError: false,
            macros: {
                "#": "\\#"
            }
        });
    })
}

const buildStats = (songStats:string[]) => {
    const transList: JSX.Element[] = [];
    let i = 0;
    songStats.forEach(noteTrans => {
        transList.push( <><p id={`noteStat${i++}`}></p></> )
    })

    return (
        transList
    )
}

const getStats = (song:Song) => {
    const notes = song.tracks[0].notes.map(({name}) => name);
    const uniqueNotes = [...new Set(notes)]
    

    const pairs:string[][] = [];

    uniqueNotes.forEach(uNote => {
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if(note===uNote){
                pairs.push([note, notes[i+1]])
            }
        }
    });

    let transMat:string[] = [];

    // pairs.forEach(pair => {
    //     pairs.filter(x => {
    //         x === pair
    //     }).length
    // })

    pairs.forEach(sPair => {
        let pairCount = pairs.filter(pair => pair[0] === sPair[0] && pair[1] === sPair[1] ).length
        transMat.push(`${sPair[0]} \\to ${sPair[1]} = ${pairCount};\\space P_{i \\to j}(${sPair[0]}, ${sPair[1]}) = \\frac{${pairCount}}{${pairs.length}}= ${(pairCount/pairs.length).toFixed(4)}`)
    })

    transMat = [...new Set(transMat)];
    return transMat;
}