import React from 'react';

export default class VideoPlayer extends React.Component {


  constructor(props) {
    super(props);



    this.state = {
      currentPitch: '-1',
      playing: false      
    }
    // this.doTimeout = this.doTimeout.bind(this)
    // this.playNote = this.playNote.bind(this)
    // this.stopPlayerWithTimeout = this.stopPlayerWithTimeout.bind(this)
    this.handleStartPlayer = this.handleStartPlayer.bind(this);
    this.handleStopPlayer = this.handleStopPlayer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps: ", nextProps);
    this.setState({
      currentPitch: nextProps.currentPitch,
      playing: nextProps.playing
    })
    
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState)

      // if(this.state.playing == false && this.props.playing === true) {
      //   this.setState({
      //     currentPitch: this.props.currentPitch,
      //     playing: this.props.playing          
      //   })
      // }
      console.log("this.state.playing for "+ this.props.playerNumber +": ", this.state.playing);
      var component = this;
      if(this.props.playing === true) {
        console.log( "Playing!: ", this.state.playing);
        this.refs.videoPlayer.play();
        setTimeout(function() {
          component.refs.videoPlayer.pause();
        }, component.props.playTime + 50)
      } else {
        console.log("Stopping!: ", this.state.playing);
        this.refs.videoPlayer.pause();
      }
  }

  componentDidMount() {
    this.setState({
      currentPitch: this.props.currentPitch,
      playing: this.props.playing
    })   
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
          height: '100px',
          width: '100px'
        }} >
          <source src={sourceString} />
        </video>
    );
  }
}