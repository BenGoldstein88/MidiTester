import React from 'react';

export default class VideoPlayer extends React.Component {


  constructor(props) {
    super(props);

    // this.state = {
    //   currentPitch: '-1'      
    // }
    // this.doTimeout = this.doTimeout.bind(this)
    // this.playNote = this.playNote.bind(this)
    // this.stopPlayerWithTimeout = this.stopPlayerWithTimeout.bind(this)
    this.handleStartPlayer = this.handleStartPlayer.bind(this);
    this.handleStopPlayer = this.handleStopPlayer.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
      if(this.props.playing === true) {
        console.log( "Playing!: ", this.props.playing);
        this.refs.videoPlayer.play();
      } else {
        console.log( "Stopping!: ", this.props.playing);
        this.refs.videoPlayer.pause();
      }
  }

  handleStartPlayer() {
    this.refs.videoPlayer.play();
  }

  handleStopPlayer() {
    this.refs.videoPlayer.pause();
  }



  // stopPlayerWithTimeout(time) {
  //   setTimeout(function() {
  //       this.refs.videoPlayer.pause()
  //   }, time)
  // }


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
    if(this.props.currentPitch === '-1') {
      var sourceString = '';


    } else {
      var sourceString = "/assets/videos/" + this.props.currentPitch +".mp4"

    }

    return (

        <video ref={'videoPlayer'} style={{
          height: '50px',
          width: '50px'
        }} controls>
          <source src={sourceString} />
        </video>
    );
  }
}