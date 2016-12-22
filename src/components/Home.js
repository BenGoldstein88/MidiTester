import React from 'react';

import VideoPlayer from './VideoPlayer'
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
