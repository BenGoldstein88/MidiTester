import React from 'react';
import VideoPlayerGrid from './VideoPlayerGrid';

export default class Conductor extends React.Component {


  constructor(props) {
    super(props);

    this.loadNote = this.loadNote.bind(this)
    this.findPlayer = this.findPlayer.bind(this);
    this.playMidiFile = this.playMidiFile.bind(this);
    this.getPolyphonicMidiData = this.getPolyphonicMidiData.bind(this);
    this.formatMidiObject = this.formatMidiObject.bind(this);
    this.toArrayBuffer = this.toArrayBuffer.bind(this);
  }

    // rewritten ArrayBuffer method that seems to work with .mid files NOT containing additional metadata
  toArrayBuffer(file) {
    file = file.replace(/\s+/g, '');
    var ab = new ArrayBuffer(file.length/2)
    var bufferedMIDI = new Uint8Array(ab)

    var j = 0;
    for(var i = 0; i<file.length-1; i = i+2) {
      var hexString = '0x' + file.slice(i, i+2)
      var hexByte = parseInt(hexString)

      bufferedMIDI[j] = hexByte
      j = j + 1;
    }
    return ab;
  }

  formatMidiObject(midifile) {

    var events = midifile.getMidiEvents();
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
      ticksPerFrame: ticksPerFrame || null,
      events: events
    }

    return midiObject

  }

  getPolyphonicMidiData(midifile) {

    var midiObject = this.formatMidiObject(midifile)
    var events = midiObject.events

    var notesOn = [];
    var notesOff = [];
    var currentNote = {};
    var currentChannel = events[0].channel

    for(i in events) {

      // determine whether event is noteOn or noteOff
      // associate each noteOn with the first noteOff that shares the same param1
      // create note objects
      // noteOn
      if(events[i].subtype == 9 && events[i].channel == currentChannel) {
        notesOn.push(events[i])
      }


      // noteOff
      if(events[i].subtype == 8 && events[i].channel == currentChannel) {
        notesOff.push(events[i])
      }

    }

    var notes = [];

    for(var i = 0; i < notesOn.length; i++) {
      var correspondingNoteOff = notesOff.find(function(noteOff) {        
        return noteOff.param1 == notesOn[i].param1
      })

      var noteOffIndex = notesOff.indexOf(correspondingNoteOff);

      if (noteOffIndex > -1) {
        notesOff.splice(noteOffIndex, 1)
      }


    // consolidate information on the current note from both notesOn and notesOff arrays
      currentNote = {
        pitch: notesOn[i].param1,
        pitchAsLetter: this.state.noteHash[notesOn[i].param1],
        velocity: notesOn[i].param2,
        startTime: notesOn[i].playTime,
        endTime: correspondingNoteOff.playTime,
        lengthInTicks: correspondingNoteOff.delta,
        // lengthInBeats: currentNoteLengthInBeats
      }

      notes.push(currentNote)
    }

    console.log("notes: ", notes)
    return notes;

  }
  playMidiFile(file) {

    var bufferedFile = this.toArrayBuffer(file)
    var mf = new MIDIFile(bufferedFile)


    var notesArray;
    console.log("FILE: ", file)

    notesArray = this.getPolyphonicMidiData(mf)

    // var that = this;
    for(var i = 0; i < notesArray.length; i++) {
      var pitch = notesArray[i].pitch
    //   var noteStartTime = notesArray[i].startTime

    //   that.doTimeout(noteStartTime, pitch, that);


    // FOR EACH NOTE
      // Determine how long to wait before passing the note to the player
      // Determine which player to put the note in
      // Put the note in the player


    // FOR NOW, PROOF OF CONCEPT
      // Put note in a player
      // Cycle to the next player
      // If rowEnd, go to next Row and reset PlayerCounter to 0

      this.state.pitchList[rowCounter][playerCounter] = pitch
      var rowCounter = this.state.rowCounter
      var playerCounter = this.state.playerCounter

      if(playerCounter == this.state.numPlayers) {
        rowCounter = (rowCounter + 1) % this.state.numRows;
        playerCounter = 0;
      }
      var pitchList = this.state.pitchList
      pitchList[rowCounter][playerCounter] = pitch

      this.setState({
        pitchList: pitchList,
        playerCounter: playerCounter + 1,
        rowCounter: rowCounter
      })

    }

    console.log("SUPERSTATE: ", this.state)

  }

  loadNote() {

  }

  findPlayer() {

  }

  render() {
    return (
      <div>
      	<VideoPlayerGrid />
      </div>
    );
  }
}
