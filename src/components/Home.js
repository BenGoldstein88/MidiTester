import React from 'react';
import Conductor from './Conductor';

import MidiFileInput from './MidiFileInput';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: null
    }

    this.uploadFile = this.uploadFile.bind(this)

  }

  uploadFile(file) {

    this.setState({
      file: file
    })
    
  }

  render() {
    return (
      <div>
      	
      	HOMEPAGE
      	<Conductor />
        <MidiFileInput uploadFile={this.uploadFile} />
      </div>
    );
  }
}
