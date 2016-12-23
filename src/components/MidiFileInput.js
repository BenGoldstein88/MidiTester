import React from 'react';
import FileReaderInput from 'react-file-reader-input';
export default class MidiFileInput extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, results) {
	results.forEach(result => {
      const [e, file] = result;
      this.props.uploadFile(e.target.result);
      console.log(`Successfully uploaded ${file.name}!`);
    });

    // var file = results[0][1]
    // this.props.uploadFile(file)

  }

  render() {
    return (
      <form>
        <label htmlFor="my-file-input">Upload a File:</label>
        <FileReaderInput as="binary" id="my-file-input"
                         onChange={this.handleChange}>
          <button>Select a file!</button>
        </FileReaderInput>
      </form>
    );
  }
}
