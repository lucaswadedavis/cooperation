import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CooperationSimulation from './CooperationSimulation';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderNav() {
    return (
        <div className="Nav">
          <Link to="/podcasts">All CooperationSimulation</Link>
        </div>
    )
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h1>Cooperation</h1>
            { this.renderNav() }
          </div>
            <Route path="/podcasts" component={ CooperationSimulation } />
        </div>
      </Router>
    );
  }
}

export default App;
