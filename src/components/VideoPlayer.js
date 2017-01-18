import React from 'react';

export default class VideoPlayer extends React.Component {


  constructor(props) {
    super(props);



    this.state = {
      currentPitch: '-1',
      playing: true      
    }
    // this.doTimeout = this.doTimeout.bind(this)
    // this.playNote = this.playNote.bind(this)
    // this.stopPlayerWithTimeout = this.stopPlayerWithTimeout.bind(this)
    // this.handleStartPlayer = this.handleStartPlayer.bind(this);
    // this.handleStopPlayer = this.handleStopPlayer.bind(this);
    this.selfDestruct = this.selfDestruct.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps: ", nextProps);
    // this.setState({
    //   currentPitch: nextProps.currentPitch,
    //   playing: nextProps.playing
    // })    
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState)

      // if(this.state.playing == false && this.props.playing === true) {
      //   this.setState({
      //     currentPitch: this.props.currentPitch,
      //     playing: this.props.playing          
      //   })
      // }
      // console.log("this.state.playing for "+ this.props.playerNumber +": ", this.state.playing);
      // var component = this;
      // if(this.props.playing === true) {
      //   console.log( "Playing!: ", this.state.playing);
      //   this.refs.videoPlayer.play();
      //   setTimeout(function() {
      //     component.refs.videoPlayer.pause();
      //   }, component.props.playTime + 50)
      // } else {
      //   console.log("Stopping!: ", this.state.playing);
      //   this.refs.videoPlayer.pause();
      // }
  }

  componentDidMount() {
    // this.setState({
    //   currentPitch: this.props.noteInfo.pitch,
    //   playing: this.props.playing
    // })
    var component = this;

    if(this.state.playing === true) {

      component.refs.videoPlayer.play();

      setTimeout(function() {
        // component.refs.videoPlayer.pause();
        component.setState({
          playing: false
        })
        // component.setState({
        //   playing: false
        // })
        component.props.handleStopPlayer(component);
        // component.props.handleStopPlayer();
      }, component.props.playTime+600)
      
    }
    // setTimeout(function() {
    // }, component.props.noteInfo.startTime)


  }

  selfDestruct() {
    this.props.handleSelfDestruct(this.props.playerNumber);
  }

  // handleStartPlayer() {
  //   this.refs.videoPlayer.play();
  // }

  // handleStopPlayer() {
  //   this.refs.videoPlayer.pause();
  // }



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

    var adjustedPitch = this.props.noteInfo.pitch;
    if(adjustedPitch > -1) {
      while(adjustedPitch < 46) {
        adjustedPitch = adjustedPitch + 12;
      }
      while(adjustedPitch > 70) {
        adjustedPitch = adjustedPitch - 12;
      }
    } 

    if(this.props.currentPitch === '-1' || this.state.playing === false) {
      var sourceString = '';
      var heightWidth = '5px';


    } else {
      var sourceString = "/assets/videos/" + adjustedPitch +".mp4";
      var heightWidth = '25px';
    }

    return (
        <video ref={'videoPlayer'} style={{
          height: heightWidth,
          width: heightWidth
        }} >
          <source src={sourceString} />
        </video>
    );
  }
}