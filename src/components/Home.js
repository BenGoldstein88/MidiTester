import React from 'react';

import VideoPlayer from './VideoPlayer'
import MidiFileInput from './MidiFileInput'
export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      	
      	HOMEPAGE
      	<VideoPlayer />
      </div>
    );
  }
}
