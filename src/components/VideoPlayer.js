import React from 'react';

export default class VideoPlayer extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
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
    this.doTimeout = this.doTimeout.bind(this)
    this.playNote = this.playNote.bind(this)
    this.stopPlayerWithTimeout = this.stopPlayerWithTimeout.bind(this)
  }



  stopPlayerWithTimeout(time) {
    setTimeout(function() {
        this.refs.videoPlayer.pause()
    }, time)
  }


  playNote(pitch) {

    this.refs.videoPlayer.pause();
    this.setState({
      currentPitch: pitch
    })
    this.refs.videoPlayer.load();
    this.refs.videoPlayer.play();
  }

  doTimeout(time, pitch, component) {


    setTimeout(function() {

          while(pitch < 46) {
            pitch += 12

          }

          while(pitch > 70) {
            pitch -= 12
          }

          component.playNote(pitch)
    }, time)
  }

  render() {
    if(this.state.currentPitch === '-1') {
      var sourceString = '';


    } else {
      var sourceString = "/assets/videos/" + this.state.currentPitch +".mp4"

    }

    return (

        <video ref={'videoPlayer'} style={{
          height: '400px',
          width: '400px'
        }} controls autoPlay>
          <source src={sourceString} />
        </video>
    );
  }
}