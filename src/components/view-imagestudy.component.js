import React, { Component } from 'react';

export default class ViewImageStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.match.params.uid
    };
  }

  render() {
        return (
          <div>
              <iframe src={"https://hackathon.siim.org/vna/stone-webviewer/index.html?study="+this.state.uid} style={{width:'100%', height: '600px'}}></iframe>
          </div>
        );
      }
}