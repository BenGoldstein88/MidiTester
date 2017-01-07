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

  render() {
    return (
      <div>
      	
      	HOMEPAGE
      	<Conductor file={this.state.file} resetFile={this.resetFile}/>
        <MidiFileInput uploadFile={this.uploadFile} />
      </div>
    );
  }
}
