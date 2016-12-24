import React from 'react';
// import MIDIFile from '../midistuff/MIDIFile';
import MIDIFileHeader from '../midistuff/MIDIFileHeader';
import MIDIFile from 'midifile'
// import FileUploadInput from './FileUploadInput'
import MidiDropZone from './MidiDropZone'
import MidiFileInput from './MidiFileInput'
import SampleMIDI from '../assets/sounds/twinkle.mid';
import axios from 'axios';

export default class VideoPlayer extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      file: null,
      currentPitch: '-1',
      noteHash: {
        0: "C-2",
        1: "C#/Db-2",
        2: "D-2",
        3: "D#/Eb-2",
        4: "E-2",
        5: "F-2",
        6: "F#/Gb-2",
        7: "G-2",
        8: "G#/Ab-2",
        9: "A-2",
        10: "A#/Bb-2",
        11: "B-2",
        12: "C-1",
        13: "C#/Db-1",
        14: "D-1",
        15: "D#/Eb-1",
        16: "E-1",
        17: "F-1",
        18: "F#/Gb-1",
        19: "G-1",
        20: "G#/Ab-1",
        21: "A-1",
        22: "A#/Bb-1",
        23: "B-1",
        24: "C0",
        25: "C#/Db0",
        26: "D0",
        27: "D#/Eb0",
        28: "E0",
        29: "F0",
        30: "F#/Gb0",
        31: "G0",
        32: "G#/Ab0",
        33: "A0",
        34: "A#/Bb0",
        35: "B0",
        36: "C1",
        37: "C#/Db1",
        38: "D1",
        39: "D#/Eb1",
        40: "E1",
        41: "F1",
        42: "F#/Gb1",
        43: "G1",
        44: "G#/Ab1",
        45: "A1",
        46: "A#/Bb1",
        47: "B1",
        48: "C2",
        49: "C#/Db2",
        50: "D2",
        51: "D#/Eb2",
        52: "E2",
        53: "F2",
        54: "F#/Gb2",
        55: "G2",
        56: "G#/Ab2",
        57: "A2",
        58: "A#/Bb2",
        59: "B2",
        60: "C3",
        61: "C#/Db3",
        62: "D3",
        63: "D#/Eb3",
        64: "E3",
        65: "F3",
        66: "F#/Gb3",
        67: "G3",
        68: "G#/Ab3",
        69: "A3",
        70: "A#/Bb3",
        71: "B3",
        72: "C4",
        73: "C#/Db4",
        74: "D4",
        75: "D#/Eb4",
        76: "E4",
        77: "F4",
        78: "F#/Gb4",
        79: "G4",
        80: "G#/Ab4",
        81: "A4",
        82: "A#/Bb4",
        83: "B4",
        84: "C5",
        85: "C#/Db5",
        86: "D5",
        87: "D#/Eb5",
        88: "E5",
        89: "F5",
        90: "F#/Gb5",
        91: "G5",
        92: "G#/Ab5",
        93: "A5",
        94: "A#/Bb5",
        95: "B5",
        96: "C6",
        97: "C#/Db6",
        98: "D6",
        99: "D#/Eb6",
        100: "E6",
        101: "F6", 
        112: "F#/Gb6",
        103: "G6", 
        104: "G#/Ab6",
        105: "A6",
        106: "A#/Bb6",
        107: "B6",
        108: "C7",
        109: "C#/Db7",
        110: "D7",
        111: "D#/Eb7", 
        112: "E7",
        113: "F7", 
        114: "F#/Gb7",
        115: "G7",
        116: "G#/Ab7",
        117: "A7",
        118: "A#/Bb7",
        119: "B7",
        120: "C8",
        121: "C#/Db8", 
        122: "D8",
        123: "D#/Eb8", 
        124: "E8",
        125: "F8",
        126: "F#/Gb8",
        127: "G8"
      }
    }
    this.playMidiFile = this.playMidiFile.bind(this)
    this.toArrayBuffer = this.toArrayBuffer.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.doTimeout = this.doTimeout.bind(this)
    this.playNote = this.playNote.bind(this)
    this.getMidiData = this.getMidiData.bind(this)
  }

  handleFileUpload(file) {
    this.setState({
      file: file
    })
  }

  // because Array Buffers!
  toArrayBuffer(file) {
    file = file.replace(/\s+/g, '');
    var ab = new ArrayBuffer(file.length/2)
    var bufferedMIDI = new Uint8Array(ab)

    var j = 0;
    for(var i = 0; i<file.length-1; i = i+2) {
      var hexString = '0x' + file.slice(i, i+2)
      var hexByte = parseInt(hexString)

      // console.log(hexByte, typeof hexByte)
      bufferedMIDI[j] = hexByte
      j = j + 1;
    }
    return ab;
  }

  uploadFile(file) {
    this.playMidiFile(file)
  }

  getMidiData(midifile) {
    // using events so far, but trackEvents allows you to specify a particular track
    var events = midifile.getMidiEvents();
    // var trackEvents = midifile.getTrackEvents(1);

    // // bools for troubleshooting
    //   var isFirst = false;
    //   var isSecond = false;

    // gather information found in the header of the midi file
    var midiFormat = midifile.header.getFormat();
    var trackCount = midifile.header.getTracksCount();

    if(midifile.header.getTimeDivision() === MIDIFileHeader.TICKS_PER_BEAT) {
      var ticksPerBeat = midifile.header.getTicksPerBeat();
    } else {
      var SMPTEFrames = midifile.header.getSMPTEFrames();
      var ticksPerFrame = midifile.header.getTicksPerFrame();
    }

    // compile the header information
    var midiObject = {
      midiFormat: midiFormat,
      trackCount: trackCount,
      ticksPerBeat: ticksPerBeat || null,
      SMPTEFrames: SMPTEFrames || null,
      ticksPerFrame: ticksPerFrame || null
    }


    console.log("midiObject: ", midiObject)

    // seperate the noteOns from the noteOffs, then combine them into 'notes' 
    var notesOn = [];
    var notesOff = [];

    for(i in events) {

      // noteOn
      if(events[i].subtype == 9 && events[i].channel == 1) {
        // if(isFirst === false) {
        //   console.log("First (9): ", events[i])
        // }
        // isFirst = true
        notesOn.push(events[i])
      }


      // noteOff
      if(events[i].subtype == 8 && events[i].channel == 1) {
        // if(isSecond === false) {
        //   console.log("First (8): ", events[i])
        // }
        // isSecond = true
        notesOff.push(events[i])
      }

    }

    var notes = [];
    var currentNote = {};
    var emptyNote = {};
    var totalLengthInBeats = 0;
    var playedNotes = 0;
    var silentNotes = 0;

    // combine On/Off to create a "note" object w/ pertinent information
    for(var i = 0; i < notesOn.length; i++) {

      var currentNoteLengthInBeats = notesOff[i].delta / midiObject.ticksPerBeat;

      // janky way to fix the duration of the first note (.99beats or something)
      if(currentNoteLengthInBeats > 0.5 && currentNoteLengthInBeats < 1) {
        currentNoteLengthInBeats = Math.round(currentNoteLengthInBeats)
      }

      // consolidate information on the current note from both notesOn and notesOff arrays
      currentNote = {
        pitch: notesOn[i].param1,
        pitchAsLetter: this.state.noteHash[notesOn[i].param1],
        velocity: notesOn[i].param2,
        startTime: notesOn[i].playTime,
        endTime: notesOff[i].playTime,
        lengthInTicks: notesOff[i].delta,
        lengthInBeats: currentNoteLengthInBeats
      }

      // deal with empty spaces between notes (which I'm currently treating as notes w/o pitch & velocity)
      if(i > 0 && currentNote.startTime !== notesOff[i-1].playTime) {

       emptyNote = {
          pitch: '-1',
          pitchAsLetter: null,
          velocity: null,
          startTime: notesOff[i-1].playTime,
          endTime: currentNote.startTime,
          lengthInTicks: notesOn[i].delta,
          lengthInBeats: notesOn[i].delta / midiObject.ticksPerBeat
        }
        notes.push(emptyNote)
        totalLengthInBeats += emptyNote.lengthInBeats;
        silentNotes += 1;
      }
      notes.push(currentNote);
      totalLengthInBeats += currentNote.lengthInBeats;
      playedNotes += 1;
    }


    // some info
    console.log("Example note: \n", notes[0])
    console.log("Total Notes: ", notes.length)
    console.log("Total (played) Notes: ", playedNotes)
    console.log("Total (silence) Notes: ", silentNotes)
    console.log("Total Beats: ", totalLengthInBeats)
    console.log("notes: ", notes)

    return notes;

  }

  playMidiFile(file) {

    var bufferedFile = this.toArrayBuffer(file)
    var mf = new MIDIFile(bufferedFile)

    var notesArray = this.getMidiData(mf)



    var that = this;

    for(var i = 0; i < notesArray.length; i++) {
      var pitch = notesArray[i].pitch
      var noteStartTime = notesArray[i].startTime

      that.doTimeout(noteStartTime, pitch, that);


    }
  }

playNote(pitch) {
  this.refs.videoPlayer.pause();
  this.setState({
    currentPitch: pitch
  })
  this.refs.videoPlayer.load();
  this.refs.videoPlayer.play();
}

doTimeout(time, pitch, component){

  setTimeout(function() {
        component.setState({
          currentPitch: pitch        
        })

        component.playNote(pitch)


        // component.refs.videoPlayer.load();
        // component.refs.videoPlayer.play();
        console.log(component.state.currentPitch)

  }, time)
}


render() {
  let videoPlayer = null;
  if(this.state.currentPitch === '-1') {
    var sourceString = ''
  } else {
    var sourceString = "/assets/videos/" + this.state.currentPitch +".mp4"
  }

  return (
    <div>
    <video ref={'videoPlayer'} style={{
      height: '400px',
      width: '400px'
    }} controls autoPlay>
    <source src={sourceString} />
    </video>

    <h2> Current Pitch: </h2> <h3> {this.state.currentPitch} </h3>

    <MidiFileInput uploadFile={this.uploadFile}/>
    </div>
    );
}
}
