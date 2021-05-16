import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import PatientList from "./components/patient-list.component";
import ViewPatient from "./components/view-patient.component";
import ViewImageStudy from "./components/view-imagestudy.component"
import SubmitImageStudy from "./components/submit-imagestudy.component"

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={PatientList} />
      <Route path="/patient/:id" exact component={ViewPatient} />
      <Route path="/patient/:id/:uid" exact component={ViewImageStudy} />
      <Route path="/upload" exact component={SubmitImageStudy} />
      </div>
    </Router>
  );
}

export default App;