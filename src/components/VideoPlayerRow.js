import React from 'react';
import VideoPlayer from './VideoPlayer'

export default class VideoPlayerRow extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {
  	var players = [];

  	for(var i = 0; i < this.props.numPlayers; i++) {
  		players.push(<td key={i}> <VideoPlayer currentPitch={this.props.pitchList[i] || -1} hidden={false} /> </td>)
  	}  	

    return (
      	<trow>
      		{players}
      	</trow>
    );
  }
}
