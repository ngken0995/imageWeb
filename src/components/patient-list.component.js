import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PatientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    componentDidMount() {
        fetch("https://hackathon.siim.org/fhir/Patient/", {
            method: "GET",
            headers: { apikey: "2c62fc07-88ee-4064-baae-6653cec433ff" },
          })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.entry
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
                <h3>Patients</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item =>(<tr key={item.resource.id}>
                            <td><Link to={"/patient/"+item.resource.id}>{item.resource.id}</Link></td>
                            <td>{item.resource.name[0].given[0]}</td>
                            <td>{item.resource.name[0].family}</td>
                            <td>{item.resource.birthDate}</td>
                            <td>{item.resource.gender}</td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
          );
        }
      }
}