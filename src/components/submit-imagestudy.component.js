import React, { Component } from 'react';

export default class ViewImageStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txt:null
    };
  }

  onChange(e)
  {
      let files=e.target.files;
      
      let reader = new FileReader();
      reader.readAsText(files[0]);

      reader.onload=(e)=>{
          this.setState({
            txt:e.target.result
          })
      }
  }
  onSubmit=(e)=>{
      e.preventDefault();
      console.log(this.state.txt);
      fetch('https://hackathon.siim.org/fhir-overview/fhir/ImagingStudy',
      {
          method: 'POST',
          headers: { apikey: "2c62fc07-88ee-4064-baae-6653cec433ff",
          'Content-Type': 'application/json', },
          body: this.state.txt
      })
      .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      this.props.history.push('/');
  }



  render() {
        return (
          <form onSubmit={this.onSubmit}>
            <h1> Upload ImageStudy Text File</h1>
            <input type="file" name="file" onChange={(e) => this.onChange(e)} />
            <button>Submit</button>
          </form>
        );
      }
}