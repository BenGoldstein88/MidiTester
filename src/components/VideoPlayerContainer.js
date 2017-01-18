import React from 'react';
import VideoPlayer from './VideoPlayer';

export default class VideoPlayerContainer extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
    	playing: true,
    	currentPitch: '-1'
    }
  }

  componentWillMount() {
  	// this.setState({
  	// 	playing: this.props.playing,
  	// 	currentPitch: this.props.currentPitch
  	// })
  }

  togglePlaying() {
  	var toggle = !this.state.playing;
  	this.setState({
  		playing: toggle
  	})
  }


  render() {
    return (
      <VideoPlayer playing={this.state.playing} currentPitch={this.state.currentPitch} playTime={this.props.playTime} />
    );
  }
}
