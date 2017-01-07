import React from 'react';
import VideoPlayerRow from './VideoPlayerRow';


export default class VideoPlayerGrid extends React.Component {

  constructor(props) {
    super(props);

    // this.state = {

    // }



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
  	var playerRows = [];

  	for(var i = 0; i < this.props.numRows; i++) {
  		playerRows.push(<VideoPlayerRow pitchList={this.props.pitchHash[i] || [] } key={i} numPlayers={this.props.playersPerRow} />)
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
