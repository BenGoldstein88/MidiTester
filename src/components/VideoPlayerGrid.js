import React from 'react';
import VideoPlayerRow from './VideoPlayerRow';
import MIDIFileHeader from '../midistuff/MIDIFileHeader';
import MIDIFile from 'midifile';

export default class VideoPlayerGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	numRows: 3,
    	playersPerRow: 3,
      pitchList: [],
      rowCounter: 0,
      playerCounter: 0
    }



    // temp
    // this.doTimeout = this.doTimeout.bind(this)
    // this.playNote = this.playNote.bind(this)
    
  }



  // playNote(pitch) {

  //   this.refs.videoPlayer.pause();
  //   this.setState({
  //     currentPitch: pitch
  //   })
  //   this.refs.videoPlayer.load();
  //   this.refs.videoPlayer.play();
  // }

  // doTimeout(time, pitch, component) {


  //   setTimeout(function() {

  //         while(pitch < 46) {
  //           pitch += 12

  //         }

  //         while(pitch > 70) {
  //           pitch -= 12
  //         }

  //         component.playNote(pitch)
  //   }, time)
  // }

  render() {
    console.log("RENDERSTATE: ", this.state)
  	var playerRows = [];

  	for(var i = 0; i < this.state.numRows; i++) {
  		playerRows.push(<VideoPlayerRow pitchList={this.state.pitchList[i] || [] } key={i} numPlayers={this.state.playersPerRow} />)
  	}

    return (
    	<table>
        <thead></thead>
      	<tbody>
      		{playerRows}
      	</tbody>
      </table>
    );
  }
}
