import React from 'react';
// import MIDIFile from '../midistuff/MIDIFile';
// import MIDIFileHeader from '../midistuff/MIDIFileHeader';
import MIDIFile from 'midifile'
import SampleMIDI from '../assets/sounds/twinkle.mid';


export default class VideoPlayer extends React.Component {


  constructor(props) {
    super(props);

    this.playMidiFile = this.playMidiFile.bind(this)
    this.toArrayBuffer = this.toArrayBuffer.bind(this)
  }

  // because Array Buffers!
  toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    var i;

    for (i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return ab;
  }

  playMidiFile() {

    var bufferedMIDI = this.toArrayBuffer(SampleMIDI)
    // var mf = new MIDIFile(bufferedMIDI);

    console.log("SampleMIDI: ", SampleMIDI)
    console.log("BufferedMIDI: ", bufferedMIDI)
    // console.log("mf: ", mf)
  }

  render() {

    return (
      <div>
      	<video style={{
      		height: '400px',
      		width: '400px'
      	}} controls>
      		<source src="/assets/videos/46.mp4" />
      	</video>
      	<button onClick={this.playMidiFile}>
      		TEST
      	</button>
      </div>
    );
  }
}
