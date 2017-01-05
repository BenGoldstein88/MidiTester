import React from 'react';
import Dropzone from 'react-dropzone'
export default class MidiDropZone extends React.Component {


  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this)
  }

    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      // this.setState({
      // 	file: acceptedFiles[0]
      // })

      this.props.onFileUpload(acceptedFiles[0])
    }

  render() {
    return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div>Drop a midi file here. Or click and select midi file from system.</div>
            </Dropzone>
          </div>
    );
  }
}
