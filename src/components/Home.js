import React from 'react';
import Conductor from './Conductor';
import Maestro from './Maestro';

import MidiFileInput from './MidiFileInput';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: null
    }

    this.uploadFile = this.uploadFile.bind(this)
    this.resetFile = this.resetFile.bind(this);

  }

  uploadFile(file) {

    this.setState({
      file: file
    })

    
  }

  resetFile() {
    this.setState({
      file: null
    })
  }

      	// <Conductor file={this.state.file} resetFile={this.resetFile}/>
  render() {
    return (
      <div>
        <Maestro file={this.state.file} />
        <MidiFileInput uploadFile={this.uploadFile} />
      </div>
    );
  }
}
