import React from 'react';

export default class SingleNotePlayer extends React.Component {

  constructor(props) {
    super(props);

    this.selfDestruct = this.selfDestruct.bind(this);
  }

  componentDidMount() {

    var component = this;
    var minimumPlayTime = 1000;
    var maximumPlayTime = 4000;

    var playTime = Math.max(component.props.playTime, minimumPlayTime);

    var playTime = Math.min(playTime, maximumPlayTime);

    // component.refs.videoPlayer.play();

    setTimeout(function() {
      component.selfDestruct();
    }, playTime)

  }

  selfDestruct() {
    this.props.stopPlayer(this);
  }


  render() {

    var adjustedPitch = this.props.pitch;
    if(adjustedPitch > -1) {
      while(adjustedPitch < 46) {
        adjustedPitch = adjustedPitch + 12;
      }
      while(adjustedPitch > 70) {
        adjustedPitch = adjustedPitch - 12;
      }
    }

    var sourceString = "/assets/videos/" + adjustedPitch +".mp4";
    var heightWidth = '25px'
    // <h2>Playtime: {this.props.playTime}, Pitch: {this.props.pitch}</h2>
    // console.log("rendering player with keyid: ", this.props.keyid)

    return (
        <video ref={'videoPlayer'} style={{
          height: heightWidth,
          width: heightWidth
        }} autoPlay>
          <source src={sourceString} />
        </video>
    );
  }
}
