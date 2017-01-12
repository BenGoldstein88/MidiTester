import React from 'react';
import VideoPlayerGrid from './VideoPlayerGrid';
import VideoPlayer from './VideoPlayer';
import MIDIFileHeader from '../midistuff/MIDIFileHeader';
import MIDIFile from 'midifile';

export default class Conductor extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      startPlay: false,
    	playing: [true],
    	playerCounter: 0,
      numPlayers: 9,
		  numRows: 3,
	   	playersPerRow: 3,
	    pitchHash: {},
	    players: [],
      playersPlaying: [],
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

    this.loadPlayer = this.loadPlayer.bind(this)
    this.findPlayer = this.findPlayer.bind(this);
    this.dispatchWorker = this.dispatchWorker.bind(this);
    this.startPlayer = this.startPlayer.bind(this);
    this.stopPlayer = this.stopPlayer.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.handleSelfDestruct = this.handleSelfDestruct.bind(this);
    this.splitPlayers = this.splitPlayers.bind(this);
    this.preparePlayers = this.preparePlayers.bind(this);

    this.playSong = this.playSong.bind(this);
    this.loadPlayerWithTimeout = this.loadPlayerWithTimeout.bind(this);

    this.handleStartPlayer = this.handleStartPlayer.bind(this);
    this.handleStopPlayer = this.handleStopPlayer.bind(this);
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

  componentDidMount() {
  	// var numRows = this.state.numRows + 1;
  	// var playerMap = {}
  	// map player information onto the playermap given numPlayers per row and such
  }

  componentDidUpdate(prevProps, prevState) {

  	if(this.props.file !== null) {
  		// this.playMidiFile(this.props.file);
      this.playSong(this.props.file);
      // this.splitPlayers();
  	}

  }

  splitPlayers() {
    // var players = this.state.players;
    // var playersToRender = [];
    // var playerCount = 0;
    // for(var i = 0; i < players.length; i++) {
    //   if(playerCount < 10) {
    //     playersToRender.push(players[i]);
    //     playerCount++;
    //   } else {
    //     this.setState({
    //       players: players,
    //       startPlay: true
    //     })
    //     playerCount = 0;
    //   }
    // }
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

    // console.log("notes: ", notes)
    return notes;

  }

  preparePlayers(file) {

    var bufferedFile = this.toArrayBuffer(file)
    var mf = new MIDIFile(bufferedFile)


    var notesArray;

    notesArray = this.getPolyphonicMidiData(mf)
    var playerCounter = 0;
    console.log( "notesArray: ", notesArray);
    // var that = this;

    var players = [];
    for(var i = 0; i < notesArray.length; i++) {
      // var pitch = notesArray[i].pitch
      // console.log("pitch: ", pitch)


      // var playerNumber = this.findPlayer() || playerCounter;
      var playerNumber = playerCounter;


      playerCounter++;

      // this.setState({
      // 	playerCounter: playerCounter
      // })

      var loadedPlayer = this.loadPlayer(notesArray[i], playerNumber);
      players.push(loadedPlayer);


    }

    // this.setState({
    //   players: players,
    //   startPlay: false
    // })

    this.props.resetFile();
    return players;

  }




  playSong(file) {
    var players = this.preparePlayers(file);
    var component = this;
    for(var i = 0; i < players.length; i++) {

      var player = players[i];
      // console.log("player: ", player);
      component.loadPlayerWithTimeout(player);
    }
  }

  loadPlayerWithTimeout(player) {
    var component = this;
    setTimeout(function(){  
      // component.setState({
      //   playersPlaying: playersPlaying
      // })
      var playersPlaying = component.state.playersPlaying;
      var finalIndex = playersPlaying.length - 1;
      playersPlaying.push(player);
      console.log("loading player #: " + player.props.playerNumber + " @ array location " + finalIndex + " with delay of " + player.props.noteInfo.startTime);
      component.manualPlayersRefesh(playersPlaying);

    }, player.props.noteInfo.startTime)
  }

  handleStopPlayer(videoPlayer) {
    var playersPlaying = this.state.playersPlaying;
    var indexToDelete = -1;
    for(var i = 0; i < playersPlaying.length; i++) {
      var player = playersPlaying[i];
      if(player.props.playerNumber === videoPlayer.props.playerNumber) {
        indexToDelete = i;
        console.log("indexToDelete: ", indexToDelete);
      }
    }

    if(indexToDelete > -1) {
      delete playersPlaying[i]
    }

    this.setState({
      playersPlaying: playersPlaying
    })

    return null;
  }

  playMidiFile(file) {
    var players = this.preparePlayers(file);
    console.log("players: ", players);

    var component = this;

    var playersPlaying = [];
    var overflow = 0;

    var timeNow = performance.now();

    for(var i = 0; i < players.length; i++) {
      if(overflow > 2000){ return }

      var player = players[i];
      var playersPlayingState = component.state.playersPlaying;
      console.log("playersPlayingState: ", playersPlayingState);
      console.log("playersPlayingState.length: ", playersPlayingState.length);

      if(playersPlayingState.length < 9) {
        // console.log("this.state.playersPlaying.length: ", this.state.playersPlaying.length);
        overflow = 0;
        playersPlaying.push(player);
        console.log("playersPlaying: ", playersPlaying);
        // console.log("component: ", component);
        // component.setState({
        //   playersPlaying: playersPlaying
        // })
        component.manualPlayersRefesh(playersPlaying);
      } else {
        i--;
        overflow++;
        console.log("overflow: ", overflow);
      }

    }

    // console.log("SUPERSTATE: ", this.state)

  }

  manualPlayersRefesh(playersPlaying) {
    console.log("Refreshing....: ");
    this.setState({
      playersPlaying: playersPlaying
    })
    return null;
  }

  dispatchWorker(noteObject, playerNumber) {

    // load the player JUST BEFORE start time, set its status to 'occupied'
    // wait until start-time to start the player
    // wait until end-time to pause the player AND set its status to 'empty'



    this.loadPlayer(noteObject, playerNumber);
    // var timeUntilPlay = noteObject.startTime
   //  var timeUntilLoad = Math.max(timeUntilPlay, 0)
    // var timeUntilEnd = noteObject.endTime + 5

    

    // var component = this;

    // load player
    // setTimeout(function() {
    //  component.loadPlayer(noteObject, playerNumber);
    // }, timeUntilLoad)

    // // start player
    // setTimeout(function() {
    //  component.startPlayer(playerNumber);
    // }, timeUntilPlay)



    // stop player
    // setTimeout(function() {
    //  component.stopPlayer(playerNumber);
    // }, timeUntilEnd)

    return null;
  }

  loadPlayer(noteObject, playerNumber) {
    // console.log("Loading Player: ", playerNumber);

    var playing = this.state.playing[playerNumber];
    var playTime = noteObject.endTime - noteObject.startTime;



    var videoPlayer = <VideoPlayer handleStopPlayer={this.handleStopPlayer} key={playerNumber} noteInfo={noteObject} playing={true} playerNumber={playerNumber} playTime={playTime} handleSelfDestruct={this.handleSelfDestruct}/>

    return videoPlayer;
  }

  handleSelfDestruct(playerNumber) {

    var playersPlaying = this.state.playersPlaying;
    // players.splice(playerNumber, 1);
    delete playersPlaying[playerNumber];


    this.setState({
      playersPlaying: playersPlaying
    })
    return null;

  }

  togglePlayer(playerNumber) {
    console.log("Toggling: ", playerNumber);
    var videoPlayer = this.state.players[playerNumber];
    if(videoPlayer) {
      var playingState = this.state.playing;
      playingState[playerNumber] = !playingState[playerNumber];
      playingState.push(false);

      this.setState({
        playing: playingState
      })
    }
    return null;

  }

  startPlayer(playerNumber) {
    // this.refs['videoPlayer'+playerNumber].play();
    console.log("Starting Player: ", playerNumber);
    var videoPlayer = this.state.players[playerNumber];
    if(videoPlayer) {
      var playingState = this.state.playing;
      playingState[playerNumber] = true;
      playingState.push(false);

      this.setState({
        playing: playingState
      })
    }
    return null;
  }

  

  stopPlayer(playerNumber) {
    // this.refs['videoPlayer'+playerNumber].pause();
    console.log("Stopping Player: ", playerNumber);
    // var videoPlayer = this.state.players[playerNumber];
    // if(videoPlayer) {
    //  var playingState = this.state.playing;
    //  playingState[playerNumber] = false;
   //    playingState.push(false);

    //  this.setState({
    //    playing: playingState
    //  })
    // }
    var players = this.state.players;
    players.splice(playerNumber, 1);

    this.setState({
      players: players
    })
    
    return null;
  }

  findPlayer() {
    // look at grid of players
    // determine IF there exists an empty player
    // ELSE load a 'ghost-player' of 0px height&width in an invisible top row of the grid and return that ghost-player's number along with the rowIndex of 0
    return null;
  }

  handleStartPlayer(playerNumber) {
    // player.refs.videoPlayer.play();
  }


      	// <VideoPlayerGrid pitchHash={this.state.pitchHash} numRows={this.state.numRows} playersPerRow={this.state.playersPerRow}/>
  render() {

    // var playersPlaying;
    var numPlayers = this.state.playersPlaying.length;
    // if(this.state.startPlay === true) {
    //   playersPlaying = this.state.playersPlaying;
    // } else {
    //   playersPlaying = <h4> 'playersPlaying go here' </h4>
    // }
    console.log("ReRendering with " + numPlayers + " players.");

    return (
      <div>
    	 {this.state.playersPlaying}
      </div>
    );
  }
}
