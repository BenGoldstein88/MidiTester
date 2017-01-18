import React from 'react';
import MIDIFileHeader from '../midistuff/MIDIFileHeader';
import MIDIFile from 'midifile';

import SingleNotePlayer from './SingleNotePlayer';

export default class Maestro extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			players: [],
			playersPlaying: []
		};


		this.toArrayBuffer = this.toArrayBuffer.bind(this);
		this.formatMidiObject = this.formatMidiObject.bind(this);
		this.getNotesByTrack = this.getNotesByTrack.bind(this);

		this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);

		this.preparePlayers = this.preparePlayers.bind(this);
		this.loadPlayer = this.loadPlayer.bind(this);
		this.playPlayers = this.playPlayers.bind(this);

		this.setPlayersAsState = this.setPlayersAsState.bind(this);
		this.loadPlayerWithTimeout = this.loadPlayerWithTimeout.bind(this);
		
		this.hasLengthInTicks = this.hasLengthInTicks.bind(this);

		this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
		this.handleInitiateButtonClick = this.handleInitiateButtonClick.bind(this);

		this.handleStopPlayer = this.handleStopPlayer.bind(this);
	}

	toArrayBuffer(file) {
		file = file.replace(/\s+/g, '');
		var ab = new ArrayBuffer(file.length/2);
		var bufferedMIDI = new Uint8Array(ab);

		var j = 0;
		for(var i = 0; i<file.length-1; i = i+2) {
			var hexString = '0x' + file.slice(i, i+2);
			var hexByte = parseInt(hexString);

			bufferedMIDI[j] = hexByte;
			j = j + 1;
		}
		return ab;
	}

	formatMidiObject(midifile) {

		var events = midifile.getMidiEvents();
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

	getNotesByTrack(midifile) {

		var midiObject =  this.formatMidiObject(midifile);

		var events = midiObject.events;

		var eventsByTrack = [];

		for(var i = 0; i < events.length; i++) {
			var event = events[i];
			var trackNumber = event.channel;
			var track = eventsByTrack[trackNumber];

		// console.log("typeof track: ", typeof track);
		if(track) {
			track.push(event); 
		} else {
			track = [event];
		}
		eventsByTrack[trackNumber] = track;

	}
		console.log("events.length: ", events.length);
		console.log("eventsByTrack: ", eventsByTrack);
		console.log("eventsByTrack.length: ", eventsByTrack.length);
		// console.log("eventsByTrack[0].length: ", eventsByTrack[0].length);

		var notesByTrack = [];

		for(var i = 0; i < eventsByTrack.length; i++) {
			var trackEvents = eventsByTrack[i];
			// console.log("typeof trackEvents: ", typeof trackEvents);
			// console.log("trackEvents.length: ", trackEvents.length);

			if(!!trackEvents) {

				var notesOn = [];
				var notesOff = [];
				var currentNote = {};
				for(var j = 0; j < trackEvents.length; j++) {
					if(trackEvents[j].subtype == 9) {
						notesOn.push(trackEvents[j]);
					}

					if(trackEvents[j].subtype == 8) {
						notesOff.push(trackEvents[j]);
					}
				}

				var notes = [];

				for(var k = 0; k < notesOn.length; k++) {
					var correspondingNoteOff = notesOff.find(function(noteOff) {        
						return noteOff.param1 == notesOn[k].param1
					})

					var noteOffIndex = notesOff.indexOf(correspondingNoteOff);

					if (noteOffIndex > -1) {
						notesOff.splice(noteOffIndex, 1)
					}

			    // consolidate information on the current note from both notesOn and notesOff arrays
			    currentNote = {
			    	pitch: notesOn[k].param1,
			    	velocity: notesOn[k].param2,
			    	startTime: notesOn[k].playTime,
			    	endTime: correspondingNoteOff.playTime,
			    	trackNumber: notesOn[k].channel,
			    	lengthInTicks: correspondingNoteOff.delta,
				        // lengthInBeats: currentNoteLengthInBeats
				    }

				    notes.push(currentNote)
				}

				notesByTrack.push(notes);
			    // console.log("notesByTrack: ", notesByTrack);
			}
		}

		return notesByTrack;
	}

	prepareFile(file) {
		var bufferedFile = this.toArrayBuffer(file);
		var midifile = new MIDIFile(bufferedFile);
		return midifile;
	}

	preparePlayers(notesByTrack) {
		var component = this;
		var totalPlayers = [];
		var singleNotePlayer;
		for(var trackNumber in notesByTrack) {
			var track = notesByTrack[trackNumber];
			// console.log("track: ", track);
			for(var noteNumber in track) {
				// console.log("note: ", note);
				var noteObject = track[noteNumber];
				// if(this.hasLengthInTicks(noteObject) === true) {
					var key = '' + trackNumber + '' + noteNumber;
					singleNotePlayer = this.loadPlayer(noteObject, key);
					totalPlayers.push(singleNotePlayer);
				// }
			}
		}

		return totalPlayers;
	}

	loadPlayer(noteObject, key) {
		var playTime = noteObject.endTime - noteObject.startTime;
		var pitch = noteObject.pitch;
		var startTime = noteObject.startTime;
		var endTime = noteObject.endTime;
		var playing = false;
		var trackNumber = noteObject.trackNumber;
		var lengthInTicks = noteObject.lengthInTicks;


		var singleNotePlayer = <SingleNotePlayer key={key} keyid={key} playTime={playTime} pitch={pitch} startTime={startTime} endTime={endTime} playing={playing} trackNumber={trackNumber} lengthInTicks={lengthInTicks} stopPlayer={this.handleStopPlayer}/>

		return singleNotePlayer;

	}

	handleStopPlayer(player) {

		var playersPlaying = this.state.playersPlaying;
		var indexToDelete = -1;
		for(var i in playersPlaying) {
			var playerPlaying = playersPlaying[i];
			if(playerPlaying.props.keyid === player.props.keyid) {
				indexToDelete = i;
			}
		}

		if(indexToDelete > -1) {
			playersPlaying.splice(indexToDelete, 1);
		}

		this.setState({
			playersPlaying: playersPlaying
		})


	}

	hasLengthInTicks(noteObject) {
		if(noteObject.lengthInTicks !== 0) {
			return true;
		}
		return false;
	}

	setPlayersAsState(preparedPlayers) {
		this.setState({
			players: preparedPlayers
		})
	}

	handlePlayButtonClick(e) {
		e.preventDefault();

		var preparedFile = this.prepareFile(this.props.file);
		console.log("preparedFile: ", preparedFile);

		var notesByTrack = this.getNotesByTrack(preparedFile);
		console.log("notesByTrack: ", notesByTrack);

		var preparedPlayers = this.preparePlayers(notesByTrack);
		console.log("preparedPlayers: ", preparedPlayers);

		// this.setPlayersAsState(preparedPlayers);
		this.setState({
			players: preparedPlayers
		})

		return null;


	}

	playPlayers() {
		var component = this;
		for(var playerNumber in component.state.players) {
			var player = component.state.players[playerNumber];
			if(!!player) {
				this.loadPlayerWithTimeout(player);
			}


		}
		return null;
	}

	loadPlayerWithTimeout(player) {
		var component = this;

		setTimeout(function() {
			var playersPlaying = component.state.playersPlaying;
			playersPlaying.push(player);
			component.setState({
				playersPlaying: playersPlaying
			})
		}, player.props.startTime)
	}

	handleClearButtonClick(e) {
		e.preventDefault();

		this.setState({
			playersPlaying: []
		})

	}

	handleInitiateButtonClick(e) {
		e.preventDefault();
		this.playPlayers();
		return null;
	}



	render() {
		var fileDisplay;
		var disabled;
		var initiateDisabled;
		var playersPlaying = this.state.playersPlaying;

		if(!!this.props.file) {
			fileDisplay = <h3>there is a file</h3>
			disabled = false;
		} else {
			fileDisplay = <h4> no file</h4>
			disabled = true;
		}

		// if(this.state.playersPlaying.length > 0) {
		// 	initiateDisabled = false;
		// 	playersPlaying = this.state.playersPlaying;
		// }

		return (
			<div>
				{fileDisplay}	
				<button onClick={this.handleClearButtonClick}>
					Clear
				</button>	
				<br />	
				"MAESTRO COMPONENT"
				{playersPlaying}
				<br />
				<button disabled={disabled} onClick={this.handlePlayButtonClick}>
					Load Players
				</button>
				<button disabled={initiateDisabled} onClick={this.handleInitiateButtonClick}>
					Initiate Song
				</button>				
			</div>
			);
	}
}
