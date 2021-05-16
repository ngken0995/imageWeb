import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ViewPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          patient: []
        };
      }
    componentDidMount() {
        Promise.all([
            fetch("https://hackathon.siim.org/fhir/ImagingStudy?_sort=-started&patient="+this.props.match.params.id, {
                method: "GET",
                headers: { apikey: "2c62fc07-88ee-4064-baae-6653cec433ff" }}),
            fetch("https://hackathon.siim.org/fhir/Patient/"+this.props.match.params.id, {
                method: "GET",
                headers: { apikey: "2c62fc07-88ee-4064-baae-6653cec433ff" }})
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then((data1) => {
            console.log(data1);
            this.setState({
                isLoaded: true,
                items: data1[0].entry,
                patient: data1[1]
            });
        },
            (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            );
    }


    render() {
        const { error, isLoaded, items, patient } = this.state;

        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            if (items) {
                return (
                    <div>
                        <h3>{patient.name[0].given[0]} {patient.name[0].family}</h3>
                        <div>Gender: {patient.gender}</div>
                        <div>Date of Birth: {patient.birthDate}</div>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Description</th>
                                    <th>Started</th>
                                    <th>Number of Series</th>
                                    <th>Number of Instances</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item =>(<tr key={item.resource.id}>
                                    <td><Link to={"/patient/"+item.resource.id+"/"+item.resource.identifier[0].value.substring(8)}>{item.resource.id}</Link></td>
                                    <td>{item.resource.description}</td>
                                    <td>{item.resource.started}</td>
                                    <td>{item.resource.numberOfSeries}</td>
                                    <td>{item.resource.numberOfInstances}</td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h3>No ImageStudy</h3>
                    </div>
                );
            }
        }
    }
}