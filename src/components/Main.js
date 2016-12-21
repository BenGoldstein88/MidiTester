import React from 'react';
import '../assets/@blueprintjs/core/dist/blueprint.css';

export default class Main extends React.Component {

	
  render() {
    return (
      <div style={{
      	height: '100%',
      	width: '100%'
      }}>{this.props.children}</div>
    );
  }
}